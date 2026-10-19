import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ArrowUp,
  ArrowRight,
  Download,
  FolderOpen,
  GraduationCap,
  Copy,
  Check,
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
import Spotlight from "./components/Spotlight";
import InstagramIcon from "./components/InstagramIcon";
import ScrollRevealText from "./components/ScrollRevealText";
import AsciiBand from "./components/AsciiBand";
import LangProvider, { LangToggle } from "./components/LangProvider";
import { useLang } from "./i18n";

const GITHUB = "https://github.com/Rafael-Bonfim";
const LINKEDIN = "https://www.linkedin.com/in/rafael-bonfim-470817308/";
const INSTAGRAM = "https://www.instagram.com/r_lopess__/";
const EMAIL = "rafa.lopes.bonfim@gmail.com";
const GITHUB_ACADEMIC = "https://github.com/Projetos-Faculdade-Rafael";

const sectionIds = ["home", "experience", "skills", "projects", "about", "contact"];

const skillBlocks = [
  {
    key: "languages",
    span: "md:col-span-3",
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
    key: "frontend",
    span: "md:col-span-3",
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
    key: "backend",
    span: "md:col-span-4",
    subsections: [
      {
        label: "apis",
        skills: [
          { name: "Node.js", icon: <SiNodedotjs size={15} color="#5FA04E" /> },
          { name: "Express.js", icon: <SiExpress size={15} /> },
          { name: "Flask", icon: <SiFlask size={15} /> },
          { name: "REST APIs", icon: <TbApi size={15} /> },
          { name: "JWT", icon: <SiJsonwebtokens size={15} /> },
        ],
      },
      {
        label: "db",
        skills: [
          { name: "MySQL", icon: <SiMysql size={15} color="#4479A1" /> },
          { name: "MongoDB", icon: <SiMongodb size={15} color="#47A248" /> },
          { name: "Prisma", icon: <SiPrisma size={15} /> },
        ],
      },
    ],
  },
  {
    key: "tools",
    span: "md:col-span-2",
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

const allSkills = skillBlocks.flatMap((b) => b.subsections.flatMap((s) => s.skills));

const gutter = "mx-auto w-full max-w-[1400px] px-[clamp(1.25rem,4vw,5rem)]";
const section = `relative z-10 scroll-mt-24 py-24 sm:py-32 ${gutter}`;
const card =
  "rounded-3xl border border-white/7 bg-zinc-900/40 transition-colors duration-300 hover:border-white/15";
const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.97]";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-200 transition-[background-color,border-color,transform] duration-200 hover:border-white/20 hover:bg-zinc-800/80 hover:text-white active:scale-[0.97]";
const iconButton =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900/60 text-zinc-400 transition-colors duration-200 hover:border-white/20 hover:text-zinc-100";

function useActiveSection() {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

function SectionHeader({ title, children }) {
  return (
    <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
      <h2 className="text-4xl font-semibold tracking-[-0.035em] text-balance text-zinc-50 sm:text-5xl">
        {title}
      </h2>
      {children && (
        <p className="max-w-sm text-sm leading-relaxed text-pretty text-zinc-400">{children}</p>
      )}
    </div>
  );
}

function SkillTag({ icon, name }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/6 bg-zinc-950/50 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors duration-200 hover:border-white/15 hover:text-zinc-50 sm:text-sm">
      <span aria-hidden="true" className="text-zinc-400">{icon}</span>
      <span>{name}</span>
    </div>
  );
}

function Header() {
  const { t } = useLang();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`relative mt-4 flex items-center justify-between gap-3 ${gutter}`}>
        <a
          href="#home"
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/70 px-4 py-2 font-mono text-sm font-medium tracking-tight text-zinc-100 backdrop-blur-md"
        >
          RB<span className="h-1.5 w-1.5 rounded-full bg-zinc-100" />
        </a>

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-zinc-900/70 p-1 backdrop-blur-md md:flex"
        >
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
                active === id ? "bg-white/10 text-zinc-50" : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-zinc-900/70 text-zinc-300 backdrop-blur-md transition-colors hover:text-zinc-50 md:hidden"
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <nav
          inert={!menuOpen}
          aria-label="Mobile"
          className={`absolute inset-x-4 top-full mt-2 flex flex-col rounded-2xl border border-white/10 bg-zinc-950/95 p-2 backdrop-blur-xl transition-[opacity,transform] duration-200 md:hidden ${
            menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          {sectionIds.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                active === id ? "bg-white/5 text-zinc-50" : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {t.nav[id]}
              <span className="font-mono text-[11px] text-zinc-600">0{i + 1}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Home() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the mailto link still works
    }
  };

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-canvas text-zinc-100 selection:bg-zinc-100 selection:text-zinc-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-zinc-100 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-950"
      >
        {t.skip}
      </a>

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />

      <Header />

      <main id="main">
        {/* HERO */}
        <section
          id="home"
          className={`relative z-10 grid min-h-dvh scroll-mt-24 items-center gap-16 pt-32 pb-20 md:grid-cols-[1.5fr_1fr] ${gutter}`}
        >
          <Reveal>
            <h1 className="mb-8 text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-zinc-50">
              Rafael Lopes
              <br />
              Bonfim
            </h1>

            <p className="mb-10 max-w-[46ch] text-lg leading-relaxed text-pretty text-zinc-400">
              {t.hero.intro}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href={t.hero.cvFile} download className={primaryButton}>
                <Download size={15} /> {t.hero.cv}
              </a>
              <a href="#projects" className={secondaryButton}>
                {t.hero.projects}
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {t.hero.contact}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative mx-auto w-full max-w-[360px]">
            <div className="relative aspect-[4/5] rotate-2 overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 shadow-2xl shadow-black/80 transition-transform duration-500 hover:rotate-0">
              <img
                src="/rafael.jpeg"
                alt={t.hero.photoAlt}
                width={360}
                height={450}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-4 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-zinc-900/90 px-4 py-3 text-sm font-medium text-zinc-200 shadow-xl shadow-black/40 backdrop-blur-md sm:-left-8">
              <GraduationCap size={16} className="text-zinc-300" />
              {t.hero.badge}
            </div>
          </Reveal>
        </section>

        <AsciiBand />

        {/* TECH STRIP */}
        <div className="marquee-mask relative z-10 overflow-hidden border-y border-white/6 py-6" aria-hidden="true">
          <div className="marquee flex w-max gap-12">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span key={i} className="flex items-center gap-2.5 text-sm font-medium whitespace-nowrap text-zinc-500">
                {skill.icon}
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        <section id="experience" className={section}>
          <Reveal>
            <SectionHeader title={t.experience.title} />

            <Spotlight className={`${card} grid gap-8 p-6 sm:p-8 md:grid-cols-[240px_1fr]`}>
              <div>
                <p className="font-mono text-xs text-zinc-300 tabular-nums">04/2026 – 07/2026</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-50">{t.experience.role}</h3>
                <p className="mt-1 text-sm text-zinc-400">Goodblock Computadores</p>
              </div>

              <ol className="divide-y divide-white/6">
                {t.experience.items.map((item, i) => (
                  <li key={i} className="flex gap-5 py-5 first:pt-0 last:pb-0">
                    <span className="pt-0.5 font-mono text-xs text-zinc-600">0{i + 1}</span>
                    <div>
                      <p className="font-medium text-zinc-100">{item.title}</p>
                      <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-zinc-400">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Spotlight>
          </Reveal>
        </section>

        {/* SKILLS */}
        <section id="skills" className={section}>
          <Reveal>
            <SectionHeader title={t.skills.title} />
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
            {skillBlocks.map((block, i) => (
              <Reveal key={block.key} delay={i * 0.06} className={block.span}>
                <Spotlight className={`${card} h-full p-6`}>
                  <div className="mb-6 flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-100">{t.skills[block.key]}</h3>
                    <span className="font-mono text-xs text-zinc-600 tabular-nums">
                      {block.subsections.reduce((n, s) => n + s.skills.length, 0)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-5">
                    {block.subsections.map((sub, j) => (
                      <div key={j}>
                        {sub.label && <p className="mb-2.5 text-xs font-medium text-zinc-500">{t.skills[sub.label]}</p>}
                        <div className="flex flex-wrap gap-2">
                          {sub.skills.map((skill) => (
                            <SkillTag key={skill.name} icon={skill.icon} name={skill.name} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className={section}>
          <Reveal>
            <SectionHeader title={t.projects.title}>
              {t.projects.intro}
            </SectionHeader>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <Reveal className="md:col-span-3">
              <Spotlight
                as={Link}
                to="/projetos"
                className={`group ${card} flex h-full min-h-60 flex-col justify-between p-7 sm:p-8`}
              >
                <div className="flex items-start justify-between">
                  <FolderOpen size={22} className="text-zinc-300" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-[background-color,color,transform] duration-300 group-hover:rotate-45 group-hover:bg-zinc-100 group-hover:text-zinc-950">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <div>
                  <p className="mb-3 font-mono text-xs text-zinc-600">01</p>
                  <h3 className="mb-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-3xl">
                    {t.projects.main}
                  </h3>
                  <p className="max-w-[40ch] text-sm leading-relaxed text-zinc-400">{t.projects.mainDesc}</p>
                </div>
              </Spotlight>
            </Reveal>

            <Reveal delay={0.08} className="md:col-span-2">
              <Spotlight
                as="a"
                href={GITHUB_ACADEMIC}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${card} flex h-full min-h-60 flex-col justify-between p-7 sm:p-8`}
              >
                <div className="flex items-start justify-between">
                  <GraduationCap size={22} className="text-zinc-300" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors duration-300 group-hover:bg-zinc-100 group-hover:text-zinc-950">
                    <Github size={18} />
                  </span>
                </div>
                <div>
                  <p className="mb-3 font-mono text-xs text-zinc-600">02</p>
                  <h3 className="mb-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-3xl">
                    {t.projects.academic}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{t.projects.academicDesc}</p>
                </div>
              </Spotlight>
            </Reveal>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={section}>
          <Reveal>
            <SectionHeader title={t.about.title} />

            <div className="grid items-center gap-14 md:grid-cols-[1fr_1.3fr] md:gap-20">
              <div className="mx-auto w-full max-w-[400px]">
                <div className="aspect-[4/5] -rotate-2 overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] transition-transform duration-500 hover:rotate-0">
                  <img
                    src="/rafael2.JPG"
                    alt={t.about.photoAlt}
                    width={400}
                    height={500}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[20%] transition-[filter] duration-500 hover:grayscale-0"
                  />
                </div>
              </div>

              <div>
                <ScrollRevealText
                  text={t.about.p1}
                  className="mb-6 text-2xl leading-snug font-medium tracking-tight text-pretty text-zinc-50 sm:text-3xl"
                />
                <p className="mb-10 max-w-[60ch] leading-relaxed text-pretty text-zinc-400">{t.about.p2}</p>

                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className={`group ${secondaryButton}`}>
                  <InstagramIcon size={16} />
                  <span>{t.about.more}</span>
                  <ArrowUpRight
                    size={15}
                    className="text-zinc-500 transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-300"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className={section}>
          <Reveal>
            <div className="rounded-4xl border border-white/8 bg-zinc-900/40 px-7 py-12 sm:px-12 sm:py-16">
              <h2 className="mb-5 text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-zinc-50">
                {t.contact.title}
              </h2>
              <p className="mb-10 max-w-md leading-relaxed text-zinc-400">{t.contact.intro}</p>

              <div className="mb-10 flex flex-wrap items-center gap-3">
                <a href={`mailto:${EMAIL}`} className={`${primaryButton} break-all`}>
                  <Mail size={16} /> {EMAIL}
                </a>
                <button type="button" onClick={copyEmail} className={secondaryButton}>
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
                </button>
              </div>

              <div className="flex gap-2">
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={iconButton} aria-label="LinkedIn">
                  <Linkedin size={17} />
                </a>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={iconButton} aria-label="GitHub">
                  <Github size={17} />
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className={iconButton} aria-label="Instagram">
                  <InstagramIcon size={17} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className={`relative z-10 flex flex-col items-center justify-between gap-4 border-t border-white/6 py-10 text-xs text-zinc-500 sm:flex-row ${gutter}`}>
        <p>© {new Date().getFullYear()} Rafael Lopes Bonfim</p>
        <p className="text-zinc-600">{t.footer.built}</p>
        <a href="#home" className="group inline-flex items-center gap-1.5 transition-colors hover:text-zinc-200">
          {t.footer.top}
          <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
        </a>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<ProjectsPage />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}
