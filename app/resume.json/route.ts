import { PROFILE, CASES, NOW_BUILDING, DATA_PATH, LANGUAGES, EDUCATION } from "../content";
import { SITE_URL, absolute } from "../site";

// The résumé in the open JSON Resume format (https://jsonresume.org/schema),
// generated from content.ts. Phone number and date of birth are left out on purpose.
export const dynamic = "force-static";

const FLUENCY: Record<string, string> = {
  Native: "Native speaker",
  "C1, fluent": "Fluent (C1)",
  "A1, learning": "Beginner (A1), learning",
};

export function GET() {
  const resume = {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: PROFILE.name,
      label: `${PROFILE.role}, ${PROFILE.discipline}`,
      image: absolute("/ankit-gupta.jpg"),
      email: PROFILE.email,
      url: SITE_URL,
      summary: `${PROFILE.pitch} ${PROFILE.years} of experience. ${PROFILE.relocation}.`,
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
    projects: [
      {
        name: NOW_BUILDING.name,
        description: `${NOW_BUILDING.pitch} ${NOW_BUILDING.how}`,
        highlights: [`Data path: ${NOW_BUILDING.flow.join(" → ")}`, NOW_BUILDING.metric],
        keywords: NOW_BUILDING.flow,
        ...(NOW_BUILDING.repo ? { url: NOW_BUILDING.repo } : {}),
        type: `Open source (${NOW_BUILDING.status.toLowerCase()})`,
      },
    ],
    skills: DATA_PATH.map((s) => ({ name: s.stage, keywords: s.items })),
    languages: LANGUAGES.map((l) => ({ language: l.name, fluency: FLUENCY[l.level] ?? l.level })),
    meta: { canonical: absolute("/resume.json"), version: "v1.0.0" },
  };

  return Response.json(resume, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
