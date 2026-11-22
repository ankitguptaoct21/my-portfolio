import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The link card people see on LinkedIn, Slack and WhatsApp before they ever open the site.
export const alt = "Ankit Gupta · Every change, captured. Senior Software Engineer, Backend & Data Engineering.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0c1726";
const PAPER = "#eef1f4";
const COBALT = "#8f9dff";
const MUTED = "#9caabd";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public", "ankit-gupta.jpg"), "base64");

  const stats = [
    { v: "−80%", l: "pipeline latency" },
    { v: "~60%", l: "more efficient tables" },
    { v: "−30%", l: "Kafka processing latency" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          color: PAPER,
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="40" height="40" viewBox="0 0 24 24">
              <path d="M12 2.5 22.5 21.5H1.5Z" fill={COBALT} />
              <path d="M12 9.6 17.1 18.6H6.9Z" fill={INK} />
            </svg>
            <div style={{ display: "flex", fontSize: 26, letterSpacing: 1, color: MUTED }}>
              ANKIT GUPTA · REAL-TIME DATA FOR AI
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            <div style={{ display: "flex" }}>
              Every&nbsp;<span style={{ color: COBALT }}>change</span>,
            </div>
            <div style={{ display: "flex" }}>captured.</div>
          </div>

          <div style={{ display: "flex", gap: 44 }}>
            {stats.map((s) => (
              <div key={s.l} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>{s.v}</div>
                <div style={{ display: "flex", fontSize: 22, color: MUTED }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: 48, width: 300 }}>
          <img
            src={`data:image/jpeg;base64,${photo}`}
            width={300}
            height={391}
            style={{ objectFit: "cover", border: `2px solid ${COBALT}` }}
            alt=""
          />
          <div style={{ display: "flex", fontSize: 22, color: MUTED }}>In Germany from Jan 2027</div>
        </div>
      </div>
    ),
    size
  );
}
