// GENIUS Act Rulemaking Data
// Enactment date: July 18, 2025
const ENACTMENT_DATE = new Date('2025-07-18');
const MAIN_DEADLINE = new Date('2026-07-18'); // 1 year after enactment
const IMPLEMENTATION_DATE = new Date('2027-01-18'); // 18 months after enactment

const rulemakingsData = [
    {
        "section": "3(d)",
        "requirement": "Regulations to implement payment stablecoin issuance and treatment requirements including term definitions",
        "agency": "Secretary of the Treasury",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "",
        "deadlineDate": "2026-07-18",
        "docketId": "TREAS-DO-2025-0037",
        "rulemakingStages": {
            "anprm": { "status": "closed", "date": "2025-09-03", "commentEndDate": "2025-11-04", "frDocNumber": "2025-19800" },
            "nprm": { "status": "not-started" },
            "commentPeriod": { "status": "not-started" },
            "finalRule": { "status": "not-started" },
            "effective": { "status": "not-started" }
        },
        "rulemakingType": "required",
        "paradigmPriority": true,
        "priorityReason": "Foundational rulemaking that will define key terms and set the tone for the entire regulatory framework",
        "paradigmRecommendation": "participate",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(a)(4)(A)",
        "requirement": "Capital requirements applicable to permitted payment stablecoin issuers",
        "agency": "OCC, Federal Reserve, FDIC, NCUA (+ State regulators for State qualified issuers)",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "Requirements must be tailored to business model and risk profile, cannot exceed requirements sufficient to ensure ongoing operations. OCC addressed in NPRM (Feb 25, 2026) via 12 CFR 3 amendments. FDIC and NCUA have also issued separate NPRMs.",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmPriority": true,
        "priorityReason": "Critical to ensure capital requirements are appropriately tailored and don't stifle innovation",
        "paradigmRecommendation": "participate",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(a)(4)(A)(ii)",
        "requirement": "Liquidity standards for payment stablecoin reserves",
        "agency": "OCC, Federal Reserve, FDIC, NCUA",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is either)",
        "notes": "Must implement the standard under Section 4(a)(1)(A)",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(a)(4)(A)(iii)",
        "requirement": "Reserve asset diversification and interest rate risk management standards",
        "agency": "OCC, Federal Reserve, FDIC, NCUA",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "Must be tailored to business model and risk profile, cannot exceed standards sufficient for ongoing operations",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(a)(4)(A)(iv)",
        "requirement": "Operational compliance and IT risk management requirements including Bank Secrecy Act and sanctions compliance",
        "agency": "OCC, Federal Reserve, FDIC, NCUA",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "Must be tailored to business model and risk profile and consistent with applicable law",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(a)(4)(C)(iv)",
        "requirement": "Modifications to leverage capital and risk-based capital requirements",
        "agency": "OCC, Federal Reserve, FDIC, NCUA",
        "deadline": "Not later than 1 year after enactment OR when regulators issue Section 4 regs (whichever is earlier)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "Must ensure insured depository institutions/holding companies with payment stablecoin issuer subsidiaries are not required to hold excess regulatory capital beyond what the subsidiary must maintain",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(a)(5)(B)",
        "requirement": "Rules for Bank Secrecy Act compliance tailored to size and complexity of issuers",
        "agency": "Secretary of the Treasury",
        "deadline": "No specific deadline stated",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "Rules must be tailored to size and complexity",
        "deadlineDate": "2027-01-18",
        "docketId": "TREAS-DO-2025-0037",
        "rulemakingStages": {
            "anprm": { "status": "closed", "date": "2025-09-03", "commentEndDate": "2025-11-04", "frDocNumber": "2025-19800" },
            "nprm": { "status": "not-started" },
            "commentPeriod": { "status": "not-started" },
            "finalRule": { "status": "not-started" },
            "effective": { "status": "not-started" }
        },
        "rulemakingType": "required",
        "paradigmPriority": true,
        "priorityReason": "Opportunity to advocate for crypto-native AML tools rather than traditional banking compliance frameworks",
        "paradigmRecommendation": "participate",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(a)(8)(B)",
        "requirement": "Regulations to permit exceptions to prohibition on tying",
        "agency": "Board of Governors of the Federal Reserve System (in consultation with other primary Federal payment stablecoin regulators)",
        "deadline": "No specific deadline stated",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "May permit exceptions if Board considers not contrary to purposes of Act",
        "deadlineDate": "2027-01-18",
        "rulemakingType": "discretionary",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(b)(2)",
        "requirement": "Regulations and orders to ensure financial stability and implement Section 4(a)",
        "agency": "Comptroller of the Currency (in coordination with other relevant regulators)",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "Conforming amendment to 12 USC 1(b). OCC issued comprehensive NPRM on Feb 25, 2026 (new 12 CFR 15).",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "commentDeadline": "2026-04-27",
        "commentUrl": "https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-9.html",
        "rulemakingStages": {
        "anprm": {
                "status": "skipped"
        },
        "nprm": {
                "status": "published",
                "date": "2026-02-25",
                "title": "GENIUS Act Regulations: Notice of Proposed Rulemaking"
        },
        "commentPeriod": {
                "status": "open",
                "startDate": "2026-02-25",
                "endDate": "2026-04-27",
                "notes": "60 days from Federal Register publication"
        },
        "finalRule": {
                "status": "not-started"
        },
        "effective": {
                "status": "not-started"
        }
},
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(c)(2)",
        "requirement": "Establish broad-based principles for determining if State regulatory regime is substantially similar to Federal framework",
        "agency": "Secretary of the Treasury",
        "deadline": "Not specified - through notice and comment rulemaking",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "",
        "deadlineDate": "2027-01-18",
        "docketId": "TREAS-DO-2025-0037",
        "rulemakingStages": {
            "anprm": { "status": "closed", "date": "2025-09-03", "commentEndDate": "2025-11-04", "frDocNumber": "2025-19800" },
            "nprm": { "status": "not-started" },
            "commentPeriod": { "status": "not-started" },
            "finalRule": { "status": "not-started" },
            "effective": { "status": "not-started" }
        },
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(c)(4)(D)",
        "requirement": "Interpretive rule clarifying application of non-financial services public companies restrictions",
        "agency": "Stablecoin Certification Review Committee",
        "deadline": "Not later than 1 year after enactment",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "4(h)",
        "requirement": "General rulemaking to establish payment stablecoin regulatory framework",
        "agency": "OCC, Federal Reserve, FDIC, NCUA (+ State regulators may issue)",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "All regs must be issued in coordination by primary Federal regulators if not issued by State regulator",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "5(a)(2)",
        "requirement": "Regulations to implement subsidiary and Federal qualified issuer approval process and framework",
        "agency": "OCC, Federal Reserve, FDIC, NCUA",
        "deadline": "Before the date described in Section 13 (before 1 year after enactment)",
        "implementation": "Must accept/process applications before Section 13 deadline",
        "notes": "Must prioritize safety and soundness. OCC addressed in comprehensive NPRM (Feb 25, 2026) via new 12 CFR 15. FDIC and NCUA have also issued separate NPRMs.",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "5(a)(2)",
        "requirement": "Approval requirements for issuance of payment stablecoins by subsidiaries of FDIC-supervised insured depository institutions",
        "agency": "Federal Deposit Insurance Corporation (FDIC)",
        "deadline": "Before the date described in Section 13 (before 1 year after enactment)",
        "implementation": "Must accept/process applications before Section 13 deadline",
        "notes": "Establishes procedures for FDIC-supervised State nonmember banks and State savings associations seeking to issue payment stablecoins through a subsidiary. RIN 3064-AG20. COMMENT PERIOD EXTENDED: Original deadline Feb 17, 2026 extended to May 18, 2026.",
        "deadlineDate": "2026-07-18",
        "commentUrl": "https://www.federalregister.gov/documents/2025/12/19/2025-23510/approval-requirements-for-issuance-of-payment-stablecoins-by-subsidiaries-of-fdic-supervised-insured#addresses",
        "commentsPageUrl": "https://www.fdic.gov/federal-register-publications/comments-rin-3064-ag20-december-19-2025",
        "commentDeadline": "2026-05-18",
        "commentDeadlineExtended": true,
        "commentDeadlineOriginal": "2026-02-17",
        "rulemakingStages": {
            "anprm": { "status": "skipped" },
            "nprm": {
                "status": "published",
                "date": "2025-12-18",
                "frDocNumber": "2025-23510",
                "title": "Approval Requirements for Issuance of Payment Stablecoins"
            },
            "commentPeriod": {
                "status": "open",
                "extended": true,
                "startDate": "2025-12-19",
                "endDate": "2026-05-18",
                "originalEndDate": "2026-02-17"
            },
            "finalRule": { "status": "not-started" },
            "effective": { "status": "not-started" }
        },
        "rulemakingType": "required",
        "paradigmPriority": true,
        "priorityReason": "Currently open for comment (extended deadline May 18, 2026). Key opportunity to shape bank stablecoin issuance approval process",
        "paradigmRecommendation": "monitor",
        "paradigmCommentary": "",
        "paradigmAttitude": "",
        "submittedComments": [
            {
                "commenter": "Michael Ravnitzky",
                "type": "Individual",
                "date": "2026-01-06",
                "pdfUrl": "https://www.fdic.gov/federal-register-publications/michael-ravnitzky-rin-3064-ag20.pdf",
                "summary": "Recommends enhanced stress testing and liquidity planning requirements, stricter reserve asset standards with supervisory scenarios, and addressing derivatives-driven amplification of redemption risk."
            },
            {
                "commenter": "Michael Ravnitzky",
                "type": "Individual",
                "date": "2026-01-14",
                "pdfUrl": "https://www.fdic.gov/federal-register-publications/michael-ravnitzky-january-12-2026-rin-3064-ag20.pdf",
                "summary": "Raises concerns about rigid timelines and the 'deemed complete' provision, warns that compressed deadlines could lead to inadequate review. Criticizes siloed treatment of stablecoin issuance."
            },
            {
                "commenter": "American Bankers Association (ABA) & 4 Others",
                "type": "Trade Association Coalition",
                "date": "2026-01-17",
                "pdfUrl": "https://www.fdic.gov/federal-register-publications/american-bankers-association-aba-and-4-others-rin-3064-ag20.pdf",
                "summary": "Joint letter from ABA, Bank Policy Institute, Consumer Bankers Association, ICBA, and The Clearing House requesting extension of comment period. Notes FDIC has not yet issued related prudential requirements."
            },
            {
                "commenter": "International Bancshares Corporation",
                "type": "Bank",
                "date": "2026-01-15",
                "pdfUrl": "https://www.fdic.gov/federal-register-publications/international-bancshares-corporation-dennis-e-nixon-rin-3064-ag20.pdf",
                "summary": "Supports comment period extension. Expresses concerns about stablecoins threatening community bank stability, warns of 'yield locusts' - crypto firms marketing yield-like rewards that could siphon deposits."
            },
            {
                "commenter": "U.S. Faster Payments Council",
                "type": "Industry Association",
                "date": "2026-02-06",
                "pdfUrl": "https://www.fdic.gov/federal-register-publications/us-faster-payments-council-reed-luhtanen-rin-3064-ag20.pdf",
                "summary": "Supports FDIC's clear procedures for Permitted Payment Stablecoin Issuers. Recommends expanding requirements to include explicit risk management and fraud/scam mitigation policies."
            },
            {
                "commenter": "Global Legal Entity Identifier Foundation (GLEIF)",
                "type": "Standards Organization",
                "date": "2026-02-06",
                "pdfUrl": "https://www.fdic.gov/federal-register-publications/global-entity-identifier-foundation-gleif-alexandre-kech-rin-3064",
                "summary": "Proposes integrating Legal Entity Identifiers (LEI) and verifiable LEIs (vLEI) into stablecoin framework to promote transparency, enhance fraud detection, and enable verifiable organizational identity."
            },
            {
                "commenter": "Money Services Business Association (MSBA)",
                "type": "Trade Association",
                "date": "2026-02-04",
                "pdfUrl": "https://www.fdic.gov/federal-register-publications/money-services-association-msba-kathy-tomasofsky-rin-3064-ag20.pdf",
                "summary": "Supports clear, consistent, risk-focused approval process. Endorses the 30-day completeness review and 120-day final decision window as providing predictability for industry participants."
            },
            {
                "commenter": "Auditchain Labs AG",
                "type": "Technology Company",
                "date": "2026-02-09",
                "pdfUrl": "https://www.fdic.gov/federal-register-publications/auditchain-labs-ag-jason-meyers-rin-3064-ag20.pdf",
                "summary": "Comprehensive 29-page submission on blockchain infrastructure concerns. Proposes XBRL-based disclosure taxonomies. Raises concerns about shared public infrastructure risks, MEV attacks, and recommends 'Gatekeeper Architecture' upgrades."
            },
            {
                "commenter": "Dylan Grieve",
                "type": "Individual",
                "date": "2026-02-07",
                "pdfUrl": "https://www.fdic.gov/federal-register-publications/dylan-grieve-rin-3064-ag20.pdf",
                "summary": "Opposes rule citing concerns about Section 5 integrity vetting, 'Kill Switch' provisions potentially violating 4th Amendment protections, and federal overreach on state sovereignty."
            }
        ]
    },
    {
        "section": "5(a)(2)",
        "requirement": "Investments in and licensing of permitted payment stablecoin issuers for credit unions",
        "agency": "National Credit Union Administration (NCUA)",
        "deadline": "Before the date described in Section 13 (before 1 year after enactment)",
        "implementation": "Must accept/process applications before Section 13 deadline",
        "notes": "NCUA proposed rule outlining framework for credit unions seeking approval to become permitted payment stablecoin issuers under the GENIUS Act.",
        "deadlineDate": "2026-07-18",
        "commentUrl": "https://www.federalregister.gov/public-inspection/2026-02868/investments-in-and-licensing-of-permitted-payment-stablecoins-issuers",
        "commentDeadline": "2026-04-13",
        "rulemakingStages": {
            "anprm": { "status": "skipped" },
            "nprm": {
                "status": "published",
                "date": "2026-02-12",
                "frDocNumber": "2026-02868",
                "title": "Investments in and Licensing of Permitted Payment Stablecoins Issuers"
            },
            "commentPeriod": {
                "status": "open",
                "startDate": "2026-02-12",
                "endDate": "2026-04-13"
            },
            "finalRule": { "status": "not-started" },
            "effective": { "status": "not-started" }
        },
        "rulemakingType": "required",
        "paradigmPriority": true,
        "priorityReason": "Currently open for comment (deadline April 13, 2026). Opportunity to shape credit union stablecoin issuance framework.",
        "paradigmRecommendation": "participate",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "5(g)",
        "requirement": "Rules necessary for regulation of payment stablecoin issuance",
        "agency": "OCC, Federal Reserve, FDIC, NCUA",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "May not impose requirements in addition to those specified in Section 4",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "7(e)(1)(B)",
        "requirement": "Rules setting forth unusual and exigent circumstances for Board enforcement authority",
        "agency": "Board of Governors of the Federal Reserve System",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "For enforcement against State qualified issuers",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "7(e)(2)(B)",
        "requirement": "Rules setting forth unusual and exigent circumstances for Comptroller enforcement authority",
        "agency": "Comptroller",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "For enforcement against State qualified nonbank issuers. Addressed in OCC comprehensive NPRM (Feb 25, 2026).",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "commentDeadline": "2026-04-27",
        "commentUrl": "https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-9.html",
        "rulemakingStages": {
        "anprm": {
                "status": "skipped"
        },
        "nprm": {
                "status": "published",
                "date": "2026-02-25",
                "title": "GENIUS Act Regulations: Notice of Proposed Rulemaking"
        },
        "commentPeriod": {
                "status": "open",
                "startDate": "2026-02-25",
                "endDate": "2026-04-27",
                "notes": "60 days from Federal Register publication"
        },
        "finalRule": {
                "status": "not-started"
        },
        "effective": {
                "status": "not-started"
        }
},
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "8(b)(3)(B)",
        "requirement": "Criteria for determining foreign issuer is no longer noncompliant",
        "agency": "Secretary of the Treasury",
        "deadline": "Consistent with Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "Related to foreign payment stablecoin issuer compliance with lawful orders",
        "deadlineDate": "2026-07-18",
        "docketId": "TREAS-DO-2025-0037",
        "rulemakingStages": {
            "anprm": { "status": "closed", "date": "2025-09-03", "commentEndDate": "2025-11-04", "frDocNumber": "2025-19800" },
            "nprm": { "status": "not-started" },
            "commentPeriod": { "status": "not-started" },
            "finalRule": { "status": "not-started" },
            "effective": { "status": "not-started" }
        },
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "9(d)",
        "requirement": "Public guidance and notice-and-comment rulemaking on innovative AML methods for digital assets",
        "agency": "Financial Crimes Enforcement Network (FinCEN)",
        "deadline": "Not later than 3 years after enactment",
        "implementation": "Not later than 3 years after enactment",
        "notes": "Based on research/risk assessments, must cover: (1) implementation of innovative methods, (2) standards for identifying/reporting illicit activity, (3) standards for monitoring blockchains/mixing services, (4) tailored risk management for decentralized finance",
        "deadlineDate": "2028-07-18",
        "docketId": "FINCEN-2025-0003",
        "rulemakingType": "required",
        "paradigmPriority": true,
        "priorityReason": "Core priority area - opportunity to shape how crypto-native tools are used for AML compliance rather than traditional banking frameworks",
        "paradigmRecommendation": "participate",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "12",
        "requirement": "Standards for permitted payment stablecoin issuers to promote compatibility and interoperability",
        "agency": "OCC, Federal Reserve, FDIC, NCUA (in consultation with NIST)",
        "deadline": "No specific deadline - may prescribe standards",
        "implementation": "Standards must be consistent with National Technology Transfer and Advancement Act of 1995",
        "notes": "Optional - 'may' prescribe standards, not mandatory",
        "deadlineDate": "2027-01-18",
        "rulemakingType": "discretionary",
        "paradigmPriority": true,
        "priorityReason": "Critical to ensure technology-neutral standards that don't favor specific blockchains or become prematurely outdated",
        "paradigmRecommendation": "monitor",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "13(a)",
        "requirement": "General rulemaking to carry out the Act",
        "agency": "Each primary Federal payment stablecoin regulator, Secretary of the Treasury, and each State payment stablecoin regulator",
        "deadline": "Not later than 1 year after enactment",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "Through appropriate notice and comment rulemaking",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "16(b)",
        "requirement": "Review existing guidance/regulations and amend or promulgate new regulations to clarify payment stablecoin activities are authorized",
        "agency": "OCC, Federal Reserve, FDIC, NCUA",
        "deadline": "No specific deadline stated",
        "implementation": "No specific deadline stated",
        "notes": "If necessary to clarify authority",
        "deadlineDate": "2027-01-18",
        "rulemakingType": "discretionary",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "18(b)(6)",
        "requirement": "Rules required to carry out foreign issuer exception and reciprocity provisions",
        "agency": "Secretary of the Treasury",
        "deadline": "Not later than 1 year after enactment",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "",
        "deadlineDate": "2026-07-18",
        "docketId": "TREAS-DO-2025-0037",
        "rulemakingStages": {
            "anprm": { "status": "closed", "date": "2025-09-03", "commentEndDate": "2025-11-04", "frDocNumber": "2025-19800" },
            "nprm": { "status": "not-started" },
            "commentPeriod": { "status": "not-started" },
            "finalRule": { "status": "not-started" },
            "effective": { "status": "not-started" }
        },
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    },
    {
        "section": "18(c)(1)(E)",
        "requirement": "Rules for standards for approval of foreign issuer registration requests and appeal process",
        "agency": "Comptroller",
        "deadline": "Pursuant to Section 13 (1 year after enactment)",
        "implementation": "18 months after enactment OR 120 days after final regs issued (whichever is earlier)",
        "notes": "",
        "deadlineDate": "2026-07-18",
        "rulemakingType": "required",
        "paradigmCommentary": "",
        "paradigmAttitude": ""
    }
];
