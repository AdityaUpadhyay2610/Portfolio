import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const PortfolioContext = createContext();

export const NAV_ITEMS = [
  { id: "home", label: "Home", index: "01", icon: "Home", path: "/" },
  { id: "about", label: "About", index: "02", icon: "User", path: "/about" },
  { id: "skills", label: "Skills", index: "03", icon: "Code2", path: "/skills" },
  { id: "projects", label: "Projects", index: "04", icon: "FolderGit2", path: "/projects" },
  { id: "contact", label: "Contact", index: "05", icon: "Mail", path: "/contact" },
];

function getActiveFromPath(pathname) {
  switch (pathname) {
    case "/about":
      return "about";
    case "/skills":
      return "skills";
    case "/projects":
      return "projects";
    case "/contact":
      return "contact";
    case "/home":
    case "/":
    default:
      return "home";
  }
}

export function PortfolioProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(() => getActiveFromPath(location.pathname));
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    setActive(getActiveFromPath(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-light", theme === "light");
    root.classList.toggle("theme-dark", theme === "dark");
    root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleNavigate = (path, id) => {
    setActive(id);
    setIsOpen(false);
    navigate(path);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    active,
    isOpen,
    theme,
    onNavigate: handleNavigate,
    onToggle: handleToggle,
    onToggleTheme: handleToggleTheme,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
}
