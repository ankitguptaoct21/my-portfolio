"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PIPELINE_EN } from "../locales/ui-en";

// A simulated change-data-capture pipeline.
// A row changes in the source database, the change is read from the log,
// published to a Kafka topic, and merged into a Delta table in the lakehouse.

type Status = "placed" | "packed" | "shipped" | "delivered";
// `item` is an index into copy.items, so the German site can name the same products.
type Row = { id: number; item: number; status: Status };
type Detail = { kind: "insert" } | { kind: "move"; from: Status; to: Status };
type LogEntry = { seq: number; op: "c" | "u"; id: number; detail: Detail; lsn: string; you: boolean };

// All visible text; the German site passes its own. `locale` formats offsets and latency.
// lakeFoot uses {v} for the table version and {n} for the small-file count.
export type PipelineCopy = {
  locale: string;
  title: string;
  intro: string;
  makeChange: string;
  pause: string;
  play: string;
  source: { name: string; sub: string; aria: string };
  cdc: { name: string; sub: string; aria: string };
  kafka: { name: string; sub: string; aria: string; note: string };
  lake: { name: string; sub: string; aria: string };
  cols: { id: string; item: string; status: string };
  status: Record<Status, string>;
  insert: string;
  you: string;
  items: string[];
  lakeFoot: string;
  optimize: string;
  compaction: string;
  captured: string;
  latency: string;
  simulated: string;
};


const FLOW: Status[] = ["placed", "packed", "shipped", "delivered"];
const ITEM_COUNT = 8;
const PARTITIONS = 3;
const STEP_MS = [0, 340, 700, 1060];

const INITIAL_ROWS: Row[] = [
  { id: 1041, item: 0, status: "shipped" },
  { id: 1042, item: 1, status: "packed" },
  { id: 1043, item: 2, status: "placed" },
  { id: 1044, item: 3, status: "packed" },
];

const INITIAL_LOG: LogEntry[] = [
  { seq: 3, op: "u", id: 1041, detail: { kind: "move", from: "packed", to: "shipped" }, lsn: "0/3A7F28", you: false },
  { seq: 2, op: "u", id: 1044, detail: { kind: "move", from: "placed", to: "packed" }, lsn: "0/3A7E90", you: false },
  { seq: 1, op: "c", id: 1043, detail: { kind: "insert" }, lsn: "0/3A7D10", you: false },
];

const lsnFor = (n: number) => `0/${(0x3a7f28 + n * 0x98).toString(16).toUpperCase()}`;

const bump = (setter: (fn: (a: number[]) => number[]) => void, i: number, d: number) =>
  setter((a) => a.map((v, j) => (j === i ? Math.max(0, v + d) : v)));

