// Absolute origins of the two sites, used wherever a full URL is required
// (canonical link, sitemap, structured data, llms.txt, resume.json).
// Set NEXT_PUBLIC_SITE_URL once a custom domain exists. On Vercel the production
// domain is picked up automatically; locally it falls back to localhost.
import { PROFILE } from "./content";
import type { Market } from "./machine";

const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;

// theankitgupta.com: the English site for employers in India.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelProduction ? `https://${vercelProduction}` : "http://localhost:3000")
).replace(/\/+$/, "");

export const absolute = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

// deu.theankitgupta.com: the German site. In production proxy.ts maps that host onto the
// /de routes, so its public paths have no prefix. Locally (no subdomain) it is reached
// at /de on the same origin.
const mainHost = new URL(SITE_URL).hostname;
const noSubdomain = mainHost === "localhost" || mainHost === "127.0.0.1" || mainHost.endsWith(".vercel.app");
const deOverride = process.env.NEXT_PUBLIC_DE_SITE_URL?.replace(/\/+$/, "");
export const DE_ORIGIN = deOverride || (noSubdomain ? SITE_URL : `https://deu.${mainHost}`);
export const DE_PREFIX = deOverride || !noSubdomain ? "" : "/de";
export const DE_SITE_URL = `${DE_ORIGIN}${DE_PREFIX}`;

// Availability as the India site states it (no mention of Germany).
export const INDIA_MARKET: Market = {
  siteUrl: SITE_URL,
  summaryTail: `Based in ${PROFILE.location}. ${PROFILE.availability}`,
  availability: {
    heading: "## Availability",
    lines: [
      `Based in ${PROFILE.location}.`,
      `${PROFILE.workSetup}.`,
      `Notice period: ${PROFILE.noticePeriod}.`,
    ],
  },
};
