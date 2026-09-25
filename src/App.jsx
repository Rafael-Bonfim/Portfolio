import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Download,
  FolderOpen,
  GraduationCap,
} from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiKotlin,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiJsonwebtokens,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiGithub,
  SiDocker,
  SiInsomnia,
  SiClaude,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCSharp, TbApi } from "react-icons/tb";
import ProjectsPage from "./pages/ProjectsPage";
import Reveal from "./components/Reveal";
import InstagramIcon from "./components/InstagramIcon";

const GITHUB = "https://github.com/Rafael-Bonfim";
const LINKEDIN = "https://www.linkedin.com/in/rafael-bonfim-470817308/";
const INSTAGRAM = "https://www.instagram.com/r_lopess__/";
const EMAIL = "rafa.lopes.bonfim@gmail.com";
const GITHUB_ACADEMIC = "https://github.com/Projetos-Faculdade-Rafael";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const skillBlocks = [
  {
    title: "Languages",
    subsections: [
      {
        label: null,
        skills: [
          { name: "JavaScript", icon: <SiJavascript size={15} color="#F7DF1E" /> },
          { name: "TypeScript", icon: <SiTypescript size={15} color="#3178C6" /> },
          { name: "Python", icon: <SiPython size={15} color="#3776AB" /> },
          { name: "Java", icon: <FaJava size={15} color="#E76F00" /> },
          { name: "Kotlin", icon: <SiKotlin size={15} color="#7F52FF" /> },
          { name: "C#", icon: <TbBrandCSharp size={15} color="#9B4F96" /> },
        ],
      },
    ],
  },
  {
    title: "Front-end",
    subsections: [
      {
        label: null,
        skills: [
          { name: "React", icon: <SiReact size={15} color="#61DAFB" /> },
          { name: "Next.js", icon: <SiNextdotjs size={15} /> },
          { name: "Tailwind CSS", icon: <SiTailwindcss size={15} color="#06B6D4" /> },
          { name: "Vite", icon: <SiVite size={15} color="#646CFF" /> },
          { name: "HTML5", icon: <SiHtml5 size={15} color="#E34F26" /> },
          { name: "CSS3", icon: <SiCss size={15} color="#1572B6" /> },
        ],
      },
    ],
  },
  {
    title: "Back-end & Data",
    subsections: [
      {
        label: "Frameworks & APIs",
        skills: [
          { name: "Node.js", icon: <SiNodedotjs size={15} color="#5FA04E" /> },
          { name: "Express.js", icon: <SiExpress size={15} /> },
          { name: "Flask", icon: <SiFlask size={15} /> },
          { name: "REST APIs", icon: <TbApi size={15} /> },
          { name: "JWT", icon: <SiJsonwebtokens size={15} /> },
        ],
      },
      {
        label: "Databases & ORM",
        skills: [
          { name: "MySQL", icon: <SiMysql size={15} color="#4479A1" /> },
          { name: "MongoDB", icon: <SiMongodb size={15} color="#47A248" /> },
          { name: "Prisma", icon: <SiPrisma size={15} /> },
        ],
      },
    ],
  },
  {
    title: "Tools & Workflow",
    subsections: [
      {
        label: null,
        skills: [
          { name: "Git", icon: <SiGit size={15} color="#F05032" /> },
          { name: "GitHub", icon: <SiGithub size={15} /> },
          { name: "Docker", icon: <SiDocker size={15} color="#2496ED" /> },
          { name: "Insomnia", icon: <SiInsomnia size={15} color="#A78BFA" /> },
          { name: "Claude Code", icon: <SiClaude size={15} color="#D97757" /> },
        ],
      },
    ],
  },
];

const experienceItems = [
  {
    title: "Hardware and Software Maintenance",
    description:
      "Preventive and corrective maintenance on computers and notebooks, including formatting, operating system installation, malware removal, and performance optimization.",
  },
  {
    title: "Customer Support",
    description:
      "Direct customer service for troubleshooting, clarifying technical doubts, and recommending appropriate solutions.",
  },
  {
    title: "Hardware Consulting",
    description:
      "Guidance on parts compatibility and upgrades, assisting customers in choosing processors, motherboards, and memory.",
  },
];

