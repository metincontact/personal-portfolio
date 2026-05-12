import { FaMoon, FaSun } from "react-icons/fa";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ scrolled, scroll, active, dark, setDark }) {
  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50 transition-all duration-100"
        style={{ width: `${scroll}%` }}
      />

      <nav
        className={`fixed top-0 left-0 w-full px-6 md:px-20 py-4 flex justify-between items-center z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-slate-900/90 backdrop-blur border-b border-gray-200 dark:border-slate-700 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <h1 className="font-bold text-lg tracking-tight">Matin</h1>

        <div className="flex gap-6 text-sm items-center">
          {NAV_LINKS.map(({ href, label }) => {
            const id = href.replace("#", "");
            return (
              <a
                key={href}
                href={href}
                className={`transition-colors hover:text-blue-400 ${
                  active === id ? "text-blue-400" : "text-gray-400"
                }`}
              >
                {label}
              </a>
            );
          })}

          <button
            onClick={() => setDark((prev) => !prev)}
            aria-label="Toggle dark mode"
            className="text-lg hover:scale-110 transition-transform"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>
    </>
  );
}
