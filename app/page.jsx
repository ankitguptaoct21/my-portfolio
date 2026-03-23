"use client";

import React, { useState, useEffect } from 'react';
import { 
  Terminal, Server, Database, Cloud, Activity, 
  Github, Linkedin, Mail, ArrowRight, Download, 
  ChevronRight, ExternalLink, Code2, Cpu, Layers,
  Zap, ShieldCheck
} from 'lucide-react';

// --- DATA ---
const SKILLS = [
  {
    category: "System Architecture",
    icon: <Layers className="w-5 h-5 text-violet-400" />,
    items: ["Microservices", "Event-Driven Design", "Distributed Systems", "gRPC / Protobuf", "GraphQL"]
  },
  {
    category: "Data Engineering",
    icon: <Database className="w-5 h-5 text-cyan-400" />,
    items: ["PostgreSQL", "Redis", "Apache Kafka", "Elasticsearch", "ClickHouse", "MongoDB"]
  },
  {
    category: "Cloud & DevOps",
    icon: <Cloud className="w-5 h-5 text-blue-400" />,
    items: ["AWS (EKS, RDS, S3)", "Docker & Kubernetes", "Terraform", "CI/CD Pipelines", "Datadog"]
  },
  {
    category: "Core Languages",
    icon: <Terminal className="w-5 h-5 text-emerald-400" />,
    items: ["Go (Golang)", "Node.js / TypeScript", "Python", "Rust (Learning)", "Bash"]
  }
];

const PROJECTS = [
  {
    id: "payment-gateway",
    title: "Global Payment Ledger",
    description: "Architected a highly available distributed ledger system capable of processing real-time cross-border transactions with idempotency guarantees.",
    tech: ["Golang", "PostgreSQL", "Kafka", "Redis", "AWS EKS"],
    metrics: [
      { label: "Throughput", value: "10k+ TPS" },
      { label: "Uptime", value: "99.999%" },
      { label: "Latency", value: "< 50ms" }
    ],
    link: "#"
  },
  {
    id: "analytics-engine",
    title: "Real-time Telemetry Engine",
    description: "Built a custom analytics pipeline ingesting millions of events per minute, providing real-time dashboards for enterprise clients.",
    tech: ["TypeScript", "ClickHouse", "RabbitMQ", "Node.js"],
    metrics: [
      { label: "Ingestion", value: "5M events/min" },
      { label: "Storage", value: "50TB+" },
      { label: "Query Speed", value: "120ms avg" }
    ],
    link: "#"
  }
];

const EXPERIENCE = [
  {
    id: 1,
    role: "Senior Backend Engineer",
    company: "FinTech Global (Fictional)",
    period: "2022 - Present",
    highlights: [
      "Led the migration from a monolithic Node.js application to an event-driven Go microservices architecture, reducing infrastructure costs by 40%.",
      "Designed and implemented a sharded database strategy in PostgreSQL to handle a 300% YoY growth in user data.",
      "Mentored a team of 4 mid-level engineers, establishing strict CI/CD guidelines and RFC-driven architecture planning."
    ]
  },
  {
    id: 2,
    role: "Backend Engineer II",
    company: "CloudScale Inc.",
    period: "2019 - 2022",
    highlights: [
      "Developed core RESTful APIs for the flagship SaaS product serving over 100,000 active users.",
      "Optimized slow API endpoints, utilizing Redis caching and index optimization to improve response times by 80%.",
      "Integrated third-party OAuth providers and implemented JWT-based authentication with strict rate limiting."
    ]
  },
  {
    id: 3,
    role: "Software Engineer",
    company: "DataStream Solutions",
    period: "2018 - 2019",
    highlights: [
      "Maintained legacy Python backend systems and wrote comprehensive unit and integration tests.",
      "Automated daily reporting tasks using cron jobs and AWS Lambda."
    ]
  }
];

