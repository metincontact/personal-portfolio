import { motion } from "framer-motion";

const SKILLS = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Git",
  "REST API",
  "Framer Motion",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <motion.h2
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {SKILLS.map((skill) => (
          <motion.span
            key={skill}
            variants={itemVariants}
            className="bg-gray-100 dark:bg-slate-700/60 border border-gray-200 dark:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium text-center hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
