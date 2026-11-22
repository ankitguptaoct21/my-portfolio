import type { MetadataRoute } from "next";
import { absolute } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absolute("/"), changeFrequency: "monthly", priority: 1 },
    { url: absolute("/resume"), changeFrequency: "monthly", priority: 0.8 },
  ];
}
