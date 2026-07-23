import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setStatus("error");
      });
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-6 sm:px-10 md:px-12 lg:px-20 py-28"
    >
      <div className="w-full max-w-4xl">
        {/* Section Heading Tag (previously <Eyebrow>) */}
        <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-amber uppercase mb-4">
          <span className="text-mute">§</span>
          05
          <span className="h-px w-8 bg-line" />
          Contact
        </p>

        {/* Section Sub-heading (previously <SectionHeading>) */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-paper mb-8 pb-4 border-b border-dashed border-line">
          Let's work together
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="font-body text-base text-mute leading-relaxed mb-8">
              Have a project in mind, or just want to say hello? My inbox is
              open — I usually reply within a day or two.
            </p>
            <div className="space-y-4">
              {/* Contact item annotation (previously <Annotation>) */}
              <div className="flex items-center gap-2 font-mono text-[11px] text-mute">
                <span className="w-5 h-px bg-mute/60" />
                <Mail size={14} className="text-amber" />
                upaaddi@gmail.com
              </div>

              {/* Contact item annotation (previously <Annotation>) */}
              <div className="flex items-center gap-2 font-mono text-[11px] text-mute">
                <span className="w-5 h-px bg-mute/60" />
                <MapPin size={14} className="text-amber" />
                Greater Noida, Uttar Pradesh, India — open to remote work
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-xs text-mute uppercase tracking-wide mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-panel2 border border-line rounded-md px-4 py-3 text-paper text-sm placeholder:text-mute/60 focus:border-amber outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-mono text-xs text-mute uppercase tracking-wide mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-panel2 border border-line rounded-md px-4 py-3 text-paper text-sm placeholder:text-mute/60 focus:border-amber outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs text-mute uppercase tracking-wide mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-panel2 border border-line rounded-md px-4 py-3 text-paper text-sm placeholder:text-mute/60 focus:border-amber outline-none transition-colors resize-none"
                placeholder="Tell me about your project"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-amber text-ink font-body font-semibold text-sm hover:bg-amber/90 transition-colors disabled:opacity-70"
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message sent"
                : status === "error"
                ? "Try again"
                : "Send message"}
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

