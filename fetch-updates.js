#!/usr/bin/env node
/**
 * GENIUS Act Tracker - Data Fetcher
 * Fetches ruling updates from Federal Register and public comments from Regulations.gov
 * Sends notifications to Slack when new rulings are posted
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG_PATH = path.join(__dirname, 'config.json');
let config = {
    REGULATIONS_GOV_API_KEY: process.env.REGULATIONS_GOV_API_KEY || '',
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || '',
    DATA_CACHE_PATH: path.join(__dirname, 'cached-data.json')
};

if (fs.existsSync(CONFIG_PATH)) {
    const fileConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    config = { ...config, ...fileConfig };
}

const SEARCH_TERMS = [
    "GENIUS Act",
    "payment stablecoin",
    "stablecoin issuer",
    "stablecoin regulation"
];

const AGENCY_SLUGS = [
    "treasury-department",
    "federal-reserve-system",
    "comptroller-of-the-currency",
    "federal-deposit-insurance-corporation",
    "financial-crimes-enforcement-network"
];

async function fetchFederalRegisterDocuments() {
    console.log('📰 Fetching Federal Register documents...');
    const baseUrl = 'https://www.federalregister.gov/api/v1/documents.json';
    const allDocs = [];

    for (const term of SEARCH_TERMS) {
        try {
            const params = new URLSearchParams({
                'conditions[term]': term,
                'conditions[publication_date][gte]': '2025-07-18',
                'per_page': '100',
                'order': 'newest'
            });

            const response = await fetch(`${baseUrl}?${params}`);
            if (!response.ok) continue;

            const data = await response.json();
            if (data.results) {
                for (const doc of data.results) {
                    if (!allDocs.find(d => d.document_number === doc.document_number)) {
                        allDocs.push({
                            document_number: doc.document_number,
                            title: doc.title,
                            type: doc.type,
                            abstract: doc.abstract,
                            publication_date: doc.publication_date,
                            agencies: doc.agencies?.map(a => a.name) || [],
                            html_url: doc.html_url,
                            pdf_url: doc.pdf_url,
                            comment_url: doc.comment_url,
                            docket_ids: doc.docket_ids || [],
                            comments_close_on: doc.comments_close_on
                        });
                    }
                }
            }
        } catch (error) {
            console.error(`   Error fetching "${term}":`, error.message);
        }
    }

    for (const agencySlug of AGENCY_SLUGS) {
        try {
            const params = new URLSearchParams({
                'conditions[agencies][]': agencySlug,
                'conditions[publication_date][gte]': '2025-07-18',
                'conditions[term]': 'stablecoin',
                'per_page': '50',
                'order': 'newest'
            });

            const response = await fetch(`${baseUrl}?${params}`);
            if (!response.ok) continue;

            const data = await response.json();
            if (data.results) {
                for (const doc of data.results) {
                    if (!allDocs.find(d => d.document_number === doc.document_number)) {
                        allDocs.push({
                            document_number: doc.document_number,
                            title: doc.title,
                            type: doc.type,
                            abstract: doc.abstract,
                            publication_date: doc.publication_date,
                            agencies: doc.agencies?.map(a => a.name) || [],
                            html_url: doc.html_url,
                            pdf_url: doc.pdf_url,
                            comment_url: doc.comment_url,
                            docket_ids: doc.docket_ids || [],
                            comments_close_on: doc.comments_close_on
                        });
                    }
                }
            }
        } catch (error) {
            console.error(`   Error fetching agency "${agencySlug}":`, error.message);
        }
    }

    console.log(`   Found ${allDocs.length} relevant documents`);
    return allDocs;
}

// Known GENIUS Act docket IDs (manually curated)
// Note: FDIC uses Federal Register for comments, not Regulations.gov dockets
const KNOWN_DOCKET_IDS = [
    'TREAS-DO-2025-0037',  // Treasury GENIUS Act Implementation ANPRM
    'FINCEN-2025-0003',    // FinCEN Illicit Activity Detection
];

async function fetchCommentStats(docketIds) {
    if (!config.REGULATIONS_GOV_API_KEY) {
        console.log('⚠️  No Regulations.gov API key - skipping comment stats');
        return {};
    }

    console.log('💬 Fetching comment statistics and commenters...');
    const stats = {};

    // Combine passed docket IDs with known ones
    const allDocketIds = [...new Set([...docketIds, ...KNOWN_DOCKET_IDS])];
    console.log(`   Checking ${allDocketIds.length} dockets...`);

    for (const docketId of allDocketIds) {
        try {
            // First get total count
            const countUrl = `https://api.regulations.gov/v4/comments?filter[docketId]=${docketId}&page[size]=1`;
            const countResponse = await fetch(countUrl, {
                headers: { 'X-Api-Key': config.REGULATIONS_GOV_API_KEY }
            });

            if (countResponse.ok) {
                const countData = await countResponse.json();
                const totalComments = countData.meta?.totalElements || 0;

                stats[docketId] = {
                    docketId,
                    totalComments,
                    url: `https://www.regulations.gov/docket/${docketId}`,
                    commenters: []
                };

                // Fetch individual commenters (up to 250)
                if (totalComments > 0) {
                    const commentsUrl = `https://api.regulations.gov/v4/comments?filter[docketId]=${docketId}&page[size]=250&sort=-postedDate`;
                    const commentsResponse = await fetch(commentsUrl, {
                        headers: { 'X-Api-Key': config.REGULATIONS_GOV_API_KEY }
                    });

                    if (commentsResponse.ok) {
                        const commentsData = await commentsResponse.json();
                        stats[docketId].commenters = (commentsData.data || []).map(c => ({
                            id: c.id,
                            firstName: c.attributes?.firstName || '',
                            lastName: c.attributes?.lastName || '',
                            organization: c.attributes?.organization || '',
                            postedDate: c.attributes?.postedDate || '',
                            title: c.attributes?.title || '',
                            commentUrl: `https://www.regulations.gov/comment/${c.id}`
                        }));
                    }
                }

                console.log(`   ${docketId}: ${totalComments} comments, ${stats[docketId].commenters.length} fetched`);
            }
            await new Promise(resolve => setTimeout(resolve, 600)); // Rate limiting
        } catch (error) {
            console.error(`   Error for ${docketId}:`, error.message);
        }
    }
    return stats;
}

async function sendSlackNotification(newDocuments) {
    if (!config.SLACK_WEBHOOK_URL || newDocuments.length === 0) {
        if (newDocuments.length === 0) console.log('📭 No new documents to notify');
        else console.log('⚠️  No Slack webhook configured');
        return;
    }

    console.log(`📤 Sending Slack notification for ${newDocuments.length} new document(s)...`);

    const blocks = [
        { type: "header", text: { type: "plain_text", text: "🏛️ GENIUS Act Tracker Update", emoji: true } },
        { type: "section", text: { type: "mrkdwn", text: `*${newDocuments.length} new regulatory document(s) published*` } },
        { type: "divider" }
    ];

    for (const doc of newDocuments.slice(0, 10)) {
        const typeEmoji = doc.type === 'Rule' ? '📋' : doc.type === 'Proposed Rule' ? '📝' : 'ℹ️';
        blocks.push({
            type: "section",
            text: {
                type: "mrkdwn",
                text: `${typeEmoji} *${doc.type}*\n*<${doc.html_url}|${doc.title}>*\n_${doc.agencies.join(', ')}_ • ${doc.publication_date}${doc.comments_close_on ? `\n💬 Comments close: ${doc.comments_close_on}` : ''}`
            }
        });
    }

    try {
        const response = await fetch(config.SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ blocks })
        });
        console.log(response.ok ? '   ✅ Sent!' : '   ❌ Failed');
    } catch (error) {
        console.error('   ❌ Error:', error.message);
    }
}

function loadCache() {
    if (fs.existsSync(config.DATA_CACHE_PATH)) {
        try { return JSON.parse(fs.readFileSync(config.DATA_CACHE_PATH, 'utf8')); }
        catch (e) { /* ignore */ }
    }
    return { documents: [], commentStats: {}, lastFetch: null };
}

