// Paradigm Policy Positions
// Compiled from public comment letters, policy anchors, and published writings
// Sources: policy.paradigm.xyz, paradigm.xyz/writing, SEC/Treasury comment letters

// Blog Post References
const PARADIGM_BLOG_POSTS = {
    safetyAndSoundness: {
        title: "Paradigm Files Comment with Banking Regulations on Safety and Soundness Standards",
        date: "2026-01-08",
        url: "https://www.paradigm.xyz/2026/01/paradigm-files-comment-with-banking-regulations-on-safety-and-soundness-standards",
        author: "Justin Slaughter"
    },
    dataBanishesFear: {
        title: "Data Banishes Fear",
        date: "2025-12-17",
        url: "https://www.paradigm.xyz/2025/12/data-banishes-fear",
        author: "Justin Slaughter"
    },
    treasuryGenius: {
        title: "Treasury: When Implementing GENIUS, Follow Congress's Direction",
        date: "2025-11-05",
        url: "https://www.paradigm.xyz/2025/11/treasury-when-implementing-genius-follow-congresss-direction",
        author: "Justin Slaughter, Alex Grieve, Katie Biber"
    },
    amlInnovation: {
        title: "Paradigm joins DEF and SPI in comment to Treasury on how innovative crypto practices can prevent and combat illicit finance",
        date: "2025-10-20",
        url: "https://www.paradigm.xyz/2025/10/paradigm-joins-def-and-spi-in-comment-to-treasury",
        author: "Justin Slaughter"
    },
    bridgingTheGap: {
        title: "Bridging the Gap: How Crypto Expands Financial Access for America's Underbanked",
        date: "2025-11-17",
        url: "https://www.paradigm.xyz/2025/11/bridging-the-gap",
        author: "Justin Slaughter, Veronica Irwin"
    },
    congressPassedGenius: {
        title: "Congress Passed GENIUS. Market Structure Is Next. But Skipping Crypto Tax Would Be a Mistake.",
        date: "2025-10-02",
        url: "https://www.paradigm.xyz/2025/10/congress-passed-genius",
        author: "Alex Grieve, Alison Mangiero"
    },
    ninthCircuitAmicus: {
        title: "Paradigm Files Ninth Circuit Amicus Brief to Oppose State Encroachment on Federal Regulation",
        date: "2026-01-16",
        url: "https://www.paradigm.xyz/2026/01/paradigm-files-ninth-circuit-amicus-brief-to-oppose-state-encroachment-on-federal-regulation",
        author: "Katie Biber, Justin Slaughter"
    }
};

