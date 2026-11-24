import { llmsText } from "../machine";
import { INDIA_MARKET } from "../site";

// A plain-text profile for AI tools (https://llmstxt.org) for theankitgupta.com (India).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsText(INDIA_MARKET), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
