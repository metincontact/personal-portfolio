import { motion, type Variants } from "framer-motion";
import { FiCode, FiBookOpen, FiMapPin } from "react-icons/fi";
import type { IconType } from "react-icons";
import { useLanguage } from "../i18n/LanguageContext";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

interface InfoCard {
  icon: IconType;
  label: string;
  lines: string[];
}

export default function About() {
  const { t } = useLanguage();

  const cards: InfoCard[] = [
    { icon: FiCode, label: t.about.whatIDoLabel, lines: [t.about.whatIDoText] },
    {
      icon: FiBookOpen,
      label: t.about.educationLabel,
      lines: [t.about.education1, t.about.education2],
    },
    {
      icon: FiMapPin,
      label: t.about.locationLabel,
      lines: [t.about.locationText],
    },
  ];

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
        {t.about.eyebrow}
      </span>
      <h2 className="mb-12 text-3xl md:text-4xl font-bold tracking-tight">
        {t.about.title}
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        <div className="space-y-5">
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t.about.p1}
          </p>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t.about.p2}
          </p>
        </div>

        <motion.div
          className="flex flex-col gap-4"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {cards.map(({ icon: Icon, label, lines }) => (
            <motion.div
              key={label}
              variants={cardVariants}
              className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-lime-500/40 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-lime-300/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-600 dark:text-lime-300">
                <Icon size={17} />
              </span>
              <div>
                <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                  {label}
                </p>
                {lines.map((line) => (
                  <p
                    key={line}
                    className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
