// Machine-readable profiles (llms.txt and JSON Resume), generated from content.ts so they
// never drift from the site. Each market (India site, German site) adds its own
// availability; the German one is served only on deu.theankitgupta.com.
import { PROFILE, CASES, CAREER_BREAK, NOW_BUILDING, DATA_PATH, LANGUAGES, EDUCATION } from "./content";

export type Market = {
  siteUrl: string;
  // Appended to the one-line summary, e.g. where Ankit is based and is open to work.
  summaryTail: string;
  availability: { heading: string; lines: string[] };
};

const FLUENCY: Record<string, string> = {
  Native: "Native speaker",
  "C1, fluent": "Fluent (C1)",
  "A1, learning": "Beginner (A1), learning",
};

export function llmsText(m: Market): string {
  const url = (p: string) => `${m.siteUrl}${p}`;
  const [current, ...earlier] = CASES;
  const resultLine = (c: (typeof CASES)[number]) => c.results.map((r) => `${r.value} ${r.label}`).join("; ");
  const lines = [
    `# ${PROFILE.name}`,
    "",
    `> ${PROFILE.role}, ${PROFILE.discipline}. ${PROFILE.summary} ${PROFILE.years} of experience. ${m.summaryTail}`,
    "",
    "## Current role",
    "",
    `- ${current.role}, ${current.company} (${current.period}), on ${current.product} (${current.kind}).`,
    ...current.built.map((b) => `- ${b}`),
    `- Results: ${resultLine(current)}.`,
    "",
    "## Earlier work",
    "",
    ...earlier.map(
      (c) => `- ${c.company} (${c.period}), ${c.product} (${c.kind}): ${c.built.join(" ")} Results: ${resultLine(c)}.`
    ),
    `- ${CAREER_BREAK.period}: ${CAREER_BREAK.label}.`,
    "",
    m.availability.heading,
    "",
    ...m.availability.lines.map((l) => `- ${l}`),
    "",
    // Listed only once the project has a public repo, matching the homepage.
    ...(NOW_BUILDING.repo
      ? [
          `## Now building: ${NOW_BUILDING.name} (${NOW_BUILDING.status.toLowerCase()})`,
          "",
          `${NOW_BUILDING.pitch} ${NOW_BUILDING.how} Data path: ${NOW_BUILDING.flow.join(" → ")}. Code: ${NOW_BUILDING.repo}`,
          "",
        ]
      : []),
    "## Skills, by where they sit on the data path",
    "",
    ...DATA_PATH.map((s) => `- ${s.stage}: ${s.items.join(", ")}`),
    "",
    "## Languages",
    "",
    LANGUAGES.map((l) => `${l.name} (${l.level})`).join(", "),
    "",
    "## Education",
    "",
    `${EDUCATION.degree}, ${EDUCATION.school}, ${EDUCATION.year}`,
    "",
    "## Links",
    "",
    `- Website: ${url("/")}`,
    `- Résumé (PDF): ${url("/resume/file")}`,
    `- Résumé (JSON Resume): ${url("/resume.json")}`,
    `- LinkedIn: ${PROFILE.linkedin}`,
    `- GitHub: ${PROFILE.github}`,
    `- Email: ${PROFILE.email}`,
    "",
  ];
  return lines.join("\n");
}

// The résumé in the open JSON Resume format (https://jsonresume.org/schema).
// Phone number and date of birth are left out on purpose.
export function jsonResume(m: Market) {
  return {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: PROFILE.name,
      label: `${PROFILE.role}, ${PROFILE.discipline}`,
      email: PROFILE.email,
      url: m.siteUrl,
      summary: `${PROFILE.pitch} ${PROFILE.years} of experience. ${m.summaryTail}`,
      location: { city: "Bengaluru", countryCode: "IN" },
      profiles: [
        { network: "LinkedIn", username: "ankit-gupta-oct21", url: PROFILE.linkedin },
        { network: "GitHub", username: "ankitguptaoct21", url: PROFILE.github },
      ],
    },
    work: CASES.map((c) => ({
      name: c.company,
      position: c.role,
      startDate: c.start,
      ...(c.end ? { endDate: c.end } : {}),
      summary: `${c.product}: ${c.kind}.`,
      highlights: [...c.built, ...c.results.map((r) => `${r.value} ${r.label}`)],
    })),
    education: [
      {
        institution: EDUCATION.school,
        area: "Computer Science & Engineering",
        studyType: "Bachelor of Engineering (B.E.)",
        endDate: EDUCATION.year,
      },
    ],
    ...(NOW_BUILDING.repo
      ? {
          projects: [
            {
              name: NOW_BUILDING.name,
              description: `${NOW_BUILDING.pitch} ${NOW_BUILDING.how}`,
              highlights: [`Data path: ${NOW_BUILDING.flow.join(" → ")}`, NOW_BUILDING.metric],
              keywords: NOW_BUILDING.flow,
              url: NOW_BUILDING.repo,
              type: `Open source (${NOW_BUILDING.status.toLowerCase()})`,
            },
          ],
        }
      : {}),
    skills: DATA_PATH.map((s) => ({ name: s.stage, keywords: s.items })),
    languages: LANGUAGES.map((l) => ({ language: l.name, fluency: FLUENCY[l.level] ?? l.level })),
    meta: { canonical: `${m.siteUrl}/resume.json`, version: "v1.0.0" },
  };
}
