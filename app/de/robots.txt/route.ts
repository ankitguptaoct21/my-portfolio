import { DE_SITE_URL } from "../../site";

// robots.txt for the German site (deu.theankitgupta.com/robots.txt via proxy.ts).
export const dynamic = "force-static";

export function GET() {
  const body = ["User-Agent: *", "Allow: /", "", `Sitemap: ${DE_SITE_URL}/sitemap.xml`, ""].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
