import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GitHubActivity from "./components/GitHubActivity";
import Contact from "./components/Contact";
import CommandPalette from "./components/CommandPalette";
import Terminal from "./components/Terminal";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useTheme } from "./hooks/useTheme";
import { SECTION_IDS } from "./data/portfolio";
import LanguageProvider from "./i18n/LanguageProvider";
import { useLanguage } from "./i18n/LanguageContext";

function Divider() {
  return (
    <motion.div
      className="h-px origin-center bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/10 to-transparent"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    />
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const el = ref.current;
      if (el) {
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed w-[600px] h-[600px] rounded-full blur-[120px] z-0 bg-lime-500/[0.05] dark:bg-lime-300/[0.05]"
      style={{ left: "-9999px", top: "-9999px", transform: "translate(-50%, -50%)" }}
    />
  );
}

function AppContent() {
  const { t } = useLanguage();
  const { scrolled, progress, activeSection } = useScrollSpy(SECTION_IDS);
  const { dark, setDark } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08080c] dark:text-zinc-100 font-sans transition-colors duration-300 overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-220px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-lime-400/[0.06] dark:bg-lime-400/[0.07] blur-[140px]" />
      </div>

      <CursorGlow />

      <Navbar
        scrolled={scrolled}
        progress={progress}
        activeSection={activeSection}
        dark={dark}
        setDark={setDark}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <GitHubActivity />
        <Divider />
        <Contact />

        <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-zinc-200 dark:border-white/[0.06] py-10 font-mono text-xs text-zinc-500 dark:text-zinc-600">
          <span>
            © {new Date().getFullYear()} Matin Mammadli — {t.footer.built}
          </span>
          <button
            onClick={() => setTerminalOpen(true)}
            className="text-lime-600/70 transition-colors hover:text-lime-600 dark:text-lime-300/40 dark:hover:text-lime-300"
          >
            ~/portfolio — v2.0
          </button>
        </footer>
      </main>

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            onClose={() => setPaletteOpen(false)}
            dark={dark}
            setDark={setDark}
          />
        )}
        {terminalOpen && (
          <Terminal onClose={() => setTerminalOpen(false)} setDark={setDark} />
        )}
      </AnimatePresence>

      {import.meta.env.PROD && <Analytics />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
