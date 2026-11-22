// Single source of truth for everything the site says about Ankit.
// Rule: every number and technology here must trace to a line in the résumé
// (app/assets/Resume_Ankit_Gupta_Senior_Software_Engineer.pdf) or to something Ankit
// confirmed directly in Nov 2026: PySpark and Spark SQL in Fabric notebooks, the move to
// Germany on an Opportunity Card in January 2027, and the 2022–2025 career break.
// Never put example or estimated numbers here as if they were measured results.

export const PROFILE = {
  name: "Ankit Gupta",
  role: "Senior Software Engineer",
  discipline: "Backend & Data Engineering",
  location: "Bengaluru, India",
  relocation: "Moving to Germany in January 2027",
  email: "ankitgupta.oct21@gmail.com",
  linkedin: "https://www.linkedin.com/in/ankit-gupta-oct21/",
  github: "https://github.com/ankitguptaoct21",
  resumePath: "/resume",
  resumeFile: "/resume/file",
  tagline: "Every change, captured.",
  pitch:
    "I build the real-time data layer AI products run on: CDC pipelines, Kafka streams and lakehouses that keep models and agents supplied with fresh, correct data.",
  // Third-person version of the pitch, for machine-readable profiles.
  summary:
    "Builds the real-time data layer AI products run on: change data capture (CDC) pipelines, Apache Kafka streams and lakehouses that keep models and agents supplied with fresh, correct data.",
  years: "6 years",
} as const;

// What a German employer needs to know before the first call.
export const GERMANY = {
  arrival: "January 2027",
  permit: "Opportunity Card",
  facts: [
    {
      label: "Work permit",
      value:
        "Opportunity Card (Chancenkarte) from January 2027. With a qualifying offer it converts to an EU Blue Card inside Germany, with no visa application from abroad.",
    },
    {
      label: "Try first",
      value:
        "The Opportunity Card allows trial work of up to two weeks per employer, so we can work together before you decide.",
    },
    { label: "Location", value: "Anywhere in Germany: on-site, hybrid or remote." },
    { label: "Start", value: "January 2027." },
    { label: "Languages", value: "English (C1), German (A1, learning), Hindi (native)." },
  ],
};

export type Proof = {
  value: string;
  unit: string;
  what: string;
  how: string;
  where: string;
  // Optional absolute baseline, e.g. "45 min → 9 min". Only real, measured values.
  detail?: string;
};

// Headline numbers, each paired with the mechanism behind it.
export const PROOF: Proof[] = [
  {
    value: "80",
    unit: "%",
    what: "lower pipeline latency",
    how: "CDC on the source database, data gateways and database mirroring on Microsoft Fabric",
    where: "Brahma AI · 2026",
  },
  {
    value: "~60",
    unit: "%",
    what: "more efficient lakehouse tables",
    how: "Compaction, V-Order, Z-Ordering and VACUUM",
    where: "Brahma AI · 2026",
  },
  {
    value: "30",
    unit: "%",
    what: "lower processing latency",
    how: "A Kafka producer–consumer architecture",
    where: "Ematic Solutions · 2025",
  },
  {
    value: "100k",
    unit: "+",
    what: "data points a week into an AI platform",
    how: "A backend pipeline ingesting several third-party marketing apps",
    where: "Ematic Solutions · 2025",
  },
  {
    value: "10",
    unit: "+",
    what: "blockchains behind one wallet service",
    how: "A reusable crypto library cut new-chain integration time by 60%",
    where: "Ethos Wallet · 2017–19",
  },
  {
    value: "90",
    unit: "%+",
    what: "fewer order-status support queries",
    how: "~5,000 automated email and SMS alerts a day",
    where: "GreenVeggies · 2020–22",
  },
];

export type Case = {
  id: string;
  product: string;
  kind: string;
  company: string;
  role: string;
  period: string;
  // ISO year-month, for machine-readable formats (resume.json). No end means current.
  start: string;
  end?: string;
  headline: string;
  context: string;
  built: string[];
  results: { value: string; label: string }[];
  stack: string[];
};

