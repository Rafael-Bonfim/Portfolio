import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wrench, ImageOff } from "lucide-react";
import { projects } from "../projects";
import { useState } from "react";

function ProjectSection({ project }) {
  const [activeImg, setActiveImg] = useState(0);
  const hasImages = project.images && project.images.length > 0;

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 transition-all hover:border-zinc-700/80">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800/60">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          {project.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {hasImages ? (
          <>
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800 mb-4 bg-zinc-900/50 shadow-2xl shadow-black/80">
              <img
                src={project.images[activeImg]}
                alt={`${project.title} - image ${activeImg + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            {project.images.length > 1 && (
              <div className="flex gap-3 flex-wrap">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i
                      ? "border-zinc-300 opacity-100"
                      : "border-zinc-800 opacity-50 hover:opacity-80"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`thumb ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full aspect-video rounded-2xl border border-zinc-800 bg-zinc-900/40 flex flex-col items-center justify-center gap-3 text-zinc-500">
            <ImageOff size={36} />
            <p className="text-sm">
              Add project images in{" "}
              <code className="text-zinc-400 font-mono">projects.js</code>
            </p>
          </div>
        )}
      </div>

      {/* About the project */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-zinc-200 mb-4 pb-3 border-b border-zinc-800/60 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          About the project
        </h3>
        <div className="text-zinc-400 text-sm leading-relaxed flex flex-col gap-4 font-normal">
          {project.fullDescription.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Tools & Technologies */}
      {project.tools && project.tools.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base font-semibold text-zinc-200 mb-4 pb-3 border-b border-zinc-800/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <div
                key={tool}
                className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800/80 rounded-lg px-3.5 py-2 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-850 transition-all text-xs sm:text-sm font-medium"
              >
                <Wrench size={13} className="text-zinc-400" />
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Contribution */}
      {project.contribution && (
        <div>
          <h3 className="text-base font-semibold text-zinc-200 mb-4 pb-3 border-b border-zinc-800/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            My Contribution
          </h3>
          <div className="text-zinc-400 text-sm leading-relaxed flex flex-col gap-4 font-normal">
            {project.contribution.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 relative overflow-x-hidden selection:bg-violet-500/20 selection:text-violet-200">
      {/* Background Subtle Gradient Grid */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors mb-12 group text-sm font-medium"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to home</span>
        </button>

        {/* Page header */}
        <div className="mb-12">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            Portfolio
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-2">
            My Projects
          </h1>
          <p className="text-zinc-400 leading-relaxed text-sm">
            Complete projects I actively built and contributed to.
          </p>
        </div>

        {/* Projects list — all expanded */}
        <div className="flex flex-col gap-10">
          {projects.map((project) => (
            <ProjectSection key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
