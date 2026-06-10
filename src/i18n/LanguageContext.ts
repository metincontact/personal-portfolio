import { createContext, useContext } from "react";
import { TRANSLATIONS, type Lang, type Translation } from "./translations";

interface LanguageState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
}

export const LanguageContext = createContext<LanguageState>({
  lang: "en",
  setLang: () => {},
  t: TRANSLATIONS.en,
});

export function useLanguage(): LanguageState {
  return useContext(LanguageContext);
}