export const CASES: Case[] = [
  {
    id: "brahma",
    product: "Brahma AI",
    kind: "AI-powered media and entertainment platform",
    company: "Flexiple Technologies",
    role: "Senior Software Engineer",
    period: "Feb 2026 – now",
    start: "2026-02",
    headline: "Fresh, ready-to-use data for an AI media platform",
    context:
      "Several teams needed the same source data, ready to consume and close to real time.",
    built: [
      "Architected and deployed ELT pipelines on Microsoft Fabric using CDC on the source database, data gateways and database mirroring.",
      "Tuned the lakehouse with compaction, V-Order, Z-Ordering and VACUUM.",
      "Engineered event-driven pipelines on Apache Kafka for reliable, real-time streaming and processing.",
      "Mentored six junior engineers and defined the team's coding standards and testing strategy.",
    ],
    results: [
      { value: "−80%", label: "pipeline latency" },
      { value: "~60%", label: "more efficient tables" },
      { value: "+20%", label: "team velocity" },
    ],
    stack: ["Microsoft Fabric", "CDC", "Lakehouse", "PySpark", "Spark SQL", "Apache Kafka", "Node.js", "TypeScript"],
  },
  {
    id: "ematic",
    product: "Ematic Solutions",
    kind: "AI-powered marketing automation",
    company: "Syvora Technologies",
    role: "Senior Software Engineer",
    period: "Aug – Dec 2025",
    start: "2025-08",
    end: "2025-12",
    headline: "Feeding a marketing AI from many third-party apps",
    context:
      "The AI platform depended on data spread across several third-party marketing apps.",
    built: [
      "Built a scalable backend pipeline that ingests data from several third-party marketing apps.",
      "Designed a Kafka producer–consumer architecture for resilience.",
      "Designed and optimised fault-tolerant microservices for low-latency, high-throughput workloads, with cross-functional teams.",
    ],
    results: [
      { value: "100k+", label: "data points a week" },
      { value: "+25%", label: "performance" },
      { value: "−30%", label: "processing latency" },
    ],
    stack: ["Apache Kafka", "Data pipelines", "Microservices", "Third-party APIs"],
  },
  {
    id: "greenveggies",
    product: "GreenVeggies",
    kind: "B2B agri-tech e-commerce platform",
    company: "Excelmax Technologies",
    role: "Senior Software Engineer",
    period: "May 2020 – Apr 2022",
    start: "2020-05",
    end: "2022-04",
    headline: "Led the backend of a large-scale B2B e-commerce platform",
    context:
      "Order processing, inventory and customer updates needed to run with less manual work.",
    built: [
      "Led backend development and introduced automated testing frameworks that reduced production bugs.",
      "Redesigned the admin dashboard with end-to-end operational features.",
      "Integrated SendGrid (email) and MSG91 (SMS/OTP) to automate around 5,000 customer alerts a day.",
    ],
    results: [
      { value: "+35%", label: "order processing performance" },
      { value: "−85%", label: "costs" },
      { value: "−90%+", label: "order-status queries" },
    ],
    stack: ["Backend lead", "Automated testing", "SendGrid", "MSG91"],
  },
  {
    id: "fandom",
    product: "Fandom Sports",
    kind: "High-traffic fantasy e-sports platform",
    company: "Recrosoft Technologies",
    role: "Software Engineer",
    period: "Jul 2019 – Apr 2020",
    start: "2019-07",
    end: "2020-04",
    headline: "Core services for a fast-growing fantasy e-sports app",
    context: "Referrals and score feeds had to hold up while the user base grew quickly.",
    built: [
      "Built, scaled and load-tested the core microservices for user referrals and score feeds.",
      "Wrote Swagger/OpenAPI documentation that cut inter-team dependencies.",
    ],
    results: [
      { value: "30k+", label: "users in six months" },
      { value: "−25%", label: "development cycle" },
    ],
    stack: ["Microservices", "Load testing", "Swagger / OpenAPI"],
  },
  {
    id: "ethos",
    product: "Ethos Wallet & Howdoo",
    kind: "Crypto wallet and social tipping platform",
    company: "Deqode Solutions (Techracers)",
    role: "Solution Engineer",
    period: "Jun 2017 – Jun 2019",
    start: "2017-06",
    end: "2019-06",
    headline: "One wallet service for 10+ blockchains",
    context: "Each new blockchain needed its own key, seed and mnemonic handling.",
    built: [
      "Integrated 10+ blockchains (BTC, ETH, XRP and others), their forks and ERC-20 tokens into a single Node.js wallet service.",
      "Built a reusable cryptographic library for key, seed and mnemonic generation.",
      "Integrated Bitcoin and Ethereum into Howdoo's backend for cross-chain tipping.",
    ],
    results: [
      { value: "−60%", label: "new-chain integration time" },
      { value: "25k+", label: "transactions a day" },
    ],
    stack: ["Node.js", "Bitcoin", "Ethereum", "ERC-20", "Cryptography"],
  },
];

