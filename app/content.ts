// Single source of truth for everything the site says about Ankit.
// Rule: every number and technology here must trace to a line in the résumé
// (app/assets/Resume_Ankit_Gupta_Senior_Software_Engineer.pdf) or to something Ankit
// confirmed directly in Nov 2026: PySpark and Spark SQL in Fabric notebooks, the move to
// Germany in January 2027 (Opportunity Card applied for, not yet granted), and the
// 2022–2025 career break.
// Never put example or estimated numbers here as if they were measured results.
// Wording: "80% lower latency" is not "80% faster". Keep the résumé's phrasing.

export const PROFILE = {
  name: "Ankit Gupta",
  role: "Senior Software Engineer",
  // Plain job title for the homepage heading.
  title: "Senior Backend & Data Engineer",
  discipline: "Backend & Data Engineering",
  location: "Bengaluru, India",
  relocation: "Moving to Germany in January 2027",
  email: "ankitgupta.oct21@gmail.com",
  linkedin: "https://www.linkedin.com/in/ankit-gupta-oct21/",
  github: "https://github.com/ankitguptaoct21",
  resumePath: "/resume",
  resumeFile: "/resume/file",
  tagline: "Every change, captured.",
  // The one-line thesis at the top of Overview. Backed by the résumé's pitch; no unmeasured claims.
  thesis: "I keep the data behind AI products fresh and correct.",
  // One sentence, no acronyms: what a non-technical recruiter should take away.
  plain:
    "I build systems that move data in real time, so AI products and the teams behind them always work with up-to-date information.",
  pitch:
    "I build the real-time data layer AI products run on: CDC pipelines, Kafka streams and lakehouses that keep models and agents supplied with fresh, correct data.",
  // Third-person version of the pitch, for machine-readable profiles.
  summary:
    "Builds the real-time data layer AI products run on: change data capture (CDC) pipelines, Apache Kafka streams and lakehouses that keep models and agents supplied with fresh, correct data.",
  years: "6 years",
} as const;

// What a German employer needs to know before the first call.
// The Opportunity Card is applied for, not granted: keep every permit claim conditional.
export const GERMANY = {
  arrival: "January 2027",
  permit: "Opportunity Card: applied",
  facts: [
    { label: "Arriving", value: "January 2027, to live and work in Germany." },
    {
      label: "Work permit",
      value:
        "I have applied for an Opportunity Card (Chancenkarte). With a qualifying job offer, it can be converted into an EU Blue Card inside Germany, with no visa process from abroad.",
    },
    {
      label: "Try first",
      value:
        "Once the card is granted, trial work of up to two weeks per employer is allowed, so we can work together before you decide.",
    },
    { label: "Location", value: "Anywhere in Germany: on-site, hybrid or remote." },
    { label: "Languages", value: "English (C1), German (A1, learning), Hindi (native)." },
    { label: "Degree", value: "B.E. in Computer Science & Engineering, 2017." },
  ],
};

export type Glance = {
  value: string;
  label: string;
  note: string;
  where: string;
  // Optional absolute baseline, e.g. "45 min → 9 min". Only real, measured values.
  detail?: string;
};

// The four numbers a recruiter should remember.
export const GLANCE: Glance[] = [
  {
    value: "80%",
    label: "lower pipeline latency",
    note: "New data arrives in a fifth of the time it used to take.",
    where: "Brahma AI",
  },
  {
    value: "~60%",
    label: "more efficient lakehouse tables",
    note: "Achieved through compaction and a smarter file layout.",
    where: "Brahma AI",
  },
  {
    value: "100k+",
    label: "data points fed into an AI platform each week",
    note: "Pulled in from several third-party marketing apps.",
    where: "Ematic Solutions",
  },
  {
    value: "6",
    label: "junior engineers mentored",
    note: "With shared coding standards and a testing strategy, team velocity rose by 20%.",
    where: "Brahma AI",
  },
];