const PARADIGM_POLICY_POSITIONS = {
    // Core Policy Anchors (February 2025)
    // Source: https://www.paradigm.xyz/2025/02/paradigm-policy-anchors
    coreAnchors: {
        innovationProtection: "To avoid stifling future innovation, we should always ask how a given policy will impact crypto beyond its advertised or intended target and avoid policies that are prematurely specific.",
        technologyNeutrality: "Regulation should focus on prosecuting illegal activities and mitigating systemic risk, not restricting general purpose technology. Actors responsible for fraud, scams, and other illegal activities should be punished following due process of law.",
        developerProtection: "Developing neutral technology should not be a crime, even if neutral technology is later used for illicit purposes. Developers of general-purpose technology should not be liable for specific illegal uses.",
        ecosystemEquality: "Policy should not disadvantage any crypto ecosystem relative to others. Whether Bitcoin, Ethereum, or Solana, crypto innovation is not limited to any one ecosystem."
    },

    // AML/BSA & Illicit Finance
    // Source: Joint comment with DEF and SPI to Treasury (October 2025)
    // https://www.defieducationfund.org/wp-content/uploads/2025/10/10.17.25-Treasury-RFC-Response-on-Digital-Assets-DEF-Paradigm-SPI.pdf
    amlCompliance: {
        position: "supportive",
        summary: "The best way to fight illicit finance in crypto is with crypto itself. Illicit transactions account for only 0.014-0.4% of overall crypto volume, far below the 2-5% of global GDP that money laundering in traditional finance accounts for.",
        keyPoints: [
            "Support 'defense in depth' approach using multiple, redundant compliance tools",
            "Encourage innovative risk assessment and defensive blocking tools",
            "Promote threat information coordination and real-time intelligence sharing",
            "Leverage blockchain transparency for enhanced compliance capabilities"
        ],
        recommendation: "Treasury and regulators should encourage the use of innovative crypto-native tools and analytical capabilities to combat illicit finance, rather than imposing traditional banking compliance frameworks that may not fit the technology."
    },

    // Reserve Requirements & Capital Standards
    // Source: Stablecoin Interchange article (January 2026), policy writings
    reserveRequirements: {
        position: "supportive",
        summary: "Paradigm supports robust reserve requirements that ensure 1:1 backing while allowing issuers flexibility in reserve composition consistent with safety and soundness.",
        keyPoints: [
            "1:1 reserve backing with high-quality liquid assets is appropriate",
            "Reserve requirements should be tailored to issuer business models",
            "Excessive capital requirements beyond what's needed for safety could stifle innovation",
            "Stablecoin reserves (primarily Treasuries) generate yield that funds operations"
        ],
        recommendation: "Regulators should set reserve and capital standards that ensure consumer protection without imposing requirements that exceed what is necessary for ongoing operations."
    },

    // Stablecoin Regulatory Framework
    // Source: Multiple writings on GENIUS Act
    stablecoinFramework: {
        position: "supportive",
        summary: "Paradigm views the GENIUS Act as a 'big win for U.S. competitiveness' that provides much-needed regulatory clarity for stablecoin issuers.",
        keyPoints: [
            "Clear federal framework enables mainstream adoption while preserving innovation",
            "Dual pathway (federal and state) appropriately balances oversight options",
            "Stablecoins should be treated as cash equivalents for tax purposes",
            "Regulatory clarity attracts institutional participation and investment"
        ],
        recommendation: "Implementation rules should balance regulatory clarity with flexibility, enabling mainstream adoption while leaving room for experimentation and long-term innovation."
    },

    // Interoperability & Technical Standards
    // Source: Policy anchors, SEC discussions
    interoperability: {
        position: "supportive",
        summary: "Paradigm supports standards that promote compatibility without mandating specific technical implementations.",
        keyPoints: [
            "Standards should be technology-neutral and not favor specific blockchains",
            "Interoperability enhances user choice and market competition",
            "Avoid prematurely specific technical requirements that could become outdated"
        ],
        recommendation: "Regulators should consult with NIST and industry stakeholders to develop flexible, principles-based standards rather than prescriptive technical mandates."
    },

    // Foreign Issuer Requirements
    // Source: Policy writings on international competitiveness
    foreignIssuers: {
        position: "cautious",
        summary: "Paradigm emphasizes the importance of U.S. competitiveness while supporting appropriate oversight of foreign stablecoin issuers.",
        keyPoints: [
            "U.S. regulatory framework should maintain global competitiveness",
            "Reciprocity provisions should encourage international regulatory coordination",
            "Overly restrictive foreign issuer rules could fragment global markets"
        ],
        recommendation: "Foreign issuer requirements should be calibrated to actual risks while avoiding protectionist measures that could harm U.S. users and competitiveness."
    },

    // Bank Subsidiary Issuance
    // Source: Commentary on FDIC rule, policy writings
    bankIssuance: {
        position: "supportive",
        summary: "Paradigm supports enabling banks to issue stablecoins through subsidiaries while ensuring appropriate risk management.",
        keyPoints: [
            "Bank participation enhances trust and brings institutional expertise",
            "Subsidiary structure appropriately separates stablecoin risks",
            "Approval processes should be efficient (30-day completeness, 120-day decision)",
            "Capital requirements should not exceed what subsidiaries maintain"
        ],
        recommendation: "Regulators should establish clear, efficient approval processes that enable bank participation while maintaining appropriate safety and soundness standards.",
        blogPost: "safetyAndSoundness"
    },

    // Safety and Soundness Standards
    // Source: Comment letter to OCC/FDIC (January 2026)
    // https://www.paradigm.xyz/2026/01/paradigm-files-comment-with-banking-regulations-on-safety-and-soundness-standards
    safetyAndSoundness: {
        position: "supportive",
        summary: "Banking regulators must uphold their mission of maintaining a safe and sound financial system while avoiding a retreat into outdated practices simply because they feel familiar.",
        keyPoints: [
            "The concept of 'generally accepted standards of prudent operations' is not grounded in statute",
            "Regulators should consider novel approaches on the merits, not reject innovation reflexively",
            "A safe and sound banking system means neither abandoning all past practices nor refusing to change",
            "Only by having the ability to constantly innovate can we ensure our banking system remains safe, sound, dynamic, and growing"
        ],
        recommendation: "The OCC and FDIC should restore the original vision of safety and soundness as established in statutory text, where regulators consider novel approaches on the merits.",
        blogPost: "safetyAndSoundness"
    },

    // Stablecoins and Banking System
    // Source: Data Banishes Fear (December 2025)
    stablecoinsAndBanking: {
        position: "supportive",
        summary: "Research shows stablecoins interact positively with the banking system. Stablecoins will be positive for the banking system and credit provision on net.",
        keyPoints: [
            "Stablecoins are not a threat to traditional banking deposits",
            "Stablecoin reserves (primarily Treasuries) support monetary transmission",
            "Bank-issued stablecoins create new revenue opportunities",
            "Data-driven analysis dispels fears about stablecoin impacts"
        ],
        recommendation: "Regulators should embrace stablecoins as a complement to, not a replacement for, traditional banking services.",
        blogPost: "dataBanishesFear"
    },

    // GENIUS Act Implementation - Affiliates/Yield
    // Source: Treasury: When Implementing GENIUS, Follow Congress's Direction (November 2025)
    geniusImplementation: {
        position: "supportive",
        summary: "Congress has already spoken on allowing affiliates to issue yield; regulatory agencies cannot alter that decision. Agencies should follow the statutory text, not second-guess Congressional intent.",
        keyPoints: [
            "GENIUS Act explicitly permits affiliate yield arrangements",
            "Regulatory agencies must follow Congressional direction, not rewrite it",
            "Treasury should issue rules consistent with statutory text",
            "Innovation in stablecoin products should be permitted within the framework Congress established"
        ],
        recommendation: "Treasury and other agencies should implement GENIUS Act provisions as written, without adding restrictions Congress did not authorize.",
        blogPost: "treasuryGenius"
    },

    // Government Ethics & Stablecoins
    // Source: Policy recommendations
    governmentEthics: {
        position: "supportive",
        summary: "Ownership of stablecoins should be carved out entirely from government ethics rules.",
        keyPoints: [
            "Using stablecoins is no different than handling dollars",
            "Ethics restrictions could prevent regulators from understanding the technology",
            "Hands-on experience improves regulatory decision-making"
        ],
        recommendation: "Government ethics rules should exempt stablecoin holdings to ensure regulators can fully understand the technology they oversee."
    }
};

