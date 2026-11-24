"use client";

import { useEffect, useState } from "react";
import { Maximize, Minimize } from "lucide-react";

type FsElement = HTMLElement & { webkitRequestFullscreen?: () => void };
type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
};

const currentFullscreen = () => {
  const d = document as FsDocument;
  return d.fullscreenElement ?? d.webkitFullscreenElement ?? null;
};

// "enter" opens the element with id `targetId` full screen. Where a browser can't do
// that (iPhone Safari), it opens `fallbackHref` in a new tab instead.
// "exit" renders only while full screen, inside the full-screen element.
export default function FullscreenToggle({
  targetId,
  fallbackHref,
  variant = "enter",
  enterLabel = "Full screen",
  exitLabel = "Exit full screen",
}: {
  targetId: string;
  fallbackHref: string;
  variant?: "enter" | "exit";
  enterLabel?: string;
  exitLabel?: string;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sync = () => setActive(currentFullscreen() !== null);
    sync();
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  const enter = async () => {
    const el = document.getElementById(targetId) as FsElement | null;
    if (el && document.fullscreenEnabled && el.requestFullscreen) {
      try {
        await el.requestFullscreen();
        return;
      } catch {
        // Fall through to the new-tab fallback.
      }
    } else if (el?.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
      return;
    }
    window.open(fallbackHref, "_blank", "noopener");
  };

  const exit = () => {
    const d = document as FsDocument;
    if (d.fullscreenElement) void d.exitFullscreen();
    else d.webkitExitFullscreen?.();
  };

  if (variant === "exit") {
    if (!active) return null;
    return (
      <button type="button" className="btn btn-sm btn-primary fs-exit" onClick={exit}>
        <Minimize size={15} aria-hidden="true" />
        {exitLabel}
      </button>
    );
  }

  return (
    <button type="button" className="btn btn-sm fs-enter" onClick={enter} title={enterLabel} aria-label={enterLabel}>
      <Maximize size={15} aria-hidden="true" />
      <span className="fs-label">{enterLabel}</span>
    </button>
  );
}
