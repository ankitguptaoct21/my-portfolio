import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { PROFILE, CASES } from "./content";
import { SITE_URL, absolute } from "./site";
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

const description = `${PROFILE.name}, ${PROFILE.role} (${PROFILE.discipline}). ${PROFILE.pitch} ${PROFILE.relocation}.`;

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
    "Germany",
    "Opportunity Card",
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
    { media: "(prefers-color-scheme: light)", color: "#eef1f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f17" },
  ],
};

// Machine-readable profile, so search engines and AI sourcing tools describe Ankit accurately.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: `${PROFILE.role}, ${PROFILE.discipline}`,
  description: PROFILE.summary,
  url: SITE_URL,
  image: absolute("/ankit-gupta.jpg"),
  email: `mailto:${PROFILE.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: CASES[0].company },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Devi Ahilya Vishwavidyalaya" },
  knowsLanguage: ["hi", "en", "de"],
  knowsAbout: [
    "Change Data Capture",
    "Apache Kafka",
    "Microsoft Fabric",
    "Lakehouse performance tuning",
    "PySpark",
    "Spark SQL",
    "Real-time data for AI",
    "Event-driven architecture",
    "Distributed systems",
    "Python",
    "Node.js",
    "TypeScript",
  ],
  sameAs: [PROFILE.github, PROFILE.linkedin],
};

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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
