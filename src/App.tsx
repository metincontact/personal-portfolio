import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { SECTION_IDS } from "./data/portfolio";

function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/10 to-transparent" />
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

export default function App() {
  const { scrolled, progress, activeSection } = useScrollSpy(SECTION_IDS);

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
        <Contact />

        <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-zinc-200 dark:border-white/[0.06] py-10 font-mono text-xs text-zinc-500 dark:text-zinc-600">
          <span>
            © {new Date().getFullYear()} Matin Mammadli — Built with React &
            Tailwind CSS
          </span>
          <span className="text-lime-600/70 dark:text-lime-300/40">
            ~/portfolio — v2.0
          </span>
        </footer>
      </main>
    </div>
  );
}
