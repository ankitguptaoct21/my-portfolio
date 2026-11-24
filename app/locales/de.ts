// deu.theankitgupta.com: the German site for employers in Germany (formal "Sie").
// Facts mirror content.ts and the résumé; only the language and the Germany section differ.
// German number style: "80 %", "100.000+", "0,8". The Chancenkarte is applied for, not
// granted, so every permit sentence stays conditional.
import { PROFILE, CASES } from "../content";
import type { TimelineItem } from "../components/ExperienceTimeline";
import type { Market } from "../machine";
import { DE_PREFIX, DE_SITE_URL } from "../site";
import type { SiteCopy } from "./types";

const stack = (id: string) => CASES.find((c) => c.id === id)?.stack ?? [];

const TIMELINE: TimelineItem[] = [
  {
    type: "job",
    id: "brahma",
    period: "Feb. 2026 – heute",
    role: "Senior Software Engineer",
    company: "Flexiple Technologies",
    product: "Brahma AI",
    kind: "KI-gestützte Medien- und Entertainment-Plattform",
    highlights: [
      "Echtzeit-Datenpipelines (CDC) auf Microsoft Fabric gebaut, die die Pipeline-Latenz um 80 % gesenkt haben.",
      "Lakehouse-Tabellen um etwa 60 % effizienter gemacht und sechs Junior Engineers betreut.",
    ],
    stack: stack("brahma"),
  },
  {
    type: "job",
    id: "ematic",
    period: "Aug. – Dez. 2025",
    role: "Senior Software Engineer",
    company: "Syvora Technologies",
    product: "Ematic Solutions",
    kind: "KI-gestützte Marketing-Automatisierung",
    highlights: [
      "Eine Pipeline gebaut, die eine KI-Marketingplattform mit mehr als 100.000 Datenpunkten pro Woche versorgt hat.",
      "Ein Kafka-Producer-Consumer-Setup entworfen, das die Verarbeitungslatenz um 30 % gesenkt hat.",
    ],
    stack: ["Apache Kafka", "Datenpipelines", "Microservices"],
  },
  { type: "break", id: "career-break", period: "Mai 2022 – Juli 2025", label: "Berufliche Auszeit" },
  {
    type: "job",
    id: "greenveggies",
    period: "Mai 2020 – Apr. 2022",
    role: "Senior Software Engineer",
    company: "Excelmax Technologies",
    product: "GreenVeggies",
    kind: "B2B-Agrartech-E-Commerce-Plattform",
    highlights: [
      "Die Backend-Entwicklung geleitet und das Admin-Dashboard neu gestaltet; die Performance der Auftragsverarbeitung stieg um 35 %.",
      "Rund 5.000 Kundenbenachrichtigungen pro Tag automatisiert und Support-Anfragen zum Bestellstatus um mehr als 90 % reduziert.",
    ],
    stack: ["Node.js", "Automatisierte Tests", "SendGrid", "MSG91"],
  },
  {
    type: "job",
    id: "fandom",
    period: "Juli 2019 – Apr. 2020",
    role: "Software Engineer",
    company: "Recrosoft Technologies",
    product: "Fandom Sports",
    kind: "Fantasy-E-Sport-Plattform mit hohem Traffic",
    highlights: [
      "Die Referral- und Score-Feed-Services einer App gebaut und unter Last getestet, die in sechs Monaten über 30.000 Nutzer erreichte.",
      "OpenAPI-Dokumentation geschrieben, die den Entwicklungszyklus um 25 % verkürzt hat.",
    ],
    stack: ["Microservices", "Lasttests", "OpenAPI"],
  },
  {
    type: "job",
    id: "ethos",
    period: "Juni 2017 – Juni 2019",
    role: "Solution Engineer",
    company: "Deqode Solutions (Techracers)",
    product: "Ethos Wallet & Howdoo",
    kind: "Krypto-Wallet und Social-Tipping-Plattform",
    highlights: [
      "Mehr als 10 Blockchains in einen einzigen Node.js-Wallet-Service integriert.",
      "Eine wiederverwendbare Krypto-Bibliothek gebaut, die die Integrationszeit für neue Blockchains um 60 % verkürzt hat.",
    ],
    stack: ["Node.js", "Bitcoin", "Ethereum", "Kryptografie"],
  },
];

