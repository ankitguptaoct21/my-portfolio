// English text for the interactive components. Kept outside the "use client" files so
// server code (locales/en.ts) can read the real objects, not client references.
import type { ClocksCopy } from "../components/FreshnessClocks";
import type { PipelineCopy } from "../components/PipelineDemo";
import type { TimelineCopy } from "../components/ExperienceTimeline";

export const CLOCKS_EN: ClocksCopy = {
  locale: "en-US",
  title: "Why real time matters",
  body: "How old is the data your AI is reading right now? Below is the same table, copied once an hour versus captured as it changes. This simulation runs at 60× speed.",
  sr: "Copied once an hour, the data is up to an hour old before the next copy. Captured in real time, it stays about a second old.",
  batchLabel: "Copied once an hour",
  batchUnit: "minutes old",
  liveLabel: "Captured in real time · what I build",
  liveUnit: "seconds old",
  pause: "Pause",
  play: "Play",
};

export const PIPELINE_EN: PipelineCopy = {
  locale: "en-US",
  title: "See it working",
  intro:
    "Press “Make a change” to update an order in the source database, then watch the change travel through CDC and Kafka into the lakehouse.",
  makeChange: "Make a change",
  pause: "Pause",
  play: "Play",
  source: { name: "Source DB", sub: "orders", aria: "Source database" },
  cdc: { name: "CDC", sub: "reads the log", aria: "Change data capture log" },
  kafka: { name: "Kafka", sub: "orders.cdc", aria: "Kafka topic", note: "keyed by order id · offsets per partition" },
  lake: { name: "Lakehouse", sub: "delta table", aria: "Lakehouse Delta table" },
  cols: { id: "id", item: "item", status: "status" },
  status: { placed: "placed", packed: "packed", shipped: "shipped", delivered: "delivered" },
  insert: "insert",
  you: "you",
  items: ["Espresso beans", "Desk lamp", "Running shoes", "Field notebook", "Wool scarf", "USB-C hub", "Tea sampler", "Bike light"],
  lakeFoot: "version {v} · small files {n}",
  optimize: "OPTIMIZE · V-Order → 1 file",
  compaction: "compaction when files ≥ 7",
  captured: "Changes captured",
  latency: "Time from change to lakehouse",
  simulated: "Simulated in your browser. In production I build this with Microsoft Fabric and Apache Kafka.",
};

export const TIMELINE_EN: TimelineCopy = { hint: "Scroll for more ↓", aria: "Experience timeline, newest first" };
