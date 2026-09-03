import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
  Terminal,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Smartphone,
  Coffee,
  GitBranch,
  Server,
  FileCode2,
  Braces,
  ArrowUpRight,
  Wrench,
  Monitor,
  HardDrive,
  Shield,
  Headphones,
  Briefcase,
  Calendar,
  Instagram,
  Download,
} from "lucide-react";
import { projects } from "./projects";
import ProjectDetail from "./pages/ProjectDetail";

const GITHUB = "https://github.com/Rafael-Bonfim";
const LINKEDIN = "https://www.linkedin.com/in/rafael-bonfim-470817308/";
const INSTAGRAM = "https://www.instagram.com/r_lopess__/";

const skillBlocks = [
  {
    title: "Front-end",
    subsections: [
      {
        label: null,
        skills: [
          { name: "React", icon: <Layers size={15} /> },
          { name: "Next.js", icon: <Globe size={15} /> },
          { name: "TypeScript", icon: <Code2 size={15} /> },
          { name: "JavaScript", icon: <Code2 size={15} /> },
          { name: "Tailwind CSS", icon: <Braces size={15} /> },
          { name: "Vite", icon: <Cpu size={15} /> },
          { name: "HTML5", icon: <FileCode2 size={15} /> },
          { name: "CSS3", icon: <FileCode2 size={15} /> },
        ],
      },
    ],
  },
  {
    title: "Back-end & APIs",
    subsections: [
      {
        label: null,
        skills: [
          { name: "Node.js", icon: <Terminal size={15} /> },
          { name: "Express.js", icon: <Server size={15} /> },
          { name: "Flask", icon: <Server size={15} /> },
          { name: "REST APIs", icon: <Cpu size={15} /> },
          { name: "Prisma", icon: <Database size={15} /> },
          { name: "JWT", icon: <Shield size={15} /> },
        ],
      },
    ],
  },
  {
    title: "Data & Infrastructure",
    subsections: [
      {
        label: null,
        skills: [
          { name: "MySQL", icon: <Database size={15} /> },
          { name: "MongoDB", icon: <Database size={15} /> },
          { name: "Docker", icon: <HardDrive size={15} /> },
          { name: "Git", icon: <GitBranch size={15} /> },
          { name: "GitHub", icon: <Github size={15} /> },
          { name: "Insomnia", icon: <Code2 size={15} /> },
        ],
      },
    ],
  },
  {
    title: "Other Languages",
    subsections: [
      {
        label: null,
        skills: [
          { name: "Python", icon: <FileCode2 size={15} /> },
          { name: "Java", icon: <Coffee size={15} /> },
          { name: "Kotlin", icon: <Smartphone size={15} /> },
          { name: "C#", icon: <FileCode2 size={15} /> },
        ],
      },
    ],
  },
];

function SkillTag({ icon, name }) {
  return (
    <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800/80 rounded-lg px-3.5 py-2 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-850 transition-all text-xs sm:text-sm font-medium">
      <span className="text-zinc-400 group-hover:text-zinc-200">{icon}</span>
      <span>{name}</span>
    </div>
  );
}

