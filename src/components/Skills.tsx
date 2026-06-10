import { motion, type Variants } from "framer-motion";
import { SKILL_CATEGORIES } from "../data/portfolio";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="mb-3 block font-mono text-xs uppercase tracking-[0.35em] text-lime-600 dark:text-lime-300/70">
          02 — stack
        </span>
        <h2 className="mb-12 text-3xl md:text-4xl font-bold tracking-tight">
          Skills
        </h2>
      </motion.div>

      <div className="flex max-w-3xl flex-col gap-10">
        {SKILL_CATEGORIES.map(({ category, skills }) => (
          <div key={category}>
            <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-500">
              <span className="h-px w-6 bg-lime-500/60 dark:bg-lime-300/40" />
              {category}
            </p>
            <motion.div
              className="flex flex-wrap gap-2.5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  className="cursor-default rounded-lg border border-zinc-200 bg-white px-4 py-2 font-mono text-[13px] text-zinc-700 transition-colors hover:border-lime-600/50 hover:text-lime-700 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:border-lime-300/40 dark:hover:text-lime-300"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
