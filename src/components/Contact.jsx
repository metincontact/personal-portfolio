import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

// Formspree kullanmak için: https://formspree.io adresine gir,
// ücretsiz hesap aç ve form oluştur. Gelen endpoint'i aşağıya yaz.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const SOCIALS = [
  {
    icon: <FaEnvelope />,
    label: "metinmemmedlicontact@gmail.com",
    href: "mailto:metinmemmedlicontact@gmail.com",
  },
  {
    icon: <FaGithub />,
    label: "github.com/metincontact",
    href: "https://github.com/metincontact",
  },
  {
    icon: <FaLinkedin />,
    label: "linkedin.com/in/metin-memmedli",
    href: "https://www.linkedin.com/in/metin-memmedli-ba2772393/",
  },
];

function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
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
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
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
        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white px-6 py-3 rounded-lg font-medium transition-colors w-fit"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-500 text-sm">
          ✓ Message sent! I'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm">
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
      className="py-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-10">Contact</h2>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Form */}
        <div className="flex-1">
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
            Have a project in mind or just want to say hi? Fill the form below.
          </p>
          <ContactForm />
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4 justify-start pt-1">
          {SOCIALS.map(({ icon, label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-400 transition-colors group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {icon}
              </span>
              <span className="text-sm">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
