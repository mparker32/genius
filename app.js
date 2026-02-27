// GENIUS Act Tracker Application
const CURRENT_DATE = new Date();

let filteredData = [...rulemakingsData];

// Toggle collapsible sections
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('collapsed');
    }
}

// Track priority filter state
let priorityFilterActive = false;

// Quick filter functions
function filterPriority() {
    priorityFilterActive = !priorityFilterActive;
    const priorityBtn = document.getElementById('priorityBtn');
    if (priorityFilterActive) {
        priorityBtn.classList.add('active');
    } else {
        priorityBtn.classList.remove('active');
    }
    filterAndSort();
}

function filterOpenForComment() {
    document.getElementById('publicationFilter').value = 'open-comment';
    document.getElementById('openCommentBtn').classList.add('active');
    document.getElementById('preRulemakingBtn').classList.remove('active');
    document.getElementById('notNoticedBtn').classList.remove('active');
    filterAndSort();
}

function filterPreRulemaking() {
    document.getElementById('publicationFilter').value = 'anprm';
    document.getElementById('preRulemakingBtn').classList.add('active');
    document.getElementById('openCommentBtn').classList.remove('active');
    document.getElementById('notNoticedBtn').classList.remove('active');
    filterAndSort();
}

function filterNotNoticed() {
    document.getElementById('publicationFilter').value = 'not-noticed';
    document.getElementById('notNoticedBtn').classList.add('active');
    document.getElementById('openCommentBtn').classList.remove('active');
    document.getElementById('preRulemakingBtn').classList.remove('active');
    filterAndSort();
}

function clearAllFilters() {
    document.getElementById('agencyFilter').value = '';
    document.getElementById('publicationFilter').value = '';
    document.getElementById('rulemakingTypeFilter').value = '';
    document.getElementById('searchBox').value = '';
    document.getElementById('openCommentBtn').classList.remove('active');
    document.getElementById('preRulemakingBtn').classList.remove('active');
    document.getElementById('notNoticedBtn').classList.remove('active');
    document.getElementById('priorityBtn').classList.remove('active');
    priorityFilterActive = false;
    filterAndSort();
}

// Initialize collapsed state for collapsible sections
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('aboutSection');
    if (aboutSection) {
        aboutSection.classList.add('collapsed');
    }
    const rulemakingProcessSection = document.getElementById('rulemakingProcessSection');
    if (rulemakingProcessSection) {
        rulemakingProcessSection.classList.add('collapsed');
    }
});

// Check if a rulemaking has been noticed (published in Federal Register)
function getRulemakingStatus(item) {
    const status = {
        isNoticed: false,         // Any Federal Register publication (including ANPRM)
        isTrulyNoticed: false,    // Actual rulemaking notice (NPRM or Final only - not ANPRM)
        isPreRulemaking: false,   // ANPRM stage - gathering input before formal proposal
        isOpenForComment: false,
        documentType: null,
        documentStage: null,      // 'anprm', 'nprm', 'final', or null
        publicationDate: null,
        commentsCloseDate: null,
        documentUrl: null
    };

    // FIRST: Check local rulemakingStages data (more reliable than fetched matching)
    if (item.rulemakingStages) {
        const stages = item.rulemakingStages;

        // Check for NPRM
        if (stages.nprm?.status === 'published') {
            status.isNoticed = true;
            status.isTrulyNoticed = true;
            status.documentStage = 'nprm';
            status.publicationDate = stages.nprm.date;
        }
        // Check for Final Rule
        else if (stages.finalRule?.status === 'published') {
            status.isNoticed = true;
            status.isTrulyNoticed = true;
            status.documentStage = 'final';
            status.publicationDate = stages.finalRule.date;
        }
        // Check for ANPRM
        else if (stages.anprm?.status === 'published' || stages.anprm?.status === 'closed') {
            status.isNoticed = true;
            status.isPreRulemaking = true;
            status.documentStage = 'anprm';
            status.publicationDate = stages.anprm.date;
        }

        // Check comment period
        if (stages.commentPeriod?.status === 'open') {
            status.isOpenForComment = true;
            status.commentsCloseDate = stages.commentPeriod.endDate;
        }

        // If we found local stage data, return early
        if (status.isNoticed) {
            return status;
        }
    }

    // FALLBACK: Check fetched Federal Register data
    if (typeof fetchedFederalRegisterDocs === 'undefined') {
        return status;
    }

    // Try to find a matching document
    const keywords = [
        item.section?.toLowerCase(),
        item.agency?.toLowerCase(),
        item.docketId?.toLowerCase()
    ].filter(Boolean);

    // Also check for specific matches based on requirement text
    const requirementLower = item.requirement?.toLowerCase() || '';

    for (const doc of fetchedFederalRegisterDocs) {
        const docTitle = doc.title?.toLowerCase() || '';
        const docAbstract = doc.abstract?.toLowerCase() || '';
        const docAgencies = doc.agencies?.map(a => a.toLowerCase()).join(' ') || '';

        // Check for GENIUS Act documents that might match this rulemaking
        const isGeniusDoc = docTitle.includes('genius') || docAbstract.includes('genius');
        const isStablecoinDoc = docTitle.includes('stablecoin') || docAbstract.includes('stablecoin');

        // Helper to determine document stage
        function getDocumentStage(doc) {
            const title = doc.title?.toLowerCase() || '';
            const abstract = doc.abstract?.toLowerCase() || '';
            const type = doc.type;

            // Check for ANPRM (Advance Notice)
            if (title.includes('advance notice') || abstract.includes('advance notice') ||
                title.includes('anprm') || abstract.includes('anprm')) {
                return 'anprm';
            }
            // Check for Final Rule
            if (type === 'Rule') {
                return 'final';
            }
            // Check for NPRM (Proposed Rule)
            if (type === 'Proposed Rule') {
                return 'nprm';
            }
            // Notice type
            if (type === 'Notice') {
                return 'notice';
            }
            return null;
        }

        // Match by docket ID if available
        if (item.docketId && doc.docket_ids?.includes(item.docketId)) {
            status.isNoticed = true;
            status.documentType = doc.type;
            status.documentStage = getDocumentStage(doc);
            status.publicationDate = doc.publication_date;
            status.commentsCloseDate = doc.comments_close_on;
            status.documentUrl = doc.html_url;
            break;
        }

        // Match Treasury rulemakings to Treasury GENIUS Act documents
        if (item.agency?.includes('Treasury') && isGeniusDoc && docAgencies.includes('treasury')) {
            status.isNoticed = true;
            status.documentType = doc.type;
            status.documentStage = getDocumentStage(doc);
            status.publicationDate = doc.publication_date;
            status.commentsCloseDate = doc.comments_close_on;
            status.documentUrl = doc.html_url;
            break;
        }

        // Match FDIC rulemakings - only for single-agency FDIC entries (not joint agency)
        const isSingleAgencyFDIC = item.agency?.startsWith('Federal Deposit Insurance') || item.agency === 'FDIC';
        if (isSingleAgencyFDIC && isStablecoinDoc && docAgencies.includes('federal deposit insurance')) {
            status.isNoticed = true;
            status.documentType = doc.type;
            status.documentStage = getDocumentStage(doc);
            status.publicationDate = doc.publication_date;
            status.commentsCloseDate = doc.comments_close_on;
            status.documentUrl = doc.html_url;
            break;
        }

        // Match NCUA rulemakings - only for single-agency NCUA entries (not joint agency)
        const isSingleAgencyNCUA = item.agency?.startsWith('National Credit Union') || item.agency === 'NCUA';
        if (isSingleAgencyNCUA && isStablecoinDoc && docAgencies.includes('national credit union')) {
            status.isNoticed = true;
            status.documentType = doc.type;
            status.documentStage = getDocumentStage(doc);
            status.publicationDate = doc.publication_date;
            status.commentsCloseDate = doc.comments_close_on;
            status.documentUrl = doc.html_url;
            break;
        }
    }

    // Check if comments are still open
    if (status.commentsCloseDate) {
        const closeDate = new Date(status.commentsCloseDate);
        status.isOpenForComment = closeDate > CURRENT_DATE;
    }

    // Determine if truly noticed (NPRM or Final) vs pre-rulemaking (ANPRM)
    if (status.isNoticed) {
        if (status.documentStage === 'anprm') {
            status.isPreRulemaking = true;
            status.isTrulyNoticed = false;  // ANPRM is not a formal rulemaking notice
        } else if (status.documentStage === 'nprm' || status.documentStage === 'final') {
            status.isTrulyNoticed = true;
            status.isPreRulemaking = false;
        }
    }

    return status;
}

