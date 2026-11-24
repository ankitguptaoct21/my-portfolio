// The whole one-screen site (sidebar + tabs), rendered from a SiteCopy. The India site
// (theankitgupta.com, English) and the German site (deu.theankitgupta.com) both use it.
import { type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Clock,
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
import type { ButtonLabel, IconKey, SiteCopy } from "../locales/types";
import Tabs from "./Tabs";
import FreshnessClocks from "./FreshnessClocks";
import PipelineDemo from "./PipelineDemo";
import ExperienceTimeline from "./ExperienceTimeline";
import CopyEmail from "./CopyEmail";
import DeltaMark from "./DeltaMark";

const SERVICE_ICONS = [Zap, Database, Server];

const ICONS: Record<IconKey, (size: number) => ReactNode> = {
  plane: (s) => <Plane size={s} aria-hidden="true" />,
  file: (s) => <FileCheck size={s} aria-hidden="true" />,
  briefcase: (s) => <Briefcase size={s} aria-hidden="true" />,
  pin: (s) => <MapPin size={s} aria-hidden="true" />,
  clock: (s) => <Clock size={s} aria-hidden="true" />,
  building: (s) => <Building2 size={s} aria-hidden="true" />,
  languages: (s) => <Languages size={s} aria-hidden="true" />,
  handshake: (s) => <Handshake size={s} aria-hidden="true" />,
  graduation: (s) => <GraduationCap size={s} aria-hidden="true" />,
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

// Button text. `before`/`after` drop below ~300px; `short` swaps in for the whole label there.
function Label({ l }: { l: ButtonLabel }) {
  const full = (
    <>
      {l.before && <span className="btn-more">{l.before}</span>}
      {l.main}
      {l.after && <span className="btn-more">{l.after}</span>}
    </>
  );
  if (!l.short) return <span className="btn-label">{full}</span>;
  return (
    <span className="btn-label">
      <span className="lbl-long">{full}</span>
      <span className="lbl-short">{l.short}</span>
    </span>
  );
}

function StatusPills({ copy, className = "" }: { copy: SiteCopy; className?: string }) {
  return (
    <ul className={`pills ${className}`} aria-label={copy.statusAria}>
      {copy.pills.map((p) => (
        <li key={p.text} className={p.accent ? "pill pill-accent" : "pill"}>
          {ICONS[p.icon](16)} {p.text}
        </li>
      ))}
    </ul>
  );
}

export default function Site({ copy }: { copy: SiteCopy }) {
  const overview = (
    <>
      {/* On phones the sidebar is compact, so the intro moves here. */}
      <div className="mobile-intro">
        <p className="lede">{copy.plain}</p>
        <StatusPills copy={copy} />
      </div>
      <div className="ov-hero">
        <h2 className="ov-thesis">{copy.thesis}</h2>
        <div className="ov-strip">
          {/* A plain #hash link: the Tabs component switches to the Live demo tab on hashchange. */}
          <a href="#demo" className="ov-live">
            {copy.seeItLive} <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
      <h3 className="sr-only">{copy.glanceHeading}</h3>
      <div className="glance">
        {copy.glance.map((g) => (
          <div key={g.label} className="stat">
            <p className="stat-value tnum">{g.value}</p>
            <p className="stat-label">{g.label}</p>
            {g.detail && <p className="stat-detail tnum">{g.detail}</p>}
            <p className="stat-note">{g.note}</p>
            <p className="stat-where">{g.where}</p>
          </div>
        ))}
      </div>
      <FreshnessClocks copy={copy.clocks} />
    </>
  );

  const b = copy.building;
  const whatIDo = (
    <>
      <PanelHead title={copy.titles.what} />
      <div className="services">
        {copy.services.map((s, i) => {
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
      {b?.repo && (
        <article className="card build" aria-labelledby="build-title">
          <div className="build-top">
            <span className="build-status">{b.status}</span>
            <span className="build-kicker">{b.kicker}</span>
          </div>
          <h3 id="build-title" className="build-name">
            {b.name}
          </h3>
          <p className="build-text">{b.text}</p>
          <Tags items={b.flow} />
          <a href={b.repo} className="btn btn-sm" target="_blank" rel="noreferrer">
            {b.code} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </article>
      )}
    </>
  );

  const liveDemo = (
    <>
      <PanelHead title={copy.titles.demo} />
      <PipelineDemo copy={copy.pipeline} />
    </>
  );

  const experience = (
    <>
      <PanelHead title={copy.titles.experience} />
      <ExperienceTimeline items={copy.timeline} copy={copy.timelineCopy} />
    </>
  );

  const skills = (
    <>
      <PanelHead title={copy.titles.skills} />
      <dl className="rows">
        {copy.skills.map((s) => (
          <div key={s.label} className="row">
            <dt>{s.label}</dt>
            <dd>
              <Tags items={s.items} />
            </dd>
          </div>
        ))}
        {copy.skillFacts?.map((f) => (
          <div key={f.label} className="row">
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );

  const x = copy.extraTab;
  const extra = x && (
    <>
      <PanelHead title={x.title} />
      <dl className="rows">
        {x.facts.map((f) => (
          <div key={f.label} className="row">
            <dt>
              <span className="row-icon">{ICONS[f.icon](18)}</span>
              {f.label}
            </dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );

  const tabs = [
    { id: "overview", label: copy.tabs.overview, content: overview },
    { id: "what", label: copy.tabs.what, content: whatIDo },
    { id: "demo", label: copy.tabs.demo, content: liveDemo },
    // fill: the panel takes exactly the screen height so only the timeline inside it scrolls.
    { id: "experience", label: copy.tabs.experience, content: experience, fill: true },
    { id: "skills", label: copy.tabs.skills, content: skills },
    ...(x ? [{ id: x.id, label: x.label, content: extra }] : []),
  ];

  return (
    <div className="shell">
      {/* ---------- Sidebar: who, what, status, how to reach ---------- */}
      <aside className="side">
        <div className="side-main">
          <DeltaMark size={26} className="side-mark" />
          <h1 className="side-h1">
            <span className="side-name">{copy.name}</span>
            <span className="side-role">{copy.title}</span>
          </h1>
          <p className="lede side-lede">{copy.plain}</p>
          <StatusPills copy={copy} className="side-pills" />
          {/* On phones these three always share one line. */}
          <div className="side-actions">
            <a href={`mailto:${copy.email}`} className="btn btn-sm btn-primary">
              <Mail size={15} aria-hidden="true" />
              <Label l={copy.actions.email} />
            </a>
            <a href={`${copy.basePath}/resume`} className="btn btn-sm">
              <FileText size={15} aria-hidden="true" />
              <Label l={copy.actions.cv} />
            </a>
            <a href={copy.linkedin} className="btn btn-sm" target="_blank" rel="noreferrer">
              <span className="btn-label">{copy.actions.linkedin}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={copy.github} className="btn btn-sm side-github" target="_blank" rel="noreferrer">
              {copy.actions.github} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="side-email">
            <CopyEmail email={copy.email} className="btn btn-sm" label={copy.actions.copy} copiedLabel={copy.actions.copied} />
          </div>
        </div>
        <footer className="side-foot">
          <span>
            © {new Date().getFullYear()} · {copy.tagline}
          </span>
          <span className="side-links">
            <a href={`${copy.basePath}/llms.txt`}>llms.txt</a>
            <a href={`${copy.basePath}/resume.json`}>resume.json</a>
          </span>
        </footer>
      </aside>

      {/* ---------- One section at a time ---------- */}
      <main className="main" id="top">
        <Tabs tabs={tabs} nextLabel={copy.tabsCopy.next} ariaLabel={copy.tabsCopy.aria} />
      </main>
    </div>
  );
}
