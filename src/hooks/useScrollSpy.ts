import { useEffect, useState } from "react";

interface ScrollSpy {
  scrolled: boolean;
  progress: number;
  activeSection: string;
}

/**
 * Tracks window scroll: whether the page is scrolled past the top,
 * overall scroll progress (0–100), and which section is currently in view.
 * `sectionIds` should be a stable reference (module-level constant).
 */
export function useScrollSpy(sectionIds: readonly string[]): ScrollSpy {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      const current = window.scrollY;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          const bottom = top + el.offsetHeight;
          if (current >= top && current < bottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return { scrolled, progress, activeSection };
}
