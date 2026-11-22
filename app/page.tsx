import { type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Database,
  FileCheck,
  FileText,
  GraduationCap,
  Handshake,
  Languages,
  Mail,
  MapPin,
  Plane,
  Server,
  Zap,
} from "lucide-react";
import {
  PROFILE,
  GLANCE,
  SERVICES,
  CASES,
  CAREER_BREAK,
  NOW_BUILDING,
  GERMANY,
  DATA_PATH,
} from "./content";
import Tabs from "./components/Tabs";
import FreshnessClocks from "./components/FreshnessClocks";
import PipelineDemo from "./components/PipelineDemo";
import ExperienceTimeline, { type TimelineItem } from "./components/ExperienceTimeline";
import CopyEmail from "./components/CopyEmail";
import DeltaMark from "./components/DeltaMark";

const SERVICE_ICONS = [Zap, Database, Server];

// Experience as timeline entries, newest first, with the career break between the roles it sits between.
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

const FACT_ICONS: Record<string, ReactNode> = {
  Arriving: <Plane size={18} aria-hidden="true" />,
  "Work permit": <FileCheck size={18} aria-hidden="true" />,
  "Try first": <Handshake size={18} aria-hidden="true" />,
  Location: <MapPin size={18} aria-hidden="true" />,
  Languages: <Languages size={18} aria-hidden="true" />,
  Degree: <GraduationCap size={18} aria-hidden="true" />,
};

function Tags({ items }: { items: readonly string[] }) {
  return (
    <ul className="tags">
      {items.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  );
}

// Section title only; the selected tab above already names the section.
function PanelHead({ title }: { title: string }) {
  return (
    <div className="panel-head">
      <h2 className="panel-title">{title}</h2>
    </div>
  );
}

function StatusPills({ className = "" }: { className?: string }) {
  return (
    <ul className={`pills ${className}`} aria-label="Status">
      <li className="pill pill-accent">
        <Plane size={16} aria-hidden="true" /> Moving to Germany · {GERMANY.arrival}
      </li>
      <li className="pill">
        <FileCheck size={16} aria-hidden="true" /> {GERMANY.permit}
      </li>
      <li className="pill">
        <Briefcase size={16} aria-hidden="true" /> {PROFILE.years} of experience
      </li>
    </ul>
  );
}

const overview = (
  <>
    {/* On phones the sidebar is compact, so the intro moves here. */}
    <div className="mobile-intro">
      <p className="lede">{PROFILE.plain}</p>
      <StatusPills />
    </div>
    <div className="ov-hero">
      <h2 className="ov-thesis">{PROFILE.thesis}</h2>
      <div className="ov-strip">
        {/* A plain #hash link: the Tabs component switches to the Live demo tab on hashchange. */}
        <a href="#demo" className="ov-live">
          See it live <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
    <h3 className="sr-only">Results at a glance</h3>
    <div className="glance">
      {GLANCE.map((g) => (
        <div key={g.label} className="stat">
          <p className="stat-value tnum">{g.value}</p>
          <p className="stat-label">{g.label}</p>
          {g.detail && <p className="stat-detail tnum">{g.detail}</p>}
          <p className="stat-note">{g.note}</p>
          <p className="stat-where">{g.where}</p>
        </div>
      ))}
    </div>
    <FreshnessClocks />
  </>
);

const whatIDo = (
  <>
    <PanelHead title="I make sure the right data is in the right place, on time." />
    <div className="services">
      {SERVICES.map((s, i) => {
        const Icon = SERVICE_ICONS[i];
        return (
          <article key={s.title} className="card service">
            <span className="service-icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <Tags items={s.tags} />
          </article>
        );
      })}
    </div>
    {/* Hidden until the project has a public repo: set NOW_BUILDING.repo in content.ts. */}
    {NOW_BUILDING.repo && (
      <article className="card build" aria-labelledby="build-title">
        <div className="build-top">
          <span className="build-status">{NOW_BUILDING.status}</span>
          <span className="build-kicker">Now building</span>
        </div>
        <h3 id="build-title" className="build-name">
          {NOW_BUILDING.name}
        </h3>
        <p className="build-text">{NOW_BUILDING.plain}</p>
        <Tags items={NOW_BUILDING.flow} />
        <a href={NOW_BUILDING.repo} className="btn btn-sm" target="_blank" rel="noreferrer">
          Code on GitHub <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </article>
    )}
  </>
);

const liveDemo = (
  <>
    <PanelHead title="Watch a database change travel to the lakehouse." />
    <PipelineDemo />
  </>
);

const experience = (
  <>
    <PanelHead title="Where I’ve done it, newest first." />
    <ExperienceTimeline items={TIMELINE} />
  </>
);

const skills = (
  <>
    <PanelHead title="Tools I work with." />
    <dl className="rows">
      {DATA_PATH.map((s) => (
        <div key={s.stage} className="row">
          <dt>{s.label}</dt>
          <dd>
            <Tags items={s.items} />
          </dd>
        </div>
      ))}
    </dl>
  </>
);

const germany = (
  <>
    <PanelHead title="Answers before you have to ask." />
    <dl className="rows">
      {GERMANY.facts.map((f) => (
        <div key={f.label} className="row">
          <dt>
            <span className="row-icon">{FACT_ICONS[f.label]}</span>
            {f.label}
          </dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  </>
);

const TABS = [
  { id: "overview", label: "Overview", content: overview },
  { id: "what", label: "What I do", content: whatIDo },
  { id: "demo", label: "Live demo", content: liveDemo },
  // fill: the panel takes exactly the screen height so only the timeline inside it scrolls.
  { id: "experience", label: "Experience", content: experience, fill: true },
  { id: "skills", label: "Skills", content: skills },
  { id: "germany", label: "Germany", content: germany },
];

export default function Home() {
  return (
    <div className="shell">
      {/* ---------- Sidebar: who, what, status, how to reach ---------- */}
      <aside className="side">
        <div className="side-main">
          <DeltaMark size={26} className="side-mark" />
          <h1 className="side-h1">
            <span className="side-name">{PROFILE.name}</span>
            <span className="side-role">{PROFILE.title}</span>
          </h1>
          <p className="lede side-lede">{PROFILE.plain}</p>
          <StatusPills className="side-pills" />
          {/* On phones these three always share one line; "me" and "View" drop only below ~300px. */}
          <div className="side-actions">
            <a href={`mailto:${PROFILE.email}`} className="btn btn-sm btn-primary">
              <Mail size={15} aria-hidden="true" />
              <span className="btn-label">
                Email<span className="btn-more"> me</span>
              </span>
            </a>
            <a href={PROFILE.resumePath} className="btn btn-sm">
              <FileText size={15} aria-hidden="true" />
              <span className="btn-label">
                <span className="btn-more">View </span>CV
              </span>
            </a>
            <a href={PROFILE.linkedin} className="btn btn-sm" target="_blank" rel="noreferrer">
              <span className="btn-label">LinkedIn</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={PROFILE.github} className="btn btn-sm side-github" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="side-email">
            <CopyEmail email={PROFILE.email} className="btn btn-sm" />
          </div>
        </div>
        <footer className="side-foot">
          <span>
            © {new Date().getFullYear()} · {PROFILE.tagline}
          </span>
          <span className="side-links">
            <a href="/llms.txt">llms.txt</a>
            <a href="/resume.json">resume.json</a>
          </span>
        </footer>
      </aside>

      {/* ---------- One section at a time ---------- */}
      <main className="main" id="top">
        <Tabs tabs={TABS} />
      </main>
    </div>
  );
}
