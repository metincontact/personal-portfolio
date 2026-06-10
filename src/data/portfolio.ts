import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export interface Project {
  title: string;
  description: string;
  image: string;
  live: string;
  github: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
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
      "AI-powered chatbot built with React and Google Gemini API. Supports real-time conversation with context memory.",
    image: "/chatbot.png",
    live: "https://metin-chatbot.vercel.app",
    github: "https://github.com/metincontact/chatbot",
    tags: ["React", "Gemini API", "Tailwind CSS"],
  },
  {
    title: "Job Tracker",
    description:
      "Personal job application tracker with status management, filtering, and Supabase authentication.",
    image: "/job-tracker.png",
    live: "https://job-tracker-matin.vercel.app",
    github: "https://github.com/metincontact/job-tracker",
    tags: ["React", "TypeScript", "Supabase"],
  },
  {
    title: "GitHub Explorer",
    description:
      "Search any GitHub profile and explore repositories with stars, forks, and language filter.",
    image: "/github-explorer.png",
    live: "https://github-explorer-matin.vercel.app",
    github: "https://github.com/metincontact/github-explorer",
    tags: ["React", "TypeScript", "React Router", "API"],
  },
  {
    title: "Weather Dashboard",
    description:
      "Real-time weather app with 5-day forecast chart, search history, and location support.",
    image: "/weather-dashboard.png",
    live: "https://weather-dashboard-matin.vercel.app",
    github: "https://github.com/metincontact/weather-dashboard",
    tags: ["React", "TypeScript", "Recharts", "API"],
  },
  {
    title: "Crypto Tracker",
    description:
      "Real-time crypto tracker with price charts, portfolio tracking, favorites, and sorting.",
    image: "/crypto-tracker.png",
    live: "https://crypto-tracker-matin.vercel.app",
    github: "https://github.com/metincontact/crypto-tracker",
    tags: ["React", "TypeScript", "Recharts", "API"],
  },
];

export const PROJECT_FILTER_TAGS = [
  "All",
  "React",
  "TypeScript",
  "JavaScript",
  "API",
  "Supabase",
  "Recharts",
];

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
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

export interface SocialLink {
  icon: IconType;
  label: string;
  href: string;
}

export const SOCIALS: SocialLink[] = [
  {
    icon: FaEnvelope,
    label: "metinmemmedlicontact@gmail.com",
    href: "mailto:metinmemmedlicontact@gmail.com",
  },
  {
    icon: FaGithub,
    label: "github.com/metincontact",
    href: "https://github.com/metincontact",
  },
  {
    icon: FaLinkedin,
    label: "linkedin.com/in/matin-mammadli-dev",
    href: "https://www.linkedin.com/in/matin-mammadli-dev/",
  },
];
