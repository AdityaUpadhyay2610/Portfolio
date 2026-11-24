import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { experiences } from "@/data/experience";

export default function ExperienceSkills() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Background
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h2 className="font-heading text-4xl md:text-6xl uppercase mb-16 text-[var(--text)]">
          EXPERIENCE & SKILLS
        </h2>

        
        <div id="skills" className="mb-20">
          {skills.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-6 border-b border-[var(--border)] hover:bg-[var(--surface)] hover:px-4 transition-all rounded-lg cursor-default"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                {group.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full border border-[var(--border)] text-xs font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        
        <div className="relative">
          
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-[var(--border)]" aria-hidden="true" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative pl-12 md:pl-20"
              >
                
                <div className="absolute left-2.5 md:left-6.5 top-1 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)]" />

                
                <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider">
                  {exp.period}
                </span>

                
                <h3 className="font-heading text-xl md:text-2xl uppercase mt-2 text-[var(--text)]">
                  {exp.role}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">{exp.company}</p>

                
                <ul className="space-y-2 mb-4">
                  {exp.description.map((desc, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40 shrink-0" />
                      {desc}
                    </li>
                  ))}
                </ul>

                
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-[var(--accent-light)] font-mono text-[11px] text-[var(--accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
