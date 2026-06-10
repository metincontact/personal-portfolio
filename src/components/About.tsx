import { motion } from "framer-motion";
import { FiCode, FiBookOpen, FiMapPin } from "react-icons/fi";

export default function About() {
  return (
    <motion.section
      id="about"
      className="py-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <span className="mb-3 block font-mono text-xs uppercase tracking-[0.35em] text-lime-600 dark:text-lime-300/70">
        01 — who i am
      </span>
      <h2 className="mb-12 text-3xl md:text-4xl font-bold tracking-tight">
        About Me
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        <div className="space-y-5">
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            I'm a Frontend Developer with a Computer Engineering degree from TED
            University. I build modern, responsive web applications with a focus
            on clean code, performance, and great user experience.
          </p>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            Currently pursuing an MSc in Business Management in Poland, I
            combine technical depth with business thinking. I'm actively looking
            for internship and junior developer opportunities where I can
            contribute and grow.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-lime-500/40 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-lime-300/30">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-600 dark:text-lime-300">
              <FiCode size={17} />
            </span>
            <div>
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                What I do
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Frontend development with React, TypeScript, and Tailwind CSS.
                Building real projects with REST APIs and modern tooling.
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-lime-500/40 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-lime-300/30">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-600 dark:text-lime-300">
              <FiBookOpen size={17} />
            </span>
            <div>
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                Education
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                BSc Computer Engineering — TED University, Ankara
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                MSc Business Management — UITM, Rzeszów (2025–2027)
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-lime-500/40 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-lime-300/30">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-600 dark:text-lime-300">
              <FiMapPin size={17} />
            </span>
            <div>
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                Location
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Rzeszów, Poland — Open to remote & hybrid opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
