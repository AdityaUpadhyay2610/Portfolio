import { motion } from "framer-motion";
import { siteConfig } from "@/data/config";
import { Code2, Server, Layout, Sparkles } from "lucide-react";

const icons = [Layout, Server, Code2, Sparkles];

export default function Services() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            What I Do
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h2 className="font-heading text-4xl md:text-6xl uppercase mb-16 text-[var(--text)]">
          SERVICES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {siteConfig.services.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative p-8 border-l border-[var(--border)] first:border-l-0 hover:bg-[var(--surface)] transition-colors"
              >
                <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--accent-light)] text-[var(--accent)]">
                  <Icon size={24} />
                </div>
                <h3 className="font-heading text-lg uppercase mb-3 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
