"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// FIG. 2: how old the data is, moved two ways. An hourly batch copy climbs toward an hour
// before the next run resets it; change data capture stays around a second behind.
// Simulated at 60× speed: one real second is one simulated minute.
const SPEED = 60;
const PERIOD = 3600; // seconds between batch runs
const START_AGE = 23 * 60 + 41; // the still frame shown before the clocks start

const mmss = (age: number) => {
  const m = Math.floor(age / 60);
  const s = Math.floor(age % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export default function FreshnessClocks() {
  const [batchAge, setBatchAge] = useState(START_AGE);
  const [cdcAge, setCdcAge] = useState(0.8);
  const [runs, setRuns] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const ageRef = useRef(START_AGE);

  // Respect reduced motion: the still frame stays.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Only run while on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
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
    const cdc = setInterval(() => setCdcAge(0.3 + Math.random() * 1.1), 900);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(cdc);
    };
  }, [visible, reduced]);

  const t = Math.min(1, batchAge / PERIOD);
  const batchStyle = { "--mix": `${Math.round(Math.min(1, t * 1.5) * 100)}%` } as CSSProperties;

  return (
    <figure ref={rootRef} className="figure fresh" aria-labelledby="fig2-title">
      <figcaption className="fresh-top">
        <p id="fig2-title" className="mono fig-caption">
          Fig. 2 · How old is the data your AI reads?
        </p>
        <p className="fresh-sub">
          Simulated at 60× speed: the same table, moved two ways. Both bars share one scale, an hour.
        </p>
      </figcaption>

      <p className="sr-only">
        With an hourly batch copy, data is up to an hour old before the next run. With change data capture it
        stays about a second old.
      </p>

      <div className="fresh-grid" aria-hidden="true">
        <div key={runs} className={runs ? "clock clock-batch ran" : "clock clock-batch"} style={batchStyle}>
          <p className="mono clock-label">Hourly batch copy</p>
          <p className="display clock-num tnum">{mmss(batchAge)}</p>
          <p className="clock-unit">minutes : seconds old</p>
          <div className="clock-bar">
            <span style={{ width: `${Math.max(1, t * 100).toFixed(1)}%` }} />
          </div>
        </div>
        <div className="clock clock-cdc">
          <p className="mono clock-label">Change data capture</p>
          <p className="display clock-num tnum">{cdcAge.toFixed(1)}</p>
          <p className="clock-unit">seconds old</p>
          <div className="clock-bar">
            <span style={{ width: "1%" }} />
          </div>
        </div>
      </div>
    </figure>
  );
}
