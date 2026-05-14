import { motion } from "framer-motion";
import { FaCode, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";

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
      <h2 className="text-3xl font-bold mb-10">About Me</h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
        {/* Sol - Metin */}
        <div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            I'm a Frontend Developer with a Computer Engineering degree from TED
            University. I build modern, responsive web applications with a focus
            on clean code, performance, and great user experience.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Currently pursuing an MSc in Business Management in Poland, I
            combine technical depth with business thinking. I'm actively looking
            for internship and junior developer opportunities where I can
            contribute and grow.
          </p>
        </div>

        {/* Sağ - Kartlar */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 bg-gray-100 dark:bg-slate-800 p-4 rounded-xl">
            <FaCode className="text-blue-500 mt-1 shrink-0" size={18} />
            <div>
              <p className="font-semibold text-sm mb-1">What I do</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Frontend development with React, TypeScript, and Tailwind CSS.
                Building real projects with REST APIs and modern tooling.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-100 dark:bg-slate-800 p-4 rounded-xl">
            <FaGraduationCap
              className="text-blue-500 mt-1 shrink-0"
              size={18}
            />
            <div>
              <p className="font-semibold text-sm mb-1">Education</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                BSc Computer Engineering — TED University, Ankara
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                MSc Business Management — UITM, Rzeszów (2025–2027)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-100 dark:bg-slate-800 p-4 rounded-xl">
            <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" size={18} />
            <div>
              <p className="font-semibold text-sm mb-1">Location</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Rzeszów, Poland — Open to remote & hybrid opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