const iconLink =
  "p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors";
const primaryButton =
  "px-5 py-2.5 bg-zinc-100 text-zinc-900 hover:bg-white rounded-xl font-medium text-sm transition-colors inline-flex items-center gap-2";
const secondaryButton =
  "px-5 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white rounded-xl font-medium text-sm transition-colors inline-flex items-center gap-2";
const card =
  "bg-zinc-900/40 border border-zinc-800 rounded-2xl transition-colors hover:border-zinc-700";

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-zinc-500 mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-tight text-balance">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Bullet() {
  return <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />;
}

function SkillTag({ icon, name }) {
  return (
    <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-800/60 transition-colors text-xs sm:text-sm font-medium">
      <span aria-hidden="true" className="text-zinc-400">{icon}</span>
      <span>{name}</span>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-canvas text-zinc-100 overflow-x-hidden relative selection:bg-zinc-100 selection:text-zinc-900">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-zinc-100 focus:text-zinc-900 focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      {/* Background: neutral top glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.05),rgba(255,255,255,0))] pointer-events-none z-0" />

      {/* OVERLAY */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-99 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* SIDEBAR */}
      <aside
        inert={!menuOpen}
        aria-label="Site navigation"
        className={`fixed top-0 left-0 h-full w-72 bg-zinc-950/95 border-r border-zinc-800 z-100 flex flex-col p-6 gap-8 backdrop-blur-2xl overscroll-contain transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
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
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <span>{item.label}</span>
              <ChevronRight size={14} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="flex gap-3">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
            <a href={`mailto:${EMAIL}`} className={iconLink} aria-label="E-mail">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </aside>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-3.5 transition-colors duration-200 ${scrolled
          ? "bg-canvas/80 backdrop-blur-md border-b border-zinc-800/70"
          : "border-b border-transparent bg-transparent"
          }`}
      >
        <button
          onClick={() => setMenuOpen(true)}
          className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg p-2 text-zinc-400 hover:text-zinc-100 transition-colors flex items-center"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <Menu size={18} />
        </button>

        <div className="flex gap-2 items-center">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="min-h-[92vh] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 px-6 sm:px-10 pt-28 pb-20 relative z-10 max-w-5xl mx-auto scroll-mt-20"
        >
          <Reveal className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
            <p className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-zinc-500 mb-4">
              Software Developer
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-50 leading-[1.05] mb-4 text-balance">
              Rafael Lopes Bonfim
            </h1>

            <p className="text-lg sm:text-xl font-light text-zinc-400 mb-9">
              MSD · <span className="text-zinc-100 font-medium">Fatec Prof. Jessen Vidal</span>
            </p>

            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
              <a href="/RafaelBonfim_ENG.pdf" download="CV-Rafael-Lopes-Bonfim.pdf" className={primaryButton}>
                <Download size={15} /> Download CV
              </a>
              <a href="#projects" className={secondaryButton}>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 rounded-xl font-medium text-sm transition-colors"
              >
                Contact
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative shrink-0 flex items-center justify-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/80">
              <img
                src="/rafael.jpeg"
                alt="Rafael Lopes Bonfim"
                width={240}
                height={240}
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </section>

        {/* EXPERIÊNCIA PROFISSIONAL */}
        <section
          id="experience"
          className="max-w-4xl mx-auto px-6 sm:px-8 py-20 relative z-10 scroll-mt-20"
        >
          <Reveal>
            <SectionHeader eyebrow="Journey" title="Professional Experience" />

            <div className={`${card} p-6 sm:p-8`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
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
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 w-fit tabular-nums">
                  <Calendar size={13} />
                  04/2026 – 07/2026
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {experienceItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="mt-2">
                      <Bullet />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-zinc-200 mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* COMPETÊNCIAS */}
        <section
          id="skills"
          className="max-w-4xl mx-auto px-6 sm:px-8 py-20 relative z-10 scroll-mt-20"
        >
          <Reveal>
            <SectionHeader eyebrow="Abilities" title="My Skills" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillBlocks.map((block, i) => (
              <Reveal key={block.title} delay={(i % 2) * 0.08} className="h-full">
                <div className={`${card} p-6 h-full`}>
                  <h3 className="text-sm font-semibold text-zinc-200 mb-4 pb-3 border-b border-zinc-800 flex items-center gap-2">
                    <Bullet />
                    {block.title}
                  </h3>

                  <div className="flex flex-col gap-4">
                    {block.subsections.map((sub, j) => (
                      <div key={j}>
                        {sub.label && (
                          <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-medium mb-2.5">
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
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJETOS */}
        <section
          id="projects"
          className="max-w-4xl mx-auto px-6 sm:px-8 py-20 relative z-10 scroll-mt-20"
        >
          <Reveal>
            <SectionHeader eyebrow="Portfolio" title="My Projects">
              <p className="text-zinc-400 leading-relaxed text-sm mt-3">
                Real and academic projects developed with a focus on best practices.
              </p>
            </SectionHeader>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card: Projects — internal page */}
            <Reveal>
              <Link
                to="/projetos"
                className={`group ${card} hover:bg-zinc-900/70 p-7 sm:p-8 flex flex-col justify-between min-h-[200px] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover:text-zinc-100 transition-colors">
                      <FolderOpen size={20} />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-zinc-700/80 transition-colors shrink-0">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors mb-2">
                    Projects
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Complete projects I actively built and contributed to.
                  </p>
                </div>
              </Link>
            </Reveal>

            {/* Card: Academic Works — external GitHub */}
            <Reveal delay={0.08}>
              <a
                href={GITHUB_ACADEMIC}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${card} hover:bg-zinc-900/70 p-7 sm:p-8 flex flex-col justify-between min-h-[200px] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover:text-zinc-100 transition-colors">
                      <GraduationCap size={20} />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-zinc-700/80 transition-colors shrink-0">
                      <Github size={16} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors mb-2">
                    Academic Works
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Coursework and academic projects from my studies.
                  </p>
                </div>
              </a>
            </Reveal>
          </div>
        </section>

        {/* SOBRE MIM */}
        <section
          id="about"
          className="max-w-4xl mx-auto px-6 sm:px-8 py-20 relative z-10 scroll-mt-20"
        >
          <Reveal>
            <SectionHeader eyebrow="Personal" title="About Me" />

            <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center justify-between">
              {/* TEXTO */}
              <div className="flex-1 flex flex-col gap-5">
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed text-pretty">
                  Multiplatform Software Development student at Fatec - Professor Jessen Vidal and IT technician, looking for new opportunities for learning and professional growth.
                </p>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed text-pretty">
                  Proficient in several modern technologies, looking for an opportunity to apply my knowledge and discover new paths in programming.
                </p>

                <div className="pt-2">
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${secondaryButton} px-5 py-3 group`}
                  >
                    <InstagramIcon size={16} />
                    <span>More About Me</span>
                    <ArrowUpRight size={15} className="text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[color,translate]" />
                  </a>
                </div>
              </div>

              {/* FOTO */}
              <div className="shrink-0">
                <div className="w-52 h-64 sm:w-60 sm:h-74 md:w-64 md:h-80 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/80">
                  <img
                    src="/rafael2.JPG"
                    alt="Rafael Lopes Bonfim"
                    width={256}
                    height={320}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-[filter] duration-300"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CONTATO */}
        <section
          id="contact"
          className="max-w-4xl mx-auto px-6 sm:px-8 py-24 text-center relative z-10 scroll-mt-20"
        >
          <Reveal>
            <p className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-zinc-500 mb-3">
              Contact
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 mb-3 tracking-tight">
              Let’s Talk?
            </h2>
            <p className="text-zinc-400 max-w-sm mx-auto leading-relaxed mb-8 text-sm">
              Open to professional opportunities, partnerships, and software projects.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <a href={`mailto:${EMAIL}`} className={`${primaryButton} break-all`}>
                <Mail size={16} /> {EMAIL}
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                <Github size={16} /> GitHub
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/70 py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-xs text-zinc-500 font-mono relative z-10">
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
        <Route path="/projetos" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
