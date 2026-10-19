// Text fields are { en, pt }; description/contribution are lists of paragraphs.
export const projects = [
  {
    id: "undergraduate-thesis",
    title: {
      en: "Undergraduate Thesis",
      pt: "Trabalho de Conclusão de Curso",
    },
    description: {
      en: [
        "Development of an Expense Note Issuance System for the company Planus Assessoria Empresarial Ltda., created to replace previous software with high costs and operational limitations. The application was developed in Python 3.12, using Tkinter and CustomTkinter to build the graphical interface and MySQL as a relational database.",
        "The system allows the registration and management of clients, events and expense notes, in addition to automatically relating the services provided and generating PDF documents. During development, requirements analysis, data modeling and use case diagrams were applied, ensuring organization and efficiency.",
        "The result was a customized solution that automates administrative processes, reduces manual errors and improves the control of financial information, demonstrating in practice the application of Python technologies in enterprise systems.",
      ],
      pt: [
        "Desenvolvimento de um Sistema de Emissão de Notas de Despesa para a empresa Planus Assessoria Empresarial Ltda., criado para substituir um software anterior com custo alto e limitações operacionais. A aplicação foi desenvolvida em Python 3.12, usando Tkinter e CustomTkinter na interface gráfica e MySQL como banco de dados relacional.",
        "O sistema permite cadastrar e gerenciar clientes, eventos e notas de despesa, além de relacionar automaticamente os serviços prestados e gerar documentos em PDF. Durante o desenvolvimento foram aplicados levantamento de requisitos, modelagem de dados e diagramas de casos de uso, garantindo organização e eficiência.",
        "O resultado foi uma solução personalizada que automatiza processos administrativos, reduz erros manuais e melhora o controle das informações financeiras, mostrando na prática o uso de Python em sistemas empresariais.",
      ],
    },
    tags: ["Python", "MySQL"],
    tools: ["Python 3.12", "Tkinter", "CustomTkinter", "MySQL"],
    contribution: {
      en: [
        "I worked on the integration between the Python application and the MySQL database, developing the functions responsible for managing relationships between the system’s data and ensuring proper communication between the application and the database.",
      ],
      pt: [
        "Trabalhei na integração entre a aplicação Python e o banco de dados MySQL, desenvolvendo as funções responsáveis por gerenciar os relacionamentos entre os dados do sistema e garantir a comunicação correta entre a aplicação e o banco.",
      ],
    },
    github: "https://github.com/rafa2333",
    live: null,
    images: [
      "/images/tcc/tela-adicionar.png",
      "/images/tcc/nota-despesa.png",
    ],
  },
];
