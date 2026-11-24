import Link from "next/link";
import DeltaMark from "../../components/DeltaMark";
import FullscreenToggle from "../../components/FullscreenToggle";
import { DE_META } from "../../locales/de";
import { DE_PREFIX } from "../../site";

export const metadata = {
  title: DE_META.resumeTitle,
  description: DE_META.resumeDescription,
};

// The German site's résumé page: same English CV (the version that mentions the move to
// Germany), German labels.
export default function GermanResumePage() {
  const file = `${DE_PREFIX}/resume/file`;
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
        <Link href={`${DE_PREFIX}/`} className="brand">
          <DeltaMark />
          Ankit Gupta
        </Link>
        <div className="resume-actions">
          <FullscreenToggle targetId="resume-viewer" fallbackHref={file} enterLabel="Vollbild" exitLabel="Vollbild beenden" />
          <a href={file} className="btn btn-sm" download="Ankit_Gupta_Resume.pdf">
            PDF herunterladen
          </a>
          <Link href={`${DE_PREFIX}/`} className="btn btn-sm btn-primary">
            Zur Website
          </Link>
        </div>
      </div>

      {/* Height and padding live in CSS (.resume-viewer) so full screen can override them. */}
      <div id="resume-viewer" className="figure resume-viewer">
        <iframe
          src={file}
          title="Lebenslauf von Ankit Gupta (PDF)"
          style={{ width: "100%", height: "100%", border: 0, background: "var(--panel)" }}
        />
        <FullscreenToggle
          targetId="resume-viewer"
          fallbackHref={file}
          variant="exit"
          enterLabel="Vollbild"
          exitLabel="Vollbild beenden"
        />
      </div>
    </main>
  );
}
