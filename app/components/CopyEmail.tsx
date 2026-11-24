"use client";

import { useRef, useState } from "react";

export default function CopyEmail({
  email,
  className = "btn",
  label = "Copy email",
  copiedLabel = "Copied",
}: {
  email: string;
  className?: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard refused: select the address so it can be copied by hand.
      const el = textRef.current;
      if (!el) return;
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  return (
    <>
      <span ref={textRef} className="email-text">
        {email}
      </span>
      <button type="button" className={className} onClick={copy} aria-live="polite">
        {copied ? copiedLabel : label}
      </button>
    </>
  );
}
