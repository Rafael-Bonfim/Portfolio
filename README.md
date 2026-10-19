# 💻 Personal Portfolio - Rafael Lopes Bonfim

Welcome to my personal portfolio repository! This project was developed to showcase my academic and professional journey, my technical skills in software and hardware development, and to display my main projects.

---

## 📌 About the Project

The website is a responsive, modern, and optimized **Single Page Application (SPA)** built with **React** and styled with **Tailwind CSS**. It is available in English and Portuguese (the choice is saved in the browser, and the CV download follows the active language) and has a dedicated page with project details.

---

## 🚀 Technologies Used

* **React.js** — The core library for building the user interface.
* **React Router DOM** — Handles routing (`/` and `/projetos`).
* **Tailwind CSS** — A utility-first CSS framework for a modern and responsive design.
* **Vite** — Fast frontend build tool.
* **Motion** — Scroll and reveal animations.
* **Lucide React & React Icons** — Icons and technology logos.

---

## 📁 Project Structure

```text
src/
 ├── components/             # Reusable UI pieces (language toggle, reveal animations, cards)
 ├── pages/
 │    └── ProjectsPage.jsx   # Projects page with details for each project
 ├── i18n.js                 # English and Portuguese texts
 ├── projects.js             # Project data (bilingual) and images
 ├── App.css                 # Global styles and Tailwind theme
 ├── App.jsx                 # Main component, containing routing and portfolio sections
 └── main.jsx                # React application entry point
public/
 ├── curriculo-en.pdf        # CV in English
 └── curriculo-pt.pdf        # CV in Portuguese
```

`vercel.json` rewrites every path to `index.html`, so opening `/projetos` directly works on Vercel.

---

## 📬 Contact & Links

- **Email:** rafa.lopes.bonfim@gmail.com
- **LinkedIn:** [Rafael Bonfim](https://www.linkedin.com/in/rafael-bonfim-470817308/)