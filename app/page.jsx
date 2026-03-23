import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, 
  Terminal, Database, Cloud, Layout, Server, 
  Download, ChevronRight, Code2, Globe, Cpu, 
  Quote, ArrowRight
} from 'lucide-react';

// --- Custom Hooks ---

// Simulates Framer Motion's whileInView
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // Optional: unobserve after first reveal
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isIntersecting];
};

// --- Reusable UI Components ---

const Reveal = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, isVisible] = useIntersectionObserver();

  const baseClasses = "transition-all duration-1000 ease-out";
  const hiddenClasses = {
    up: "opacity-0 translate-y-12",
    down: "opacity-0 -translate-y-12",
    left: "opacity-0 translate-x-12",
    right: "opacity-0 -translate-x-12",
    none: "opacity-0 scale-95"
  };
  const visibleClasses = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div 
      ref={ref} 
      className={`${baseClasses} ${isVisible ? visibleClasses : hiddenClasses[direction]}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const GlowCard = ({ children, className = "" }) => {
  return (
    <div className={`relative group rounded-2xl bg-[#0a0a0a] border border-white/10 p-8 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] ${className}`}>
      <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500 blur-md" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <Reveal>
    <div className="mb-16">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
      )}
    </div>
  </Reveal>
);

// --- Page Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Experience', 'Work', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
          <Terminal size={24} className="text-blue-500" />
          <span>DEV.ALEX</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              {link}
            </a>
          ))}
          <button className="px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300">
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for new opportunities
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
            Architecting <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
              Digital Experiences.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
            I'm a Senior Software Engineer specializing in building exceptional, highly scalable, and user-centric digital products. 6 years of turning complex problems into elegant solutions.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 hover:scale-105 transition-all duration-300">
              View My Work <ArrowRight size={18} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#111] text-white border border-white/10 font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition-all duration-300 group">
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> Download CV
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Years Experience', value: '6+' },
    { label: 'Projects Shipped', value: '40+' },
    { label: 'Open Source Commits', value: '1.2k' },
    { label: 'System Uptime', value: '99.9%' },
  ];

  return (
    <section className="py-10 border-y border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 100} className="text-center px-4">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const jobs = [
    {
      role: "Senior Software Engineer",
      company: "TechNova Inc.",
      period: "2023 - Present",
      description: "Leading a squad of 6 engineers. Architected a microservices-based scalable backend serving 2M+ DAU. Improved core web vitals by 40% using Next.js and edge caching.",
      tech: ["React", "Next.js", "Node.js", "AWS", "System Design"]
    },
    {
      role: "Software Engineer II",
      company: "CloudScale Systems",
      period: "2020 - 2023",
      description: "Developed complex enterprise dashboards. Integrated multi-tenant payment gateways and reduced CI/CD pipeline build times from 20m to 5m.",
      tech: ["TypeScript", "React", "GraphQL", "Docker", "GCP"]
    },
    {
      role: "Frontend Engineer",
      company: "Creative Logic",
      period: "2018 - 2020",
      description: "Built high-performance marketing sites and interactive web applications. Worked closely with design teams to implement pixel-perfect, accessible UIs.",
      tech: ["JavaScript", "React", "Redux", "SCSS", "Framer Motion"]
    }
  ];

  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SectionHeading title="Experience" subtitle={true} />
        
        <div className="space-y-12">
          {jobs.map((job, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="relative pl-8 md:pl-0">
                {/* Timeline Line for Mobile */}
                <div className="md:hidden absolute left-0 top-2 bottom-0 w-px bg-white/10" />
                <div className="md:hidden absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-blue-500 ring-4 ring-[#0a0a0a]" />

                <div className="md:grid md:grid-cols-4 gap-8 group">
                  <div className="mb-4 md:mb-0 md:text-right pt-1">
                    <span className="text-sm font-medium text-blue-400">{job.period}</span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {job.role}
                    </h3>
                    <div className="text-lg text-gray-400 mb-4">{job.company}</div>
                    <p className="text-gray-500 leading-relaxed mb-6">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.tech.map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 rounded-full border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Layout className="text-blue-400" size={24} />,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"]
    },
    {
      title: "Backend & Systems",
      icon: <Server className="text-purple-400" size={24} />,
      skills: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="text-emerald-400" size={24} />,
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Vercel"]
    },
    {
      title: "Architecture",
      icon: <Cpu className="text-orange-400" size={24} />,
      skills: ["System Design", "Microservices", "Serverless", "Event-Driven", "WebSockets"]
    }
  ];

  return (
    <section className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading title="Technical Arsenal" subtitle={true} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <GlowCard className="h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map(skill => (
                    <div key={skill} className="px-4 py-2 bg-[#111] border border-white/5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-colors cursor-default">
                      {skill}
                    </div>
                  ))}
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Nebula - Data Visualization Tool",
      description: "High-performance webGL based dashboard for enterprise data analytics. Processes 1M+ data points in real-time.",
      tech: ["React", "Three.js", "WebSocket", "Node.js"],
      image: "linear-gradient(145deg, #1e1b4b 0%, #312e81 100%)",
      featured: true
    },
    {
      title: "Aura - FinTech Platform",
      description: "Secure, compliant multi-tenant application for modern financial teams. Includes real-time collaboration.",
      tech: ["Next.js", "TypeScript", "Prisma", "AWS KMS"],
      image: "linear-gradient(145deg, #064e3b 0%, #065f46 100%)",
      featured: true
    },
    {
      title: "Nexus API Gateway",
      description: "Open-source lightweight API gateway built for serverless architectures with zero cold starts.",
      tech: ["Go", "Redis", "Docker", "gRPC"],
      image: "linear-gradient(145deg, #450a0a 0%, #7f1d1d 100%)",
      featured: false
    },
    {
      title: "DevFlow - IDE Extension",
      description: "AI-powered workflow optimizer that predicts and pre-fetches documentation.",
      tech: ["TypeScript", "OpenAI", "VS Code API"],
      image: "linear-gradient(145deg, #3b0764 0%, #581c87 100%)",
      featured: false
    }
  ];

  return (
    <section id="work" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading title="Featured Work" subtitle={true} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <Reveal key={idx} delay={idx * 100} className={project.featured ? "md:col-span-2" : ""}>
              <GlowCard className="group p-0">
                <div className={`flex flex-col ${project.featured ? 'md:flex-row' : ''} h-full`}>
                  {/* Image Placeholder */}
                  <div 
                    className={`${project.featured ? 'md:w-1/2 min-h-[300px]' : 'h-48'} w-full relative overflow-hidden`}
                    style={{ background: project.image }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    {/* Abstract Shapes for image mock */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full group-hover:scale-125 transition-transform duration-700 delay-100" />
                  </div>
                  
                  {/* Content */}
                  <div className={`p-8 md:p-10 flex flex-col justify-center ${project.featured ? 'md:w-1/2' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <a href="#" className="text-gray-500 hover:text-white transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(tech => (
                        <span key={tech} className="text-xs font-mono text-blue-300 bg-blue-500/10 px-3 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const GithubContributions = () => {
  // Mock generation for 52 weeks x 7 days
  const weeks = Array.from({ length: 52 }, () => 
    Array.from({ length: 7 }, () => Math.random() > 0.5 ? Math.floor(Math.random() * 4) + 1 : 0)
  );

  const getColor = (level) => {
    switch(level) {
      case 1: return 'bg-[#0e4429]';
      case 2: return 'bg-[#006d32]';
      case 3: return 'bg-[#26a641]';
      case 4: return 'bg-[#39d353]';
      default: return 'bg-[#161b22]'; // empty
    }
  };

  return (
    <section className="py-20 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <Github size={28} className="text-white" />
            <h2 className="text-2xl font-bold text-white">Open Source & Contributions</h2>
          </div>
          
          <div className="p-6 md:p-8 bg-[#0d1117] border border-white/5 rounded-2xl overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="flex gap-1">
                {weeks.map((week, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {week.map((day, j) => (
                      <div 
                        key={j} 
                        className={`w-3 h-3 rounded-sm ${getColor(day)} transition-colors duration-300 hover:ring-1 hover:ring-white`}
                        title="Contribution mock"
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>1,245 contributions in the last year</span>
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map(level => (
                      <div key={level} className={`w-3 h-3 rounded-sm ${getColor(level)}`} />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Blogs = () => {
  const posts = [
    {
      title: "Building Scalable Systems with Next.js and Redis",
      date: "Oct 24, 2025",
      readTime: "8 min read"
    },
    {
      title: "The Future of Frontend Architecture in 2026",
      date: "Sep 12, 2025",
      readTime: "6 min read"
    },
    {
      title: "Mastering System Design: A Developer's Guide",
      date: "Aug 05, 2025",
      readTime: "12 min read"
    }
  ];

  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SectionHeading title="Writing" subtitle={true} />
        
        <div className="space-y-6">
          {posts.map((post, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <a href="#" className="block group">
                <div className="py-6 border-b border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-200 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <ChevronRight className="text-gray-600 group-hover:text-blue-400 group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#050505]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">extraordinary.</span>
              </h2>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-md">
                Whether you have a project in mind or just want to chat about tech, architecture, or potential opportunities, my inbox is open.
              </p>
              
              <div className="flex flex-col gap-6">
                <a href="mailto:hello@example.com" className="flex items-center gap-4 text-gray-300 hover:text-white group w-fit">
                  <div className="p-4 bg-white/5 rounded-full border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
                    <Mail size={20} className="group-hover:text-blue-400" />
                  </div>
                  <span className="text-lg font-medium">hello@devalex.com</span>
                </a>
                
                <div className="flex items-center gap-4 mt-4">
                  {[
                    { icon: <Github size={20} />, href: "#" },
                    { icon: <Linkedin size={20} />, href: "#" },
                    { icon: <Twitter size={20} />, href: "#" }
                  ].map((social, idx) => (
                    <a key={idx} href={social.href} className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/10 text-gray-400 hover:text-white transition-all hover:-translate-y-1">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <GlowCard>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                  Send Message <ArrowRight size={18} />
                </button>
              </form>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 border-t border-white/10 text-center">
    <p className="text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} Alex Dev. Built with React & Tailwind.
    </p>
  </footer>
);

// --- Main App Entry ---

export default function App() {
  // Simulate setting basic SEO meta tags
  useEffect(() => {
    document.title = "Alex | Senior Software Engineer";
    const metaDescription = document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Portfolio of Alex, a Senior Software Engineer with 6 years of experience building scalable architectures and premium digital products.";
    document.head.appendChild(metaDescription);
    
    // Smooth scroll behavior for internal links
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <Experience />
        <Skills />
        <Projects />
        <GithubContributions />
        <Blogs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}