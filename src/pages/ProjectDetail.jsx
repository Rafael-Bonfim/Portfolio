import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, ImageOff } from "lucide-react";
import { projects } from "../projects";
import { useState } from "react";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-400">
        Project not found.
      </div>
    );
  }

  const hasImages = project.images && project.images.length > 0;

  return (
    <div className="min-h-screen bg-[#111217] text-zinc-100 relative overflow-x-hidden selection:bg-violet-500/20 selection:text-violet-200">
      {/* Background Subtle Gradient Grid */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(80,82,98,0.025),rgba(255,255,255,0))] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Botão voltar */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors mb-12 group text-sm font-medium"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to home</span>
        </button>

        {/* Header do projeto */}
        <div className="mb-10">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            Project
          </p>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
              {project.title}
            </h1>
            <div className="flex gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-zinc-900 hover:bg-white rounded-xl text-sm font-medium transition-all shadow-xs"
                >
                  <ExternalLink size={15} /> Visit site
                </a>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
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

        {/* Galeria de imagens */}
        <div className="mb-10">
          {hasImages ? (
            <>
              {/* Imagem principal */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800 mb-4 bg-zinc-900/50 shadow-2xl shadow-black/80">
                <img
                  src={project.images[activeImg]}
                  alt={`${project.title} - image ${activeImg + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnails */}
              {project.images.length > 1 && (
                <div className="flex gap-3 flex-wrap">
                  {project.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImg === i
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
            /* Placeholder quando não há imagens */
            <div className="w-full aspect-video rounded-2xl border border-zinc-800 bg-zinc-900/40 flex flex-col items-center justify-center gap-3 text-zinc-500">
              <ImageOff size={36} />
              <p className="text-sm">
                Add project images in{" "}
                <code className="text-zinc-400 font-mono">projects.js</code>
              </p>
            </div>
          )}
        </div>

        {/* Descrição completa */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
          <h2 className="text-base font-semibold text-zinc-200 mb-4 pb-3 border-b border-zinc-800/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            About the project
          </h2>
          <div className="text-zinc-400 text-sm leading-relaxed flex flex-col gap-4 font-normal">
            {project.fullDescription.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
