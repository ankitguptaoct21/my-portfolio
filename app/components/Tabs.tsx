"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

// fill: the panel is exactly as tall as the screen area, so a child (e.g. the experience
// timeline) can scroll on its own while the panel itself never does.
export type Tab = { id: string; label: string; content: ReactNode; fill?: boolean };

// Old section links (shared before the tabbed layout) still land on the right tab.
const ALIASES: Record<string, string> = {
  top: "overview",
  proof: "overview",
  about: "overview",
  contact: "overview",
  glance: "overview",
  ai: "what",
  work: "experience",
  toolbox: "skills",
};

// One section on screen at a time. Every panel is rendered into the HTML (hidden
// until selected), so search engines and AI tools still read all of it.
export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = useRef<HTMLDivElement>(null);
  const ids = tabs.map((t) => t.id).join(",");

  // Open the tab named in the URL (#experience), now and when the hash changes.
  useEffect(() => {
    const known = ids.split(",");
    const fromHash = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      const id = known.includes(h) ? h : ALIASES[h];
      if (id) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [ids]);

  const select = (id: string, focus = false) => {
    setActive(id);
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {
      // Some embedded browsers refuse history changes; the tab still switches.
    }
    if (panels.current) panels.current.scrollTop = 0;
    const i = tabs.findIndex((t) => t.id === id);
    const btn = buttons.current[i];
    btn?.scrollIntoView({ block: "nearest", inline: "nearest" });
    if (focus) btn?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let j: number | null = null;
    if (e.key === "ArrowRight") j = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") j = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = tabs.length - 1;
    if (j === null) return;
    e.preventDefault();
    select(tabs[j].id, true);
  };

  return (
    <>
      <div className="tabbar" role="tablist" aria-label="Sections">
        {tabs.map((t, i) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              className="tab"
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="panels" ref={panels}>
        {tabs.map((t, i) => (
          <section
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={t.id !== active}
            className={t.fill ? "panel panel-fill" : "panel"}
            tabIndex={0}
          >
            {t.content}
            {i < tabs.length - 1 && (
              <button type="button" className="next-tab" onClick={() => select(tabs[i + 1].id, true)}>
                Next: {tabs[i + 1].label} <span aria-hidden="true">→</span>
              </button>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
