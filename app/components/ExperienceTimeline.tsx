"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TIMELINE_EN } from "../locales/ui-en";

export type TimelineItem =
  | {
      type: "job";
      id: string;
      period: string;
      role: string;
      company: string;
      product: string;
      kind: string;
      highlights: string[];
      stack: string[];
    }
  | { type: "break"; id: string; period: string; label: string };

// Visible text; the German site passes its own.
export type TimelineCopy = { hint: string; aria: string };

// Experience as a vertical timeline, newest first. Only the timeline scrolls: while this
// tab is open, a wheel/trackpad scroll anywhere on the page moves the timeline instead.
// As it scrolls, the line fills with colour and the dot of the role in view lights up.
export default function ExperienceTimeline({
  items,
  copy = TIMELINE_EN,
}: {
  items: TimelineItem[];
  copy?: TimelineCopy;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [rail, setRail] = useState({ top: 0, height: 0 });
  const [fill, setFill] = useState(0);
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const sc = scrollRef.current;
    const inner = innerRef.current;
    if (!sc || !inner || sc.offsetParent === null) return; // tab hidden
    const base = inner.getBoundingClientRect().top;
    const ys = [...inner.querySelectorAll<HTMLElement>(".tl-dot")].map((d) => {
      const r = d.getBoundingClientRect();
      return r.top + r.height / 2 - base;
    });
    if (ys.length === 0) return;
    const first = ys[0];
    const last = ys[ys.length - 1];
    const max = sc.scrollHeight - sc.clientHeight;
    const scrollable = max > 1;
    // 0 at the top, 1 at the bottom; a list that fits shows as complete. Browsers can stop
    // half a pixel short of the end, so the last 2px count as the end.
    const atBottom = sc.scrollTop >= max - 2;
    const p = !scrollable || atBottom ? 1 : Math.min(1, Math.max(0, sc.scrollTop / max));
    const marker = first + p * (last - first);
    let current = 0;
    ys.forEach((y, i) => {
      if (y <= marker + 1) current = i;
    });
    setRail({ top: first, height: last - first });
    setFill(marker - first);
    setActive(scrollable ? current : 0);
    setAtEnd(!scrollable || atBottom);
  }, []);

  const schedule = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(measure);
  }, [measure]);

  // Re-measure on scroll, on resize, and when the tab becomes visible (size 0 → real).
  useEffect(() => {
    const sc = scrollRef.current;
    const inner = innerRef.current;
    if (!sc || !inner) return;
    sc.addEventListener("scroll", schedule, { passive: true });
    const ro = new ResizeObserver(schedule);
    ro.observe(sc);
    ro.observe(inner);
    schedule();
    return () => {
      sc.removeEventListener("scroll", schedule);
      ro.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [schedule]);

  // Wheel anywhere on the page scrolls the timeline while this tab is open.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const sc = scrollRef.current;
      if (!sc || sc.offsetParent === null) return; // another tab is open
      if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // zoom or sideways
      const target = e.target instanceof Element ? e.target : null;
      if (target && sc.contains(target)) return; // native scrolling handles it
      // Leave other areas that can scroll vertically themselves (e.g. a tall sidebar) alone.
      for (let el = target; el && el !== document.body; el = el.parentElement) {
        const oy = window.getComputedStyle(el).overflowY;
        if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 1) return;
      }
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? sc.clientHeight : 1;
      sc.scrollTop += e.deltaY * unit;
      e.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Position of each role among the roles only (the career break has no dot).
  const jobIndexById = new Map(
    items.filter((it) => it.type === "job").map((it, i) => [it.id, i] as const)
  );

  return (
    <div className={atEnd ? "tl-wrap is-end" : "tl-wrap"}>
      <div ref={scrollRef} className="tl-scroll" tabIndex={0} aria-label={copy.aria}>
        <div ref={innerRef} className="tl-inner">
          <div className="tl-rail" aria-hidden="true" style={{ top: rail.top, height: rail.height }}>
            <span className="tl-fill" style={{ height: Math.max(0, fill) }} />
          </div>
          <ol className="tl">
            {items.map((it) => {
              if (it.type === "break") {
                return (
                  <li key={it.id} className="tl-break">
                    <p className="tl-when">{it.period}</p>
                    <p className="tl-break-label">
                      <span className="tl-when-inline">{it.period} · </span>
                      {it.label}
                    </p>
                  </li>
                );
              }
              const jobIndex = jobIndexById.get(it.id) ?? 0;
              const state = jobIndex === active ? " is-active" : jobIndex < active ? " is-past" : "";
              return (
                <li key={it.id} className={`tl-item${state}`}>
                  <p className="tl-when">{it.period}</p>
                  <span className="tl-dot" aria-hidden="true" />
                  <div className="tl-body">
                    <p className="tl-when-inline">{it.period}</p>
                    <h3 className="job-title">
                      {it.role} <span>· {it.company}</span>
                    </h3>
                    <p className="job-product">
                      <strong>{it.product}</strong> · {it.kind}
                    </p>
                    <ul className="job-points">
                      {it.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <ul className="tags">
                      {it.stack.map((s) => (
                        <li key={s} className="tag">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <p className="tl-hint" aria-hidden="true">
        {copy.hint}
      </p>
    </div>
  );
}
