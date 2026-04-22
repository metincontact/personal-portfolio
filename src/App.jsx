import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);

  const [active, setActive] = useState("");

  // ✅ FIX: başlangıçta localStorage'dan oku
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const roles = ["Frontend Developer", "React Developer", "UI Engineer"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  // ✅ DARK MODE APPLY
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = (window.scrollY / total) * 100;
      setScroll(current);

      const sections = ["projects", "contact"];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 100;
          const height = el.offsetHeight;
          if (window.scrollY >= top && window.scrollY < top + height) {
            setActive(id);
          }
        }
      });
    };

    const handleMouse = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setText(roles[index].slice(0, i));
      i++;

      if (i > roles[index].length) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % roles.length);
        }, 1000);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="px-6 md:px-20 pt-24 relative bg-white text-black dark:bg-slate-900 dark:text-white transition duration-300">
      {/* SCROLL */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
        style={{ width: `${scroll}%` }}
      />

      {/* CURSOR LIGHT */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"
          style={{
            left: `${mouse.x}px`,
            top: `${mouse.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full px-6 md:px-20 py-4 flex justify-between items-center z-50 transition ${
          scrolled
            ? "bg-white/80 dark:bg-slate-900/90 backdrop-blur border-b border-gray-300 dark:border-slate-700"
            : "bg-transparent"
        }`}
      >
        <h1 className="font-bold text-lg">Matin</h1>

        <div className="flex gap-6 text-sm items-center">
          <a
            href="#projects"
            className={`hover:text-blue-400 ${
              active === "projects" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            Projects
          </a>

          <a
            href="#contact"
            className={`hover:text-blue-400 ${
              active === "contact" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            Contact
          </a>

          {/* ✅ BUTTON FIX */}
          <button
            onClick={() => setDark((prev) => !prev)}
            className="text-lg hover:scale-110 transition"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-16 pt-10">
        <div className="z-10 max-w-xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-black to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Hi, I'm Matin Mammadli
          </motion.h1>

          <h2 className="text-2xl text-blue-400 mb-6 h-[32px] flex items-center">
            {text}
            <span className="animate-pulse ml-1">|</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            I build modern, responsive and user-focused web applications using
            React and JavaScript.
          </p>

          <div className="flex gap-4">
            <a
              href="#projects"
              className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl hover:scale-105 transition"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="border px-6 py-3 rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            >
              Contact Me
            </a>
          </div>
        </div>

        <img
          src="/profile.jpeg"
          alt="Matin"
          className="w-80 h-80 md:w-[420px] md:h-[420px] object-cover rounded-full border-4 border-white shadow-2xl ring-4 ring-blue-500/30"
          style={{ boxShadow: "0 0 120px rgba(59,130,246,0.4)" }}
        />
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-slate-700 to-transparent my-20"></div>

      {/* ABOUT */}
      <motion.section className="py-20">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>

        <p className="max-w-2xl text-gray-600 dark:text-gray-300">
          I am a Frontend Developer with a background in Computer Engineering
          and currently pursuing a Master's degree in Business Management in
          Poland.
        </p>
      </motion.section>

      {/* SKILLS */}
      <motion.section className="py-20">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl">
          {["React", "JavaScript", "HTML", "CSS", "Git", "REST API"].map(
            (skill) => (
              <span
                key={skill}
                className="bg-gray-200 dark:bg-slate-700 px-4 py-2 rounded-lg"
              >
                {skill}
              </span>
            ),
          )}
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section id="projects" className="py-20">
        <h2 className="text-3xl font-bold mb-10">Projects</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-200 dark:bg-slate-800 p-6 rounded-xl hover:scale-105 transition">
            <img src="/ecommerce.png" className="rounded mb-4" />
            <h3 className="text-lg font-semibold mb-2">E-Commerce Website</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Full-featured e-commerce app.
            </p>

            <div className="flex gap-4">
              <a
                href="https://metin-ecommerce.vercel.app"
                target="_blank"
                className="text-blue-400"
              >
                Live
              </a>
              <a
                href="https://github.com/metincontact/ecommerce-frontend"
                target="_blank"
                className="text-blue-400 flex items-center gap-1"
              >
                GitHub <FaGithub />
              </a>
            </div>
          </div>

          <div className="bg-gray-200 dark:bg-slate-800 p-6 rounded-xl hover:scale-105 transition">
            <img src="/chatbot.png" className="rounded mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chatbot</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              React chatbot UI project.
            </p>

            <div className="flex gap-4">
              <a
                href="https://metin-chatbot.vercel.app"
                target="_blank"
                className="text-blue-400"
              >
                Live
              </a>
              <a
                href="https://github.com/metincontact/chatbot"
                target="_blank"
                className="text-blue-400 flex items-center gap-1"
              >
                GitHub <FaGithub />
              </a>
            </div>
          </div>

          <div className="bg-gray-200 dark:bg-slate-800 p-6 rounded-xl hover:scale-105 transition">
            <div className="h-[150px] bg-gray-300 dark:bg-slate-700 rounded mb-4 flex items-center justify-center text-gray-500">
              No Image
            </div>
            <h3 className="text-lg font-semibold mb-2">Amazon Clone</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              JavaScript e-commerce clone.
            </p>

            <a
              href="https://github.com/metincontact/amazon-clone"
              target="_blank"
              className="text-blue-400 flex items-center gap-1"
            >
              GitHub <FaGithub />
            </a>
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <section id="contact" className="py-20">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>

        <p className="flex items-center gap-2">
          <FaEnvelope />
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=metinmemmedlicontact@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            metinmemmedlicontact@gmail.com
          </a>
        </p>

        <p className="flex items-center gap-2 mt-2">
          <FaGithub />
          <a href="https://github.com/metincontact" target="_blank">
            github.com/metincontact
          </a>
        </p>

        <p className="flex items-center gap-2 mt-2">
          <FaLinkedin />
          <a
            href="https://www.linkedin.com/in/metin-memmedli-ba2772393/"
            target="_blank"
          >
            linkedin.com/in/metin-memmedli
          </a>
        </p>
      </section>
    </div>
  );
}

export default App;
