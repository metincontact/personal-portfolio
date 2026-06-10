import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type KeyboardEvent as ReactKeyboardEvent,
  type SetStateAction,
} from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCommand,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { useLanguage } from "../i18n/LanguageContext";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: IconType;
  action: () => void;
}

interface CommandPaletteProps {
  onClose: () => void;
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
}

export default function CommandPalette({
  onClose,
  dark,
  setDark,
}: CommandPaletteProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const jump = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      onClose();
    };

    return [
      {
        id: "about",
        label: t.nav.about,
        hint: "#about",
        icon: FiArrowRight,
        action: jump("about"),
      },
      {
        id: "skills",
        label: t.nav.skills,
        hint: "#skills",
        icon: FiArrowRight,
        action: jump("skills"),
      },
      {
        id: "projects",
        label: t.nav.projects,
        hint: "#projects",
        icon: FiArrowRight,
        action: jump("projects"),
      },
      {
        id: "github-section",
        label: "GitHub",
        hint: "#github",
        icon: FiArrowRight,
        action: jump("github"),
      },
      {
        id: "contact",
        label: t.nav.contact,
        hint: "#contact",
        icon: FiArrowRight,
        action: jump("contact"),
      },
      {
        id: "theme",
        label: dark ? "Light theme" : "Dark theme",
        hint: "theme",
        icon: dark ? FiSun : FiMoon,
        action: () => {
          setDark((prev) => !prev);
          onClose();
        },
      },
      {
        id: "github-profile",
        label: "GitHub profile",
        hint: "github.com/metincontact",
        icon: FiGithub,
        action: () => {
          window.open("https://github.com/metincontact", "_blank", "noopener");
          onClose();
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "linkedin.com",
        icon: FiLinkedin,
        action: () => {
          window.open(
            "https://www.linkedin.com/in/matin-mammadli-dev/",
            "_blank",
            "noopener",
          );
          onClose();
        },
      },
      {
        id: "email",
        label: "Email",
        hint: "metinmemmedlicontact@gmail.com",
        icon: FiMail,
        action: () => {
          window.location.href = "mailto:metinmemmedlicontact@gmail.com";
          onClose();
        },
      },
      {
        id: "copy-email",
        label: "Copy email",
        hint: "clipboard",
        icon: FiCopy,
        action: () => {
          try {
            void navigator.clipboard.writeText(
              "metinmemmedlicontact@gmail.com",
            );
          } catch {
            // clipboard unavailable — ignore
          }
          onClose();
        },
      },
    ];
  }, [t, dark, setDark, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleInputKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selected]?.action();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0c0c12]"
      >
        <div className="flex items-center gap-3 border-b border-zinc-200 px-5 py-4 dark:border-white/[0.06]">
          <FiCommand size={15} className="text-lime-600 dark:text-lime-300" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={handleInputKey}
            placeholder="Type a command..."
            aria-label="Search commands"
            className="w-full bg-transparent font-mono text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-600"
          />
          <kbd className="rounded border border-zinc-300 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-white/15 dark:text-zinc-500">
            esc
          </kbd>
        </div>

        <ul className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center font-mono text-sm text-zinc-500">
              ¯\_(ツ)_/¯
            </li>
          )}
          {filtered.map((command, i) => (
            <li key={command.id}>
              <button
                onClick={command.action}
                onMouseEnter={() => setSelected(i)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                  i === selected
                    ? "bg-lime-400/10 text-lime-700 dark:text-lime-300"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                <command.icon size={15} className="shrink-0" />
                <span className="flex-1 text-sm font-medium">
                  {command.label}
                </span>
                <span className="truncate font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
                  {command.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
