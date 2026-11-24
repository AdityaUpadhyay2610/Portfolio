import { useState, useCallback } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import ExperienceSkills from "@/components/sections/ExperienceSkills";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

function AppContent() {
  const [loaded, setLoaded] = useState(false);
  const handlePreloaderComplete = useCallback(() => setLoaded(true), []);

  return (
    <SmoothScroll>
      <div className="grain min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-400">
        <CustomCursor />
        {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <Stats />
          <ExperienceSkills />
          <Projects />
          <About />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