function saveCache(data) {
    fs.writeFileSync(config.DATA_CACHE_PATH, JSON.stringify(data, null, 2));
    console.log('💾 Cache saved');
}

function generateDataFile(documents, commentStats) {
    const content = `// Auto-generated - Last updated: ${new Date().toISOString()}
const fetchedFederalRegisterDocs = ${JSON.stringify(documents, null, 2)};
const fetchedCommentStats = ${JSON.stringify(commentStats, null, 2)};
const lastDataFetch = "${new Date().toISOString()}";
`;
    fs.writeFileSync(path.join(__dirname, 'fetched-data.js'), content);
    console.log('📝 Updated fetched-data.js');
}

async function main() {
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  GENIUS Act Tracker - Data Fetch');
    console.log(`  ${new Date().toLocaleString()}`);
    console.log('═══════════════════════════════════════════════════════\n');

    const cache = loadCache();
    const previousDocNumbers = new Set(cache.documents.map(d => d.document_number));

    const documents = await fetchFederalRegisterDocuments();
    const allDocketIds = [...new Set(documents.flatMap(d => d.docket_ids))];
    const commentStats = await fetchCommentStats(allDocketIds);

    const newDocuments = documents.filter(d => !previousDocNumbers.has(d.document_number));

    console.log(`\n📊 Summary: ${documents.length} total, ${newDocuments.length} new, ${allDocketIds.length} dockets\n`);

    if (newDocuments.length > 0) await sendSlackNotification(newDocuments);

    saveCache({ documents, commentStats, lastFetch: new Date().toISOString() });
    generateDataFile(documents, commentStats);

    console.log('\n✅ Done!\n');
}

main().catch(console.error);
