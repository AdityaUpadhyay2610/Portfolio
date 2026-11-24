import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { siteConfig } from "@/data/config";
import { useReducedMotion } from "@/hooks/useScroll";

const Workstation3D = lazy(() => import("@/components/three/Workstation3D"));

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setCount(target);
      return;
    }
    let frame: number;
    const duration = 1600;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, reduced]);

  return (
    <div ref={ref} className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg)]/70 backdrop-blur-sm shadow-sm hover:border-[var(--accent)] transition-colors">
      <p className="font-heading text-5xl md:text-6xl text-[var(--accent)]">
        {count}+
      </p>
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mt-2">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Philosophy & Setup
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          
          <div className="lg:col-span-5">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase mb-6 text-[var(--text)] leading-[0.95]">
              TURNING VISION
              <br />
              <span className="text-[var(--accent)]">INTO REALITY</span>
            </h2>

            <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed mb-8">
              {siteConfig.summary}
            </p>

            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <AnimatedCounter target={siteConfig.stats.projectsBuilt} label="Projects Built" />
              <AnimatedCounter target={siteConfig.stats.technologies} label="Technologies" />
              <AnimatedCounter target={siteConfig.stats.trainings} label="Internships" />
            </div>
          </div>

          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <Suspense fallback={<div className="w-full h-[360px] md:h-[440px] rounded-3xl bg-[var(--surface-2)]/50 animate-pulse border border-[var(--border)]" />}>
              <Workstation3D />
            </Suspense>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
