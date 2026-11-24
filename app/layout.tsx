import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { PROFILE } from "./content";
import { SITE_URL } from "./site";
import "./globals.css";

// Display: Archivo at an expanded width, like lettering on an engineering drawing.
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const body = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
});

// Root metadata describes the India site (theankitgupta.com); app/de/layout.tsx overrides it
// for the German site.
const description = `${PROFILE.name}, ${PROFILE.role} (${PROFILE.discipline}). ${PROFILE.pitch} Based in ${PROFILE.location}.`;

export const metadata: Metadata = {
  // Without this, link previews on LinkedIn, Slack and WhatsApp resolve to localhost.
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    types: { "application/json": "/resume.json", "text/plain": "/llms.txt" },
  },
  title: {
    default: `${PROFILE.name} · ${PROFILE.tagline}`,
    template: `%s · ${PROFILE.name}`,
  },
  description,
  authors: [{ name: PROFILE.name, url: PROFILE.linkedin }],
  keywords: [
    "Ankit Gupta",
    "Senior Software Engineer",
    "Backend Engineer",
    "Data Engineer",
    "Data Platform Engineer",
    "Real-time data for AI",
    "AI data infrastructure",
    "Change Data Capture",
    "CDC",
    "Apache Kafka",
    "Microsoft Fabric",
    "Lakehouse",
    "PySpark",
    "Spark SQL",
    "Python",
    "Node.js",
    "TypeScript",
    "Bengaluru",
    "India",
  ],
  openGraph: {
    type: "profile",
    url: "/",
    siteName: PROFILE.name,
    title: `${PROFILE.name} · ${PROFILE.tagline}`,
    description: PROFILE.pitch,
    firstName: "Ankit",
    lastName: "Gupta",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} · ${PROFILE.tagline}`,
    description: PROFILE.pitch,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f17" },
  ],
};

// Structured data (schema.org Person) is rendered by each page, so the India and German
// sites each point at their own URL. See components/PersonJsonLd.tsx.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
