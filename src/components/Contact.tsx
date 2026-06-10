import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { SOCIALS } from "../data/portfolio";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgzkvva";

type Status = "idle" | "sending" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: FormData = { name: "", email: "", message: "" };

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(EMPTY_FORM);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-lime-600/60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-lime-300/50";

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        className={inputClass}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        required
        rows={5}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-fit rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:bg-lime-400 dark:text-zinc-950 dark:hover:bg-lime-300"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="font-mono text-sm text-lime-700 dark:text-lime-300">
          Message sent! I'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="font-mono text-sm text-red-600 dark:text-red-400">
          Something went wrong. Please try emailing directly.
        </p>
      )}
    </form>
  );
}

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="py-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <span className="mb-3 block font-mono text-xs uppercase tracking-[0.35em] text-lime-600 dark:text-lime-300/70">
        04 — get in touch
      </span>
      <h2 className="mb-12 text-3xl md:text-4xl font-bold tracking-tight">
        Contact
      </h2>

      <div className="flex flex-col gap-16 lg:flex-row">
        <div className="flex-1">
          <p className="mb-7 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Have a project in mind or just want to say hi? Fill the form below.
          </p>
          <ContactForm />
        </div>

        <div className="flex w-full flex-col gap-3 lg:w-96">
          {SOCIALS.map(({ icon: Icon, label, href }) => {
            const isExternal = !href.startsWith("mailto:");
            return (
              <a
                key={href}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 transition-colors hover:border-lime-600/40 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-lime-300/30"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-600 transition-transform group-hover:scale-110 dark:text-lime-300">
                  <Icon size={16} />
                </span>
                <span className="flex-1 truncate font-mono text-[13px] text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
                  {label}
                </span>
                <FiArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="text-zinc-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-zinc-500"
                />
              </a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
