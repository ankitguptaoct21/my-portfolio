import Link from "next/link";
import DeltaMark from "../components/DeltaMark";

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
        <div style={{ display: "flex", gap: 8 }}>
          <a href="/resume/file" className="btn btn-sm" download="Ankit_Gupta_Resume.pdf">
            Download PDF
          </a>
          <Link href="/" className="btn btn-sm btn-primary">
            Back to site
          </Link>
        </div>
      </div>

      <div className="figure" style={{ height: "82vh", padding: 8 }}>
        <iframe
          src="/resume/file"
          title="Résumé of Ankit Gupta (PDF)"
          style={{ width: "100%", height: "100%", border: 0, background: "var(--panel)" }}
        />
      </div>
    </main>
  );
}