function ProjectCard({ id, title, shortDescription, tags }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projeto/${id}`)}
      className="group bg-zinc-900/30 border border-zinc-800/70 hover:border-zinc-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:bg-zinc-900/60"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {title}
          </h3>
          <div className="w-8 h-8 rounded-lg bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-zinc-700/80 transition-all shrink-0">
            <ArrowUpRight size={16} />
          </div>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
          {shortDescription}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/40">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111217] text-zinc-100 overflow-x-hidden relative selection:bg-violet-500/20 selection:text-violet-200">
      {/* Background Subtle Gradient Grid */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(80,82,98,0.025),rgba(255,255,255,0))] pointer-events-none z-0" />

      {/* OVERLAY */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-99 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-zinc-950/95 border-r border-zinc-800/80 z-100 flex flex-col p-6 gap-8 backdrop-blur-2xl transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors flex items-center justify-center"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {["Home", "Experience", "Skills", "Projects", "About", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                <span>{item}</span>
                <ChevronRight size={14} className="text-zinc-600" />
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
          <div className="flex gap-3">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:rafa.lopes.bonfim@gmail.com"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
              title="E-mail"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </aside>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-3.5 transition-all duration-200 ${scrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60 shadow-xs"
          : "border-b border-transparent bg-transparent"
          }`}
      >
        <button
          onClick={() => setMenuOpen(true)}
          className="menu-toggle-button bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg p-2 text-zinc-400 hover:text-zinc-100 transition-colors flex items-center"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        <div className="flex gap-2 items-center">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 transition-colors"
            title="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="min-h-[92vh] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 px-6 sm:px-10 pt-28 pb-20 relative z-10 max-w-5xl mx-auto"
      >
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          <h1 className="hero-name text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-100 leading-tight mb-3">
            <span>Rafael Lopes Bonfim</span>
          </h1>

          <h2 className="text-xl sm:text-2xl font-light text-zinc-400 mb-8">
            MSD - <span className="text-zinc-100 font-semibold">Fatec Prof. Jessen Vidal</span>
          </h2>

          <div className="flex gap-3 flex-wrap justify-center md:justify-start">
            <a
              href="/RafaelBonfim_ENG.pdf"
              download="CV-Rafael-Lopes-Bonfim.pdf"
              className="hero-action-button hero-cv-button px-5 py-2.5 bg-zinc-100 text-zinc-900 hover:bg-white rounded-xl font-medium text-sm transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <Download size={15} /> Download CV
            </a>
            <a
              href="#projetos"
              className="hero-projects-button px-5 py-2.5 bg-zinc-900/80 border border-zinc-800 text-zinc-200 rounded-xl font-medium text-sm transition-all"
            >
              View Projects
            </a>
            <a
              href="#contato"
              className="hero-action-button hero-contact-button px-5 py-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 rounded-xl font-medium text-sm transition-all"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Hero Photo - Clean, Frame refined */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/80">
            <img
              src="/rafael.jpeg"
              alt="Rafael Lopes Bonfim"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA PROFISSIONAL */}
      <section
        id="experience"
        className="max-w-4xl mx-auto px-6 sm:px-8 py-20 relative z-10"
      >
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          Journey
        </p>
        <h2 className="text-3xl font-bold text-zinc-100 mb-10 tracking-tight">
          Professional Experience
        </h2>

        <div className="flex flex-col gap-6">
          {/* Goodblock Computadores */}
          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 transition-all hover:border-zinc-700/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-zinc-800/60">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-100">
                    Technical Assistance Intern
                  </h3>
                  <p className="text-sm text-zinc-400 font-medium">
                    Goodblock Computadores
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 w-fit">
                <Calendar size={13} />
                04/2026 - 07/2026
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-zinc-200 mb-0.5">
                    Hardware and Software Maintenance
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    Preventive and corrective maintenance on computers and notebooks, including formatting, operating system installation, malware removal, and performance optimization.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-zinc-200 mb-0.5">
                    Customer Support
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    Direct customer service for troubleshooting, clarifying technical doubts, and recommending appropriate solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-zinc-200 mb-0.5">
                    Hardware Consulting
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    Guidance on parts compatibility and upgrades, assisting customers in choosing processors, motherboards, and memory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETÊNCIAS */}
      <section
        id="skills"
        className="max-w-4xl mx-auto px-6 sm:px-8 py-20 relative z-10"
      >
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          Abilities
        </p>
        <h2 className="text-3xl font-bold text-zinc-100 mb-10 tracking-tight">
          My Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillBlocks.map((block) => (
            <div
              key={block.title}
              className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 transition-all hover:border-zinc-700/80 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 mb-4 pb-3 border-b border-zinc-800/60 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  {block.title}
                </h3>

                <div className="flex flex-col gap-4">
                  {block.subsections.map((sub, i) => (
                    <div key={i}>
                      {sub.label && (
                        <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2.5">
                          {sub.label}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {sub.skills.map((skill) => (
                          <SkillTag
                            key={skill.name}
                            icon={skill.icon}
                            name={skill.name}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section
        id="projects"
        className="max-w-4xl mx-auto px-6 sm:px-8 py-20 relative z-10"
      >
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          Portfolio
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-zinc-100 tracking-tight">
              My Projects
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm mt-2">
              Real and academic projects developed with a focus on best practices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>

      {/* SOBRE MIM */}
      <section
        id="about"
        className="max-w-4xl mx-auto px-6 sm:px-8 py-20 relative z-10"
      >
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          Personal
        </p>
        <h2 className="text-3xl font-bold text-zinc-100 mb-10 tracking-tight">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center justify-between">
          {/* TEXTO */}
          <div className="flex-1 flex flex-col gap-5">
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
              Multiplatform Software Development student at Fatec - Professor Jessen Vidal and IT technician, looking for new opportunities for learning and professional growth.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              Proficient in several modern technologies, looking for an opportunity to apply my knowledge and discover new paths in programming.
            </p>

            <div className="pt-2">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 text-zinc-200 hover:text-white rounded-xl font-medium text-sm transition-all shadow-xs w-fit group"
              >
                <Instagram size={16} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
                <span>More about me</span>
                <ArrowUpRight size={15} className="text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* FOTO */}
          <div className="shrink-0">
            <div className="w-52 h-64 sm:w-60 sm:h-74 md:w-64 md:h-80 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/80">
              <img
                src="/rafael2.JPG"
                alt="Rafael Lopes Bonfim"
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section
        id="contato"
        className="max-w-4xl mx-auto px-6 sm:px-8 py-20 text-center relative z-10"
      >
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          Contact
        </p>
        <h2 className="text-3xl font-bold text-zinc-100 mb-3 tracking-tight">
          Let's Talk?
        </h2>
        <p className="text-zinc-400 max-w-sm mx-auto leading-relaxed mb-8 text-sm">
          Open to professional opportunities, partnerships, and software projects.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="mailto:rafa.lopes.bonfim@gmail.com"
            className="contact-action-button contact-email-button px-5 py-2.5 bg-zinc-100 text-zinc-900 hover:bg-white rounded-xl font-medium text-sm transition-all inline-flex items-center gap-2 shadow-xs"
          >
            <Mail size={16} /> rafa.lopes.bonfim@gmail.com
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-action-button contact-social-button px-5 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 rounded-xl font-medium text-sm transition-all inline-flex items-center gap-2"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-action-button contact-social-button px-5 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 rounded-xl font-medium text-sm transition-all inline-flex items-center gap-2"
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/60 py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-xs text-zinc-500 font-mono relative z-10">
        <div>
          Rafael Lopes Bonfim
        </div>
        <div className="text-zinc-600">
          Developed with React & Tailwind CSS
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projeto/:id" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

