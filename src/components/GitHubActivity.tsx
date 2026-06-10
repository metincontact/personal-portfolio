import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiGithub, FiArrowUpRight } from "react-icons/fi";
import { GITHUB_USERNAME } from "../data/portfolio";
import { useLanguage } from "../i18n/LanguageContext";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
}

type FetchState = "loading" | "ready" | "error";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#663399",
};

export default function GitHubActivity() {
  const { lang, t } = useLanguage();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [state, setState] = useState<FetchState>("loading");

  useEffect(() => {
    let cancelled = false;

    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`,
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Repo[]>;
      })
      .then((data) => {
        if (!cancelled) {
          setRepos(data);
          setState("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const dateFormat = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.section
      id="github"
      className="py-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <span className="mb-3 block font-mono text-xs uppercase tracking-[0.35em] text-lime-600 dark:text-lime-300/70">
        {t.github.eyebrow}
      </span>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.github.title}
        </h2>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 font-mono text-[13px] text-zinc-600 transition-colors hover:text-lime-700 dark:text-zinc-400 dark:hover:text-lime-300"
        >
          {t.github.viewProfile}
          <FiArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      {state === "loading" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-white/[0.06] dark:bg-white/[0.03]"
            />
          ))}
        </div>
      )}

      {state === "error" && (
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 font-mono text-sm text-zinc-600 transition-colors hover:border-lime-600/40 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-400 dark:hover:border-lime-300/30"
        >
          <FiGithub size={16} className="text-lime-600 dark:text-lime-300" />
          {t.github.error} — github.com/{GITHUB_USERNAME}
        </a>
      )}

      {state === "ready" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-lime-600/40 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-lime-300/30"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-mono text-sm font-medium text-zinc-800 transition-colors group-hover:text-lime-700 dark:text-zinc-200 dark:group-hover:text-lime-300">
                  {repo.name}
                </span>
                <FiArrowUpRight
                  size={14}
                  className="shrink-0 text-zinc-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-zinc-500"
                />
              </div>

              <p className="line-clamp-2 flex-1 text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                {repo.description ?? "—"}
              </p>

              <div className="flex items-center gap-4 font-mono text-[11px] text-zinc-500 dark:text-zinc-500">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          LANGUAGE_COLORS[repo.language] ?? "#a3e635",
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <FiStar size={11} />
                  {repo.stargazers_count}
                </span>
                <span className="ml-auto">
                  {dateFormat.format(new Date(repo.pushed_at))}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </motion.section>
  );
}
