import { readFile } from "node:fs/promises";
import path from "node:path";

// The CV for the German site: the cleaned PDF that still says "open to relocating to
// Germany". The India site's /resume/file serves the version without that line.
export async function GET() {
  const resumePath = path.join(process.cwd(), "app", "assets", "Resume_Ankit_Gupta_Senior_Software_Engineer_DE.pdf");
  try {
    const fileBuffer = await readFile(resumePath);
    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Resume_Ankit_Gupta_Senior_Software_Engineer.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Resume not found", { status: 404 });
  }
}
