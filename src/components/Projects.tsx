import { useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { FiGithub, FiArrowUpRight, FiMaximize2 } from "react-icons/fi";
import {
  PROJECTS,
  PROJECT_FILTER_TAGS,
  type Project,
} from "../data/portfolio";
import { useLanguage } from "../i18n/LanguageContext";
import ProjectModal from "./ProjectModal";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
    },
  }),
};

const TILT_SPRING = { stiffness: 220, damping: 18 };

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { lang, t } = useLanguage();
  const [imageFailed, setImageFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), TILT_SPRING);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), TILT_SPRING);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors duration-300 hover:border-lime-600/40 hover:shadow-[0_8px_40px_-12px_rgba(163,230,53,0.15)] dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-lime-300/30"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`${t.projects.caseStudy}: ${project.title}`}
        className="relative block h-48 w-full cursor-pointer overflow-hidden text-left"
      >
        {project.image && !imageFailed ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width={1440}
            height={900}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 dark:bg-white/[0.03] dark:text-zinc-600">
            {t.projects.noPreview}
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-[#08080c]/70"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-zinc-950/60 text-lime-300 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
        >
          <FiMaximize2 size={13} />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-semibold tracking-tight">
          {project.title}
        </h3>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description[lang]}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-lime-600/20 bg-lime-400/10 px-2 py-0.5 font-mono text-[11px] text-lime-700 dark:border-lime-300/20 dark:text-lime-300/90"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 border-t border-zinc-200 pt-4 text-sm dark:border-white/[0.06]">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-1.5 font-mono text-[13px] text-zinc-600 transition-colors hover:text-lime-700 dark:text-zinc-400 dark:hover:text-lime-300"
            >
              <FiArrowUpRight
                size={14}
                className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
              {t.projects.live}
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[13px] text-zinc-600 transition-colors hover:text-lime-700 dark:text-zinc-400 dark:hover:text-lime-300"
            >
              <FiGithub size={14} />
              GitHub
            </a>
          )}

          <button
            type="button"
            onClick={() => onOpen(project)}
            className="ml-auto font-mono text-[13px] text-lime-700 transition-colors hover:text-lime-600 dark:text-lime-300/90 dark:hover:text-lime-300"
          >
            {t.projects.caseStudy} →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [activeTag, setActiveTag] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    activeTag === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="mb-3 block font-mono text-xs uppercase tracking-[0.35em] text-lime-600 dark:text-lime-300/70">
          {t.projects.eyebrow}
        </span>
        <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tight">
          {t.projects.title}
        </h2>
      </motion.div>

      <div className="mb-10 flex flex-wrap gap-2">
        {PROJECT_FILTER_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-4 py-1.5 font-mono text-[12px] transition-colors ${
              activeTag === tag
                ? "bg-zinc-900 text-white dark:bg-lime-400 dark:text-zinc-950"
                : "border border-zinc-300 text-zinc-500 hover:border-lime-600/40 hover:text-lime-700 dark:border-white/10 dark:text-zinc-400 dark:hover:border-lime-300/40 dark:hover:text-lime-300"
            }`}
          >
            {tag === "All" ? t.projects.all : tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            onOpen={setSelected}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
