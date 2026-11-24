// One shape for every version of the site. theankitgupta.com (India, English) and
// deu.theankitgupta.com (Germany, German) each provide a SiteCopy; <Site> renders it.
import type { TimelineItem, TimelineCopy } from "../components/ExperienceTimeline";
import type { ClocksCopy } from "../components/FreshnessClocks";
import type { PipelineCopy } from "../components/PipelineDemo";

export type IconKey =
  | "plane"
  | "file"
  | "briefcase"
  | "pin"
  | "clock"
  | "building"
  | "languages"
  | "handshake"
  | "graduation";

export type Pill = { icon: IconKey; text: string; accent?: boolean };

// A button label. `more` parts drop below ~300px; `short` replaces the whole label there.
export type ButtonLabel = { before?: string; main: string; after?: string; short?: string };

export type Fact = { icon: IconKey; label: string; value: string };

export type Glance = { value: string; label: string; note: string; where: string; detail?: string };

export type SiteCopy = {
  lang: "en" | "de";
  // Prefix for internal links (/resume, /llms.txt): "" in production, "/de" for the local German preview.
  basePath: string;
  name: string;
  title: string;
  plain: string;
  thesis: string;
  tagline: string;
  email: string;
  linkedin: string;
  github: string;
  pills: Pill[];
  statusAria: string;
  actions: { email: ButtonLabel; cv: ButtonLabel; linkedin: string; github: string; copy: string; copied: string };
  seeItLive: string;
  glanceHeading: string;
  glance: Glance[];
  services: { title: string; body: string; tags: string[] }[];
  building?: { status: string; kicker: string; name: string; text: string; flow: string[]; repo: string | null; code: string };
  timeline: TimelineItem[];
  timelineCopy: TimelineCopy;
  skills: { label: string; items: string[] }[];
  // Plain-text rows after the skill tags, e.g. spoken languages and degree.
  skillFacts?: { label: string; value: string }[];
  extraTab?: { id: string; label: string; title: string; facts: Fact[] };
  tabs: { overview: string; what: string; demo: string; experience: string; skills: string };
  titles: { what: string; demo: string; experience: string; skills: string };
  tabsCopy: { next: string; aria: string };
  clocks: ClocksCopy;
  pipeline: PipelineCopy;
};
