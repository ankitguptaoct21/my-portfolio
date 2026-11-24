import { ImageResponse } from "next/og";
import { DE_ORIGIN } from "../site";
import { DE_META } from "../locales/de";

// The link card people see on LinkedIn, Slack and WhatsApp before they ever open the site.
// The German site's link card: same design as the India one, German text. No photo.
export const alt = "Ankit Gupta, Senior Backend & Data Engineer. Umzug nach Deutschland im Januar 2027.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0c1726";
const PAPER = "#f3f5f8";
const COBALT = "#8f9dff";
const MUTED = "#a5b2c4";

export default function GermanImage() {
  const stats = DE_META.ogStats;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          padding: "60px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="40" height="40" viewBox="0 0 24 24">
            <path d="M12 2.5 22.5 21.5H1.5Z" fill={COBALT} />
            <path d="M12 9.6 17.1 18.6H6.9Z" fill={INK} />
          </svg>
          <div style={{ display: "flex", fontSize: 26, color: MUTED }}>{new URL(DE_ORIGIN).host}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 100, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            Ankit Gupta
          </div>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 700, color: COBALT }}>
            Senior Backend &amp; Data Engineer
          </div>
          <div style={{ display: "flex", fontSize: 28, color: MUTED, marginTop: 8 }}>
            {DE_META.ogLine}
          </div>
        </div>

        <div style={{ display: "flex", gap: 56 }}>
          {stats.map((s) => (
            <div key={s.l} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 48, fontWeight: 800 }}>{s.v}</div>
              <div style={{ display: "flex", fontSize: 22, color: MUTED }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
