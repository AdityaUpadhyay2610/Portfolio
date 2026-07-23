import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Create the Context so child components can share this global data
const PortfolioContext = createContext();

// Navigation items definition (used in Sidebar)
export const NAV_ITEMS = [
  { id: "home", label: "Home", index: "01", icon: "Home", path: "/" },
  { id: "about", label: "About", index: "02", icon: "User", path: "/about" },
  { id: "skills", label: "Skills", index: "03", icon: "Code2", path: "/skills" },
  { id: "projects", label: "Projects", index: "04", icon: "FolderGit2", path: "/projects" },
  { id: "contact", label: "Contact", index: "05", icon: "Mail", path: "/contact" },
];

export function PortfolioProvider({ children }) {
  const navigate = useNavigate();

  // 1. Keep track of which section is currently active/highlighted in the sidebar
  const [active, setActive] = useState("home");

  // 2. Keep track of whether the mobile menu sidebar drawer is open
  const [isOpen, setIsOpen] = useState(false);

  // 3. Keep track of the current theme (light or dark mode)
  const [theme, setTheme] = useState(() => {
    // If it's saved in local storage, use that. Otherwise, default to "light".
    return localStorage.getItem("theme") || "light";
  });

  // Whenever the theme changes, update the document class list and localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-light", theme === "light");
    root.classList.toggle("theme-dark", theme === "dark");
    root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handler for navigation: updates active item, closes mobile menu, and changes URL route
  const handleNavigate = (path, id) => {
    setActive(id);
    setIsOpen(false); // Close the mobile drawer if it's open
    navigate(path);
  };

  // Handler to open/close the mobile menu sidebar drawer
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Handler to switch between light and dark themes
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Expose these states and functions to our components
  const value = {
    active,
    setActive,
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

// Custom hook to make it super easy for components to use our Context
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

