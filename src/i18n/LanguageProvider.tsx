import { useEffect, useState, type ReactNode } from "react";
import { LanguageContext } from "./LanguageContext";
import { TRANSLATIONS, type Lang } from "./translations";

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "tr" || stored === "pl") return stored;
    const browser = navigator.language.toLowerCase();
    if (browser.startsWith("tr")) return "tr";
    if (browser.startsWith("pl")) return "pl";
  } catch {
    // localStorage unavailable — fall through to default
  }
  return "en";
}

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // language just won't persist
    }
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: TRANSLATIONS[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
