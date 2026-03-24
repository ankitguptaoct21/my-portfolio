import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const resumePath = path.join(
    process.cwd(),
    "app",
    "assets",
    "Resume_Ankit_Gupta_Senior_Software_Engineer.pdf"
  );

  try {
    const fileBuffer = await readFile(resumePath);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'inline; filename="Resume_Ankit_Gupta_Senior_Software_Engineer.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Resume not found", { status: 404 });
  }
}
