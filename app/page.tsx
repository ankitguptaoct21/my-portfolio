import { Fragment } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowDown, FileText } from "lucide-react";
import {
  PROFILE,
  PROOF,
  CASES,
  CAREER_BREAK,
  AI_PILLARS,
  NOW_BUILDING,
  GERMANY,
  PRINCIPLES,
  DATA_PATH,
  LANGUAGES,
  EDUCATION,
} from "./content";
import PipelineDemo from "./components/PipelineDemo";
import FreshnessClocks from "./components/FreshnessClocks";
import CopyEmail from "./components/CopyEmail";
import LoadTime from "./components/LoadTime";
import DeltaMark from "./components/DeltaMark";

const NAV = [
  { href: "#ai", label: "Data for AI" },
  { href: "#work", label: "Work" },
  { href: "#proof", label: "Proof" },
  { href: "#germany", label: "Germany" },
  { href: "#about", label: "About" },
];

export default function Home() {
  const current = CASES[0];

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
          <div style={{ display: "flex", gap: 8 }}>
            <a href={PROFILE.resumePath} className="btn btn-sm">
              <FileText size={15} aria-hidden="true" /> Résumé
            </a>
            <a href="#contact" className="btn btn-sm btn-primary">
              Contact
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-meta mono">
              <span>
                <span className="status-dot" aria-hidden="true" />
                In Germany from {GERMANY.arrival} · {GERMANY.permit}
              </span>
              <span>
                {PROFILE.role} · {PROFILE.discipline}
              </span>
              <span>
                Now: {current.product} at {current.company}
              </span>
            </div>

            <h1 className="display hero-title">
              Every <span className="delta">change</span>,<br />
              captured.
            </h1>

            <p className="hero-lede">
              I&rsquo;m Ankit Gupta, a senior backend and data engineer. I build the real-time data layer AI
              products run on: CDC pipelines, Kafka streams and lakehouses that keep models and agents supplied
              with <span className="mark">fresh, correct data</span>.
            </p>

            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">
                See the work <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a href={PROFILE.resumePath} className="btn">
                Résumé <FileText size={16} aria-hidden="true" />
              </a>
              <a href={`mailto:${PROFILE.email}`} className="btn">
                Email me <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            <PipelineDemo />
          </div>
        </section>

        {/* ---------- Data for AI ---------- */}
        <section id="ai" className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <p className="mono section-label">Data for AI</p>
              <h2 className="display section-title">A model is only as current as its data.</h2>
            </div>

            <div className="pillars">
              {AI_PILLARS.map((p) => (
                <div key={p.title} className="pillar">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>

            <FreshnessClocks />

            <article className="build" aria-labelledby="build-title">
              <div className="build-head">
                <p className="mono build-label">
                  <span className="build-status">{NOW_BUILDING.status}</span>
                  Now building
                </p>
                <h3 id="build-title" className="display build-name">
                  {NOW_BUILDING.name}
                </h3>
                <p className="build-pitch">{NOW_BUILDING.pitch}</p>
              </div>
              <div className="build-body">
                <ol className="build-flow mono" aria-label="Data path">
                  {NOW_BUILDING.flow.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="build-how">{NOW_BUILDING.how}</p>
                <p className="build-metric">
                  <span className="mono">The number</span>
                  {NOW_BUILDING.metric}
                </p>
                {NOW_BUILDING.repo && (
                  <a href={NOW_BUILDING.repo} className="btn btn-sm" target="_blank" rel="noreferrer">
                    Code on GitHub <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          </div>
        </section>

        {/* ---------- Proof ---------- */}
        <section id="proof" className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <p className="mono section-label">Proof</p>
              <h2 className="display section-title">Numbers, with the reason behind each one.</h2>
            </div>
            <div className="proof-grid">
              {PROOF.map((p) => (
                <article key={p.what} className="proof">
                  <p className="display proof-value tnum">
                    {p.value}
                    <small>{p.unit}</small>
                  </p>
                  <h3 className="proof-what">{p.what}</h3>
                  {p.detail && <p className="mono proof-detail tnum">{p.detail}</p>}
                  <p className="proof-how">{p.how}</p>
                  <p className="mono proof-where">{p.where}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section id="work" className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <p className="mono section-label">Selected work</p>
              <h2 className="display section-title">Five products, newest first.</h2>
            </div>
            <div>
              {CASES.map((c) => (
                <Fragment key={c.id}>
                  <article className="case" aria-labelledby={`case-${c.id}`}>
                    <div className="case-meta">
                      <p className="mono" style={{ color: "var(--cobalt)" }}>
                        {c.period}
                      </p>
                      <h3 id={`case-${c.id}`} className="display case-product">
                        {c.product}
                      </h3>
                      <p className="case-kind">{c.kind}</p>
                      <p className="mono" style={{ color: "var(--ink-3)", marginTop: 6 }}>
                        {c.role} · {c.company}
                      </p>
                    </div>
                    <div className="case-body">
                      <p className="case-headline">{c.headline}</p>
                      <p className="case-context">{c.context}</p>
                      <ul className="case-list">
                        {c.built.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      <div className="results">
                        {c.results.map((r) => (
                          <div key={r.label}>
                            <p className="display result-value tnum">{r.value}</p>
                            <p className="result-label">{r.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="chips">
                        {c.stack.map((s) => (
                          <span key={s} className="chip">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                  {c.id === CAREER_BREAK.afterCaseId && (
                    <div className="case-break mono">
                      <span>{CAREER_BREAK.period}</span>
                      <span>{CAREER_BREAK.label}</span>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Principles ---------- */}
        <section id="principles" className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <p className="mono section-label">Principles</p>
              <h2 className="display section-title">How I work, and the result each habit produced.</h2>
            </div>
            <div className="principles">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="principle">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Toolbox ---------- */}
        <section id="toolbox" className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <p className="mono section-label">Toolbox</p>
              <h2 className="display section-title">Tools, placed where they sit on the data path.</h2>
            </div>
            <div className="path">
              {DATA_PATH.map((s, i) => (
                <div key={s.stage} className="path-stage">
                  <p className="mono path-name">
                    <span>{s.stage}</span>
                    {i < DATA_PATH.length - 1 && <span aria-hidden="true">→</span>}
                  </p>
                  <ul className="path-items">
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Germany ---------- */}
        <section id="germany" className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <p className="mono section-label">Hiring me in Germany</p>
              <h2 className="display section-title">The answers before you have to ask.</h2>
            </div>
            <dl className="de-facts">
              {GERMANY.facts.map((f) => (
                <div key={f.label} className="de-fact">
                  <dt className="mono">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <p className="mono section-label">About</p>
            </div>
            <div className="about">
              <figure className="figure portrait">
                <Image
                  src="/ankit-gupta.jpg"
                  alt="Portrait of Ankit Gupta"
                  width={660}
                  height={860}
                  sizes="(min-width: 960px) 420px, 90vw"
                />
                <figcaption className="mono fig-caption">
                  <span>Fig. 3 · Ankit Gupta</span>
                  <span>Bengaluru → DE</span>
                </figcaption>
              </figure>
              <div>
                <div className="bio">
                  <p>
                    I&rsquo;m a senior software engineer with {PROFILE.years} in backend and data engineering, moving
                    from Bengaluru to Germany in {GERMANY.arrival}.
                  </p>
                  <p style={{ color: "var(--ink-2)" }}>
                    I started by putting more than ten blockchains behind one wallet service. Then I built
                    microservices for a fantasy e-sports app and led the backend of a B2B e-commerce platform.
                    Since 2025 my work has been data in motion for AI products: Kafka pipelines for a marketing AI,
                    and now CDC pipelines and a tuned lakehouse, in PySpark and Spark SQL on Microsoft Fabric, for
                    Brahma AI at Flexiple.
                  </p>
                  <p style={{ color: "var(--ink-2)" }}>
                    I also mentor. I&rsquo;m guiding six junior engineers and I wrote the team&rsquo;s coding
                    standards and testing strategy.
                  </p>
                </div>
                <dl className="facts">
                  <div className="fact">
                    <dt className="mono">Based in</dt>
                    <dd>
                      {PROFILE.location} → Germany, {GERMANY.arrival}
                    </dd>
                  </div>
                  <div className="fact">
                    <dt className="mono">Languages</dt>
                    <dd>{LANGUAGES.map((l) => `${l.name} (${l.level})`).join(" · ")}</dd>
                  </div>
                  <div className="fact">
                    <dt className="mono">Education</dt>
                    <dd>
                      {EDUCATION.degree}, {EDUCATION.school}, {EDUCATION.year}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="contact">
          <div className="wrap">
            <p className="mono section-label">Contact</p>
            <h2 className="display contact-title">Where is your data late?</h2>
            <p className="contact-lede">
              I&rsquo;m looking for senior data and backend engineering roles in Germany, especially where data
              feeds AI products. Email reaches me fastest.
            </p>
            <div className="contact-row">
              <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
                Email me <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <CopyEmail email={PROFILE.email} />
            </div>
            <div className="contact-row" style={{ marginTop: 16 }}>
              <a href={PROFILE.linkedin} className="btn" target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={PROFILE.github} className="btn" target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={PROFILE.resumePath} className="btn">
                Résumé (PDF) <FileText size={16} aria-hidden="true" />
              </a>
            </div>

            <footer className="footer mono">
              <span>© {new Date().getFullYear()} Ankit Gupta</span>
              <LoadTime />
              <span style={{ display: "flex", gap: 16 }}>
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
