// Absolute origin of the deployed site, used wherever a full URL is required
// (canonical link, sitemap, structured data, llms.txt, resume.json).
// Set NEXT_PUBLIC_SITE_URL once a custom domain exists. On Vercel the production
// domain is picked up automatically; locally it falls back to localhost.
const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelProduction ? `https://${vercelProduction}` : "http://localhost:3000")
).replace(/\/+$/, "");

export const absolute = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
