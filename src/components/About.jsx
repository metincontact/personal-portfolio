import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="py-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-6">About Me</h2>

      <p className="max-w-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
        I am a Frontend Developer with a background in Computer Engineering,
        currently pursuing a Master's degree in Business Management in Poland.
        I'm passionate about building clean, accessible, and performant web
        experiences that people enjoy using.
      </p>
    </motion.section>
  );
}