// Format date as MM.DD.YYYY (Paradigm style)
function formatDate(dateStr) {
    if (!dateStr) return '';
    // Parse date string manually to avoid timezone issues
    // Handles both "2026-05-17" and full ISO strings
    const parts = dateStr.split('T')[0].split('-');
    if (parts.length === 3) {
        const yyyy = parts[0];
        const mm = parts[1].padStart(2, '0');
        const dd = parts[2].padStart(2, '0');
        return `${mm}.${dd}.${yyyy}`;
    }
    // Fallback for other formats
    const date = new Date(dateStr);
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(date.getUTCDate()).padStart(2, '0');
    const yyyy = date.getUTCFullYear();
    return `${mm}.${dd}.${yyyy}`;
}

// Get comment data for a rulemaking (if available)
function getCommentData(item) {
    if (typeof fetchedCommentStats === 'undefined') return null;

    // Try to match by docket ID or keywords
    for (const docketId of Object.keys(fetchedCommentStats)) {
        const stats = fetchedCommentStats[docketId];
        // Check if this docket might be related to this rulemaking
        if (item.searchKeywords && item.searchKeywords.some(kw =>
            docketId.toLowerCase().includes(kw.toLowerCase())
        )) {
            return stats;
        }
    }
    return null;
}

// Render commenters list
function renderCommenters(commenters) {
    if (!commenters || commenters.length === 0) {
        return '<p class="no-commenters">No public comments yet.</p>';
    }

    const commentersList = commenters.slice(0, 20).map(c => {
        const name = [c.firstName, c.lastName].filter(Boolean).join(' ') || 'Anonymous';
        const org = c.organization ? ` (${c.organization})` : '';
        const date = c.postedDate ? new Date(c.postedDate).toLocaleDateString() : '';
        return `
            <div class="commenter-item">
                <a href="${c.commentUrl}" target="_blank" class="commenter-name">${name}${org}</a>
                <span class="commenter-date">${date}</span>
            </div>
        `;
    }).join('');

    const moreText = commenters.length > 20 ?
        `<p class="more-commenters">+ ${commenters.length - 20} more commenters</p>` : '';

    return commentersList + moreText;
}

