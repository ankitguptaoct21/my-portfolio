import { llmsText } from "../../machine";
import { GERMANY_MARKET } from "../../locales/de";

// llms.txt for the German site (served at deu.theankitgupta.com/llms.txt via proxy.ts).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsText(GERMANY_MARKET), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
