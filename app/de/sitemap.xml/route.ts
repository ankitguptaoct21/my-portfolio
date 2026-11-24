import { DE_SITE_URL } from "../../site";

// sitemap.xml for the German site (deu.theankitgupta.com/sitemap.xml via proxy.ts).
// It lists only German pages; the India site's sitemap never mentions this one.
export const dynamic = "force-static";

export function GET() {
  const urls = [
    { loc: `${DE_SITE_URL}/`, priority: "1" },
    { loc: `${DE_SITE_URL}/resume`, priority: "0.8" },
  ];
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) => `<url><loc>${u.loc}</loc><changefreq>monthly</changefreq><priority>${u.priority}</priority></url>`
    ),
    "</urlset>",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
