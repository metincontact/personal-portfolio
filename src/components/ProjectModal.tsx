import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiX, FiCheck } from "react-icons/fi";
import { useLanguage } from "../i18n/LanguageContext";
import type { Project } from "../data/portfolio";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang, t } = useLanguage();
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0c0c12]"
      >
        <button
          onClick={onClose}
          aria-label={t.projects.close}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-600 backdrop-blur transition-colors hover:border-lime-600/50 hover:text-lime-700 dark:border-white/10 dark:bg-zinc-950/60 dark:text-zinc-300 dark:hover:border-lime-300/40 dark:hover:text-lime-300"
        >
          <FiX size={16} />
        </button>

        {project.image && !imageFailed && (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width={1440}
            height={900}
            onError={() => setImageFailed(true)}
            className="h-64 w-full object-cover object-top"
          />
        )}

        <div className="p-7">
          <h3 className="mb-3 text-2xl font-bold tracking-tight">
            {project.title}
          </h3>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-lime-600/20 bg-lime-400/10 px-2 py-0.5 font-mono text-[11px] text-lime-700 dark:border-lime-300/20 dark:text-lime-300/90"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-lime-600 dark:text-lime-300/70">
            {t.projects.why}
          </p>
          <p className="mb-7 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.why[lang]}
          </p>

          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-lime-600 dark:text-lime-300/70">
            {t.projects.learned}
          </p>
          <ul className="mb-8 space-y-2.5">
            {project.learned[lang].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
              >
                <FiCheck
                  size={15}
                  className="mt-0.5 shrink-0 text-lime-600 dark:text-lime-300"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 border-t border-zinc-200 pt-5 dark:border-white/[0.06]">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-lime-400 dark:text-zinc-950 dark:hover:bg-lime-300"
              >
                {t.projects.live}
                <FiArrowUpRight size={14} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-lime-600/50 hover:text-lime-700 dark:border-white/15 dark:text-zinc-300 dark:hover:border-lime-300/40 dark:hover:text-lime-300"
              >
                <FiGithub size={14} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
