import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, X, CheckCircle2, Layers, ChevronDown } from "lucide-react";
import { projects, type Project } from "@/data/projects";

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="project-card group relative cursor-pointer flex flex-col justify-between"
    >
      
      <div className="relative overflow-hidden rounded-3xl bg-[var(--surface-2)] border border-[var(--border)] mb-6 aspect-[16/10] shadow-md group-hover:shadow-2xl transition-all duration-500">
        <img
          src={project.screenshot}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg)] text-[var(--text)] text-sm font-semibold shadow-xl border border-[var(--border)] group-hover:scale-105 transition-transform">
            <span>View Project</span>
            <ArrowUpRight size={16} className="text-[var(--accent)]" />
          </div>
        </div>
      </div>

      
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[var(--accent)] mb-1 block">
              {project.index} — FEATURED PROJECT
            </span>
            <h3 className="font-heading text-2xl md:text-3xl uppercase text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-light)] transition-colors">
            <ArrowUpRight
              size={18}
              className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </div>
        </div>

        <p className="text-sm text-[var(--text-muted)] line-clamp-2 mt-2 leading-relaxed">
          {project.description}
        </p>

        
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-[var(--border)] font-mono text-[11px] text-[var(--text-muted)] group-hover:border-[var(--accent)]/40 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollDown, setCanScrollDown] = useState(true);

  // Check scroll position to show/hide down arrow button
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    // Hide arrow when within 70px of the bottom
    if (scrollHeight - scrollTop - clientHeight < 70) {
      setCanScrollDown(false);
    } else {
      setCanScrollDown(true);
    }
  };

  const handleScrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 380, behavior: "smooth" });
    }
  };

  // Lock body scroll and prevent Lenis background scrolling when modal is open
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Prevent background scrolling
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Pause Lenis virtual smooth scroll so background page cannot scroll
    if (window.__lenis) {
      window.__lenis.stop();
    }

    // Check initial scrollability
    const el = scrollRef.current;
    if (el) {
      setCanScrollDown(el.scrollHeight > el.clientHeight + 30);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Stop wheel propagation natively so Lenis or window listeners never trigger
    const handleNativeWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };
    if (el) {
      el.addEventListener("wheel", handleNativeWheel, { passive: true });
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      if (window.__lenis) {
        window.__lenis.start();
      }
      window.removeEventListener("keydown", handleKeyDown);
      if (el) {
        el.removeEventListener("wheel", handleNativeWheel);
      }
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-4xl max-h-[88vh] flex flex-col"
      >
        
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          data-lenis-prevent
          className="w-full h-full max-h-[88vh] overflow-y-auto rounded-3xl bg-[var(--bg)] border border-[var(--border)] p-6 md:p-10 shadow-2xl overscroll-contain modal-scroll"
          style={{ scrollbarGutter: "stable" }}
        >
          
          <button
            onClick={onClose}
            className="sticky top-0 float-right z-30 w-11 h-11 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer shadow-sm"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          
          <div className="rounded-2xl overflow-hidden mb-8 border border-[var(--border)] shadow-lg aspect-[16/10] bg-[var(--surface-2)]">
            <img
              src={project.screenshot}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          
          <span className="font-mono text-xs text-[var(--accent)] mb-2 block tracking-widest uppercase">
            {project.index} • Project Deep Dive
          </span>
          <h3 className="font-heading text-3xl md:text-5xl uppercase text-[var(--text)] mb-4">
            {project.title}
          </h3>

          
          <p className="text-base text-[var(--text-muted)] leading-relaxed mb-8">
            {project.description}
          </p>

          
          <div className="mb-8 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-3">
              <Layers size={16} className="text-[var(--accent)]" />
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                Technologies & Architecture
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)] text-xs font-medium text-[var(--text)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          
          <div className="mb-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4">
              Key Architecture & Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text)]">
                  <CheckCircle2 size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          
          <div className="mb-8 p-6 rounded-2xl bg-[var(--accent-light)] border border-[var(--accent)]/30">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2">
              Key Learnings & Impact
            </h4>
            <p className="text-sm text-[var(--text)] leading-relaxed">{project.learned}</p>
          </div>

          
          <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--border)]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--accent)] text-white font-semibold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <ExternalLink size={16} />
                <span>Launch Live App</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[var(--border)] text-[var(--text)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] hover:scale-105 active:scale-95 transition-all"
              >
                <Github size={16} />
                <span>Explore Codebase</span>
              </a>
            )}
          </div>
        </div>

        
        <AnimatePresence>
          {canScrollDown && (
            <motion.button
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 10, x: "-50%" }}
              transition={{ duration: 0.25 }}
              onClick={handleScrollDown}
              className="absolute bottom-5 left-1/2 z-30 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--accent)] text-[var(--text)] hover:text-white hover:bg-[var(--accent)] text-xs font-mono font-medium shadow-2xl transition-all cursor-pointer group active:scale-95"
              aria-label="Scroll down to view details"
            >
              <span>Scroll to see more</span>
              <span className="w-5 h-5 rounded-full bg-[var(--accent-light)] flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ChevronDown size={14} className="text-[var(--accent)] group-hover:text-white transition-colors animate-bounce" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Selected Works
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase mb-16 text-[var(--text)]">
          RECENT PROJECTS
        </h2>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
