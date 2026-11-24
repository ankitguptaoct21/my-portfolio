import { jsonResume } from "../machine";
import { INDIA_MARKET } from "../site";

// The résumé in JSON Resume format for theankitgupta.com (India).
export const dynamic = "force-static";

export function GET() {
  return Response.json(jsonResume(INDIA_MARKET), {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
