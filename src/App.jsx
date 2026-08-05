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
} from "lucide-react";
import { projects } from "./projects";
import ProjectDetail from "./pages/ProjectDetail";

const GITHUB = "https://github.com/rafa2333";
const LINKEDIN = "https://www.linkedin.com/in/rafael-lopes-bonfim-470817308";

const skillBlocks = [
  {
    title: "Desenvolvimento Web",
    subsections: [
      {
        label: "Front-end",
        skills: [
          { name: "React", icon: <Layers size={16} /> },
          { name: "HTML5 & CSS3", icon: <Globe size={16} /> },
          { name: "JavaScript", icon: <Code2 size={16} /> },
          { name: "Tailwind CSS", icon: <Braces size={16} /> },
        ],
      },
      {
        label: "Back-end",
        skills: [
          { name: "Node.js", icon: <Terminal size={16} /> },
          { name: "Express.js", icon: <Server size={16} /> },
          { name: "Flask", icon: <Server size={16} /> },
          { name: "REST APIs", icon: <Cpu size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Desenvolvimento de Software",
    subsections: [
      {
        label: null,
        skills: [
          { name: "Python", icon: <FileCode2 size={16} /> },
          { name: "Java", icon: <Coffee size={16} /> },
          { name: "Kotlin", icon: <Smartphone size={16} /> },
          { name: "C", icon: <FileCode2 size={16} /> },
          { name: "C#", icon: <FileCode2 size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Manutenção & Hardware",
    subsections: [
      {
        label: "Manutenção",
        skills: [
          { name: "Manutenção Preventiva e Corretiva", icon: <Wrench size={16} /> },
          { name: "Formatação e Instalação de S.O.", icon: <Monitor size={16} /> },
          { name: "Remoção de Malwares", icon: <Shield size={16} /> },
          { name: "Diagnóstico de Problemas", icon: <Headphones size={16} /> },
        ],
      },
      {
        label: "Hardware",
        skills: [
          { name: "Montagem de Computadores", icon: <Cpu size={16} /> },
          { name: "Upgrades e Compatibilidade", icon: <HardDrive size={16} /> },
          { name: "Suporte ao Cliente", icon: <Headphones size={16} /> },
        ],
      },
    ],
    
  },
  {
    title: "Gerais",
    subsections: [
      {
        label: null,
        skills: [
          { name: "MySQL", icon: <Database size={16} /> },
          { name: "MongoDB", icon: <Database size={16} /> },
          { name: "Git & GitHub", icon: <GitBranch size={16} /> },
        ],
      },
    ],
  },
];

function SkillTag({ icon, name }) {
  return (
    <div className="flex items-center gap-2 bg-purple-950/40 border border-purple-800/30 rounded-xl px-4 py-2 hover:border-purple-500/50 transition-colors">
      <span className="text-purple-500">{icon}</span>
      <span className="text-sm font-medium text-purple-200">{name}</span>
    </div>
  );
}

function ProjectCard({ id, title, shortDescription, tags }) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 min-w-70 bg-purple-950/10 border border-purple-900/30 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-600/40 transition-all hover:-translate-y-1 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-bold text-purple-100">{title}</h3>
        <div className="flex gap-2 shrink-0">
          {/* Botão ver detalhes */}
          <button
            onClick={() => navigate(`/projeto/${id}`)}
            title="Ver detalhes"
            className="text-purple-600 hover:text-purple-400 transition-colors"
          >
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
      <p className="text-purple-300/60 text-sm leading-relaxed flex-1">
        {shortDescription}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-purple-900/40 text-purple-400 border border-purple-800/30"
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
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blob1X = mouseX,
      blob1Y = mouseY;
    let blob2X = mouseX,
      blob2Y = mouseY;
    let animFrame;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // blob1 segue rápido
      blob1X += (mouseX - blob1X) * 0.08;
      blob1Y += (mouseY - blob1Y) * 0.08;

      // blob2 segue mais devagar (efeito de lag)
      blob2X += (mouseX - blob2X) * 0.04;
      blob2Y += (mouseY - blob2Y) * 0.04;

      const b1 = document.getElementById("blob1");
      const b2 = document.getElementById("blob2");

      if (b1) {
        b1.style.left = `${blob1X}px`;
        b1.style.top = `${blob1Y}px`;
      }
      if (b2) {
        b2.style.left = `${blob2X}px`;
        b2.style.top = `${blob2Y}px`;
      }

      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#08060f] text-purple-100 overflow-x-hidden relative">
      <div
        id="blob1"
        className="fixed w-40 h-40 rounded-full bg-purple-700 opacity-15 blur-3xl pointer-events-none z-0 transition-none"
        style={{ transform: "translate(-50%, -50%)", top: "50%", left: "50%" }}
      />
      <div
        id="blob2"
        className="fixed w-40 h-40 rounded-full bg-violet-800 opacity-10 blur-3xl pointer-events-none z-0 transition-none"
        style={{ transform: "translate(-50%, -50%)", top: "50%", left: "50%" }}
      />

      {/* OVERLAY */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-99 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-linear-to-b from-[#120a2a] to-[#0d0818] border-r border-purple-900/40 z-100 flex flex-col p-6 gap-8 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="self-end bg-purple-900/30 border border-purple-700/40 rounded-lg p-2 text-purple-400 hover:bg-purple-800/40 transition-colors"
        >
          <X size={18} />
        </button>
        <div className="text-xl font-bold text-purple-200 tracking-wide">
          Menu
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {["Início", "Sobre", "Experiência", "Competências", "Projetos", "Contato"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-purple-300/80 hover:text-purple-200 hover:bg-purple-900/30 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              >
                <ChevronRight size={13} className="text-purple-500" />
                {item}
              </a>
            ),
          )}
        </nav>
        <div className="flex gap-4 pt-4 border-t border-purple-900/30">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-400 transition-colors"
          >
            <Github size={19} />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-400 transition-colors"
          >
            <Linkedin size={19} />
          </a>
          <a
            href="mailto:rafa.lopes.bonfim@gmail.com"
            className="text-purple-600 hover:text-purple-400 transition-colors"
          >
            <Mail size={19} />
          </a>
        </div>
      </aside>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${scrolled ? "bg-[#08060f]/85 backdrop-blur-xl border-b border-purple-900/30" : "border-b border-transparent"}`}
      >
        <button
          onClick={() => setMenuOpen(true)}
          className="bg-purple-900/20 border border-purple-700/40 rounded-xl px-3 py-2 text-purple-400 hover:bg-purple-800/30 transition-colors flex items-center"
        >
          <Menu size={19} />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-purple-100 tracking-wide">
          <span className="text-purple-500">&lt;</span>dev
          <span className="text-purple-500">&gt;</span>
        </div>
        <div className="flex gap-4 items-center">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-400 transition-colors"
          >
            <Github size={17} />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-400 transition-colors"
          >
            <Linkedin size={17} />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="início"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 px-10 pt-28 pb-50 relative z-10 max-w-5xl mx-auto"
      >
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          <h1 className="text-6xl font-extrabold leading-tight mb-3 bg-linear-to-br from-purple-100 via-purple-200 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Rafael Lopes Bonfim
          </h1>
          <h2 className="text-2xl font-light text-purple-400/80 mb-6">
          DSM - {" "} 
            <span className="text-purple-400 font-semibold">Fatec</span>
          </h2>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start mb-6">
            <a
              href="/RafaelBonfim_PT.pdf"
              download="CV-Rafael-Lopes-Bonfim.pdf"
              className="px-8 py-3 bg-linear-to-r from-violet-700 to-purple-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 transition-shadow inline-flex items-center gap-2"
            >
              <FileCode2 size={16} /> Baixar CV
            </a>
            <a
              href="#projetos"
              className="px-8 py-3 border border-purple-700/50 text-purple-400 rounded-xl font-semibold text-sm hover:bg-purple-900/20 transition-colors"
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="px-8 py-3 border border-purple-700/50 text-purple-400 rounded-xl font-semibold text-sm hover:bg-purple-900/20 transition-colors"
            >
              Contato
            </a>
          </div>
        </div>

        <div className="relative shrink-0 flex items-center justify-center">
          {/* Ondas irradiando para fora */}
          <div className="absolute w-40 h-40 md:w-63 md:h-63 rounded-full border border-purple-500/30 animate-[wave_3.5s_ease-out_infinite]" />
          <div className="absolute w-40 h-40 md:w-63 md:h-63 rounded-full border border-purple-500/20 animate-[wave_3.5s_0.8s_ease-out_infinite]" />
          <div className="absolute w-40 h-40 md:w-63 md:h-63 rounded-full border border-purple-500/10 animate-[wave_3.5s_1.6s_ease-out_infinite]" />

          {/* Brilho atrás da foto */}
          <div className="absolute w-40 h-40 md:w-63 md:h-63 rounded-full bg-purple-600/20 blur-2xl" />

          {/* Foto */}
          <div className="relative w-40 h-40 md:w-63 md:h-63 rounded-full overflow-hidden border-2 border-purple-700/50 shadow-2xl shadow-purple-900/60 z-10">
            <img
              src="/rafael.jpeg"
              alt="Rafael Lopes Bonfim"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Brilho embaixo */}
          <div className="absolute -bottom-4 w-32 h-6 bg-purple-600/30 blur-xl rounded-full" />
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="h-px w-67 bg-linear-to-r from-transparent via-purple-600 to-transparent" />
        </div>
      </section>

      {/* SOBRE MIM */}
      <section
        id="sobre"
        className="max-w-4xl mx-auto px-6 py-24 relative z-10"
      >
        <p className="text-[11px] tracking-[3px] uppercase text-violet-600 font-semibold mb-3">
          Quem sou eu
        </p>
        <h2 className="text-4xl font-bold text-purple-100 mb-12 tracking-tight">
          Sobre <span className="text-purple-500">Mim</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* TEXTO */}
          <div className="flex-1 flex flex-col gap-5">
            <p className="text-purple-300/80 text-sm leading-relaxed">
              Estudante de Desenvolvimento de Software Multiplataforma na FATEC e Técnico em Informática. Possuo habilidade prática com tecnologias modernas e consolidadas no mercado, desenvolvendo aplicações integradas e responsivas de ponta a ponta. Minha abordagem profissional é voltada para a versatilidade e adaptação, com facilidade para transitar entre diferentes linguagens de programação e ferramentas essenciais para entregar o melhor resultado em cada projeto.
              </p>
            <p className="text-purple-300/80 text-sm leading-relaxed">
              No ecossistema de desenvolvimento, sou habituado a projetar e consumir APIs REST, realizar a modelagem e manipulação de bancos de dados relacionais e não relacionais (MySQL e MongoDB), além de aplicar boas práticas de arquitetura cliente-servidor através do controle de versão com Git e GitHub. Entre os meus projetos de destaque, desenvolvi um Sistema de Emissão de Notas de Despesas em Python, utilizando CustomTkinter para a interface gráfica e MySQL para o armazenamento de dados e processos administrativos.
              </p>
            <p className="text-purple-300/80 text-sm leading-relaxed">
            Recentemente, tive a oportunidade de trabalhar em uma assistência técnica, uma experiência fundamental para expandir meus conhecimentos práticos e adquirir novas visões de mercado. Esse desafio me permitiu consolidar hard skills importantes, como a montagem e manutenção de computadores e a configuração de sistemas operacionais. Mais do que lidar com a infraestrutura física, foi um período essencial para o desenvolvimento de fortes soft skills. Vivenciando a rotina de trabalho em equipe, aprimorei significativamente minha capacidade de comunicação com o time, a colaboração em grupo e o atendimento ao cliente, conectando a base técnica à prática e às necessidades reais do dia a dia.
              </p>
            <p className="text-purple-300/80 text-sm leading-relaxed">
            Com fluência em inglês e uma base sólida que une infraestrutura e engenharia de software, busco constantemente oportunidades para aplicar meu conhecimento técnico, enfrentar novos desafios e contribuir com soluções inovadoras no desenvolvimento de tecnologia.
            </p>
          </div>

          {/* FOTO */}
          <div className="shrink-0 relative flex items-center justify-center">
            {/* Ondas irradiando (mesmas do hero, adaptadas para retângulo) */}
            <div className="absolute w-56 h-72 md:w-64 md:h-80 rounded-2xl border border-purple-500/30 animate-[wave_3.5s_ease-out_infinite]" />
            <div className="absolute w-56 h-72 md:w-64 md:h-80 rounded-2xl border border-purple-500/20 animate-[wave_3.5s_0.8s_ease-out_infinite]" />
            <div className="absolute w-56 h-72 md:w-64 md:h-80 rounded-2xl border border-purple-500/10 animate-[wave_3.5s_1.6s_ease-out_infinite]" />

            {/* Brilho atrás */}
            <div className="absolute inset-0 bg-purple-600/10 blur-2xl rounded-2xl" />

            {/* Foto */}
            <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden border border-purple-800/40 shadow-2xl shadow-purple-900/50 z-10">
              <img
                src="/rafael2.JPG"
                alt="Rafael Lopes Bonfim"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Brilho embaixo */}
            <div className="absolute -bottom-4 w-40 h-6 bg-purple-600/30 blur-xl rounded-full" />
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA PROFISSIONAL */}
      <section
        id="experiência"
        className="max-w-4xl mx-auto px-6 py-24 relative z-10"
      >
        <p className="text-[11px] tracking-[3px] uppercase text-violet-600 font-semibold mb-3">
          Onde eu trabalhei
        </p>
        <h2 className="text-4xl font-bold text-purple-100 mb-12 tracking-tight">
          Experiência <span className="text-purple-500">Profissional</span>
        </h2>

        <div className="flex flex-col gap-8">
          {/* Goodblock Computadores */}
          <div className="bg-purple-950/10 border border-purple-900/30 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-600/40 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-700/30 flex items-center justify-center">
                  <Briefcase size={18} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-purple-100">
                    Estagiário em Assistência Técnica
                  </h3>
                  <p className="text-sm text-purple-400/80 font-medium">
                    Goodblock Computadores
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-purple-500 font-semibold bg-purple-900/30 border border-purple-800/30 rounded-full px-4 py-1.5 w-fit">
                <Calendar size={13} />
                04/2026 - 07/2026
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-purple-200 mb-1">
                      Manutenção de Hardware e Software
                    </p>
                    <p className="text-sm text-purple-300/60 leading-relaxed">
                      Realização de manutenção preventiva e corretiva em computadores e notebooks, incluindo formatação, instalação de sistemas operacionais, remoção de malwares e otimização de desempenho.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-purple-200 mb-1">
                      Suporte ao Cliente
                    </p>
                    <p className="text-sm text-purple-300/60 leading-relaxed">
                      Atendimento direto ao público para diagnóstico de problemas, esclarecimento de dúvidas técnicas e recomendação de soluções adequadas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-purple-200 mb-1">
                      Consultoria em Hardware
                    </p>
                    <p className="text-sm text-purple-300/60 leading-relaxed">
                      Orientação sobre compatibilidade de peças e upgrades, auxiliando clientes na escolha de gerações de processadores, placas-mãe e outros componentes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETÊNCIAS */}
      <section
        id="competências"
        className="max-w-4xl mx-auto px-6 py-24 relative z-10"
      >
        <p className="text-[11px] tracking-[3px] uppercase text-violet-600 font-semibold mb-3">
          O que eu sei fazer
        </p>
        <h2 className="text-4xl font-bold text-purple-100 mb-12 tracking-tight">
          Minhas <span className="text-purple-500">Competências</span>
        </h2>
        <div className="flex flex-col gap-8">
          {skillBlocks.map((block) => (
            <div
              key={block.title}
              className="bg-purple-950/10 border border-purple-900/30 rounded-2xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-base font-semibold text-purple-300 mb-5 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                {block.title}
              </h3>
              <div className="flex flex-col gap-5">
                {block.subsections.map((sub, i) => (
                  <div key={i}>
                    {sub.label && (
                      <p className="text-[11px] uppercase tracking-[2px] text-purple-600 font-semibold mb-3 ml-1">
                        {sub.label}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3">
                      {sub.skills.map((skill) => (
                        <SkillTag
                          key={skill.name}
                          icon={skill.icon}
                          name={skill.name}
                        />
                      ))}
                    </div>
                    {(sub.label === "Front-end" || sub.label === "Manutenção") && (
                      <div className="border-t border-purple-900/40 mt-5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section
        id="projetos"
        className="max-w-4xl mx-auto px-6 py-24 relative z-10"
      >
        <p className="text-[11px] tracking-[3px] uppercase text-violet-600 font-semibold mb-3">
          O que eu construí
        </p>
        <h2 className="text-4xl font-bold text-purple-100 mb-4 tracking-tight">
          Meus <span className="text-purple-500">Projetos</span>
        </h2>
        <p className="text-purple-300/50 max-w-md leading-relaxed mb-12 text-sm">
          Projetos reais desenvolvidos para praticar e aprofundar meus
          conhecimentos.
        </p>
        <div className="flex flex-wrap gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section
        id="contato"
        className="max-w-4xl mx-auto px-6 py-24 text-center relative z-10"
      >
        <p className="text-[11px] tracking-[3px] uppercase text-violet-600 font-semibold mb-3">
          Vamos conversar
        </p>
        <h2 className="text-4xl font-bold text-purple-100 mb-4 tracking-tight">
          Entre em <span className="text-purple-500">Contato</span>
        </h2>
        <p className="text-purple-300/50 max-w-sm mx-auto leading-relaxed mb-10 text-sm">
          Aberto a oportunidades.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="mailto:rafa.lopes.bonfim@gmail.com"
            className="px-8 py-3 bg-linear-to-r from-violet-700 to-purple-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 transition-shadow inline-flex items-center gap-2"
          >
            <Mail size={16} /> rafa.lopes.bonfim@gmail.com
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-purple-700/50 text-purple-400 rounded-xl font-semibold text-sm hover:bg-purple-900/20 transition-colors inline-flex items-center gap-2"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-purple-700/50 text-purple-400 rounded-xl font-semibold text-sm hover:bg-purple-900/20 transition-colors inline-flex items-center gap-2"
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t transition-all backdrop-blur-xl border-purple-900/20 py-8 flex items-center justify-center gap-4 relative z-10">
        <span className="font-bold text-purple-100">
          <span className="text-purple-500">&lt;/</span>dev
          <span className="text-purple-500">&gt;</span>
        </span>
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
