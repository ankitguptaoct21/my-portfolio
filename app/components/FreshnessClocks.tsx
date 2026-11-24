"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CLOCKS_EN } from "../locales/ui-en";

// Why real time matters: how old the data is when it's copied once an hour,
// versus captured as it changes. Simulated at 60× speed (one second = one minute).
const SPEED = 60;
const PERIOD = 3600; // seconds between hourly copies
const START_AGE = 23 * 60 + 41; // the still frame shown before the clocks start

const mmss = (age: number) => {
  const m = Math.floor(age / 60);
  const s = Math.floor(age % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

// All visible text; the German site passes its own. `locale` formats 0.8 vs 0,8.
export type ClocksCopy = {
  locale: string;
  title: string;
  body: string;
  sr: string;
  batchLabel: string;
  batchUnit: string;
  liveLabel: string;
  liveUnit: string;
  pause: string;
  play: string;
};


export default function FreshnessClocks({ copy = CLOCKS_EN }: { copy?: ClocksCopy }) {
  const [batchAge, setBatchAge] = useState(START_AGE);
  const [liveAge, setLiveAge] = useState(0.8);
  const [runs, setRuns] = useState(0);
  const [visible, setVisible] = useState(false);
  // Autoplays; the Pause button stops both clocks and Play resumes from the same age.
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const ageRef = useRef(START_AGE);

  // Runs for every visitor, including systems that ask for reduced motion
  // (e.g. Windows with "Animation effects" off), by the site owner's choice.
  // Only run while on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused) return;
    let base = performance.now() - (ageRef.current / SPEED) * 1000;
    let raf = 0;
    let last = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 100) return;
      last = now;
      let age = ((now - base) / 1000) * SPEED;
      if (age >= PERIOD) {
        base = now;
        age = 0;
        setRuns((r) => r + 1);
      }
      ageRef.current = age;
      setBatchAge(age);
    };
    raf = requestAnimationFrame(frame);
    const live = setInterval(() => setLiveAge(0.3 + Math.random() * 1.1), 900);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(live);
    };
  }, [visible, paused]);

  const t = Math.min(1, batchAge / PERIOD);
  const batchStyle = { "--mix": `${Math.round(Math.min(1, t * 1.5) * 100)}%` } as CSSProperties;

  return (
    <figure ref={rootRef} className="card fresh" aria-labelledby="fresh-title">
      <figcaption className="fresh-head">
        <h3 id="fresh-title">{copy.title}</h3>
        <button
          type="button"
          className="btn btn-sm fresh-toggle"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
        >
          {paused ? copy.play : copy.pause}
        </button>
        <p>{copy.body}</p>
      </figcaption>

      <p className="sr-only">{copy.sr}</p>

      <div className="fresh-grid" aria-hidden="true">
        <div key={runs} className={runs ? "clock clock-batch ran" : "clock clock-batch"} style={batchStyle}>
          <p className="clock-label">{copy.batchLabel}</p>
          <p className="clock-num tnum">{mmss(batchAge)}</p>
          <p className="clock-unit">{copy.batchUnit}</p>
          <div className="clock-bar">
            <span style={{ width: `${Math.max(1, t * 100).toFixed(1)}%` }} />
          </div>
        </div>
        <div className="clock clock-live">
          <p className="clock-label">{copy.liveLabel}</p>
          <p className="clock-num tnum">
            {liveAge.toLocaleString(copy.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </p>
          <p className="clock-unit">{copy.liveUnit}</p>
          <div className="clock-bar">
            <span style={{ width: "1%" }} />
          </div>
        </div>
      </div>
    </figure>
  );
}
