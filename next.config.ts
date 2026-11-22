import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home folder made Turbopack treat ~ as the
  // project root (and watch/scan all of it). Pin the root to this project.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