// --- COMPONENTS ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600 via-cyan-900 to-transparent blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#09090b]/80 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="font-mono font-bold text-xl tracking-tighter text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>ankit.dev</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#expertise" className="hover:text-cyan-400 transition-colors">Expertise</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-32 flex flex-col items-start justify-center min-h-[80vh]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Senior Backend Engineer & System Architect
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
            Architecting the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
              invisible layer.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed animate-fade-in-up animation-delay-100">
            I engineer highly available microservices, optimize distributed data systems, and build resilient infrastructure that scales from zero to millions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up animation-delay-200">
            <a href="#projects" className="w-full sm:w-auto px-8 py-3 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group">
              View Architecture
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-3 rounded-lg bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
              <Download className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              Download Resume
            </a>
          </div>

          {/* Social Proof / Tech Stack Quick Look */}
          <div className="mt-24 pt-8 border-t border-white/5 w-full flex flex-wrap items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <p className="text-sm font-mono text-zinc-500 w-full md:w-auto">Core Stack:</p>
             {['Golang', 'Node.js', 'PostgreSQL', 'Kafka', 'AWS', 'Kubernetes'].map(tech => (
               <span key={tech} className="text-sm font-semibold tracking-wider text-zinc-400">{tech}</span>
             ))}
          </div>
        </section>

        {/* ABOUT & IDENTITY SECTION */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The system is the product.</h2>
              <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
                <p>
                  With over 6 years of deep-dive backend engineering, I don't just write APIs—I design the circulatory system of modern applications. 
                </p>
                <p>
                  My philosophy is simple: **build systems that let developers sleep at night**. I focus heavily on observability, idempotency, and graceful degradation. Whether it's breaking down a monolithic nightmare or designing a greenfield event-driven architecture, I bring rigorous engineering standards to every codebase.
                </p>
                <div className="flex gap-4 pt-4">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#0a66c2] transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Terminal Window Graphic */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-8 bg-zinc-900 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-auto text-xs text-zinc-500 font-mono">ankit@server: ~</span>
              </div>
              <div className="p-6 font-mono text-sm text-cyan-400/80">
                <p className="text-zinc-500 mb-2">$ systemctl status ankit-brain.service</p>
                <p className="text-green-400">● active (running) since Thu 2018-01-01 00:00:00 UTC</p>
                <br/>
                <p className="text-zinc-500 mb-2">$ cat core_metrics.json | jq .</p>
                <p className="text-white">{"{"}</p>
                <p className="pl-4">"uptime_years": <span className="text-yellow-400">6.2</span>,</p>
                <p className="pl-4">"coffee_consumed": <span className="text-yellow-400">"9999+"</span>,</p>
                <p className="pl-4">"bugs_created": <span className="text-yellow-400">0</span> <span className="text-zinc-500">// TODO: fix this stat</span>,</p>
                <p className="pl-4">"focus": <span className="text-green-300">"Scalability & Resilience"</span></p>
                <p className="text-white">{"}"}</p>
                <span className="inline-block w-2 h-4 bg-white/50 animate-pulse mt-2"></span>
              </div>
            </div>
          </div>
        </section>

        {/* ENGINEERING SKILLS DASHBOARD */}
        <section id="expertise" className="bg-zinc-900/30 border-y border-white/5 py-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Engineering Arsenal</h2>
              <p className="text-zinc-400 max-w-2xl">A curated stack of technologies I use to build robust, scalable systems.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:bg-white/[0.04] transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-4">{skill.category}</h3>
                  <ul className="space-y-2">
                    {skill.items.map((item, i) => (
                      <li key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-cyan-500/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SIGNATURE PROJECTS */}
        <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-bold text-white">Signature Architecture</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>

          <div className="space-y-12">
            {PROJECTS.map((project, idx) => (
              <div key={project.id} className="group relative grid md:grid-cols-12 gap-8 items-center">
                {/* Project Info Card */}
                <div className={`md:col-span-7 relative z-10 ${idx % 2 !== 0 ? 'md:order-2 md:col-start-6' : ''}`}>
                  <div className="bg-[#0f0f11] border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl">
                    <div className="flex gap-2 mb-6 flex-wrap">
                      {project.tech.map(t => (
                        <span key={t} className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 text-cyan-300 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Metrics Dashboard inside card */}
                    <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
                      {project.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-xs text-zinc-500 mb-1">{m.label}</div>
                          <div className="text-sm font-semibold text-white font-mono">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Abstract Visual Representation */}
                <div className={`md:col-span-6 absolute md:relative inset-0 opacity-10 md:opacity-100 pointer-events-none ${idx % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <div className="h-full min-h-[300px] w-full border border-white/5 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent flex items-center justify-center overflow-hidden relative">
                    {/* Simulated Architecture Node Graph */}
                    <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-500/20 rounded border border-blue-500/30 flex items-center justify-center animate-pulse">
                       <Server className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded border border-cyan-500/30 flex items-center justify-center">
                       <Database className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="absolute bottom-1/4 right-1/3 w-12 h-12 bg-violet-500/20 rounded border border-violet-500/30 flex items-center justify-center">
                       <Activity className="w-5 h-5 text-violet-400" />
                    </div>
                    {/* Connecting lines simulated via SVG */}
                    <svg className="absolute inset-0 w-full h-full stroke-white/10" fill="none">
                      <path d="M 30% 50% L 75% 25%" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                      <path d="M 30% 50% L 66% 75%" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite_reverse]" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="bg-black py-24 border-y border-white/5 relative">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-16 text-center">Professional Trajectory</h2>
            
            <div className="space-y-12">
              {EXPERIENCE.map((exp, idx) => (
                <div key={exp.id} className="relative pl-8 md:pl-0 group">
                  {/* Timeline Line */}
                  <div className="md:hidden absolute left-0 top-2 bottom-0 w-[1px] bg-white/10"></div>
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-[-48px] w-[1px] bg-white/10 -translate-x-1/2 group-last:bg-gradient-to-b group-last:from-white/10 group-last:to-transparent"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[-4px] md:left-1/2 top-2 w-2 h-2 rounded-full bg-cyan-500 md:-translate-x-1/2 ring-4 ring-[#09090b] shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:scale-150 transition-transform"></div>

                  <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16 md:ml-auto md:text-left' : 'md:pl-16 md:mr-auto md:text-right md:flex md:flex-col md:items-end'} relative`}>
                    
                    {/* The specific positioning hack for alternating timeline */}
                    <div className={`absolute top-0 w-full h-full hidden md:block ${idx % 2 === 0 ? '-left-full pr-16 text-right' : '-right-full pl-16 text-left'}`}>
                       <span className="font-mono text-cyan-400/60 font-semibold">{exp.period}</span>
                    </div>

                    <div className="md:hidden font-mono text-sm text-cyan-400/80 mb-2">{exp.period}</div>
                    
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <h4 className="text-zinc-500 font-medium mb-4">{exp.company}</h4>
                    
                    <ul className={`space-y-3 text-zinc-400 text-sm ${idx % 2 !== 0 ? 'md:text-right' : ''}`}>
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-3 md:justify-end md:flex-row-reverse">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0 ${idx % 2 !== 0 ? 'md:hidden' : ''}`}></span>
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0 hidden ${idx % 2 !== 0 ? 'md:block' : ''}`}></span>
                          <span className={`${idx % 2 !== 0 ? 'md:text-right' : 'text-left'} flex-1`}>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / CONTACT SECTION */}
        <section id="contact" className="max-w-4xl mx-auto px-6 py-32 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 mb-8">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Ready to scale?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
            Whether you're dealing with technical debt, architecting a new microservice, or just want to talk system design—I'm open to discussing new opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:hello@ankit.dev" className="px-8 py-4 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group w-full sm:w-auto">
              Get in Touch
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-lg bg-[#0a66c2]/10 text-[#0a66c2] font-semibold border border-[#0a66c2]/30 hover:bg-[#0a66c2]/20 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 bg-black text-center relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-zinc-500 text-sm font-mono flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Built by Ankit © {new Date().getFullYear()}
          </div>
          <div className="text-zinc-600 text-sm">
            Designed for Scale. Engineered for Resilience.
          </div>
        </div>
      </footer>

      {/* Global Styles for Custom Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}