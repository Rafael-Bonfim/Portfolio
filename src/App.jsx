import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  ArrowUpRight,
  ArrowUp,
  ArrowRight,
  Download,
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
  SiInstagram,
  SiWebmin,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { TbBrandCSharp, TbApi, TbActivityHeartbeat } from "react-icons/tb";
import ProjectsPage from "./pages/ProjectsPage";
import ScrollRevealText from "./components/ScrollRevealText";
import Wire from "./components/Wire";
import TechSpace from "./components/TechSpace";
import LangProvider, { LangToggle } from "./components/LangProvider";
import { useLang } from "./i18n";

const MotionDiv = motion.div;
const MotionLi = motion.li;

const GITHUB = "https://github.com/Rafael-Bonfim";
const LINKEDIN = "https://www.linkedin.com/in/rafael-bonfim-470817308/";
const INSTAGRAM = "https://www.instagram.com/r_lopess__/";
const EMAIL = "rafa.lopes.bonfim@gmail.com";
const GITHUB_ACADEMIC = "https://github.com/Projetos-Faculdade-Rafael";

const sectionIds = ["home", "experience", "skills", "projects", "about", "contact"];

// Brand colors on the icons; monochrome brands (Next.js, Express, GitHub...) follow the text color.
const skills = {
  frontend: [
    { name: "React", icon: <SiReact color="#61DAFB" /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> },
    { name: "Vite", icon: <SiVite color="#646CFF" /> },
    { name: "HTML5", icon: <SiHtml5 color="#E34F26" /> },
    { name: "CSS3", icon: <SiCss color="#1572B6" /> },
  ],
  apis: [
    { name: "Node.js", icon: <SiNodedotjs color="#5FA04E" /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "Flask", icon: <SiFlask /> },
    { name: "REST APIs", icon: <TbApi /> },
    { name: "JWT", icon: <SiJsonwebtokens /> },
  ],
  db: [
    { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
    { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
    { name: "Prisma", icon: <SiPrisma /> },
  ],
  languages: [
    { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
    { name: "Python", icon: <SiPython color="#3776AB" /> },
    { name: "Java", icon: <FaJava color="#E76F00" /> },
    { name: "Kotlin", icon: <SiKotlin color="#7F52FF" /> },
    { name: "C#", icon: <TbBrandCSharp color="#9B4F96" /> },
  ],
  tools: [
    { name: "Git", icon: <SiGit color="#F05032" /> },
    { name: "GitHub", icon: <SiGithub /> },
    { name: "Docker", icon: <SiDocker color="#2496ED" /> },
    { name: "Insomnia", icon: <SiInsomnia color="#A78BFA" /> },
    { name: "Claude Code", icon: <SiClaude color="#D97757" /> },
    { name: "AWS", icon: <FaAws color="#FF9900" /> },
    // no Zabbix glyph in react-icons: a monitoring pulse in Zabbix red stands in
    { name: "Zabbix", icon: <TbActivityHeartbeat color="#D40000" /> },
    { name: "Webmin", icon: <SiWebmin color="#7DA0D0" /> },
  ],
};
const allSkills = Object.values(skills).flat();

const gutter = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10";
const sectionTitle = "display text-[clamp(2.75rem,7vw,6.5rem)] text-balance";
const invertOnHover = "hover:bg-contrast hover:text-surface";

// Ports sit centered on a node's 2px border.
const port = {
  top: "port left-1/2 -top-[6px] -translate-x-1/2",
  bottom: "port left-1/2 -bottom-[6px] -translate-x-1/2",
  left: "port top-1/2 -left-[6px] -translate-y-1/2",
  right: "port top-1/2 -right-[6px] -translate-y-1/2",
};
const Port = ({ at, className = "" }) => <span aria-hidden="true" className={`${port[at]} ${className}`} />;

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

// Hero nodes come in one after another on load; reduced motion shows the final state.
function useAppear() {
  const still = useReducedMotion();
  return (delay) => ({
    initial: still ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  });
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
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-contrast bg-ink">
      <div className={`flex h-14 items-stretch justify-between gap-4 ${gutter}`}>
        <a href="#home" className="display flex items-center gap-1.5 self-center text-3xl leading-none">
          RB
          <span aria-hidden="true" className="size-2 bg-contrast" />
        </a>

        <nav aria-label="Main" className="hidden items-stretch lg:flex">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`flex items-center px-3.5 text-sm font-medium focus-visible:-outline-offset-4 ${
                active === id ? "bg-contrast text-surface" : invertOnHover
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
            className={`flex size-9 items-center justify-center border-2 border-contrast lg:hidden ${
              menuOpen ? "bg-contrast text-surface" : invertOnHover
            }`}
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <nav
        inert={!menuOpen}
        aria-label="Mobile"
        className={`invert-zone absolute inset-x-0 top-full bg-contrast text-surface transition-[opacity,transform] duration-200 lg:hidden ${
          menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className={`py-3 ${gutter}`}>
          {sectionIds.map((id, i) => (
            <li key={id} className="border-b border-surface/25 last:border-b-0">
              <a
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={active === id ? "true" : undefined}
                className={`display flex items-baseline justify-between px-2 py-3 text-[2.5rem] focus-visible:-outline-offset-4 ${
                  active === id ? "bg-surface text-contrast" : "hover:bg-surface hover:text-contrast"
                }`}
              >
                {t.nav[id]}
                <span className="font-mono text-xs font-medium tracking-normal">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  const { t } = useLang();
  const appear = useAppear();

  const ctas = [
    {
      href: "#projects",
      label: t.hero.projects,
      className: "border-contrast bg-contrast text-surface hover:bg-muted hover:border-muted",
    },
    {
      href: t.hero.cvFile,
      download: true,
      label: (
        <>
          <Download size={16} aria-hidden="true" /> {t.hero.cv}
        </>
      ),
      className: `border-contrast bg-ink ${invertOnHover}`,
    },
    {
      href: "#contact",
      label: (
        <>
          {t.hero.contact} <ArrowRight size={16} aria-hidden="true" />
        </>
      ),
      className: `border-dashed border-contrast ${invertOnHover}`,
    },
  ];

  return (
    <section id="home" className={`scroll-mt-14 pt-20 pb-20 lg:pt-24 lg:pb-28 ${gutter}`}>
      {/* Name + intro on the left; photo node wired to the CTAs on the right (single column below xl). */}
      <div className="grid grid-cols-1 gap-y-14 xl:grid-cols-[minmax(0,1fr)_600px] xl:gap-x-16">
        <div className="@container xl:self-center">
          {/* sized from the column width so "Rafael Lopes" always fills it without overflowing */}
          <motion.h1 {...appear(0)} className="display text-[18.5cqw]">
            <span className="block whitespace-nowrap">Rafael Lopes</span>
            <span className="block whitespace-nowrap">Bonfim</span>
          </motion.h1>

          <MotionDiv {...appear(0.45)} className="mt-10">
            <p className="relative inline-flex items-center gap-2 border-2 border-contrast bg-ink px-3 py-1.5 font-mono text-sm font-medium">
              <GraduationCap size={16} aria-hidden="true" />
              {t.hero.badge}
              <Port at="right" />
            </p>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-pretty text-muted">{t.hero.intro}</p>
          </MotionDiv>
        </div>

        <div className="relative">
          <MotionDiv
            {...appear(0.2)}
            className="relative ml-6 w-[54%] max-w-[300px] border-2 border-contrast bg-ink p-1.5 xl:mx-auto xl:w-[300px]"
          >
            <img
              src="/rafael.jpeg"
              alt={t.hero.photoAlt}
              width={290}
              height={387}
              fetchPriority="high"
              className="block aspect-[3/4] w-full object-cover"
            />
            <Port at="top" />
            <Port at="right" />
            <Port at="bottom" className="hidden xl:block" />
            <Port at="left" className="xl:hidden" />
            {/* mobile: spine down the left; desktop: trunk down to the bus */}
            <Wire onLoad delay={0.5} className="-left-[18px] top-1/2 -bottom-[34px] xl:hidden" />
            <Wire onLoad delay={0.45} axis="x" className="-left-[18px] top-1/2 w-4 xl:hidden" />
            <Wire onLoad delay={0.5} className="top-full left-1/2 hidden h-10 -translate-x-1/2 xl:block" />
          </MotionDiv>

          <ul className="relative mt-8 ml-6 flex flex-col gap-3 xl:mx-0 xl:mt-10 xl:grid xl:grid-cols-3 xl:gap-3 xl:pt-6">
            <Wire
              onLoad
              delay={0.75}
              axis="x"
              className="top-0 left-[calc((100%-1.5rem)/6)] right-[calc((100%-1.5rem)/6)] hidden xl:block"
            />
            {ctas.map((cta, i) => (
              <MotionLi key={cta.href} {...appear(0.9 + i * 0.12)} className="group relative">
                {/* connector lights up (thicker) while its CTA is hovered or focused */}
                <span
                  aria-hidden="true"
                  className="absolute -top-6 left-1/2 hidden h-6 w-0.5 -translate-x-1/2 transition-transform duration-200 group-focus-within:scale-x-[2.5] group-hover:scale-x-[2.5] xl:block"
                >
                  <Wire onLoad delay={0.85} className="inset-0" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -left-4 h-0.5 w-4 origin-left transition-transform duration-200 group-focus-within:scale-y-[2.5] group-hover:scale-y-[2.5] xl:hidden"
                >
                  <Wire onLoad axis="x" delay={0.8} className="inset-0" />
                </span>
                {i < ctas.length - 1 && <Wire onLoad delay={0.7} className="-left-4 top-0 -bottom-3 xl:hidden" />}
                {i === ctas.length - 1 && <Wire onLoad delay={0.7} className="-left-4 top-0 h-1/2 xl:hidden" />}
                <a
                  href={cta.href}
                  download={cta.download || undefined}
                  className={`flex min-h-12 items-center justify-center gap-2 border-2 px-4 py-3 text-[15px] font-semibold whitespace-nowrap xl:w-full ${cta.className}`}
                >
                  {cta.label}
                </a>
              </MotionLi>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const { t } = useLang();
  const items = t.experience.items;

  return (
    <section id="experience" className={`scroll-mt-14 border-t-2 border-contrast py-20 lg:py-24 ${gutter}`}>
      <h2 className={`${sectionTitle} mb-10 lg:mb-14`}>{t.experience.title}</h2>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1.9fr)]">
        <div className="relative self-start border-2 border-contrast bg-ink p-5">
          <p className="font-mono text-sm tabular-nums">04/2026 – 07/2026</p>
          <h3 className="mt-3 text-2xl leading-tight font-bold text-balance">{t.experience.role}</h3>
          <p className="mt-1 text-muted">Goodblock Computadores</p>
          <Wire axis="x" className="top-[22px] left-full hidden w-[calc(3rem+2px)] lg:block" />
          <Wire className="top-full left-3 h-14 lg:hidden" />
        </div>

        <ol className="mt-8 ml-3 flex flex-col gap-4 pl-6 lg:col-start-3 lg:mt-0 lg:ml-0">
          {items.map((item, i) => (
            <li key={i} className="relative">
              {i < items.length - 1 && <Wire delay={0.2} className="top-6 -bottom-10 -left-6" />}
              <Wire axis="x" head delay={0.35} className="top-6 -left-6 w-[calc(1.5rem-9px)]" />
              <div className="border-2 border-contrast bg-ink p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1.5 max-w-[68ch] text-sm leading-relaxed text-pretty text-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SkillList({ items, className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((s) => (
        <li
          key={s.name}
          className={`flex items-center gap-2 border border-contrast bg-surface px-3 py-2 text-sm font-medium ${invertOnHover} focus-within:bg-contrast focus-within:text-surface`}
        >
          <span aria-hidden="true" className="text-base">
            {s.icon}
          </span>
          {s.name}
        </li>
      ))}
    </ul>
  );
}

// Vertical joint between stacked layers (arrowhead = data flows downward).
const Joint = ({ head = false, className = "" }) => (
  <div aria-hidden="true" className={`relative h-12 ${className}`}>
    <Wire head={head} className={`top-0 left-8 ${head ? "h-[calc(100%-9px)]" : "h-full"}`} />
  </div>
);

function Skills() {
  const { t } = useLang();
  const layerTitle = "display text-[clamp(1.9rem,3vw,2.75rem)] mb-5";
  const toRail = <Wire axis="x" delay={0.4} className="top-1/2 left-full hidden w-[calc(2.5rem+2px)] lg:block" />;

  return (
    <section id="skills" className={`scroll-mt-14 border-t-2 border-contrast py-20 lg:py-28 ${gutter}`}>
      <h2 className={`${sectionTitle} mb-12 max-w-[14ch] lg:mb-16`}>{t.skills.title}</h2>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-x-10">
        <div className="flex flex-col">
          <div className="relative border-2 border-contrast bg-ink p-5 lg:p-6">
            <h3 className={layerTitle}>{t.skills.frontend}</h3>
            <SkillList items={skills.frontend} />
            {toRail}
          </div>

          <Joint head />

          <div className="relative border-2 border-contrast bg-ink p-5 lg:p-6">
            <h3 className={layerTitle}>{t.skills.backend}</h3>
            <div className="grid md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)]">
              <div className="border border-contrast p-4">
                <h4 className="mb-3 font-mono text-sm font-medium">{t.skills.apis}</h4>
                <SkillList items={skills.apis} />
              </div>
              <div aria-hidden="true" className="relative h-12 md:h-auto">
                <Wire head className="top-0 left-8 h-[calc(100%-9px)] md:hidden" />
                <Wire axis="x" head className="top-1/2 left-0 hidden w-[calc(100%-9px)] md:block" />
              </div>
              <div className="border border-contrast p-4">
                <h4 className="mb-3 font-mono text-sm font-medium">{t.skills.db}</h4>
                <SkillList items={skills.db} />
              </div>
            </div>
            {toRail}
          </div>

          <Joint />

          <div className="relative border-2 border-b-[10px] border-contrast bg-ink p-5 lg:p-6">
            <h3 className={layerTitle}>{t.skills.languages}</h3>
            <SkillList items={skills.languages} />
            {toRail}
          </div>
        </div>

        <Joint className="lg:hidden" />

        <div className="flex flex-col border-2 border-contrast bg-ink p-5 lg:p-6">
          <h3 className={layerTitle}>{t.skills.tools}</h3>
          <SkillList items={skills.tools} className="lg:flex-1 lg:flex-col lg:flex-nowrap lg:justify-between" />
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const { t } = useLang();
  const mat = "relative bg-ink p-2 sm:p-3 [--port-fill:var(--color-contrast)]";
  const zoom = "block w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]";
  const iconNode =
    "flex size-14 shrink-0 items-center justify-center border-2 border-surface text-surface group-hover:bg-surface group-hover:text-contrast";

  return (
    <section id="projects" className="invert-zone scroll-mt-14 bg-contrast text-ink">
      <div className={`py-20 lg:py-32 ${gutter}`}>
        <h2 className={`${sectionTitle} text-surface`}>{t.projects.title}</h2>
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-pretty">{t.projects.intro}</p>

        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-x-10">
          <Link to="/projetos" className="group block lg:col-span-8">
            <div className={mat}>
              <TechSpace items={allSkills} className="aspect-[4/3] sm:aspect-[1920/1032]" />
            </div>
            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <h3 className="display text-[clamp(2.75rem,6vw,5.5rem)] text-surface">{t.projects.main}</h3>
                <p className="mt-3 max-w-[40ch] leading-relaxed">{t.projects.mainDesc}</p>
              </div>
              <span aria-hidden="true" className={iconNode}>
                <ArrowUpRight size={22} />
              </span>
            </div>
          </Link>

          <a
            href={GITHUB_ACADEMIC}
            target="_blank"
            rel="noopener noreferrer"
            className="group block lg:col-span-4 lg:mt-[clamp(6rem,13vw,13rem)]"
          >
            {/* the two schools behind the academic work, stacked in one frame */}
            <div className={`${mat} grid gap-2 sm:gap-3`}>
              {[
                { src: "/images/Fatec.webp", height: 334, position: "object-[35%_50%]" },
                { src: "/images/Univap.webp", height: 573, position: "object-center" },
              ].map((img) => (
                <div key={img.src} className="overflow-hidden">
                  <img
                    src={img.src}
                    alt=""
                    width={860}
                    height={img.height}
                    loading="lazy"
                    className={`${zoom} aspect-video ${img.position}`}
                  />
                </div>
              ))}
              <Wire axis="x" className="top-1/2 right-full hidden w-10 text-surface lg:block" />
              <Port at="left" className="hidden text-surface lg:block" />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="display text-[clamp(2rem,3.4vw,3.25rem)] text-surface">{t.projects.academic}</h3>
                <p className="mt-3 leading-relaxed">{t.projects.academicDesc}</p>
              </div>
              <span aria-hidden="true" className={iconNode}>
                <Github size={20} />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { t } = useLang();

  return (
    <section id="about" className={`scroll-mt-14 py-20 lg:py-32 ${gutter}`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
        <h2 className={`${sectionTitle} lg:col-span-6 lg:col-start-7 lg:row-start-1`}>{t.about.title}</h2>

        <div className="relative border-2 border-contrast bg-ink p-1.5 lg:col-span-5 lg:row-span-2 lg:row-start-1">
          <img
            src="/rafael2.JPG"
            alt={t.about.photoAlt}
            width={555}
            height={837}
            loading="lazy"
            className="block aspect-[4/5] w-full object-cover"
          />
          <Port at="right" className="hidden lg:block" />
          <Port at="bottom" className="lg:hidden" />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:self-end">
          <ScrollRevealText
            text={t.about.p1}
            className="text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.2] font-medium tracking-tight text-pretty"
          />
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-pretty text-muted">{t.about.p2}</p>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative mt-10 inline-flex min-h-12 items-center gap-3 border-2 border-contrast bg-ink px-5 py-3 font-semibold ${invertOnHover}`}
          >
            <SiInstagram size={18} aria-hidden="true" />
            {t.about.more}
            <ArrowUpRight size={18} aria-hidden="true" />
            <Port at="left" />
            <Port at="right" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
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

  const social = `relative flex size-12 items-center justify-center border-2 border-contrast bg-ink ${invertOnHover}`;
  const link = (i) => (i > 0 ? <Wire axis="x" className="top-1/2 right-full w-3" /> : null);

  return (
    <section id="contact" className={`scroll-mt-14 border-t-2 border-contrast py-20 lg:py-28 ${gutter}`}>
      <h2 className={sectionTitle}>{t.contact.title}</h2>
      <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-muted">{t.contact.intro}</p>

      <div className="relative mt-10 lg:mt-14">
        <a
          href={`mailto:${EMAIL}`}
          className={`display block py-2 text-[clamp(1.5rem,7.9vw,9.5rem)] leading-[0.9] normal-case [overflow-wrap:anywhere] ${invertOnHover}`}
        >
          {EMAIL}
        </a>
        <Wire className="top-full left-6 h-10" />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
        <button
          type="button"
          onClick={copyEmail}
          className={`relative inline-flex min-h-12 items-center gap-2 border-2 border-contrast px-5 py-3 font-semibold ${
            copied ? "bg-contrast text-surface" : `bg-ink ${invertOnHover}`
          }`}
        >
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
          <span aria-hidden="true" className="port top-[-6px] left-[19px]" />
        </button>

        <ul className="flex gap-3">
          {[
            [LINKEDIN, "LinkedIn", <Linkedin key="i" size={19} />],
            [GITHUB, "GitHub", <Github key="i" size={19} />],
            [INSTAGRAM, "Instagram", <SiInstagram key="i" size={18} />],
          ].map(([href, label, icon], i) => (
            <li key={label} className="relative">
              {link(i)}
              <a href={href} target="_blank" rel="noopener noreferrer" className={social} aria-label={label}>
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Home() {
  const { t } = useLang();

  return (
    <div className="min-h-dvh overflow-x-hidden bg-surface text-contrast">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-contrast focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-surface"
      >
        {t.skip}
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>

      <footer className="border-t-2 border-contrast bg-ink">
        <div className={`flex flex-col gap-3 py-8 text-sm sm:flex-row sm:items-center sm:justify-between ${gutter}`}>
          <p className="font-medium">© {new Date().getFullYear()} Rafael Lopes Bonfim</p>
          <p className="text-muted">{t.footer.built}</p>
          <a href="#home" className="group inline-flex items-center gap-1.5 self-start font-medium hover:underline sm:self-auto">
            {t.footer.top}
            <ArrowUp size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
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
