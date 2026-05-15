import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const PROJECTS = [
  {
    title: "E-Commerce Website",
    description:
      "Full-featured e-commerce app with product listing, cart, and checkout flow.",
    image: "/ecommerce.png",
    live: "https://metin-ecommerce.vercel.app",
    github: "https://github.com/metincontact/ecommerce-frontend",
    tags: ["React", "JavaScript", "CSS"],
  },
  {
    title: "Chatbot",
    description:
      "AI-powered chatbot UI built with React, featuring real-time message rendering.",
    image: "/chatbot.png",
    live: "https://metin-chatbot.vercel.app",
    github: "https://github.com/metincontact/chatbot",
    tags: ["React", "API"],
  },
  {
    title: "Job Tracker",
    description:
      "Personal job application tracker with status management, filtering, and localStorage persistence.",
    image: "/job-tracker.png",
    live: "https://job-tracker-matin.vercel.app",
    github: "https://github.com/metincontact/job-tracker",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "GitHub Explorer",
    description:
      "Search any GitHub profile and explore repositories with stars, forks, and language info.",
    image: "/github-explorer.png",
    live: "https://github-explorer-matin.vercel.app",
    github: "https://github.com/metincontact/github-explorer",
    tags: ["React", "TypeScript", "React Router", "GitHub API"],
  },
  {
    title: "Weather Dashboard",
    description:
      "Real-time weather app with 5-day forecast chart using OpenWeather API.",
    image: "/weather-dashboard.png",
    live: "https://weather-dashboard-matin.vercel.app",
    github: "https://github.com/metincontact/weather-dashboard",
    tags: ["React", "TypeScript", "Recharts", "OpenWeather API"],
  },
  {
    title: "Crypto Tracker",
    description:
      "Real-time cryptocurrency tracker with 7-day price charts, search, and favorites. Built with CoinGecko API.",
    image: "/crypto-tracker.png",
    live: "https://crypto-tracker-matin.vercel.app",
    github: "https://github.com/metincontact/crypto-tracker",
    tags: ["React", "TypeScript", "Recharts", "CoinGecko API"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

function ProjectCard({ project, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-44 object-cover"
          onError={(e) => {
            e.target.parentNode.replaceChild(
              Object.assign(document.createElement("div"), {
                className:
                  "w-full h-44 bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-gray-400 text-sm",
                textContent: "No Preview",
              }),
              e.target,
            );
          }}
        />
      ) : (
        <div className="w-full h-44 bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-gray-400 text-sm">
          No Preview
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 text-sm">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <FaExternalLinkAlt size={12} />
              Live
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 transition-colors"
          >
            <FaGithub size={14} />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <motion.h2
        className="text-3xl font-bold mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