export const DE: SiteCopy = {
  lang: "de",
  basePath: DE_PREFIX,
  name: PROFILE.name,
  title: PROFILE.title,
  plain:
    "Ich baue Systeme, die Daten in Echtzeit bewegen, damit KI-Produkte und die Teams dahinter immer mit aktuellen Informationen arbeiten.",
  thesis: "Ich halte die Daten hinter KI-Produkten aktuell und korrekt.",
  tagline: "Jede Änderung, erfasst.",
  email: PROFILE.email,
  linkedin: PROFILE.linkedin,
  github: PROFILE.github,
  pills: [
    { icon: "plane", text: "Umzug nach Deutschland · Januar 2027", accent: true },
    { icon: "file", text: "Chancenkarte: beantragt" },
    { icon: "languages", text: "Deutsch A1 · Gespräche gern auf Englisch" },
    { icon: "briefcase", text: "6 Jahre Erfahrung" },
  ],
  statusAria: "Status",
  actions: {
    email: { main: "E-Mail" },
    cv: { main: "Lebenslauf", short: "CV" },
    linkedin: "LinkedIn",
    github: "GitHub",
    copy: "E-Mail kopieren",
    copied: "Kopiert",
  },
  seeItLive: "Live ansehen",
  glanceHeading: "Ergebnisse auf einen Blick",
  glance: [
    {
      value: "80 %",
      label: "geringere Pipeline-Latenz",
      note: "Neue Daten kommen in einem Fünftel der früheren Zeit an.",
      where: "Brahma AI",
    },
    {
      value: "~60 %",
      label: "effizientere Lakehouse-Tabellen",
      note: "Durch Kompaktierung und ein besseres Dateilayout.",
      where: "Brahma AI",
    },
    {
      value: "100.000+",
      label: "Datenpunkte pro Woche für eine KI-Plattform",
      note: "Aus mehreren Marketing-Apps von Drittanbietern.",
      where: "Ematic Solutions",
    },
    {
      value: "6",
      label: "betreute Junior Engineers",
      note: "Mit gemeinsamen Coding-Standards und einer Teststrategie stieg die Team-Velocity um 20 %.",
      where: "Brahma AI",
    },
  ],
  services: [
    {
      title: "Echtzeit-Datenpipelines",
      body: "Ich erfasse jede Änderung in einer Datenbank, sobald sie passiert, und streame sie innerhalb von Sekunden dorthin, wo sie gebraucht wird, damit niemand auf die nächste geplante Kopie warten muss.",
      tags: ["CDC", "Apache Kafka", "Event-getriebene Architektur"],
    },
    {
      title: "Datenplattformen für KI",
      body: "Ich baue und optimiere das Lakehouse, aus dem KI-Produkte, Agenten und Analysten lesen, damit Abfragen schnell bleiben und der Speicher schlank.",
      tags: ["Microsoft Fabric", "PySpark", "Spark SQL", "Lakehouse"],
    },
    {
      title: "Backend-Systeme",
      body: "Ich entwerfe APIs und Microservices, die echtem Traffic standhalten, mit Tests, Dokumentation und klaren Coding-Standards.",
      tags: ["Node.js", "TypeScript", "NestJS", "PostgreSQL", "AWS"],
    },
  ],
  timeline: TIMELINE,
  timelineCopy: { hint: "Weiter scrollen ↓", aria: "Berufserfahrung, neueste zuerst" },
  skills: [
    { label: "Datenerfassung", items: ["CDC", "Daten-Gateways", "Datenbank-Mirroring", "APIs von Drittanbietern"] },
    { label: "Streaming & APIs", items: ["Apache Kafka", "AWS SQS", "Event-getriebene Architektur", "REST", "gRPC"] },
    {
      label: "Speicher & Abfragen",
      items: ["Microsoft Fabric", "Lakehouse (V-Order, Z-Ordering)", "Spark SQL", "PostgreSQL", "MongoDB", "Redis"],
    },
    {
      label: "Sprachen & Frameworks",
      items: ["Python (PySpark)", "TypeScript", "JavaScript", "Node.js", "NestJS", "Express.js", "React"],
    },
    {
      label: "Cloud & DevOps",
      items: ["Docker", "Kubernetes", "AWS (EC2, S3, Lambda)", "CI/CD", "TDD", "Anwendungssicherheit"],
    },
  ],
  extraTab: {
    id: "germany",
    label: "Deutschland",
    title: "Antworten, bevor Sie fragen müssen.",
    facts: [
      { icon: "plane", label: "Ankunft", value: "Januar 2027, um in Deutschland zu leben und zu arbeiten." },
      {
        icon: "file",
        label: "Arbeitserlaubnis",
        value:
          "Ich habe die Chancenkarte beantragt. Mit einem passenden Jobangebot kann sie in Deutschland in eine Blaue Karte EU umgewandelt werden, ohne Visumverfahren aus dem Ausland.",
      },
      {
        icon: "handshake",
        label: "Probebeschäftigung",
        value:
          "Sobald die Chancenkarte erteilt ist, ist eine Probebeschäftigung von bis zu zwei Wochen pro Arbeitgeber möglich. So können wir zusammenarbeiten, bevor Sie sich entscheiden.",
      },
      { icon: "pin", label: "Standort", value: "Überall in Deutschland: vor Ort, hybrid oder remote." },
      {
        icon: "languages",
        label: "Sprachen",
        value: "Englisch (C1), Deutsch (A1, ich lerne aktiv), Hindi (Muttersprache). Gespräche gern auf Englisch.",
      },
      { icon: "graduation", label: "Abschluss", value: "B.E. in Computer Science & Engineering (Informatik), 2017." },
    ],
  },
  tabs: { overview: "Überblick", what: "Was ich mache", demo: "Live-Demo", experience: "Erfahrung", skills: "Skills" },
  titles: {
    what: "Die richtigen Daten, am richtigen Ort, zur richtigen Zeit.",
    demo: "Eine Datenbankänderung auf dem Weg ins Lakehouse.",
    experience: "Meine Stationen, die neueste zuerst.",
    skills: "Werkzeuge, mit denen ich arbeite.",
  },
  tabsCopy: { next: "Weiter", aria: "Bereiche" },
  clocks: {
    locale: "de-DE",
    title: "Warum Echtzeit zählt",
    body: "Wie alt sind die Daten, die Ihre KI gerade liest? Unten sehen Sie dieselbe Tabelle: einmal pro Stunde kopiert und in Echtzeit erfasst. Die Simulation läuft mit 60-facher Geschwindigkeit.",
    sr: "Einmal pro Stunde kopiert, sind die Daten bis zu eine Stunde alt, bevor die nächste Kopie kommt. In Echtzeit erfasst, bleiben sie etwa eine Sekunde alt.",
    batchLabel: "Einmal pro Stunde kopiert",
    batchUnit: "Minuten alt",
    liveLabel: "In Echtzeit erfasst · was ich baue",
    liveUnit: "Sekunden alt",
    pause: "Pause",
    play: "Weiter",
  },
  pipeline: {
    locale: "de-DE",
    title: "So funktioniert es",
    intro:
      "Klicken Sie auf „Änderung auslösen“, um eine Bestellung in der Quelldatenbank zu ändern, und verfolgen Sie, wie die Änderung über CDC und Kafka ins Lakehouse gelangt.",
    makeChange: "Änderung auslösen",
    pause: "Pause",
    play: "Weiter",
    source: { name: "Quell-DB", sub: "orders", aria: "Quelldatenbank" },
    cdc: { name: "CDC", sub: "liest das Log", aria: "Change-Data-Capture-Log" },
    kafka: { name: "Kafka", sub: "orders.cdc", aria: "Kafka-Topic", note: "Schlüssel: Bestell-ID · Offsets je Partition" },
    lake: { name: "Lakehouse", sub: "Delta-Tabelle", aria: "Delta-Tabelle im Lakehouse" },
    cols: { id: "id", item: "Artikel", status: "Status" },
    status: { placed: "bestellt", packed: "verpackt", shipped: "versandt", delivered: "zugestellt" },
    insert: "neu",
    you: "Sie",
    items: ["Espressobohnen", "Schreibtischlampe", "Laufschuhe", "Notizbuch", "Wollschal", "USB-C-Hub", "Teeauswahl", "Fahrradlicht"],
    lakeFoot: "Version {v} · kleine Dateien {n}",
    optimize: "OPTIMIZE · V-Order → 1 Datei",
    compaction: "Kompaktierung ab 7 Dateien",
    captured: "Erfasste Änderungen",
    latency: "Zeit von der Änderung bis zum Lakehouse",
    simulated: "Im Browser simuliert. In der Praxis baue ich das mit Microsoft Fabric und Apache Kafka.",
  },
};

