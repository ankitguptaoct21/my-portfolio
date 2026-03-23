"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Github, Linkedin, Mail, 
  Terminal, Database, Network, Cpu, Code2, 
  ArrowRight, Activity, Server, Zap, Globe
} from 'lucide-react';

// --- DATA DEFINITIONS ---

const METRICS = [
  { id: 1, value: "50k+", label: "Requests/Sec", desc: "Peak throughput handled seamlessly." },
  { id: 2, value: "99.999%", label: "Uptime", desc: "Five-nines reliability standard." },
  { id: 3, value: "$10M+", label: "Ledger Volume", desc: "Daily transactions processed." },
];

const PROJECTS = [
  {
    id: "01",
    title: "Global Rate Limiting",
    category: "Infrastructure Architecture",
    description: "Designed a highly available, low-latency rate limiting service utilizing a sliding window log algorithm over a global Redis cluster. Protected core APIs from massive DDoS vectors.",
    impact: "1M+ ops/sec • <2ms P99 latency",
    tech: ["Go", "Redis", "gRPC", "Kubernetes"],
    color: "from-blue-500/20 to-transparent"
  },
  {
    id: "02",
    title: "Telemetry Engine",
    category: "Data Engineering",
    description: "Built an event streaming architecture that ingests, processes, and stores millions of analytics events from distributed IoT devices with strict ordering and exactly-once processing guarantees.",
    impact: "5TB+ Daily Ingestion • Zero Data Loss",
    tech: ["Kafka", "ClickHouse", "Node.js", "AWS"],
    color: "from-emerald-500/20 to-transparent"
  },
  {
    id: "03",
    title: "Distributed Ledger",
    category: "Core Backend Systems",
    description: "Architected the core financial ledger API using event-driven CQRS patterns, migrating from a legacy monolith to robust, scalable microservices.",
    impact: "$10M+ Daily Vol • ACID Compliant",
    tech: ["PostgreSQL", "Temporal", "Go", "Docker"],
    color: "from-purple-500/20 to-transparent"
  }
];

const EXPERTISE = [
  { name: "Distributed Systems", icon: <Network size={20} /> },
  { name: "High-Throughput APIs", icon: <Zap size={20} /> },
  { name: "Database Optimization", icon: <Database size={20} /> },
  { name: "Cloud Infrastructure", icon: <Globe size={20} /> },
  { name: "Microservices", icon: <Server size={20} /> },
  { name: "System Design", icon: <Cpu size={20} /> },
];

