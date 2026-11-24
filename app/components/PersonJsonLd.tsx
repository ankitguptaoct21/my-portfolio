// Machine-readable profile (schema.org Person), so search engines and AI sourcing tools
// describe Ankit accurately. Each site passes its own URL and description.
import { PROFILE, CASES } from "../content";

export default function PersonJsonLd({ url, description }: { url: string; description: string }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: `${PROFILE.role}, ${PROFILE.discipline}`,
    description,
    url,
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
    />
  );
}
