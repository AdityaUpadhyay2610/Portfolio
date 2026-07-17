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

function AppContent() {
  const { theme, onToggleTheme } = usePortfolio();

  return (
    <div className="min-h-screen bg-ink text-paper transition-colors duration-300">
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="fixed top-4 right-20 z-50 hidden md:flex items-center gap-2 rounded-full border border-line bg-panel/90 px-3 py-2 text-sm text-paper shadow-sm backdrop-blur"
      >
        {theme === "light" ? <MoonStar size={16} /> : <SunMedium size={16} />}
        <span>{theme === "light" ? "Dark" : "Light"}</span>
      </button>
      <Sidebar />
      <main className="md:ml-sidebar-md lg:ml-sidebar">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
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
