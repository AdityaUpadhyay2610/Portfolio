import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function About() {
  const [time, setTime] = useState("");

  // Live Noida clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(now);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            About Me
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h2 className="font-heading text-4xl md:text-6xl uppercase mb-16 text-[var(--text)]">
          A LITTLE ABOUT ME
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">
                {siteConfig.summary}
              </p>

              <p className="text-base text-[var(--text-muted)] leading-relaxed mb-8">
                I'm always eager to learn, build, and contribute to meaningful projects
                while strengthening my skills as a developer. Currently based in{" "}
                <span className="text-[var(--accent)] font-medium">{siteConfig.location}</span>,
                open to remote work worldwide.
              </p>

              
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4">
                  Education
                </h3>
                {siteConfig.education.map((edu) => (
                  <div
                    key={edu.institution}
                    className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                  >
                    <p className="font-semibold text-[var(--text)] text-sm">{edu.degree}</p>
                    <p className="text-xs text-[var(--text-muted)]">{edu.institution}</p>
                    <p className="font-mono text-[11px] text-[var(--accent)] mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          
          <div className="space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-[var(--accent)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  {siteConfig.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-[var(--accent)]" />
                <span className="font-heading text-3xl text-[var(--text)]">
                  {time || "--:--:--"}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)]">IST</span>
              </div>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-3xl overflow-hidden border border-[var(--border)] aspect-square bg-gradient-to-br from-[var(--bg-peach)] to-[var(--bg-amber)]"
            >
              <img
                src="/images/me.png"
                alt="Aditya Upadhyay"
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
