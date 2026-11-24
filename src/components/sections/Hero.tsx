import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/config";
import { useReducedMotion } from "@/hooks/useScroll";

const HeroCanvas = lazy(() => import("@/components/three/HeroCanvas"));

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Rotate roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % siteConfig.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // 3D Parallax Tilt on cursor
  useEffect(() => {
    if (reducedMotion) return;
    const handleMouse = (e: MouseEvent) => {
      if (!portraitRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 16;
      const y = (clientY / innerHeight - 0.5) * 16;
      portraitRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg)`;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [reducedMotion]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] min-h-[820px] lg:min-h-[100svh] flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 lg:pb-12 px-4 sm:px-8 lg:px-14"
      style={{
        background: `linear-gradient(180deg, var(--bg) 0%, var(--bg-peach) 50%, var(--bg-amber) 100%)`,
      }}
    >
      
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[var(--accent)]/10 blur-[150px]" />
      </div>

      
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-8 px-4 sm:px-10 max-w-7xl mx-auto">
        
        
        <div className="w-full flex justify-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-serif italic text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] xl:text-[15rem] tracking-tight text-[var(--text)]/[0.12] leading-none whitespace-nowrap"
          >
            Hey, there
          </motion.span>
        </div>

        
        <div className="w-full flex lg:hidden justify-center items-center mt-4 mb-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-heading text-8xl sm:text-8xl uppercase leading-[0.84] tracking-tight text-[var(--text)]/[0.22] text-center select-none"
          >
            I AM
            <br />
            ADITYA
            <br />
            UPADHYAY
          </motion.h1>
        </div>

        <div className="h-6" />
      </div>

      <div className="absolute top-20 sm:top-24 lg:top-auto lg:bottom-0 left-1/2 -translate-x-1/2 z-10 flex justify-center items-start lg:items-end pointer-events-none select-none w-full max-w-5xl">
        <motion.div
          ref={portraitRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="relative w-[340px] sm:w-[460px] md:w-[560px] lg:w-[680px] xl:w-[760px] flex items-start lg:items-end justify-center"
          style={{ perspective: 1000 }}
        >
          <img
            src="/images/me.png"
            alt="Aditya Upadhyay"
            width={760}
            height={750}
            className="w-full h-auto max-h-[52vh] sm:max-h-[64vh] md:max-h-[76vh] lg:max-h-[88vh] xl:max-h-[86vh] object-contain object-top lg:object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
            loading="eager"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            }}
          />
        </motion.div>
      </div>

      
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-end mt-auto">

        
        <div className="hidden lg:flex flex-col items-start text-left max-w-md pb-4">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent)]" />
            </span>
            <span className="font-mono text-xs font-medium text-[var(--text)]">
              {siteConfig.status}
            </span>
          </motion.div>

          
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-heading text-7xl lg:text-[5.5rem] xl:text-[6.8rem] uppercase leading-[0.84] tracking-tight text-[var(--text)] drop-shadow-sm select-none"
          >
            I AM
            <br />
            ADITYA
            <br />
            UPADHYAY
          </motion.h1>
        </div>

        
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md w-full lg:w-auto lg:pl-6 pb-2 sm:pb-4 mt-auto">
          
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex lg:hidden mb-2 items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-medium text-[var(--text)]">
              {siteConfig.status}
            </span>
          </motion.div>

          
          <div className="bg-[var(--bg)]/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 sm:p-5 lg:p-0 rounded-3xl border border-[var(--border)] lg:border-none shadow-xl lg:shadow-none w-full">
            
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-1.5 h-[2rem] flex items-center justify-center lg:justify-start overflow-hidden"
            >
              <motion.span
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="font-heading text-lg sm:text-2xl md:text-3xl uppercase tracking-wider text-[var(--accent)]"
              >
                {siteConfig.roles[roleIndex]}
              </motion.span>
            </motion.div>

            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-serif italic text-base sm:text-2xl text-[var(--text)] leading-snug mb-2.5 max-w-sm"
            >
              "{siteConfig.tagline}"
            </motion.p>

            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="hidden lg:block text-sm text-[var(--text-muted)] leading-relaxed max-w-sm mb-6"
            >
              B.Tech CSE student crafting responsive, full-stack applications with React, TypeScript, and Node.js. Focused on clean architecture and high performance.
            </motion.p>

            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--accent)] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <span>View My Work</span>
                <ArrowDown size={14} />
              </a>

              <a
                href="/resume.pdf"
                download="Aditya_Upadhyay_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-[var(--text)]/20 text-[var(--text)] font-semibold text-xs sm:text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 backdrop-blur-sm"
              >
                <Download size={14} />
                <span>Resume</span>
              </a>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-2.5"
            >
              {[
                { icon: Github, href: siteConfig.social.github, label: "GitHub" },
                { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:scale-110 transition-all duration-300 shadow-sm"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
