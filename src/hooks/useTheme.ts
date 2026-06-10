import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

function getInitialTheme(): boolean {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

interface Theme {
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
}

export function useTheme(): Theme {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // localStorage unavailable (e.g. private browsing) — theme just won't persist
    }
  }, [dark]);

  return { dark, setDark };
}
