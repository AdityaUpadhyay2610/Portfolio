import React from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import ScrollManager from "./components/ScrollManager.jsx";

function MainPage() {
  return (
    <>
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

function AppContent() {
  const { theme, onToggleTheme } = usePortfolio();
  const isLightMode = theme === "light";

  return (
    <div className="min-h-screen bg-ink text-paper transition-colors duration-300">
      <ScrollManager />
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${isLightMode ? "dark" : "light"} mode`}
        className="fixed top-4 right-20 z-50 hidden md:flex items-center gap-2 rounded-full border border-line bg-panel/90 px-3 py-2 text-sm text-paper shadow-sm backdrop-blur"
      >
        {isLightMode ? <SunMedium size={16} /> : <MoonStar size={16} />}
        <span>{isLightMode ? "Light" : "Dark"}</span>
      </button>
      <Sidebar />
      <main className="md:ml-sidebar-md lg:ml-sidebar">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/about" element={<MainPage />} />
          <Route path="/skills" element={<MainPage />} />
          <Route path="/projects" element={<MainPage />} />
          <Route path="/contact" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </BrowserRouter>
  );
}
