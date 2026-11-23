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
      className={`flex items-stretch border-2 border-current font-mono text-xs font-medium ${className}`}
    >
      {["en", "pt"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`min-h-8 px-2.5 uppercase tracking-wider ${
            lang === code ? "bg-contrast text-surface" : "hover:bg-contrast hover:text-surface"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
