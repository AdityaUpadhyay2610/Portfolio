import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { siteConfig } from "@/data/config";
import { useActiveSection } from "@/hooks/useScroll";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionIds = useMemo(
    () => siteConfig.navItems.map((i) => i.id),
    []
  );
  const active = useActiveSection(sectionIds);
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl",
          "rounded-full border px-4 py-2.5 md:px-6 md:py-3",
          "flex items-center justify-between transition-all duration-300",
          isScrolled
            ? "border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl shadow-lg shadow-black/5"
            : "border-[var(--border)]/60 bg-[var(--bg)]/75 backdrop-blur-md"
        )}
      >
        
        <button
          onClick={() => scrollTo("#home")}
          className="font-serif italic text-xl md:text-2xl text-[var(--text)] hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          Aditya Upadhyay.
        </button>

        
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {siteConfig.navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.href)}
              className={cn(
                "relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer",
                active === item.id
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              )}
            >
              {item.label}
              {active === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-[var(--accent-light)]"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </nav>

        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:flex items-center px-5 py-2 rounded-full bg-[var(--text)] text-[var(--bg)] text-sm font-semibold hover:bg-[var(--accent)] transition-colors cursor-pointer"
          >
            Contact
          </button>

          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] text-[var(--text)] cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-6"
          >
            {siteConfig.navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "text-3xl font-heading uppercase tracking-wider cursor-pointer",
                  active === item.id ? "text-[var(--accent)]" : "text-[var(--text)]"
                )}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
