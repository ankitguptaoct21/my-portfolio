import { Fragment, type ReactNode } from "react";
import {
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
import FreshnessClocks from "./components/FreshnessClocks";
import PipelineDemo from "./components/PipelineDemo";
import CopyEmail from "./components/CopyEmail";
import DeltaMark from "./components/DeltaMark";

const NAV = [
  { href: "#what", label: "What I do" },
  { href: "#work", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#germany", label: "Germany" },
];

const SERVICE_ICONS = [Zap, Database, Server];

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

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="wrap site-header-inner">
          <a href="#top" className="brand" aria-label="Ankit Gupta, back to top">
            <DeltaMark />
            Ankit Gupta
          </a>
          <nav className="nav" aria-label="Sections">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a href={PROFILE.resumePath} className="btn btn-sm">
              <FileText size={15} aria-hidden="true" /> CV
            </a>
            <a href="#contact" className="btn btn-sm btn-primary">
              Contact
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero: who, what, status, how to reach ---------- */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-text">
              <h1 className="hero-h1">
                <span className="hero-name">{PROFILE.name}</span>
                <span className="hero-role">{PROFILE.title}</span>
              </h1>
              <p className="hero-lede">{PROFILE.plain}</p>

              <ul className="pills" aria-label="Status">
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

              <div className="hero-actions">
                <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
                  <Mail size={16} aria-hidden="true" /> Email me
                </a>
                <a href={PROFILE.resumePath} className="btn">
                  <FileText size={16} aria-hidden="true" /> View CV
                </a>
                <a href={PROFILE.linkedin} className="btn" target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- At a glance ---------- */}
        <section className="section section-tight" aria-labelledby="glance-title">
          <div className="wrap">
            <h2 id="glance-title" className="eyebrow">
              Results at a glance
            </h2>
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
          </div>
        </section>

        {/* ---------- What I do ---------- */}
        <section id="what" className="section">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">What I do</p>
              <h2 className="section-title">I make sure the right data is in the right place, on time.</h2>
            </div>

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

            <FreshnessClocks />

            <PipelineDemo />

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
          </div>
        </section>

        {/* ---------- Experience ---------- */}
        <section id="work" className="section">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Experience</p>
              <h2 className="section-title">Where I’ve done it, newest first.</h2>
            </div>
            <ol className="jobs">
              {CASES.map((c) => (
                <Fragment key={c.id}>
                  <li className="job">
                    <p className="job-when">{c.period}</p>
                    <div className="job-body">
                      <h3 className="job-title">
                        {c.role} <span>· {c.company}</span>
                      </h3>
                      <p className="job-product">
                        <strong>{c.product}</strong> · {c.kind}
                      </p>
                      <ul className="job-points">
                        {c.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                      <Tags items={c.stack} />
                    </div>
                  </li>
                  {c.id === CAREER_BREAK.afterCaseId && (
                    <li className="job job-break">
                      <p className="job-when">{CAREER_BREAK.period}</p>
                      <p className="job-body">{CAREER_BREAK.label}</p>
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Skills ---------- */}
        <section id="skills" className="section">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Skills</p>
              <h2 className="section-title">Tools I work with.</h2>
            </div>
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
          </div>
        </section>

        {/* ---------- Germany ---------- */}
        <section id="germany" className="section">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Hiring me in Germany</p>
              <h2 className="section-title">Answers before you have to ask.</h2>
            </div>
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
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="contact">
          <div className="wrap">
            <p className="eyebrow">Contact</p>
            <h2 className="contact-title">Let’s talk.</h2>
            <p className="contact-lede">
              I’m looking for senior data and backend engineering roles in Germany, especially where data feeds AI
              products. Email is the fastest way to reach me.
            </p>
            <div className="contact-row">
              <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
                <Mail size={16} aria-hidden="true" /> Email me
              </a>
              <CopyEmail email={PROFILE.email} />
            </div>
            <div className="contact-row">
              <a href={PROFILE.linkedin} className="btn" target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={PROFILE.github} className="btn" target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={PROFILE.resumePath} className="btn">
                <FileText size={16} aria-hidden="true" /> View CV
              </a>
            </div>

            <footer className="footer">
              <span>
                © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.tagline}
              </span>
              <span className="footer-links">
                <a href="/llms.txt">llms.txt</a>
                <a href="/resume.json">resume.json</a>
              </span>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
