"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

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

export default function FreshnessClocks() {
  const [batchAge, setBatchAge] = useState(START_AGE);
  const [liveAge, setLiveAge] = useState(0.8);
  const [runs, setRuns] = useState(0);
  const [visible, setVisible] = useState(false);
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
    if (!visible) return;
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
  }, [visible]);

  const t = Math.min(1, batchAge / PERIOD);
  const batchStyle = { "--mix": `${Math.round(Math.min(1, t * 1.5) * 100)}%` } as CSSProperties;

  return (
    <figure ref={rootRef} className="card fresh" aria-labelledby="fresh-title">
      <figcaption className="fresh-head">
        <h3 id="fresh-title">Why real time matters</h3>
        <p>
          How old is the data your AI is reading right now? Below is the same table, copied once an hour versus
          captured as it changes. This simulation runs at 60× speed.
        </p>
      </figcaption>

      <p className="sr-only">
        Copied once an hour, the data is up to an hour old before the next copy. Captured in real time, it stays
        about a second old.
      </p>

      <div className="fresh-grid" aria-hidden="true">
        <div key={runs} className={runs ? "clock clock-batch ran" : "clock clock-batch"} style={batchStyle}>
          <p className="clock-label">Copied once an hour</p>
          <p className="clock-num tnum">{mmss(batchAge)}</p>
          <p className="clock-unit">minutes old</p>
          <div className="clock-bar">
            <span style={{ width: `${Math.max(1, t * 100).toFixed(1)}%` }} />
          </div>
        </div>
        <div className="clock clock-live">
          <p className="clock-label">Captured in real time · what I build</p>
          <p className="clock-num tnum">{liveAge.toFixed(1)}</p>
          <p className="clock-unit">seconds old</p>
          <div className="clock-bar">
            <span style={{ width: "1%" }} />
          </div>
        </div>
      </div>
    </figure>
  );
}
