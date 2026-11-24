import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Copy, Check, Github, Linkedin, ArrowUp, Phone, MessageSquareQuote, ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Aditya,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nReply to: ${formData.email}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

    setStatus("sent");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            <MessageSquareQuote size={14} />
            <span>Get in Touch</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] uppercase leading-[0.88] text-[var(--text)]">
            LET'S WORK
            <br />
            <span className="text-[var(--accent)]">TOGETHER</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:col-span-5"
          >
            <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8">
              Whether you need a dedicated full-stack developer, want to collaborate on an innovative web app, or have an exciting internship/role opportunity — feel free to drop me an email anytime.
            </p>

            
            <div className="mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] block mb-2">
                Open in Email App
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center justify-between w-full py-4 px-6 rounded-2xl bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all shadow-md active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <span className="text-sm font-semibold">
                    Send Email (mailto)
                  </span>
                </div>
                <ExternalLink size={16} />
              </a>
            </div>

            
            <div className="mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] block mb-2">
                Or Copy Email Address
              </span>
              <button
                onClick={copyEmail}
                className="group flex items-center justify-between w-full py-4 px-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent)] transition-all shadow-sm active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[var(--accent)]" />
                  <span className="text-sm font-medium text-[var(--text)] font-mono">
                    {siteConfig.email}
                  </span>
                </div>
                {copied ? (
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-green-600 bg-green-500/10 px-2.5 py-1 rounded-full">
                    <Check size={13} />
                    Copied!
                  </span>
                ) : (
                  <Copy size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                )}
              </button>
            </div>

            
            <div className="mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] block mb-2">
                Phone / WhatsApp
              </span>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 py-4 px-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent)] transition-all shadow-sm"
              >
                <Phone size={18} className="text-[var(--accent)]" />
                <span className="text-sm font-medium text-[var(--text)] font-mono">
                  {siteConfig.phone}
                </span>
              </a>
            </div>

            
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] block mb-3">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: siteConfig.social.github, label: "GitHub Profile" },
                  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn Connection" },
                  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Send Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="flex items-center justify-center w-12 h-12 rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:scale-105 transition-all shadow-sm"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="p-8 md:p-10 rounded-3xl bg-[var(--bg)] border border-[var(--border)] shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Aditya Upadhyay"
                    className="w-full px-5 py-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm placeholder:text-[var(--text-muted)]/40 focus:border-[var(--accent)] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
                    Your Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm placeholder:text-[var(--text-muted)]/40 focus:border-[var(--accent)] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-5 py-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm placeholder:text-[var(--text-muted)]/40 focus:border-[var(--accent)] outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[var(--accent)] text-white font-semibold text-sm shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/45 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  {status === "sent" ? (
                    <span>Opening Email App... ✓</span>
                  ) : (
                    <>
                      <span>Send via Email Client</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      
      <footer className="mt-24 pt-8 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[var(--text-muted)]">
            Designed & built by{" "}
            <span className="text-[var(--accent)] font-semibold">Aditya Upadhyay</span> • Noida, India
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
            <span>Back to top</span>
          </button>
        </div>
      </footer>
    </section>
  );
}
