import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    category: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Tools & Workflow",
    skills: ["Git", "GitHub", "Vite", "REST API", "React Router", "Recharts"],
  },
  {
    category: "Currently Learning",
    skills: ["Next.js", "Angular", ".NET basics"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
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
        className="text-3xl font-bold mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>

      <div className="flex flex-col gap-8 max-w-3xl">
        {SKILL_CATEGORIES.map(({ category, skills }) => (
          <div key={category}>
            <p className="text-sm font-semibold text-blue-500 mb-3 uppercase tracking-wider">
              {category}
            </p>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  className="bg-gray-100 dark:bg-slate-700/60 border border-gray-200 dark:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-default"
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
