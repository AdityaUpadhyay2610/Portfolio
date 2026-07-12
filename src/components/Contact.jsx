import React, { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { Eyebrow, SectionHeading, Annotation } from "./ui.jsx";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  function handleSubmit(e) {
    e.preventDefault();
    // Wire this up to your form backend of choice (Formspree, EmailJS, etc.)
    setStatus("sent");
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-6 sm:px-10 md:px-12 lg:px-20 py-28"
    >
      <div className="w-full max-w-4xl">
        <Eyebrow index="05">Contact</Eyebrow>
        <SectionHeading>Let's work together</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="font-body text-base text-mute leading-relaxed mb-8">
              Have a project in mind, or just want to say hello? My inbox is
              open — I usually reply within a day or two.
            </p>
            <div className="space-y-4">
              <Annotation>
                <Mail size={14} className="text-amber" />
                aditya2610upadhyay@gmail.com
              </Annotation>
              <Annotation>
                <MapPin size={14} className="text-amber" />
                Greater Noida, Uttar Pradesh, India — open to remote work
              </Annotation>
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
                className="w-full bg-panel2 border border-line rounded-md px-4 py-3 text-paper text-sm placeholder:text-mute/60 focus:border-amber outline-none transition-colors resize-none"
                placeholder="Tell me about your project"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-amber text-ink font-body font-semibold text-sm hover:bg-amber/90 transition-colors"
            >
              {status === "sent" ? "Message sent" : "Send message"}
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