// What I do, in plain words. Tags keep the keywords recruiters and ATS search for.
export const SERVICES = [
  {
    title: "Real-time data pipelines",
    body: "I capture every change in a database the moment it happens and stream it to where it’s needed within seconds, so nobody has to wait for the next scheduled copy.",
    tags: ["CDC", "Apache Kafka", "Event-driven architecture"],
  },
  {
    title: "Data platforms for AI",
    body: "I build and tune the lakehouse that AI products, agents and analysts read from, so queries stay fast and storage stays lean.",
    tags: ["Microsoft Fabric", "PySpark", "Spark SQL", "Lakehouse"],
  },
  {
    title: "Backend systems",
    body: "I design APIs and microservices that hold up under real traffic, with tests, documentation and clear coding standards.",
    tags: ["Node.js", "TypeScript", "NestJS", "PostgreSQL", "AWS"],
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
  // Two plain sentences for the homepage. `built` and `results` keep the full detail
  // for llms.txt and resume.json.
  highlights: string[];
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
    highlights: [
      "Built real-time (CDC) data pipelines on Microsoft Fabric that cut pipeline latency by 80%.",
      "Made the lakehouse tables about 60% more efficient and mentored six junior engineers.",
    ],
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
    stack: ["Microsoft Fabric", "CDC", "PySpark", "Spark SQL", "Apache Kafka", "TypeScript"],
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
    highlights: [
      "Built a pipeline that fed an AI marketing platform more than 100,000 data points a week.",
      "Designed a Kafka producer–consumer setup that cut processing latency by 30%.",
    ],
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
    stack: ["Apache Kafka", "Data pipelines", "Microservices"],
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
    highlights: [
      "Led the backend and redesigned the admin dashboard, raising order-processing performance by 35%.",
      "Automated about 5,000 customer alerts a day, cutting order-status support queries by more than 90%.",
    ],
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
    stack: ["Node.js", "Automated testing", "SendGrid", "MSG91"],
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
    highlights: [
      "Built and load-tested the referral and score-feed services of an app that reached 30,000+ users in six months.",
      "Wrote OpenAPI documentation that shortened the development cycle by 25%.",
    ],
    built: [
      "Built, scaled and load-tested the core microservices for user referrals and score feeds.",
      "Wrote Swagger/OpenAPI documentation that cut inter-team dependencies.",
    ],
    results: [
      { value: "30k+", label: "users in six months" },
      { value: "−25%", label: "development cycle" },
    ],
    stack: ["Microservices", "Load testing", "OpenAPI"],
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
    highlights: [
      "Integrated 10+ blockchains into a single Node.js wallet service.",
      "Built a reusable crypto library that cut new-blockchain integration time by 60%.",
    ],
    built: [
      "Integrated 10+ blockchains (BTC, ETH, XRP and others), their forks and ERC-20 tokens into a single Node.js wallet service.",
      "Built a reusable cryptographic library for key, seed and mnemonic generation.",
      "Integrated Bitcoin and Ethereum into Howdoo's backend for cross-chain tipping.",
    ],
    results: [
      { value: "−60%", label: "new-chain integration time" },
      { value: "25k+", label: "transactions a day" },
    ],
    stack: ["Node.js", "Bitcoin", "Ethereum", "Cryptography"],
  },
];

// Shown as a slim row in the work list, between the two roles it sits between.
export const CAREER_BREAK = { afterCaseId: "ematic", period: "May 2022 – Jul 2025", label: "Career break" };

// Ankit’s open-source AI project. Hidden on the site, llms.txt and resume.json until `repo` is set.
export const NOW_BUILDING = {
  name: "fresh-context",
  status: "In progress",
  plain: "An open-source project that keeps an AI assistant’s knowledge up to date within seconds of a change in the database.",
  pitch: "An open-source pipeline that keeps an AI agent’s knowledge seconds behind the database.",
  how: "The design: Postgres changes flow through CDC and Kafka into a vector index, and an MCP server lets any agent search it, with each answer carrying the age of the data behind it. I’ll publish the code and the measured latency here.",
  flow: ["Postgres", "CDC", "Kafka", "Embeddings", "Vector index", "MCP server", "AI agent"],
  metric: "Time to answerable: from a row changing to an agent answering with it.",
  repo: null as string | null,
};

// The stack, grouped by where it sits on the path data takes. `label` is the plain heading.
export const DATA_PATH = [
  { stage: "Capture", label: "Data capture", items: ["CDC", "Data gateways", "Database mirroring", "Third-party APIs"] },
  {
    stage: "Move",
    label: "Streaming & APIs",
    items: ["Apache Kafka", "AWS SQS", "Event-driven architecture", "REST", "gRPC"],
  },
  {
    stage: "Store",
    label: "Storage & queries",
    items: ["Microsoft Fabric", "Lakehouse (V-Order, Z-Ordering)", "Spark SQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    stage: "Build",
    label: "Languages & frameworks",
    items: ["Python (PySpark)", "TypeScript", "JavaScript", "Node.js", "NestJS", "Express.js", "React"],
  },
  {
    stage: "Ship",
    label: "Cloud & DevOps",
    items: ["Docker", "Kubernetes", "AWS (EC2, S3, Lambda)", "CI/CD", "TDD", "Application security"],
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