// Map rulemaking topics to relevant policy positions
const RULEMAKING_POLICY_MAP = {
    // AML/BSA related
    "Bank Secrecy Act": ["amlCompliance"],
    "BSA": ["amlCompliance"],
    "illicit": ["amlCompliance"],
    "anti-money laundering": ["amlCompliance"],
    "AML": ["amlCompliance"],
    "sanctions": ["amlCompliance"],
    "FinCEN": ["amlCompliance"],
    "illicit finance": ["amlCompliance"],
    "innovative AML": ["amlCompliance"],

    // Reserve/Capital related
    "capital": ["reserveRequirements", "safetyAndSoundness"],
    "reserve": ["reserveRequirements"],
    "liquidity": ["reserveRequirements"],
    "leverage": ["reserveRequirements"],

    // Safety and Soundness
    "safety and soundness": ["safetyAndSoundness"],
    "prudent": ["safetyAndSoundness"],
    "OCC": ["safetyAndSoundness", "bankIssuance"],
    "Comptroller": ["safetyAndSoundness", "bankIssuance"],

    // Framework/General
    "regulatory framework": ["stablecoinFramework", "geniusImplementation"],
    "implement": ["stablecoinFramework", "geniusImplementation"],
    "general rulemaking": ["stablecoinFramework"],
    "Treasury": ["geniusImplementation", "stablecoinFramework"],
    "Secretary of the Treasury": ["geniusImplementation"],

    // Interoperability
    "interoperability": ["interoperability"],
    "compatibility": ["interoperability"],
    "NIST": ["interoperability"],
    "standards": ["interoperability"],

    // Foreign issuers
    "foreign": ["foreignIssuers"],
    "reciprocity": ["foreignIssuers"],
    "noncompliant": ["foreignIssuers"],

    // Bank issuance
    "subsidiary": ["bankIssuance", "stablecoinsAndBanking"],
    "approval": ["bankIssuance"],
    "depository": ["bankIssuance", "stablecoinsAndBanking"],
    "FDIC": ["bankIssuance", "safetyAndSoundness"],
    "insured": ["bankIssuance"],
    "Federal Reserve": ["stablecoinsAndBanking", "bankIssuance"],
    "banking agencies": ["safetyAndSoundness", "bankIssuance"],

    // Enforcement
    "enforcement": ["stablecoinFramework", "amlCompliance"],
    "unusual and exigent": ["stablecoinFramework"]
};

