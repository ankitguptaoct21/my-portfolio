import Link from "next/link";
import DeltaMark from "../components/DeltaMark";
import FullscreenToggle from "../components/FullscreenToggle";

export const metadata = {
  title: "Résumé",
  description: "Résumé of Ankit Gupta, Senior Software Engineer, Backend & Data Engineering.",
};

export default function ResumePage() {
  return (
    <main className="wrap" style={{ paddingBlock: "24px 32px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <Link href="/" className="brand">
          <DeltaMark />
          Ankit Gupta
        </Link>
        <div className="resume-actions">
          <FullscreenToggle targetId="resume-viewer" fallbackHref="/resume/file" />
          <a href="/resume/file" className="btn btn-sm" download="Ankit_Gupta_Resume.pdf">
            Download PDF
          </a>
          <Link href="/" className="btn btn-sm btn-primary">
            Back to site
          </Link>
        </div>
      </div>

      {/* Height and padding live in CSS (.resume-viewer) so full screen can override them. */}
      <div id="resume-viewer" className="figure resume-viewer">
        <iframe
          src="/resume/file"
          title="Résumé of Ankit Gupta (PDF)"
          style={{ width: "100%", height: "100%", border: 0, background: "var(--panel)" }}
        />
        <FullscreenToggle targetId="resume-viewer" fallbackHref="/resume/file" variant="exit" />
      </div>
    </main>
  );
}