export default function PipelineDemo({ copy = PIPELINE_EN }: { copy?: PipelineCopy }) {
  const [source, setSource] = useState<Row[]>(INITIAL_ROWS);
  const [lake, setLake] = useState<Row[]>(INITIAL_ROWS);
  const [log, setLog] = useState<LogEntry[]>(INITIAL_LOG);
  const [offsets, setOffsets] = useState<number[]>([1204, 1187, 1215]);
  const [ticks, setTicks] = useState<number[][]>([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15],
  ]);
  const [version, setVersion] = useState(418);
  const [smallFiles, setSmallFiles] = useState(3);
  const [optimized, setOptimized] = useState(false);
  const [flashSrc, setFlashSrc] = useState<{ id: number; n: number } | null>(null);
  const [flashLake, setFlashLake] = useState<{ id: number; n: number } | null>(null);
  const [active, setActive] = useState<number[]>([0, 0, 0, 0]);
  const [packets, setPackets] = useState<number[]>([0, 0, 0]);
  const [captured, setCaptured] = useState(0);
  const [lastLatency, setLastLatency] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);

  const seq = useRef(3);
  const cursor = useRef(0);
  const tickId = useRef(100);
  const nextItem = useRef(4);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const rootRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<Row[]>(INITIAL_ROWS);
  const lastApply = useRef(0);

  const later = useCallback((ms: number, fn: () => void) => {
    const t = setTimeout(() => {
      timers.current.delete(t);
      fn();
    }, ms);
    timers.current.add(t);
  }, []);

  const emit = useCallback(
    (you: boolean) => {
      const rows = rowsRef.current;
      const idx = cursor.current % rows.length;
      cursor.current += 1;
      const prev = rows[idx];
      let next: Row;
      let entry: Omit<LogEntry, "seq" | "lsn">;
      if (prev.status === "delivered") {
        // Delivered orders leave the view; a new order is inserted (op "c").
        const id = Math.max(...rows.map((r) => r.id)) + 1;
        next = { id, item: nextItem.current++ % ITEM_COUNT, status: "placed" };
        entry = { op: "c", id, detail: { kind: "insert" }, you };
      } else {
        const to = FLOW[FLOW.indexOf(prev.status) + 1];
        next = { ...prev, status: to };
        entry = { op: "u", id: prev.id, detail: { kind: "move", from: prev.status, to }, you };
      }
      const updated = rows.map((r, j) => (j === idx ? next : r));
      rowsRef.current = updated;

      const started = performance.now();
      const n = ++seq.current;
      const partition = next.id % PARTITIONS;
      const jitter = ((n * 7919) % 180) - 60;
      // Changes apply in the order they were written, as they do per key in a real topic.
      const applyAt = Math.max(started + STEP_MS[3] + jitter, lastApply.current + 40);
      lastApply.current = applyAt;

      // 1. Write lands in the source table.
      setSource(updated);
      setFlashSrc({ id: next.id, n });
      bump(setActive, 0, 1);

      // 2. CDC reads it from the database log.
      later(STEP_MS[1], () => {
        bump(setActive, 0, -1);
        bump(setActive, 1, 1);
        bump(setPackets, 0, 1);
        setLog((l) => [{ ...entry, seq: n, lsn: lsnFor(n) }, ...l].slice(0, 4));
      });

      // 3. Published to the Kafka topic, keyed by order id.
      later(STEP_MS[2], () => {
        bump(setActive, 1, -1);
        bump(setActive, 2, 1);
        bump(setPackets, 1, 1);
        setOffsets((o) => o.map((v, j) => (j === partition ? v + 1 : v)));
        const tid = ++tickId.current;
        setTicks((t) => t.map((lane, j) => (j === partition ? [...lane, tid].slice(-9) : lane)));
      });

      // 4. Merged into the Delta table; small files get compacted now and then.
      later(applyAt - started, () => {
        bump(setActive, 2, -1);
        bump(setActive, 3, 1);
        bump(setPackets, 2, 1);
        setLake((rowsNow) => {
          const exists = rowsNow.some((r) => r.id === next.id);
          return exists
            ? rowsNow.map((r) => (r.id === next.id ? next : r))
            : rowsNow.map((r) => (r.id === prev.id ? next : r));
        });
        setFlashLake({ id: next.id, n });
        setVersion((v) => v + 1);
        setSmallFiles((f) => {
          if (f >= 6) {
            setOptimized(true);
            later(1600, () => setOptimized(false));
            return 1;
          }
          return f + 1;
        });
        setCaptured((c) => c + 1);
        setLastLatency(performance.now() - started);
        later(420, () => bump(setActive, 3, -1));
      });
    },
    [later]
  );

  // Autoplays for every visitor, including systems that ask for reduced motion
  // (e.g. Windows with "Animation effects" off), by the site owner's choice.
  // Pause is always available. Only run while on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const first = setTimeout(() => emit(false), 600);
    const id = setInterval(() => {
      if (document.visibilityState === "visible") emit(false);
    }, 2400);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [playing, visible, emit]);

  useEffect(() => {
    const set = timers.current;
    return () => set.forEach(clearTimeout);
  }, []);

  const latencyText =
    lastLatency === null
      ? "—"
      : `${(lastLatency / 1000).toLocaleString(copy.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s`;
  const describe = (d: Detail) => (d.kind === "insert" ? copy.insert : `${copy.status[d.from]}→${copy.status[d.to]}`);

  return (
    <div ref={rootRef} className="card pipe" role="group" aria-labelledby="pipe-title">
      <div className="pipe-top">
        <div className="pipe-intro">
          <h3 id="pipe-title">{copy.title}</h3>
          <p>{copy.intro}</p>
        </div>
        <div className="pipe-controls">
          <button type="button" className="btn btn-sm btn-primary" onClick={() => emit(true)}>
            {copy.makeChange}
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!playing}
          >
            {playing ? copy.pause : copy.play}
          </button>
        </div>
      </div>

      <div className="pipe-grid">
        <section className="stage" data-active={active[0] > 0} aria-label={copy.source.aria}>
          <header className="stage-head mono">
            <span className="stage-name">{copy.source.name}</span>
            <span className="stage-sub">{copy.source.sub}</span>
          </header>
          <div className="stage-body">
            <RowsTable rows={source} flash={flashSrc} copy={copy} showItem />
          </div>
        </section>

        <Connector n={packets[0]} />

        <section className="stage" data-active={active[1] > 0} aria-label={copy.cdc.aria}>
          <header className="stage-head mono">
            <span className="stage-name">{copy.cdc.name}</span>
            <span className="stage-sub">{copy.cdc.sub}</span>
          </header>
          <div className="stage-body">
            {log.map((l) => (
              <div key={l.seq} className="log-line">
                <span className="op" data-op={l.op}>
                  {l.op}
                </span>
                <span>
                  #{l.id} {describe(l.detail)}
                  {l.you && <span style={{ color: "var(--cobalt)" }}> · {copy.you}</span>}
                </span>
                <span className="log-lsn">{l.lsn}</span>
              </div>
            ))}
          </div>
        </section>

        <Connector n={packets[1]} />

        <section className="stage" data-active={active[2] > 0} aria-label={copy.kafka.aria}>
          <header className="stage-head mono">
            <span className="stage-name">{copy.kafka.name}</span>
            <span className="stage-sub">{copy.kafka.sub}</span>
          </header>
          <div className="stage-body">
            {ticks.map((lane, p) => (
              <div key={p} className="lane">
                <span style={{ color: "var(--ink-3)" }}>P{p}</span>
                <span className="lane-ticks" aria-hidden="true">
                  {lane.map((t, i) => (
                    <span key={t} className="tick" data-new={i === lane.length - 1 && t > 100 ? "" : undefined} />
                  ))}
                </span>
                <span className="tnum">{offsets[p].toLocaleString(copy.locale)}</span>
              </div>
            ))}
            <p style={{ color: "var(--ink-3)", fontSize: 11, marginTop: 10 }}>{copy.kafka.note}</p>
          </div>
        </section>

        <Connector n={packets[2]} />

        <section className="stage" data-active={active[3] > 0} aria-label={copy.lake.aria}>
          <header className="stage-head mono">
            <span className="stage-name">{copy.lake.name}</span>
            <span className="stage-sub">{copy.lake.sub}</span>
          </header>
          <div className="stage-body">
            <RowsTable rows={lake} flash={flashLake} copy={copy} />
            <div className="lake-foot tnum">
              <span>{copy.lakeFoot.replace("{v}", String(version)).replace("{n}", String(smallFiles))}</span>
              <span className={optimized ? "optimize" : undefined}>{optimized ? copy.optimize : copy.compaction}</span>
            </div>
          </div>
        </section>
      </div>

      <div className="pipe-readout mono tnum" aria-live="off">
        <span>
          {copy.captured} <strong>{captured}</strong>
        </span>
        <span>
          {copy.latency} <strong>{latencyText}</strong>
        </span>
        <span>{copy.simulated}</span>
      </div>
    </div>
  );
}

function RowsTable({
  rows,
  flash,
  copy,
  showItem = false,
}: {
  rows: Row[];
  flash: { id: number; n: number } | null;
  copy: PipelineCopy;
  showItem?: boolean;
}) {
  return (
    <table className="ptable">
      <thead>
        <tr>
          <th>{copy.cols.id}</th>
          {showItem && <th>{copy.cols.item}</th>}
          <th>{copy.cols.status}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const isFlash = flash?.id === r.id;
          return (
            <tr key={isFlash ? `${r.id}-${flash!.n}` : r.id} data-flash={isFlash ? "" : undefined}>
              <td>{r.id}</td>
              {showItem && <td style={{ color: "var(--ink-2)", paddingRight: 8 }}>{copy.items[r.item]}</td>}
              <td>{copy.status[r.status]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Connector({ n }: { n: number }) {
  return (
    <div className="conn" aria-hidden="true">
      {n > 0 && <span key={n} className="packet" />}
    </div>
  );
}