// Render the public comments section for a rulemaking
// Render submitted comments list
function renderSubmittedComments(comments, commentsPageUrl) {
    if (!comments || comments.length === 0) return '';

    const commentsHtml = comments.map(comment => {
        const dateFormatted = new Date(comment.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        return `
            <div class="submitted-comment">
                <div class="comment-header">
                    <span class="commenter-name">${comment.commenter}</span>
                    <span class="commenter-type">${comment.type}</span>
                    <span class="comment-date">${dateFormatted}</span>
                </div>
                <p class="comment-summary">${comment.summary}</p>
                <a href="${comment.pdfUrl}" target="_blank" class="comment-pdf-link" onclick="event.stopPropagation();">
                    Read full comment (PDF) →
                </a>
            </div>
        `;
    }).join('');

    const viewAllLink = commentsPageUrl
        ? `<a href="${commentsPageUrl}" target="_blank" class="view-all-comments-link" onclick="event.stopPropagation();">View all comments on FDIC.gov →</a>`
        : '';

    return `
        <div class="submitted-comments-section">
            <h4>📄 ${comments.length} Comments Submitted</h4>
            ${viewAllLink}
            <div class="comments-list">
                ${commentsHtml}
            </div>
        </div>
    `;
}

function renderRulemakingStages(item) {
    // If no stages data, show default "not started" for all stages
    const stages = item.rulemakingStages || {
        anprm: { status: 'not-started' },
        nprm: { status: 'not-started' },
        commentPeriod: { status: 'not-started' },
        finalRule: { status: 'not-started' },
        effective: { status: 'not-started' }
    };

    const stageConfig = [
        { key: 'anprm', label: 'ANPRM', icon: '📋' },
        { key: 'nprm', label: 'NPRM', icon: '📜' },
        { key: 'commentPeriod', label: 'Comments', icon: '💬' },
        { key: 'finalRule', label: 'Final Rule', icon: '✅' },
        { key: 'effective', label: 'Effective', icon: '🚀' }
    ];

    // Determine current active stage index (the latest non-completed stage that has activity)
    let currentStageIndex = -1;
    let lastCompletedIndex = -1;

    for (let i = 0; i < stageConfig.length; i++) {
        const stage = stages[stageConfig[i].key];
        if (stage) {
            if (stage.status === 'published' || stage.status === 'open' || stage.status === 'in-effect') {
                currentStageIndex = i;
            } else if (stage.status === 'closed') {
                lastCompletedIndex = i;
            }
        }
    }

    // If nothing is currently active but something completed, next stage is current
    if (currentStageIndex === -1 && lastCompletedIndex >= 0) {
        currentStageIndex = lastCompletedIndex + 1;
    }

    const stepsHtml = stageConfig.map((config, index) => {
        const stage = stages[config.key] || { status: 'not-started' };
        const status = stage.status;

        // Determine step state
        let stepClass = 'step-pending';
        let stepIcon = config.icon;
        let statusText = 'Not Started';
        let dateText = '';
        let extraInfo = '';

        if (status === 'skipped') {
            stepClass = 'step-skipped';
            stepIcon = '⊘';
            statusText = 'Skipped';
        } else if (status === 'closed') {
            // Completed stage (e.g., ANPRM comment period closed)
            stepClass = 'step-completed';
            if (config.key === 'anprm') {
                statusText = 'Closed';
                dateText = stage.commentEndDate ? `Comments closed ${formatDate(stage.commentEndDate)}` : '';
            } else if (config.key === 'commentPeriod') {
                statusText = 'Closed';
                dateText = stage.endDate ? formatDate(stage.endDate) : '';
            }
        } else if (status === 'published' || status === 'open' || status === 'in-effect') {
            stepClass = index === currentStageIndex ? 'step-current' : 'step-completed';

            if (config.key === 'anprm' && status === 'published') {
                stepClass = 'step-current';
                statusText = 'Open';
                dateText = stage.commentEndDate ? `Ends ${formatDate(stage.commentEndDate)}` : '';
            } else if (config.key === 'nprm' && status === 'published') {
                statusText = 'Published';
                dateText = stage.date ? formatDate(stage.date) : '';
            } else if (config.key === 'commentPeriod') {
                if (status === 'open') {
                    stepClass = 'step-current';
                    statusText = stage.extended ? 'Open (Extended)' : 'Open';
                    dateText = stage.endDate ? `Ends ${formatDate(stage.endDate)}` : '';
                    if (stage.extended && stage.originalEndDate) {
                        extraInfo = `<span class="original-date">Was ${formatDate(stage.originalEndDate)}</span>`;
                    }
                }
            } else if (config.key === 'finalRule' && status === 'published') {
                statusText = 'Published';
                dateText = stage.date ? formatDate(stage.date) : '';
            } else if (config.key === 'effective' && status === 'in-effect') {
                statusText = 'In Effect';
                dateText = stage.date ? formatDate(stage.date) : '';
            }
        } else if (status === 'pending-publication') {
            stepClass = 'step-waiting';
            statusText = 'Awaiting FR Publication';
            dateText = stage.notes || '';
        } else if (index === currentStageIndex && status === 'not-started') {
            // This is the next stage after a completed one - show as "pending/waiting"
            stepClass = 'step-waiting';
            statusText = 'Pending';
        }

        // Is this step connected to next?
        const isConnected = index < stageConfig.length - 1;
        const connectorClass = index < currentStageIndex ? 'connector-completed' : 'connector-pending';

        return `
            <div class="stage-step ${stepClass}">
                <div class="step-circle">
                    <span class="step-icon">${stepIcon}</span>
                </div>
                <div class="step-label">${config.label}</div>
                <div class="step-status">${statusText}</div>
                ${dateText ? `<div class="step-date">${dateText}</div>` : ''}
                ${extraInfo}
            </div>
            ${isConnected ? `<div class="step-connector ${connectorClass}"></div>` : ''}
        `;
    }).join('');

    // Calculate days left for comment period if open
    let commentAlert = '';
    if (stages.commentPeriod && stages.commentPeriod.status === 'open' && stages.commentPeriod.endDate) {
        const endDate = new Date(stages.commentPeriod.endDate);
        const daysLeft = Math.floor((endDate - CURRENT_DATE) / (1000 * 60 * 60 * 24));

        if (daysLeft > 0) {
            commentAlert = `
                <div class="comment-period-alert open">
                    <span class="alert-icon">⏰</span>
                    <span class="alert-text"><strong>${daysLeft} days</strong> left to submit comments</span>
                </div>
            `;
        } else if (daysLeft === 0) {
            commentAlert = `
                <div class="comment-period-alert closing">
                    <span class="alert-icon">🚨</span>
                    <span class="alert-text"><strong>Last day</strong> to submit comments!</span>
                </div>
            `;
        }
    }

    return `
        <div class="rulemaking-stages">
            <h3>Rulemaking Process</h3>
            <div class="stages-tracker">
                ${stepsHtml}
            </div>
            ${commentAlert}
        </div>
    `;
}

function renderCommentSection(item) {
    // Check if we have fetched comment stats data
    const hasCommentStats = typeof fetchedCommentStats !== 'undefined' && Object.keys(fetchedCommentStats).length > 0;

    // Find matching docket stats if available
    let matchingStats = null;
    if (hasCommentStats && item.docketId) {
        matchingStats = fetchedCommentStats[item.docketId];
    }

    // Get rulemaking status to check if it's been published
    const rulemakingStatus = getRulemakingStatus(item);

    // If we have full comment stats from the API
    if (matchingStats) {
        return `
            <div class="public-comments-section">
                <h3>💬 Public Comments</h3>
                <div class="comment-stats">
                    <span class="comment-count">${matchingStats.totalComments} comments submitted</span>
                    <a href="${matchingStats.url}" target="_blank" class="view-all-link">View all on Regulations.gov →</a>
                </div>
                <div class="commenters-list">
                    ${renderCommenters(matchingStats.commenters)}
                </div>
            </div>
        `;
    }

    // If we have a docket ID but no stats, show link to docket
    if (item.docketId) {
        const docketUrl = `https://www.regulations.gov/docket/${item.docketId}`;
        const commentStatus = rulemakingStatus.isOpenForComment
            ? '<span class="comment-status open">Currently accepting comments</span>'
            : rulemakingStatus.commentsCloseDate
                ? '<span class="comment-status closed">Comment period closed</span>'
                : '';

        return `
            <div class="public-comments-section">
                <h3>💬 Public Comments</h3>
                <div class="docket-link-section">
                    <p>This rulemaking is tracked under docket <strong>${item.docketId}</strong></p>
                    ${commentStatus}
                    <a href="${docketUrl}" target="_blank" class="docket-link-btn" onclick="event.stopPropagation();">
                        View Comments on Regulations.gov →
                    </a>
                </div>
            </div>
        `;
    }

    // If we have a direct comment URL (e.g., Federal Register page)
    if (item.commentUrl) {
        const isPendingPublication = item.rulemakingStages?.commentPeriod?.status === 'pending-publication';
        const commentStatus = rulemakingStatus.isOpenForComment
            ? '<span class="comment-status open">Currently accepting comments</span>'
            : isPendingPublication
                ? '<span class="comment-status pending">Awaiting Federal Register publication \u2014 comment period opens upon publication</span>'
                : rulemakingStatus.commentsCloseDate
                    ? '<span class="comment-status closed">Comment period closed</span>'
                    : '';

        // Check if there are submitted comments to display
        const submittedCommentsHtml = item.submittedComments && item.submittedComments.length > 0
            ? renderSubmittedComments(item.submittedComments, item.commentsPageUrl)
            : '';

        // If we have a comments page URL (like FDIC.gov), don't show the Federal Register link
        // since comments can be accessed/submitted via the agency page
        const federalRegisterLink = item.commentsPageUrl ? '' : `
            <div class="docket-link-section">
                <p>Comments can be submitted via the Federal Register</p>
                ${commentStatus}
                <a href="${item.commentUrl}" target="_blank" class="docket-link-btn" onclick="event.stopPropagation();">
                    Submit Comment via Federal Register →
                </a>
            </div>
        `;

        return `
            <div class="public-comments-section">
                <h3>💬 Public Comments</h3>
                ${commentStatus && item.commentsPageUrl ? `<div class="comment-status-standalone">${commentStatus}</div>` : ''}
                ${federalRegisterLink}
                ${submittedCommentsHtml}
            </div>
        `;
    }

    // If the rulemaking has been noticed, search regulations.gov
    if (rulemakingStatus.isNoticed) {
        const searchUrl = `https://www.regulations.gov/search?filter=genius%20act%20stablecoin`;
        return `
            <div class="public-comments-section">
                <h3>💬 Public Comments</h3>
                <p class="no-commenters">No linked docket ID yet. Comments may be available on Regulations.gov.</p>
                <a href="${searchUrl}" target="_blank" class="docket-link-btn" onclick="event.stopPropagation();">
                    Search Regulations.gov →
                </a>
            </div>
        `;
    }

    // Not yet noticed - no comments possible yet
    return `
        <div class="public-comments-section">
            <h3>💬 Public Comments</h3>
            <p class="no-commenters">This rulemaking has not yet been noticed in the Federal Register. Public comment period will open after publication.</p>
        </div>
    `;
}

// Render Paradigm commentary based on policy positions
function renderParadigmCommentary(item) {
    // Check if getParadigmPosition is available (from paradigm-policy.js)
    if (typeof getParadigmPosition === 'undefined') {
        return `
            <div class="paradigm-commentary">
                <h4>
                    <span class="paradigm-icon">P</span>
                    Paradigm Commentary
                </h4>
                <div class="commentary-content">
                    <p class="commentary-placeholder">Loading policy positions...</p>
                </div>
            </div>
        `;
    }

    const position = getParadigmPosition(item);

    // Build recommendation indicator if this is a priority rulemaking
    let recommendationHtml = '';
    if (item.paradigmPriority && item.paradigmRecommendation) {
        const recConfig = {
            'participate': {
                label: 'Participate Directly',
                description: 'Paradigm should submit comments directly to the agency',
                icon: '✍️',
                className: 'participate'
            },
            'monitor': {
                label: 'Monitor via Trade Association',
                description: 'Track through industry groups rather than commenting directly',
                icon: '👀',
                className: 'monitor'
            },
            'dont-care': {
                label: 'Low Priority',
                description: 'No significant impact expected; no action needed',
                icon: '—',
                className: 'dont-care'
            }
        };
        const config = recConfig[item.paradigmRecommendation] || recConfig['dont-care'];
        recommendationHtml = `
            <div class="paradigm-recommendation ${config.className}">
                <div class="recommendation-header">
                    <span class="recommendation-icon">${config.icon}</span>
                    <span class="recommendation-label">${config.label}</span>
                </div>
                <p class="recommendation-description">${config.description}</p>
            </div>
        `;
    }

    // Build key points HTML if available
    const keyPointsHtml = position.keyPoints && position.keyPoints.length > 0 ?
        `<ul class="policy-key-points">
            ${position.keyPoints.map(point => `<li>${point}</li>`).join('')}
        </ul>` : '';

    // Build blog posts HTML with links
    const blogPostsHtml = position.blogPosts && position.blogPosts.length > 0 ?
        `<div class="policy-blog-posts">
            <span class="blog-posts-label">Related Reading:</span>
            <ul class="blog-posts-list">
                ${position.blogPosts.slice(0, 3).map(post =>
                    `<li><a href="${post.url}" target="_blank" onclick="event.stopPropagation();">${post.title}</a></li>`
                ).join('')}
            </ul>
        </div>` : '';

    // Build topics tags
    const topicsHtml = position.topics && position.topics.length > 0 ?
        `<div class="policy-topics">
            ${position.topics.map(topic => `<span class="topic-tag">${formatTopicName(topic)}</span>`).join('')}
        </div>` : '';

    return `
        <div class="paradigm-commentary">
            <h4>
                <img src="paradigm_logo_k_on-white_rgb.png" alt="Paradigm" class="paradigm-icon-img">
                Paradigm Policy Position
            </h4>
            ${recommendationHtml}
            <div class="commentary-content">
                <p>${position.commentary}</p>
                ${keyPointsHtml}
                ${topicsHtml}
                <div class="attitude-indicator ${position.attitude}">
                    Paradigm Position: ${position.attitude.charAt(0).toUpperCase() + position.attitude.slice(1)}
                </div>
                ${blogPostsHtml}
            </div>
        </div>
    `;
}

// Format topic names for display
function formatTopicName(topic) {
    const topicNames = {
        'amlCompliance': 'AML/BSA',
        'reserveRequirements': 'Reserves & Capital',
        'stablecoinFramework': 'Regulatory Framework',
        'interoperability': 'Interoperability',
        'foreignIssuers': 'Foreign Issuers',
        'bankIssuance': 'Bank Issuance',
        'governmentEthics': 'Government Ethics',
        'safetyAndSoundness': 'Safety & Soundness',
        'stablecoinsAndBanking': 'Stablecoins & Banking',
        'geniusImplementation': 'GENIUS Implementation'
    };
    return topicNames[topic] || topic;
}

// Calculate progress for individual rulemaking based on time elapsed
function calculateProgress(deadlineDate) {
    const deadline = new Date(deadlineDate);
    const totalDays = (deadline - ENACTMENT_DATE) / (1000 * 60 * 60 * 24);
    const elapsedDays = (CURRENT_DATE - ENACTMENT_DATE) / (1000 * 60 * 60 * 24);
    const progress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
    return Math.round(progress);
}

// Determine status of a rulemaking
function getStatus(deadlineDate) {
    const deadline = new Date(deadlineDate);
    const progress = calculateProgress(deadlineDate);

    if (CURRENT_DATE > deadline) {
        return 'overdue';
    } else if (progress > 50) {
        return 'in-progress';
    } else {
        return 'not-started';
    }
}

// Calculate overall implementation progress
function calculateOverallProgress() {
    const totalDays = (IMPLEMENTATION_DATE - ENACTMENT_DATE) / (1000 * 60 * 60 * 24);
    const elapsedDays = (CURRENT_DATE - ENACTMENT_DATE) / (1000 * 60 * 60 * 24);
    return Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
}

// Update the overall progress section
function updateOverallProgress() {
    // Calculate rulemaking progress stats for pipeline view
    let openCommentCount = 0;  // Currently open for comment (subset of proposed)
    let proposedCount = 0;     // All NPRMs issued (includes open for comment)
    let finalRuleCount = 0;    // Final rules published

    rulemakingsData.forEach(item => {
        const status = getRulemakingStatus(item);

        if (status.isTrulyNoticed) {
            if (status.documentStage === 'final') {
                finalRuleCount++;
            } else {
                // NPRM issued - count as proposed
                proposedCount++;
                // Also track if currently open for comment
                if (status.isOpenForComment) {
                    openCommentCount++;
                }
            }
        }
    });

    const totalRulemakings = rulemakingsData.length;

    // Update rulemaking progress bar
    const rulemakingProgressBar = document.getElementById('rulemakingProgressBar');
    const rulemakingProgressText = document.getElementById('rulemakingProgressText');

    setTimeout(() => {
        if (rulemakingProgressBar) {
            rulemakingProgressBar.style.width = rulemakingProgress + '%';
        }
        if (rulemakingProgressText) {
            rulemakingProgressText.textContent = `${trulyProgressedCount} / ${totalRulemakings}`;
        }
    }, 100);

    // Update stage progress bars
    const proposedBar = document.getElementById('proposedBar');
    const finalBar = document.getElementById('finalBar');
    const proposedFraction = document.getElementById('proposedFraction');
    const finalFraction = document.getElementById('finalFraction');
    const openCommentNote = document.getElementById('openCommentNote');

    setTimeout(() => {
        if (proposedBar) proposedBar.style.width = (proposedCount / totalRulemakings * 100) + '%';
        if (finalBar) finalBar.style.width = (finalRuleCount / totalRulemakings * 100) + '%';
    }, 150);

    if (proposedFraction) proposedFraction.textContent = `${proposedCount}/${totalRulemakings}`;
    if (finalFraction) finalFraction.textContent = `${finalRuleCount}/${totalRulemakings}`;

    // Show open comment count as big number
    const openCommentNumber = document.getElementById('openCommentNumber');
    if (openCommentNumber) {
        openCommentNumber.textContent = openCommentCount;
    }

    // Timeline progress
    const overallProgress = calculateOverallProgress();
    const progressBar = document.getElementById('overallProgressBar');
    const progressText = document.getElementById('overallProgressText');

    const daysElapsed = Math.floor((CURRENT_DATE - ENACTMENT_DATE) / (1000 * 60 * 60 * 24));
    const daysToMainDeadline = Math.floor((MAIN_DEADLINE - CURRENT_DATE) / (1000 * 60 * 60 * 24));

    setTimeout(() => {
        if (progressBar) {
            progressBar.style.width = overallProgress + '%';
        }
        if (progressText) {
            progressText.textContent = Math.round(overallProgress) + '%';
        }
    }, 100);

    const daysElapsedEl = document.getElementById('daysElapsed');
    const daysToMainDeadlineEl = document.getElementById('daysToMainDeadline');

    if (daysElapsedEl) daysElapsedEl.textContent = daysElapsed;
    if (daysToMainDeadlineEl) daysToMainDeadlineEl.textContent = daysToMainDeadline > 0 ? daysToMainDeadline : 0;
}

// Initialize the application
function init() {
    populateAgencyFilter();
    updateStats();
    updateOverallProgress();
    renderRulemakings();
    attachEventListeners();
}

// Agency category mappings
const AGENCY_CATEGORIES = {
    // Single agencies
    'Treasury': ['Secretary of the Treasury'],
    'Federal Reserve': ['Board of Governors of the Federal Reserve System'],
    'OCC': ['Comptroller of the Currency', 'Comptroller'],
    'FDIC': ['Federal Deposit Insurance Corporation (FDIC)', 'Federal Deposit Insurance Corporation'],
    'NCUA': ['National Credit Union Administration (NCUA)', 'National Credit Union Administration'],
    'FinCEN': ['Financial Crimes Enforcement Network (FinCEN)', 'Financial Crimes Enforcement Network'],
    'Stablecoin Certification Review Committee': ['Stablecoin Certification Review Committee']
};

const JOINT_AGENCY_CATEGORIES = {
    'Primary Federal Regulators': [
        'OCC, Federal Reserve, FDIC, NCUA',
        'OCC, Federal Reserve, FDIC, NCUA (+ State regulators for State qualified issuers)',
        'OCC, Federal Reserve, FDIC, NCUA (in consultation with NIST)',
        'OCC, Federal Reserve, FDIC, NCUA (+ State regulators may issue)'
    ],
    'Multi-Agency (Treasury + Regulators)': [
        'Each primary Federal payment stablecoin regulator, Secretary of the Treasury, and each State payment stablecoin regulator'
    ],
    'Coordinated Rulemakings': [
        'Comptroller of the Currency (in coordination with other relevant regulators)',
        'Board of Governors of the Federal Reserve System (in consultation with other primary Federal payment stablecoin regulators)'
    ]
};

// Get the category for an agency
function getAgencyCategory(agencyName) {
    // Check single agencies
    for (const [category, aliases] of Object.entries(AGENCY_CATEGORIES)) {
        if (aliases.some(alias => agencyName.includes(alias) || alias.includes(agencyName))) {
            return { type: 'single', category };
        }
    }

    // Check joint agencies
    for (const [category, agencies] of Object.entries(JOINT_AGENCY_CATEGORIES)) {
        if (agencies.includes(agencyName)) {
            return { type: 'joint', category };
        }
    }

    // Default - check for specific keywords
    if (agencyName.includes('Treasury')) return { type: 'single', category: 'Treasury' };
    if (agencyName.includes('Federal Reserve') || agencyName.includes('Board')) return { type: 'single', category: 'Federal Reserve' };
    if (agencyName.includes('Comptroller')) return { type: 'single', category: 'OCC' };
    if (agencyName.includes('FDIC') || agencyName.includes('Federal Deposit Insurance')) return { type: 'single', category: 'FDIC' };
    if (agencyName.includes('NCUA') || agencyName.includes('National Credit Union')) return { type: 'single', category: 'NCUA' };
    if (agencyName.includes('FinCEN') || agencyName.includes('Financial Crimes')) return { type: 'single', category: 'FinCEN' };

    return { type: 'other', category: 'Other' };
}

// Populate agency filter dropdown with categories
function populateAgencyFilter() {
    const select = document.getElementById('agencyFilter');

    // Create single agency optgroup
    const singleGroup = document.createElement('optgroup');
    singleGroup.label = 'Single Agency';

    // Add single agencies that have rulemakings
    const singleAgenciesUsed = new Set();
    rulemakingsData.forEach(r => {
        const cat = getAgencyCategory(r.agency);
        if (cat.type === 'single') {
            singleAgenciesUsed.add(cat.category);
        }
    });

    ['Treasury', 'Federal Reserve', 'OCC', 'FDIC', 'NCUA', 'FinCEN', 'Stablecoin Certification Review Committee'].forEach(agency => {
        if (singleAgenciesUsed.has(agency)) {
            const option = document.createElement('option');
            option.value = `single:${agency}`;
            option.textContent = agency;
            singleGroup.appendChild(option);
        }
    });

    if (singleGroup.children.length > 0) {
        select.appendChild(singleGroup);
    }

    // Create joint agency optgroup
    const jointGroup = document.createElement('optgroup');
    jointGroup.label = 'Joint Agency';

    // Add joint agency categories that have rulemakings
    const jointCategoriesUsed = new Set();
    rulemakingsData.forEach(r => {
        const cat = getAgencyCategory(r.agency);
        if (cat.type === 'joint') {
            jointCategoriesUsed.add(cat.category);
        }
    });

    Object.keys(JOINT_AGENCY_CATEGORIES).forEach(category => {
        if (jointCategoriesUsed.has(category)) {
            const option = document.createElement('option');
            option.value = `joint:${category}`;
            option.textContent = category;
            jointGroup.appendChild(option);
        }
    });

    if (jointGroup.children.length > 0) {
        select.appendChild(jointGroup);
    }
}

// Update statistics display
function updateStats() {
    document.getElementById('totalRulemakings').textContent = rulemakingsData.length;

    // Count unique agency categories
    const uniqueCategories = new Set();
    rulemakingsData.forEach(r => {
        const cat = getAgencyCategory(r.agency);
        uniqueCategories.add(cat.category);
    });
    document.getElementById('totalAgencies').textContent = uniqueCategories.size;
    document.getElementById('showing').textContent = filteredData.length;
}

// Get a short display name for an agency
function getAgencyDisplayName(agencyName) {
    const cat = getAgencyCategory(agencyName);

    if (cat.type === 'single') {
        return cat.category;
    } else if (cat.type === 'joint') {
        return cat.category;
    }

    // Fallback - truncate long names
    if (agencyName.length > 40) {
        return agencyName.substring(0, 40) + '...';
    }
    return agencyName;
}

// Filter and sort rulemakings
function filterAndSort() {
    const agencyFilter = document.getElementById('agencyFilter').value;
    const publicationFilter = document.getElementById('publicationFilter').value;
    const rulemakingTypeFilter = document.getElementById('rulemakingTypeFilter').value;
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const sortBy = document.getElementById('sortBy').value;

    // Sync quick filter button states
    const openCommentBtn = document.getElementById('openCommentBtn');
    const preRulemakingBtn = document.getElementById('preRulemakingBtn');
    const notNoticedBtn = document.getElementById('notNoticedBtn');
    if (openCommentBtn) {
        openCommentBtn.classList.toggle('active', publicationFilter === 'open-comment');
    }
    if (preRulemakingBtn) {
        preRulemakingBtn.classList.toggle('active', publicationFilter === 'anprm');
    }
    if (notNoticedBtn) {
        notNoticedBtn.classList.toggle('active', publicationFilter === 'not-noticed');
    }

    // Filter
    filteredData = rulemakingsData.filter(item => {
        // Agency filter with category support
        let matchesAgency = true;
        if (agencyFilter) {
            const itemCategory = getAgencyCategory(item.agency);
            if (agencyFilter.startsWith('single:')) {
                const filterCategory = agencyFilter.replace('single:', '');
                matchesAgency = itemCategory.type === 'single' && itemCategory.category === filterCategory;
            } else if (agencyFilter.startsWith('joint:')) {
                const filterCategory = agencyFilter.replace('joint:', '');
                matchesAgency = itemCategory.type === 'joint' && itemCategory.category === filterCategory;
            } else {
                // Legacy direct agency match
                matchesAgency = item.agency === agencyFilter;
            }
        }

        const matchesSearch = !searchTerm ||
            item.requirement.toLowerCase().includes(searchTerm) ||
            item.section.toLowerCase().includes(searchTerm) ||
            item.notes.toLowerCase().includes(searchTerm);

        // Publication status filter
        let matchesPublication = true;
        if (publicationFilter) {
            const rulemakingStatus = getRulemakingStatus(item);
            switch (publicationFilter) {
                case 'not-noticed':
                    matchesPublication = !rulemakingStatus.isNoticed;
                    break;
                case 'anprm':
                    // Check both fetched data AND local rulemakingStages
                    const hasAnprm = item.rulemakingStages?.anprm?.status === 'published' || item.rulemakingStages?.anprm?.status === 'closed';
                    matchesPublication = rulemakingStatus.documentStage === 'anprm' || hasAnprm;
                    break;
                case 'open-comment':
                    // Proposed Rule — Open for Comment: NPRM published AND comment period still open
                    const hasOpenCommentPeriod = item.rulemakingStages?.commentPeriod?.status === 'open';
                    const hasOpenDeadline = item.commentDeadline && new Date(item.commentDeadline) > CURRENT_DATE;
                    matchesPublication = rulemakingStatus.isOpenForComment || hasOpenCommentPeriod || hasOpenDeadline;
                    break;
                case 'nprm':
                    // Proposed Rule — Comments Closed: NPRM published but comment period has ended
                    const hasNprm = item.rulemakingStages?.nprm?.status === 'published';
                    const isNprmStage = rulemakingStatus.documentStage === 'nprm' || hasNprm;
                    const commentsStillOpen = rulemakingStatus.isOpenForComment ||
                        item.rulemakingStages?.commentPeriod?.status === 'open' ||
                        (item.commentDeadline && new Date(item.commentDeadline) > CURRENT_DATE);
                    matchesPublication = isNprmStage && !commentsStillOpen;
                    break;
                case 'final':
                    // Check both fetched data AND local rulemakingStages
                    const hasFinal = item.rulemakingStages?.finalRule?.status === 'published';
                    matchesPublication = rulemakingStatus.documentStage === 'final' || hasFinal;
                    break;
            }
        }

        // Priority filter
        const matchesPriority = !priorityFilterActive || item.paradigmPriority;

        // Rulemaking type filter (required vs discretionary)
        let matchesRulemakingType = true;
        if (rulemakingTypeFilter) {
            matchesRulemakingType = item.rulemakingType === rulemakingTypeFilter;
        }

        return matchesAgency && matchesSearch && matchesPublication && matchesPriority && matchesRulemakingType;
    });

    // Sort
    filteredData.sort((a, b) => {
        if (sortBy === 'section') {
            return a.section.localeCompare(b.section, undefined, { numeric: true });
        } else if (sortBy === 'agency') {
            return a.agency.localeCompare(b.agency);
        } else if (sortBy === 'deadline') {
            return new Date(a.deadlineDate) - new Date(b.deadlineDate);
        } else if (sortBy === 'comment-deadline') {
            // Sort by comment deadline (soonest first), items without deadline go to end
            const aDeadline = a.commentDeadline || a.rulemakingStages?.commentPeriod?.endDate;
            const bDeadline = b.commentDeadline || b.rulemakingStages?.commentPeriod?.endDate;
            if (!aDeadline && !bDeadline) return 0;
            if (!aDeadline) return 1;
            if (!bDeadline) return -1;
            return new Date(aDeadline) - new Date(bDeadline);
        }
        return 0;
    });

    updateStats();
    renderRulemakings();
}

// Toggle card expansion
function toggleCard(cardId) {
    const card = document.getElementById(cardId);
    card.classList.toggle('expanded');
}

// Render rulemaking cards
function renderRulemakings() {
    const container = document.getElementById('rulemakingsContainer');

    if (filteredData.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No rulemakings found</h3>
                <p>Try adjusting your filters or search term</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredData.map((item, index) => {
        const progress = calculateProgress(item.deadlineDate);
        const status = getStatus(item.deadlineDate);
        const cardId = `card-${index}`;
        const rulemakingStatus = getRulemakingStatus(item);

        const statusLabels = {
            'not-started': 'Not Started',
            'in-progress': 'In Progress',
            'overdue': 'Past Deadline'
        };

        // Build the Federal Register status badges
        let frStatusBadges = '';
        if (rulemakingStatus.isNoticed) {
            let typeLabel, badgeClass;
            switch (rulemakingStatus.documentStage) {
                case 'anprm':
                    typeLabel = 'Advance Notice of Proposed Rulemaking';
                    badgeClass = 'anprm';
                    break;
                case 'nprm':
                    typeLabel = 'Notice of Proposed Rulemaking';
                    badgeClass = 'nprm';
                    break;
                case 'final':
                    typeLabel = 'Final Rule Published';
                    badgeClass = 'final';
                    break;
                case 'notice':
                    typeLabel = 'Notice Published';
                    badgeClass = 'notice';
                    break;
                default:
                    typeLabel = 'Published';
                    badgeClass = 'noticed';
            }
            frStatusBadges += `<a href="${rulemakingStatus.documentUrl}" target="_blank" class="fr-status-badge ${badgeClass}" onclick="event.stopPropagation();">${typeLabel} ${formatDate(rulemakingStatus.publicationDate)}</a>`;

            // Check for extended comment deadline from data
            if (item.commentDeadline) {
                const commentDeadlineDate = new Date(item.commentDeadline);
                const isStillOpen = commentDeadlineDate > CURRENT_DATE;
                if (isStillOpen) {
                    if (item.commentDeadlineExtended) {
                        frStatusBadges += `<span class="fr-status-badge extended-deadline">⏰ Extended Deadline: ${formatDate(item.commentDeadline)}</span>`;
                    } else {
                        frStatusBadges += `<span class="fr-status-badge open-comment">Open for Comment until ${formatDate(item.commentDeadline)}</span>`;
                    }
                } else {
                    frStatusBadges += `<span class="fr-status-badge closed-comment">Comments Closed ${formatDate(item.commentDeadline)}</span>`;
                }
            } else if (rulemakingStatus.isOpenForComment) {
                frStatusBadges += `<span class="fr-status-badge open-comment">Open for Comment until ${formatDate(rulemakingStatus.commentsCloseDate)}</span>`;
            } else if (rulemakingStatus.commentsCloseDate) {
                frStatusBadges += `<span class="fr-status-badge closed-comment">Comments Closed ${formatDate(rulemakingStatus.commentsCloseDate)}</span>`;
            }
        } else {
            frStatusBadges = `<span class="fr-status-badge not-noticed">Not Yet Noticed</span>`;
        }

        const agencyDisplayName = getAgencyDisplayName(item.agency);
        const agencyCategory = getAgencyCategory(item.agency);
        const isJointAgency = agencyCategory.type === 'joint';

        // Show full agency detail for joint agencies
        const agencyDetail = isJointAgency ? `<div class="agency-detail">${item.agency}</div>` : '';

        // Priority badge for rulemakings Paradigm should comment on
        const priorityBadge = item.paradigmPriority
            ? `<span class="priority-badge" title="${item.priorityReason || 'Priority for Paradigm comment'}">⭐ Priority</span>`
            : '';

        // Required vs Discretionary badge
        const rulemakingTypeBadge = item.rulemakingType === 'discretionary'
            ? `<span class="rulemaking-type-badge discretionary" title="Agency may choose to issue this rulemaking">Discretionary</span>`
            : `<span class="rulemaking-type-badge required" title="Statute requires this rulemaking">Required</span>`;

        return `
        <div class="rulemaking-card${item.paradigmPriority ? ' priority-card' : ''}" id="${cardId}" onclick="toggleCard('${cardId}')">
            <div class="expand-indicator">▼</div>
            <div class="card-header">
                <span class="section-badge">Section ${item.section}</span>
                <span class="agency-badge${isJointAgency ? ' joint' : ''}">${agencyDisplayName}</span>
                ${rulemakingTypeBadge}
                ${priorityBadge}
            </div>
            ${agencyDetail}
            <div class="requirement">${item.requirement}</div>
            <div class="timeline-info">
                <div class="timeline-item">
                    <div class="timeline-label">Rulemaking Deadline</div>
                    <div class="timeline-value">${item.deadline}</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-label">Implementation Timeline</div>
                    <div class="timeline-value">${item.implementation}</div>
                </div>
            </div>
            ${item.notes ? `<div class="notes"><strong>Notes:</strong> ${item.notes}</div>` : ''}

            <div class="expanded-content">
                ${renderRulemakingStages(item)}

                ${renderCommentSection(item)}

                ${renderParadigmCommentary(item)}
            </div>
        </div>
    `}).join('');
}

// Attach event listeners
function attachEventListeners() {
    document.getElementById('agencyFilter').addEventListener('change', filterAndSort);
    document.getElementById('publicationFilter').addEventListener('change', filterAndSort);
    document.getElementById('rulemakingTypeFilter').addEventListener('change', filterAndSort);
    document.getElementById('sortBy').addEventListener('change', filterAndSort);
    document.getElementById('searchBox').addEventListener('input', filterAndSort);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
