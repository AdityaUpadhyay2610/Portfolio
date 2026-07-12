import React, { useEffect, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-light", theme === "light");
    root.classList.toggle("theme-dark", theme === "dark");
    root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleNavigate(id) {
    setActive(id);
    setIsOpen(false);
  }

  return (
    <div className="min-h-screen bg-ink text-paper transition-colors duration-300">
      <button
        type="button"
        onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="fixed top-4 right-20 z-50 hidden md:flex items-center gap-2 rounded-full border border-line bg-panel/90 px-3 py-2 text-sm text-paper shadow-sm backdrop-blur"
      >
        {theme === "light" ? <MoonStar size={16} /> : <SunMedium size={16} />}
        <span>{theme === "light" ? "Dark" : "Light"}</span>
      </button>
      <Sidebar
        active={active}
        isOpen={isOpen}
        theme={theme}
        onToggle={() => setIsOpen((prev) => !prev)}
        onNavigate={handleNavigate}
        onToggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      />
      <main className="md:ml-sidebar-md lg:ml-sidebar">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
