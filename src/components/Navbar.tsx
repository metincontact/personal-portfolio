import { FiMoon, FiSun } from "react-icons/fi";
import { NAV_LINKS } from "../data/portfolio";
import { useTheme } from "../hooks/useTheme";

interface NavbarProps {
  scrolled: boolean;
  progress: number;
  activeSection: string;
}

export default function Navbar({
  scrolled,
  progress,
  activeSection,
}: NavbarProps) {
  const { dark, setDark } = useTheme();

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-lime-400 to-emerald-400 z-50 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/75 dark:bg-[#08080c]/75 backdrop-blur-xl border-b border-zinc-200 dark:border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 md:px-10 py-4">
          <h1 className="font-mono text-base font-semibold tracking-tight">
            matin
            <span className="text-lime-600 dark:text-lime-300">_</span>
          </h1>

          <div className="flex items-center gap-1 sm:gap-2">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.replace("#", "");
              return (
                <a
                  key={href}
                  href={href}
                  className={`rounded-full px-3 py-1.5 font-mono text-[13px] transition-colors ${
                    activeSection === id
                      ? "text-lime-600 dark:text-lime-300 bg-lime-400/10"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {label}
                </a>
              );
            })}

            <button
              onClick={() => setDark((prev) => !prev)}
              aria-label="Toggle dark mode"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:border-lime-500/50 hover:text-lime-600 dark:hover:border-lime-300/40 dark:hover:text-lime-300 transition-colors"
            >
              {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
