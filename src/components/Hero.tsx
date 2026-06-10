import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useTypewriter } from "../hooks/useTypewriter";

const ROLES = ["Frontend Developer", "React Developer", "UI Engineer"];

export default function Hero() {
  const text = useTypewriter(ROLES);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-16 pt-32 pb-16">
      <div className="z-10 max-w-2xl">
        <motion.div
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-1.5 dark:border-white/10 dark:bg-white/[0.03]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500 dark:bg-lime-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
            Open to opportunities
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-400 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
            Matin Mammadli
          </span>
        </motion.h1>

        <motion.h2
          className="mb-7 flex h-[32px] items-center font-mono text-lg md:text-xl text-lime-600 dark:text-lime-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="mr-3 select-none text-zinc-400 dark:text-zinc-600">
            $
          </span>
          {text}
          <span className="ml-1 inline-block h-5 w-[3px] animate-pulse bg-lime-500 dark:bg-lime-300" />
        </motion.h2>

        <motion.p
          className="mb-10 max-w-md leading-relaxed text-zinc-600 dark:text-zinc-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          I build modern, responsive and user-focused web applications using
          React and JavaScript.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-lime-400 dark:text-zinc-950 dark:hover:bg-lime-300"
          >
            View Projects
            <FiArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-zinc-300 px-7 py-3.5 text-sm font-medium text-zinc-700 transition-colors hover:border-lime-600/50 hover:text-lime-700 dark:border-white/15 dark:text-zinc-300 dark:hover:border-lime-300/40 dark:hover:text-lime-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {!imageFailed && (
        <motion.div
          className="relative z-10 shrink-0"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-lime-400/25 via-transparent to-emerald-400/10 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="absolute -top-3 -left-3 h-10 w-10 rounded-tl-2xl border-t-2 border-l-2 border-lime-500 dark:border-lime-300"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 h-10 w-10 rounded-br-2xl border-b-2 border-r-2 border-lime-500 dark:border-lime-300"
          />
          <img
            src="/profile.jpeg"
            alt="Matin Mammadli"
            onError={() => setImageFailed(true)}
            className="relative h-72 w-72 rounded-[2rem] border border-zinc-200 object-cover dark:border-white/10 md:h-[400px] md:w-[400px]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-zinc-950/70 px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-lime-300 backdrop-blur-md"
          >
            based in poland 🇵🇱
          </span>
        </motion.div>
      )}
    </section>
  );
}
