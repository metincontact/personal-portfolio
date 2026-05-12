import { motion } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";

const ROLES = ["Frontend Developer", "React Developer", "UI Engineer"];

export default function Hero() {
  const text = useTypewriter(ROLES);

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-16 pt-28 pb-10">
      <div className="z-10 max-w-xl">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-black to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I'm Matin Mammadli
        </motion.h1>

        <motion.h2
          className="text-2xl text-blue-400 mb-6 h-[36px] flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {text}
          <span className="animate-pulse ml-1">|</span>
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          I build modern, responsive and user-focused web applications using
          React and JavaScript.
        </motion.p>

        <motion.div
          className="flex gap-4 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="#projects"
            className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl hover:scale-105 transition-transform font-medium"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-gray-300 dark:border-slate-600 px-6 py-3 rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-medium"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.img
        src="/profile.jpeg"
        alt="Matin Mammadli"
        className="w-72 h-72 md:w-[400px] md:h-[400px] object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-2xl ring-4 ring-blue-500/30"
        style={{ boxShadow: "0 0 120px rgba(59,130,246,0.35)" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    </section>
  );
}