// Function to get Paradigm's likely position on a rulemaking
function getParadigmPosition(rulemaking) {
    const text = `${rulemaking.requirement} ${rulemaking.notes || ''} ${rulemaking.agency}`.toLowerCase();

    // Find matching policy topics
    const matchedTopics = new Set();
    for (const [keyword, topics] of Object.entries(RULEMAKING_POLICY_MAP)) {
        if (text.includes(keyword.toLowerCase())) {
            topics.forEach(t => matchedTopics.add(t));
        }
    }

    if (matchedTopics.size === 0) {
        // Default to general framework position
        matchedTopics.add('stablecoinFramework');
    }

    // Compile position from matched topics
    const positions = Array.from(matchedTopics).map(topic => PARADIGM_POLICY_POSITIONS[topic]).filter(Boolean);

    // Determine overall attitude (most positions are supportive)
    const attitudes = positions.map(p => p.position);
    const overallAttitude = attitudes.includes('concerned') ? 'cautious' :
                           attitudes.includes('cautious') ? 'cautious' : 'supportive';

    // Compile key points
    const allKeyPoints = positions.flatMap(p => p.keyPoints || []);
    const relevantKeyPoints = allKeyPoints.slice(0, 3); // Limit to 3 most relevant

    // Generate commentary
    let commentary = '';
    if (positions.length === 1) {
        commentary = positions[0].summary;
        if (positions[0].recommendation) {
            commentary += ` ${positions[0].recommendation}`;
        }
    } else {
        // Combine multiple relevant positions
        commentary = positions.map(p => p.summary).join(' ');
    }

    // Collect relevant blog posts
    const blogPosts = [];
    positions.forEach(p => {
        if (p.blogPost && PARADIGM_BLOG_POSTS[p.blogPost]) {
            const post = PARADIGM_BLOG_POSTS[p.blogPost];
            if (!blogPosts.find(bp => bp.url === post.url)) {
                blogPosts.push(post);
            }
        }
    });

    // Build sources list with blog post links
    const sources = blogPosts.length > 0
        ? blogPosts.map(p => p.title)
        : ['Paradigm Policy Anchors (Feb 2025)', 'paradigm.xyz/writing'];

    return {
        attitude: overallAttitude,
        commentary: commentary,
        keyPoints: relevantKeyPoints,
        topics: Array.from(matchedTopics),
        sources: sources,
        blogPosts: blogPosts
    };
}

// Export for use in app.js
if (typeof window !== 'undefined') {
    window.PARADIGM_POLICY_POSITIONS = PARADIGM_POLICY_POSITIONS;
    window.getParadigmPosition = getParadigmPosition;
}
