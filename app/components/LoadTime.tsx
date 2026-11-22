"use client";

import { useEffect, useState } from "react";

// Shows how long this page took to load in the visitor's browser.
export default function LoadTime() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const read = () => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (nav && nav.loadEventEnd > 0) setMs(Math.round(nav.loadEventEnd));
    };
    if (document.readyState === "complete") {
      const t = setTimeout(read, 0);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", read, { once: true });
    return () => window.removeEventListener("load", read);
  }, []);

  if (ms === null) return null;
  return (
    <span className="tnum">
      This page loaded in {ms.toLocaleString("en-US")} ms on your connection. I measure everything.
    </span>
  );
}
