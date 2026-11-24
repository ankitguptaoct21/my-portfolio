import type { Metadata } from "next";
import { PROFILE } from "../content";
import { DE_ORIGIN, DE_PREFIX } from "../site";
import { DE_META } from "../locales/de";

// The German site (deu.theankitgupta.com). proxy.ts maps that host onto these /de routes.
// The root layout keeps <html lang="en">, so the German subtree declares lang="de" itself.
export const metadata: Metadata = {
  metadataBase: new URL(DE_ORIGIN),
  alternates: {
    canonical: `${DE_PREFIX}/`,
    types: { "application/json": `${DE_PREFIX}/resume.json`, "text/plain": `${DE_PREFIX}/llms.txt` },
  },
  // absolute: the root layout's "%s · Ankit Gupta" template must not wrap this one.
  title: { absolute: DE_META.title, template: `%s · ${PROFILE.name}` },
  description: DE_META.description,
  keywords: [
    "Ankit Gupta",
    "Senior Data Engineer",
    "Data Engineer",
    "Backend Engineer",
    "Data Platform Engineer",
    "Echtzeit-Daten",
    "KI",
    "Change Data Capture",
    "Apache Kafka",
    "Microsoft Fabric",
    "Lakehouse",
    "PySpark",
    "Deutschland",
    "Chancenkarte",
  ],
  openGraph: {
    type: "profile",
    locale: "de_DE",
    url: `${DE_PREFIX}/`,
    siteName: PROFILE.name,
    title: DE_META.title,
    description: DE_META.description,
    firstName: "Ankit",
    lastName: "Gupta",
  },
  twitter: { card: "summary_large_image", title: DE_META.title, description: DE_META.description },
};

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return <div lang="de">{children}</div>;
}
