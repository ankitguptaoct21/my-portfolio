import { jsonResume } from "../../machine";
import { GERMANY_MARKET } from "../../locales/de";

// JSON Resume for the German site (served at deu.theankitgupta.com/resume.json via proxy.ts).
export const dynamic = "force-static";

export function GET() {
  return Response.json(jsonResume(GERMANY_MARKET), {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