// Shown as a slim row in the work list, between the two roles it sits between.
export const CAREER_BREAK = { afterCaseId: "ematic", period: "May 2022 – Jul 2025", label: "Career break" };

// Why this work matters for AI products. Each claim ties to a résumé result or a public rule.
export const AI_PILLARS = [
  {
    title: "Fresh context",
    body: "A model answers from whatever data reached it last. Change data capture reads each change from the database log as it happens, instead of waiting for the next batch copy. At Brahma AI, CDC with database mirroring on Microsoft Fabric cut pipeline latency by 80%.",
  },
  {
    title: "Traceable data",
    body: "CDC reads every change in log order, and every lakehouse write is a new table version. That record is the basis for what the EU AI Act (Article 10) asks of high-risk AI systems: documented data origin and preparation.",
  },
  {
    title: "Efficient storage",
    body: "Models, agents and analysts read the same tables. Compaction, V-Order, Z-Ordering and VACUUM made Brahma AI’s lakehouse tables about 60% more efficient.",
  },
];

// Ankit's open-source AI project. Status stays "In progress" until there is a public repo.
export const NOW_BUILDING = {
  name: "fresh-context",
  status: "In progress",
  pitch: "An open-source pipeline that keeps an AI agent’s knowledge seconds behind the database.",
  how: "The design: Postgres changes flow through CDC and Kafka into a vector index, and an MCP server lets any agent search it, with each answer carrying the age of the data behind it. I’ll publish the code and the measured latency here.",
  flow: ["Postgres", "CDC", "Kafka", "Embeddings", "Vector index", "MCP server", "AI agent"],
  metric: "Time to answerable: from a row changing to an agent answering with it.",
  repo: null as string | null,
};

// The stack, grouped by where it sits on the path data takes.
export const DATA_PATH = [
  { stage: "Capture", items: ["CDC", "Data gateways", "Database mirroring", "Third-party APIs"] },
  { stage: "Move", items: ["Apache Kafka", "AWS SQS", "Event-driven architecture", "REST", "gRPC"] },
  {
    stage: "Store",
    items: ["Microsoft Fabric", "Lakehouse (V-Order, Z-Ordering)", "Spark SQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    stage: "Build",
    items: ["Python (PySpark)", "TypeScript", "JavaScript", "Node.js", "NestJS", "Express.js", "React"],
  },
  { stage: "Ship", items: ["Docker", "Kubernetes", "AWS (EC2, S3, Lambda)", "CI/CD", "TDD", "Application security"] },
];

export const PRINCIPLES = [
  {
    title: "Capture the change, not the table.",
    body: "Copying whole tables on a schedule makes everyone wait. Reading changes at the source is how pipeline latency at Brahma AI dropped by 80%.",
  },
  {
    title: "Storage layout is a performance feature.",
    body: "Compaction, V-Order, Z-Ordering and VACUUM made the lakehouse tables about 60% more efficient without changing a single query.",
  },
  {
    title: "Write the contract down.",
    body: "Clear OpenAPI docs at Fandom Sports removed inter-team waiting and cut the development cycle by 25%.",
  },
  {
    title: "Standards scale better than heroics.",
    body: "Shared coding standards and a testing strategy, plus mentoring six engineers, raised team velocity by 20%.",
  },
];

export const LANGUAGES = [
  { name: "Hindi", level: "Native" },
  { name: "English", level: "C1, fluent" },
  { name: "German", level: "A1, learning" },
];

export const EDUCATION = {
  degree: "B.E., Computer Science & Engineering",
  school: "Devi Ahilya Vishwavidyalaya, Indore",
  year: "2017",
};
