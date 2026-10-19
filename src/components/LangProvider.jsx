import { useEffect, useState } from "react";
import { LangContext, translations, useLang } from "../i18n";

function initialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "pt") return saved;
  } catch {
    // storage blocked: fall back to browser language
  }
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export default function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // ignore
    }
  }, [lang]);

  return (
    <LangContext value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext>
  );
}

export function LangToggle({ className = "" }) {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.langLabel}
      className={`relative flex items-center rounded-full border border-white/10 bg-zinc-900/70 p-0.5 font-mono text-[11px] font-medium backdrop-blur ${className}`}
    >
      {["en", "pt"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`relative z-10 rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors duration-200 ${
            lang === code ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
