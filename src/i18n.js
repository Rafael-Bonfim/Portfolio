import { createContext, useContext } from "react";

export const translations = {
  en: {
    skip: "Skip to content",
    nav: {
      home: "Home",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langLabel: "Language",
    hero: {
      intro:
        "Multiplatform Software Development student at Fatec Prof. Jessen Vidal and IT technician. I build web apps, APIs and desktop tools.",
      cv: "Download CV",
      cvFile: "/curriculo-en.pdf",
      projects: "View projects",
      contact: "Get in touch",
      badge: "MSD · Fatec",
      photoAlt: "Portrait of Rafael Lopes Bonfim",
    },
    experience: {
      title: "Professional experience",
      role: "Technical Assistance Intern",
      items: [
        {
          title: "Hardware and software maintenance",
          description:
            "Preventive and corrective maintenance on computers and notebooks, including formatting, operating system installation, malware removal and performance optimization.",
        },
        {
          title: "Customer support",
          description:
            "Direct customer service for troubleshooting, clarifying technical doubts and recommending appropriate solutions.",
        },
        {
          title: "Hardware consulting",
          description:
            "Guidance on parts compatibility and upgrades, helping customers choose processors, motherboards and memory.",
        },
      ],
    },
    skills: {
      title: "What I work with",
      languages: "Languages",
      frontend: "Front-end",
      backend: "Back-end & data",
      tools: "Tools & workflow",
      apis: "Frameworks & APIs",
      db: "Databases & ORM",
    },
    projects: {
      title: "Real projects",
      intro: "Real and academic projects developed with a focus on best practices.",
      main: "Projects",
      mainDesc: "Complete projects I actively built and contributed to.",
      academic: "Academic works",
      academicDesc: "Coursework and academic projects from my studies.",
    },
    about: {
      title: "About me",
      p1: "Multiplatform Software Development student at Fatec - Professor Jessen Vidal and IT technician, looking for new opportunities for learning and professional growth.",
      p2: "Proficient in several modern technologies, looking for an opportunity to apply my knowledge and discover new paths in programming.",
      more: "More about me",
      photoAlt: "Rafael Lopes Bonfim",
    },
    contact: {
      title: "Let’s talk?",
      intro: "Open to professional opportunities, partnerships and software projects.",
      copy: "Copy e-mail",
      copied: "Copied",
    },
    footer: {
      built: "Built with React & Tailwind CSS",
      top: "Back to top",
    },
    projectPage: {
      back: "Back to home",
      title: "My projects",
      intro: "Complete projects I actively built and contributed to.",
      about: "About the project",
      tools: "Tools & technologies",
      contribution: "My contribution",
      code: "Source code",
      showImage: "Show image",
      image: "image",
    },
  },
  pt: {
    skip: "Pular para o conteúdo",
    nav: {
      home: "Início",
      experience: "Experiência",
      skills: "Habilidades",
      projects: "Projetos",
      about: "Sobre",
      contact: "Contato",
    },
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
    langLabel: "Idioma",
    hero: {
      intro:
        "Estudante de Desenvolvimento de Software Multiplataforma na Fatec Prof. Jessen Vidal e técnico em informática. Desenvolvo aplicações web, APIs e ferramentas desktop.",
      cv: "Baixar currículo",
      cvFile: "/curriculo-pt.pdf",
      projects: "Ver projetos",
      contact: "Fale comigo",
      badge: "DSM · Fatec",
      photoAlt: "Retrato de Rafael Lopes Bonfim",
    },
    experience: {
      title: "Experiência profissional",
      role: "Estagiário de Assistência Técnica",
      items: [
        {
          title: "Manutenção de hardware e software",
          description:
            "Manutenção preventiva e corretiva em computadores e notebooks, incluindo formatação, instalação de sistemas operacionais, remoção de malware e otimização de desempenho.",
        },
        {
          title: "Atendimento ao cliente",
          description:
            "Atendimento direto ao cliente para solução de problemas, esclarecimento de dúvidas técnicas e indicação das soluções adequadas.",
        },
        {
          title: "Consultoria de hardware",
          description:
            "Orientação sobre compatibilidade de peças e upgrades, ajudando clientes a escolher processadores, placas-mãe e memórias.",
        },
      ],
    },
    skills: {
      title: "Com o que eu trabalho",
      languages: "Linguagens",
      frontend: "Front-end",
      backend: "Back-end & dados",
      tools: "Ferramentas & fluxo",
      apis: "Frameworks & APIs",
      db: "Bancos de dados & ORM",
    },
    projects: {
      title: "Projetos reais",
      intro: "Projetos reais e acadêmicos desenvolvidos com foco em boas práticas.",
      main: "Projetos",
      mainDesc: "Projetos completos que desenvolvi e dos quais participei ativamente.",
      academic: "Trabalhos acadêmicos",
      academicDesc: "Atividades e projetos acadêmicos da minha graduação.",
    },
    about: {
      title: "Sobre mim",
      p1: "Estudante de Desenvolvimento de Software Multiplataforma na Fatec - Professor Jessen Vidal e técnico em informática, em busca de novas oportunidades de aprendizado e crescimento profissional.",
      p2: "Tenho domínio de diversas tecnologias modernas e busco uma oportunidade para aplicar meus conhecimentos e descobrir novos caminhos na programação.",
      more: "Mais sobre mim",
      photoAlt: "Rafael Lopes Bonfim",
    },
    contact: {
      title: "Vamos conversar?",
      intro: "Aberto a oportunidades profissionais, parcerias e projetos de software.",
      copy: "Copiar e-mail",
      copied: "Copiado",
    },
    footer: {
      built: "Feito com React & Tailwind CSS",
      top: "Voltar ao topo",
    },
    projectPage: {
      back: "Voltar ao início",
      title: "Meus projetos",
      intro: "Projetos completos que desenvolvi e dos quais participei ativamente.",
      about: "Sobre o projeto",
      tools: "Ferramentas & tecnologias",
      contribution: "Minha contribuição",
      code: "Código-fonte",
      showImage: "Mostrar imagem",
      image: "imagem",
    },
  },
};

export const LangContext = createContext(null);

export const useLang = () => useContext(LangContext);
