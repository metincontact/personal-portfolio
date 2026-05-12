import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const SECTIONS = ["about", "skills", "projects", "contact"];

function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-700 to-transparent my-4" />
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [active, setActive] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Scroll + mouse tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(total > 0 ? (window.scrollY / total) * 100 : 0);

      const current = window.scrollY;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          const bottom = top + el.offsetHeight;
          if (current >= top && current < bottom) {
            setActive(id);
            break;
          }
        }
      }
    };

    const handleMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-black dark:bg-slate-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl z-0 transition-transform duration-75"
        style={{
          left: `${mouse.x}px`,
          top: `${mouse.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      <Navbar
        scrolled={scrolled}
        scroll={scroll}
        active={active}
        dark={dark}
        setDark={setDark}
      />

      <main className="px-6 md:px-20 relative z-10">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <Contact />

        <footer className="py-10 text-center text-xs text-gray-400 dark:text-slate-600">
          © {new Date().getFullYear()} Matin Mammadli — Built with React &
          Tailwind CSS
        </footer>
      </main>
    </div>
  );
}
