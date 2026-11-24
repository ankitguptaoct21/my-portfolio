// theankitgupta.com: the English site for employers in India. No mention of Germany.
import { PROFILE, GLANCE, SERVICES, CASES, CAREER_BREAK, NOW_BUILDING, DATA_PATH, LANGUAGES, EDUCATION } from "../content";
import type { TimelineItem } from "../components/ExperienceTimeline";
import { CLOCKS_EN, PIPELINE_EN, TIMELINE_EN } from "./ui-en";
import type { SiteCopy } from "./types";

const TIMELINE: TimelineItem[] = CASES.flatMap((c): TimelineItem[] => {
  const job: TimelineItem = {
    type: "job",
    id: c.id,
    period: c.period,
    role: c.role,
    company: c.company,
    product: c.product,
    kind: c.kind,
    highlights: c.highlights,
    stack: c.stack,
  };
  return c.id === CAREER_BREAK.afterCaseId
    ? [job, { type: "break", id: "career-break", period: CAREER_BREAK.period, label: CAREER_BREAK.label }]
    : [job];
});

export const EN: SiteCopy = {
  lang: "en",
  basePath: "",
  name: PROFILE.name,
  title: PROFILE.title,
  plain: PROFILE.plain,
  thesis: PROFILE.thesis,
  tagline: PROFILE.tagline,
  email: PROFILE.email,
  linkedin: PROFILE.linkedin,
  github: PROFILE.github,
  pills: [
    { icon: "pin", text: "Bengaluru · open to roles across India", accent: true },
    { icon: "building", text: "On-site, hybrid or remote" },
    { icon: "clock", text: `Notice period: ${PROFILE.noticePeriod}` },
    { icon: "briefcase", text: `${PROFILE.years} of experience` },
  ],
  statusAria: "Status",
  actions: {
    email: { main: "Email", after: " me" },
    cv: { before: "View ", main: "CV" },
    linkedin: "LinkedIn",
    github: "GitHub",
    copy: "Copy email",
    copied: "Copied",
  },
  seeItLive: "See it live",
  glanceHeading: "Results at a glance",
  glance: GLANCE,
  services: SERVICES,
  building: {
    status: NOW_BUILDING.status,
    kicker: "Now building",
    name: NOW_BUILDING.name,
    text: NOW_BUILDING.plain,
    flow: NOW_BUILDING.flow,
    repo: NOW_BUILDING.repo,
    code: "Code on GitHub",
  },
  timeline: TIMELINE,
  timelineCopy: TIMELINE_EN,
  skills: DATA_PATH.map((s) => ({ label: s.label, items: s.items })),
  skillFacts: [
    { label: "Spoken languages", value: LANGUAGES.map((l) => `${l.name} (${l.level})`).join(", ") },
    { label: "Education", value: `${EDUCATION.degree}, ${EDUCATION.school}, ${EDUCATION.year}` },
  ],
  tabs: { overview: "Overview", what: "What I do", demo: "Live demo", experience: "Experience", skills: "Skills" },
  titles: {
    what: "I make sure the right data is in the right place, on time.",
    demo: "Watch a database change travel to the lakehouse.",
    experience: "Where I’ve done it, newest first.",
    skills: "Tools I work with.",
  },
  tabsCopy: { next: "Next", aria: "Sections" },
  clocks: CLOCKS_EN,
  pipeline: PIPELINE_EN,
};
