import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { motion } from "framer-motion";
import { PROJECTS, SKILL_CATEGORIES, SOCIALS } from "../data/portfolio";

interface TerminalProps {
  onClose: () => void;
  setDark: Dispatch<SetStateAction<boolean>>;
}

interface HistoryEntry {
  cmd: string;
  out: string[];
}

const WELCOME: HistoryEntry = {
  cmd: "",
  out: [
    "matin-portfolio v2.0 — interactive shell",
    'type "help" to see available commands',
  ],
};

export default function Terminal({ onClose, setDark }: TerminalProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([WELCOME]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const run = (raw: string): string[] | "clear" | "exit" => {
    const cmd = raw.trim().toLowerCase();
    switch (cmd) {
      case "help":
        return [
          "available commands:",
          "  about      who I am",
          "  skills     tech stack",
          "  projects   selected work",
          "  contact    how to reach me",
          "  theme      toggle dark/light",
          "  clear      clear the screen",
          "  exit       close terminal",
        ];
      case "about":
        return [
          "Matin Mammadli — Frontend Developer",
          "BSc Computer Engineering (TED University)",
          "MSc Business Management (UITM, Rzeszów)",
          "currently: open to junior/internship roles",
        ];
      case "skills":
        return SKILL_CATEGORIES.map(
          (c) => `  ${c.key.padEnd(10)} ${c.skills.join(", ")}`,
        );
      case "projects":
        return PROJECTS.map((p) => `  ${p.title.padEnd(20)} ${p.live}`);
      case "contact":
        return SOCIALS.map((s) => `  ${s.label}`);
      case "theme":
        setDark((prev) => !prev);
        return ["theme toggled"];
      case "clear":
        return "clear";
      case "exit":
        return "exit";
      case "":
        return [];
      default:
        return [`command not found: ${cmd} — try "help"`];
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = run(input);
    if (result === "clear") {
      setHistory([]);
    } else if (result === "exit") {
      onClose();
      return;
    } else {
      setHistory((prev) => [...prev, { cmd: input, out: result }]);
    }
    setInput("");
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
        aria-label="Terminal"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-700/60 bg-[#0a0a0f] shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <button
            onClick={onClose}
            aria-label="Close terminal"
            className="h-3 w-3 rounded-full bg-red-500 transition-opacity hover:opacity-70"
          />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-3 font-mono text-xs text-zinc-500">
            matin@portfolio: ~
          </span>
        </div>

        <div
          ref={scrollRef}
          className="h-80 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
        >
          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              {entry.cmd && (
                <p className="text-zinc-300">
                  <span className="text-lime-300">$ </span>
                  {entry.cmd}
                </p>
              )}
              {entry.out.map((line, j) => (
                <p key={j} className="whitespace-pre-wrap text-zinc-500">
                  {line}
                </p>
              ))}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-lime-300">$</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Terminal input"
              spellCheck={false}
              autoComplete="off"
              className="w-full bg-transparent text-zinc-200 caret-lime-300 outline-none"
            />
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