// Page metadata for the German site.
export const DE_META = {
  title: "Ankit Gupta · Jede Änderung, erfasst.",
  description:
    "Ankit Gupta, Senior Backend & Data Engineer. Ich baue die Echtzeit-Datenschicht, auf der KI-Produkte laufen: CDC-Pipelines, Kafka-Streams und Lakehouses. Umzug nach Deutschland im Januar 2027.",
  ogLine: "Echtzeit-Daten für KI-Produkte · Umzug nach Deutschland, Januar 2027",
  ogStats: [
    { v: "80 %", l: "geringere Pipeline-Latenz" },
    { v: "~60 %", l: "effizientere Tabellen" },
    { v: "6 Jahre", l: "Backend & Data" },
  ],
  schemaDescription:
    "Baut die Echtzeit-Datenschicht, auf der KI-Produkte laufen: Change-Data-Capture-Pipelines (CDC), Apache-Kafka-Streams und Lakehouses, die Modelle und Agenten mit aktuellen, korrekten Daten versorgen.",
  resumeTitle: "Lebenslauf",
  resumeDescription: "Lebenslauf von Ankit Gupta, Senior Software Engineer, Backend & Data Engineering.",
};

// Machine-readable profiles for the German site (English text; AI tools read either).
// The Opportunity Card is applied for, not granted: keep it conditional.
export const GERMANY_MARKET: Market = {
  siteUrl: DE_SITE_URL,
  summaryTail: `Based in ${PROFILE.location}. Moving to Germany in January 2027.`,
  availability: {
    heading: "## Availability in Germany",
    lines: [
      "Arriving: January 2027, to live and work in Germany.",
      "Work permit: Opportunity Card (Chancenkarte) applied for. With a qualifying job offer, it can be converted into an EU Blue Card inside Germany, with no visa process from abroad.",
      "Trial work: once the card is granted, trial work (Probebeschäftigung) of up to two weeks per employer is allowed.",
      "Location: anywhere in Germany, on-site, hybrid or remote.",
      "Languages: English (C1), German (A1, learning), Hindi (native). Conversations in English preferred.",
    ],
  },
};
