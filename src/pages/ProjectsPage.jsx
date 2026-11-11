import { Link } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { projects } from "../projects";
import { useLang } from "../i18n";
import { LangToggle } from "../components/LangProvider";
import Wire from "../components/Wire";

const gutter = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10";

function Paragraphs({ items }) {
  return (
    <div className="flex max-w-[65ch] flex-col gap-4 leading-relaxed text-pretty text-muted">
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

// A text node attached to the image node. `wire` draws the connector that leads into it.
function Block({ title, wire, className = "", children }) {
  return (
    <div className={`relative border-2 border-contrast p-5 sm:p-6 ${className}`}>
      {wire}
      <h3 className="display mb-4 text-[clamp(1.75rem,2.6vw,2.4rem)]">{title}</h3>
      {children}
    </div>
  );
}

function ProjectSection({ project }) {
  const { lang, t } = useLang();
  const [activeImg, setActiveImg] = useState(0);
  const title = project.title[lang];
  const hasThumbs = project.images?.length > 1;
  // mobile: connector drops from the block above; desktop: it comes in from the image node on the left
  const sideWire = (
    <>
      <Wire head className="bottom-[calc(100%+9px)] left-8 h-[calc(2.5rem-9px)] lg:hidden" />
      <Wire axis="x" head className="top-8 right-[calc(100%+11px)] hidden w-[calc(3rem-9px)] lg:block" />
    </>
  );

  return (
    <article className="mt-16 border-t-2 border-contrast pt-10 lg:mt-20 lg:pt-14">
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <h2 className="display max-w-[16ch] text-[clamp(2.5rem,6vw,5.5rem)] text-balance">{title}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="border border-contrast px-2.5 py-1 font-mono text-sm">
              {tag}
            </span>
          ))}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 border-2 border-contrast bg-contrast px-4 text-sm font-semibold text-surface hover:border-muted hover:bg-muted"
            >
              <Github size={16} aria-hidden="true" /> {t.projectPage.code}
            </a>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-x-12">
        <div>
          {project.images?.length > 0 && (
            <>
              <div className="relative border-2 border-contrast bg-ink p-2 sm:p-3">
                <img
                  src={project.images[activeImg]}
                  alt={`${title} - ${t.projectPage.image} ${activeImg + 1}`}
                  width={1280}
                  height={720}
                  className="block aspect-video w-full object-cover object-top"
                />
                <span aria-hidden="true" className="port top-8 -right-[6px] hidden lg:block" />
                <span aria-hidden="true" className="port -bottom-[6px] left-8 -translate-x-1/2" />
              </div>

              {hasThumbs && (
                <div className="flex justify-center gap-6 pt-8">
                  {project.images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActiveImg(i)}
                      aria-label={`${t.projectPage.showImage} ${i + 1}`}
                      aria-pressed={activeImg === i}
                      className={`group relative h-16 w-24 border-2 border-contrast p-1 ${
                        activeImg === i ? "bg-contrast" : "bg-ink hover:bg-contrast"
                      }`}
                    >
                      <Wire className="-top-[34px] left-1/2 h-8 -translate-x-1/2" />
                      <img
                        src={img}
                        alt=""
                        width={88}
                        height={56}
                        loading="lazy"
                        className={`h-full w-full object-cover transition-opacity duration-200 ${
                          activeImg === i ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <Block
            title={t.projectPage.about}
            className="mt-10 bg-ink"
            wire={
              <Wire
                head
                className={`left-8 bottom-[calc(100%+9px)] ${
                  hasThumbs ? "h-[calc(8.5rem-9px)]" : "h-[calc(2.5rem-9px)]"
                }`}
              />
            }
          >
            <Paragraphs items={project.description[lang]} />
          </Block>
        </div>

        <div className="flex flex-col gap-10 pt-10 lg:pt-0">
          {project.tools?.length > 0 && (
            <Block title={t.projectPage.tools} className="bg-ink" wire={sideWire}>
              <ul className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <li key={tool} className="border border-contrast bg-surface px-3 py-1.5 font-mono text-sm font-medium">
                    {tool}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {project.contribution && (
            <Block title={t.projectPage.contribution} className="bg-ink" wire={sideWire}>
              <Paragraphs items={project.contribution[lang]} />
            </Block>
          )}
        </div>
      </div>
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
    <div className="min-h-dvh overflow-x-hidden bg-surface text-contrast">
      <header className="border-b-2 border-contrast bg-ink">
        <div className={`flex h-14 items-center justify-between ${gutter}`}>
          <Link
            to="/"
            className="group inline-flex min-h-9 items-center gap-2 border-2 border-contrast px-3 text-sm font-semibold hover:bg-contrast hover:text-surface"
          >
            <ArrowLeft size={16} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
            {t.projectPage.back}
          </Link>
          <LangToggle />
        </div>
      </header>

      <main className={`pt-14 pb-24 lg:pt-20 lg:pb-32 ${gutter}`}>
        <h1 className="display text-[clamp(3.5rem,13vw,12rem)]">{t.projectPage.title}</h1>
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-pretty text-muted">{t.projectPage.intro}</p>

        {projects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}
      </main>
    </div>
  );
}