// --- ANIMATION VARIANTS ---

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- COMPONENTS ---

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#09090b]">
    {/* Subtle dot grid */}
    <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/80 to-[#09090b]" />
    {/* Soft spotlight */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.03] rounded-full blur-[120px]" />
  </div>
);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'bg-zinc-900/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl shadow-2xl' : 'bg-transparent border-transparent'
        }`}>
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-lg font-bold text-sm tracking-tighter">
              A.
            </div>
            <span className="font-semibold tracking-tight">Ankit <span className="text-zinc-500 font-normal">/ Architect</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 font-medium text-sm text-zinc-400">
            <a href="#work" className="px-4 py-2 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Work</a>
            <a href="#expertise" className="px-4 py-2 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Expertise</a>
            <a href="#about" className="px-4 py-2 hover:text-white hover:bg-white/5 rounded-lg transition-colors">About</a>
          </div>

          <a href="https://www.linkedin.com/in/ankit-gupta-oct21/" className="flex items-center gap-2 text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors">
            Initiate <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

const HeroBento = () => (
  <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto z-10 min-h-screen flex items-center">
    <motion.div initial="hidden" animate="visible" variants={stagger} className="w-full grid grid-cols-1 md:grid-cols-12 gap-6">
      
      {/* Main Statement */}
      <motion.div variants={fadeUp} className="md:col-span-8 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-10 md:p-14 flex flex-col justify-center overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-duration-700" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-white/5 w-fit mb-8">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">System Status: Optimal</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
          I build systems that <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-600">refuse to break.</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-xl font-light leading-relaxed">
          Senior Backend Engineer specializing in resilient architecture, distributed data, and high-throughput microservices.
        </p>
      </motion.div>

      {/* Profile / Quick Connect */}
      <motion.div variants={fadeUp} className="md:col-span-4 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
        <div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 mb-6 flex items-center justify-center">
            <Terminal size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Available for strategic impact.</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Partnering with elite teams to architect scalable backends and solve complex infrastructure bottlenecks.
          </p>
        </div>
        <div className="flex gap-3">
          <a href="ankitgupta.oct21@gmail.com" className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-medium hover:bg-zinc-200 transition-colors">
            <Mail size={18} /> Connect
          </a>
          <a href="https://github.com/ankitguptaoct21" className="w-12 h-12 flex items-center justify-center bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors border border-white/5">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ankit-gupta-oct21/" className="w-12 h-12 flex items-center justify-center bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors border border-white/5">
            <Linkedin size={20} />
          </a>
        </div>
      </motion.div>

      {/* Metrics Row */}
      {METRICS.map((metric, i) => (
        <motion.div key={metric.id} variants={fadeUp} className="md:col-span-4 bg-zinc-900/30 border border-white/5 rounded-3xl p-8 hover:bg-zinc-900/60 transition-colors">
          <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4">0{i + 1} // {metric.label}</div>
          <div className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">{metric.value}</div>
          <div className="text-sm text-zinc-400">{metric.desc}</div>
        </motion.div>
      ))}
      
    </motion.div>
  </section>
);

const ExpertiseSection = () => (
  <section id="expertise" className="py-32 px-6 max-w-7xl mx-auto z-10 relative">
    <div className="mb-16">
      <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">Engineering Matrix</h2>
      <p className="text-lg text-zinc-400 max-w-2xl font-light">The core disciplines I leverage to build enterprise-grade infrastructure.</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {EXPERTISE.map((item, i) => (
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          key={i} 
          className="group p-6 border border-white/5 bg-zinc-900/20 rounded-2xl hover:bg-zinc-900/60 hover:border-white/10 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-110 transition-all">
            {item.icon}
          </div>
          <h3 className="text-white font-medium">{item.name}</h3>
        </motion.div>
      ))}
    </div>
  </section>
);

const ArchitectureShowcase = () => (
  <section id="work" className="py-32 px-6 max-w-7xl mx-auto z-10 relative">
    <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">Architectural Showcases</h2>
        <p className="text-lg text-zinc-400 font-light max-w-xl">Deep dives into complex systems I've designed, scaled, and maintained in production.</p>
      </div>
    </div>

    <div className="relative">
      {PROJECTS.map((project, index) => (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          key={project.id}
          // The sticky classes create the stacking card effect
          className="sticky top-32 mb-12 w-full origin-top"
          style={{ zIndex: index, marginTop: index === 0 ? 0 : '40px' }}
        >
          <div className="bg-[#111113] border border-white/10 rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-2xl relative group">
            
            {/* Ambient Background Gradient for the card */}
            <div className={`absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl ${project.color} blur-[100px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-sm font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-white/5">{project.id}</span>
                  <span className="text-sm font-medium text-zinc-400 uppercase tracking-widest">{project.category}</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">{project.title}</h3>
                <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8 max-w-xl">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>

                <a href="#" className="inline-flex items-center gap-2 text-white font-medium hover:text-zinc-300 transition-colors group/link">
                  Review Architecture <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="md:col-span-5">
                <div className="aspect-square rounded-3xl bg-black/50 border border-white/5 p-8 flex flex-col justify-between relative overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                   <div className="relative z-10 flex flex-col h-full justify-center">
                     <span className="text-sm text-zinc-500 mb-2 uppercase tracking-widest font-mono">Verified Impact</span>
                     <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">{project.impact.split('•')[0]}</span>
                     <div className="w-full h-px bg-white/10 my-4" />
                     <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">{project.impact.split('•')[1]}</span>
                   </div>
                </div>
              </div>
              
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <section id="contact" className="py-32 px-6 max-w-7xl mx-auto z-10 relative border-t border-white/5 mt-20">
    <div className="bg-zinc-900/30 border border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">
          Architect the next level.
        </h2>
        <p className="text-xl text-zinc-400 font-light mb-12 max-w-2xl mx-auto">
          Whether you're scaling an MVP to enterprise readiness or restructuring a legacy monolith, I'm ready to engineer the solution.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:ankitgupta.oct21@gmail.com" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
            <Mail size={18} /> Initiate Contact
          </a>
          <a href="https://www.linkedin.com/in/ankit-gupta-oct21/" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-800 text-white border border-white/10 font-semibold flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors">
            <Linkedin size={18} /> Connect on LinkedIn
          </a>
        </div>
      </motion.div>
    </div>
    
    <div className="mt-16 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm font-medium">
      <p>© {new Date().getFullYear()} Ankit. All engineering rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-white transition-colors">GitHub</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
        <a href="#" className="hover:text-white transition-colors">Resume (PDF)</a>
      </div>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 font-sans selection:bg-white selection:text-black">
      <BackgroundGrid />
      <Navigation />
      <main>
        <HeroBento />
        <ExpertiseSection />
        <ArchitectureShowcase />
        <Footer />
      </main>
    </div>
  );
}