import { PROFILE, CASES, CAREER_BREAK, GERMANY, NOW_BUILDING, DATA_PATH, LANGUAGES, EDUCATION } from "../content";
import { absolute } from "../site";

// A plain-text profile for AI tools (https://llmstxt.org), generated from content.ts
// so it can never drift from what the site says.
export const dynamic = "force-static";

export function GET() {
  const [current, ...earlier] = CASES;
  const resultLine = (c: (typeof CASES)[number]) => c.results.map((r) => `${r.value} ${r.label}`).join("; ");

  const lines = [
    `# ${PROFILE.name}`,
    "",
    `> ${PROFILE.role}, ${PROFILE.discipline}. ${PROFILE.summary} ${PROFILE.years} of experience. Based in ${PROFILE.location}. ${PROFILE.relocation}.`,
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
    "## Availability in Germany",
    "",
    ...GERMANY.facts.map((f) => `- ${f.label}: ${f.value}`),
    "",
    `## Now building: ${NOW_BUILDING.name} (${NOW_BUILDING.status.toLowerCase()})`,
    "",
    `${NOW_BUILDING.pitch} ${NOW_BUILDING.how} Data path: ${NOW_BUILDING.flow.join(" → ")}.`,
    "",
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
    `- Website: ${absolute("/")}`,
    `- Résumé (PDF): ${absolute(PROFILE.resumeFile)}`,
    `- Résumé (JSON Resume): ${absolute("/resume.json")}`,
    `- LinkedIn: ${PROFILE.linkedin}`,
    `- GitHub: ${PROFILE.github}`,
    `- Email: ${PROFILE.email}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
