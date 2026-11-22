import type { MetadataRoute } from "next";
import { absolute } from "./site";

// Open to every crawler, AI crawlers included: being found is the point of this site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absolute("/sitemap.xml"),
  };
}
