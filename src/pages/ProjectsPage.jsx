import { Link } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { projects } from "../projects";
import { useLang } from "../i18n";
import { LangToggle } from "../components/LangProvider";
import Reveal from "../components/Reveal";

function Block({ title, children }) {
  return (
    <div className="grid gap-4 border-t border-white/6 py-8 md:grid-cols-[220px_1fr] md:gap-10">
      <h3 className="font-mono text-xs text-zinc-500">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function Paragraphs({ items }) {
  return (
    <div className="flex max-w-[65ch] flex-col gap-4 leading-relaxed text-pretty text-zinc-400">
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function ProjectSection({ project, index }) {
  const { lang, t } = useLang();
  const [activeImg, setActiveImg] = useState(0);
  const title = project.title[lang];

  return (
    <article className="rounded-4xl border border-white/7 bg-zinc-900/40 p-6 sm:p-10">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 font-mono text-xs text-zinc-300">{String(index + 1).padStart(2, "0")}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-4xl">{title}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-400">
              {tag}
            </span>
          ))}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3.5 py-1 text-xs font-medium text-zinc-950 transition-colors hover:bg-white"
            >
              <Github size={13} /> {t.projectPage.code}
            </a>
          )}
        </div>
      </div>

      {project.images?.length > 0 && (
        <div className="mb-4">
          <div className="mb-4 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/80">
            <img
              src={project.images[activeImg]}
              alt={`${title} - ${t.projectPage.image} ${activeImg + 1}`}
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
          </div>
          {project.images.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {project.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`${t.projectPage.showImage} ${i + 1}`}
                  aria-pressed={activeImg === i}
                  className={`h-14 w-20 overflow-hidden rounded-xl border-2 transition-[border-color,opacity] duration-200 ${
                    activeImg === i ? "border-zinc-300 opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={img} alt="" width={80} height={56} loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Block title={t.projectPage.about}>
        <Paragraphs items={project.description[lang]} />
      </Block>

      {project.tools?.length > 0 && (
        <Block title={t.projectPage.tools}>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-xl border border-white/6 bg-zinc-950/50 px-3.5 py-2 text-sm font-medium text-zinc-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </Block>
      )}

      {project.contribution && (
        <Block title={t.projectPage.contribution}>
          <Paragraphs items={project.contribution[lang]} />
        </Block>
      )}
    </article>
  );
}

export default function ProjectsPage() {
  const { t } = useLang();

  // The router keeps the previous scroll position; start this page at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-canvas text-zinc-100 selection:bg-zinc-100 selection:text-zinc-900">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,4vw,5rem)] py-10">
        <div className="mb-20 flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            {t.projectPage.back}
          </Link>
          <LangToggle />
        </div>

        <Reveal className="mb-14">
          <h1 className="mb-4 text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-zinc-50">
            {t.projectPage.title}
          </h1>
          <p className="max-w-md leading-relaxed text-zinc-400">{t.projectPage.intro}</p>
        </Reveal>

        <div className="flex flex-col gap-10">
          {projects.map((project, i) => (
            <Reveal key={project.id}>
              <ProjectSection project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
