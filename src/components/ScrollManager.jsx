import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { usePortfolio } from "../context/PortfolioContext.jsx";

// Map URL paths to the HTML element IDs on the page
const PATH_TO_ID = {
  "/": "home",
  "/home": "home",
  "/about": "about",
  "/skills": "skills",
  "/projects": "projects",
  "/contact": "contact",
};

export default function ScrollManager() {
  const location = useLocation();
  const { setActive } = usePortfolio();

  // Effect 1: Scroll to the corresponding section when the URL path changes (e.g. from clicking a link)
  useEffect(() => {
    const targetId = PATH_TO_ID[location.pathname] || "home";
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname]);

  // Effect 2: Watch which section is on the screen and update the active sidebar link
  useEffect(() => {
    // Create an Intersection Observer to detect when sections enter the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section enters the middle area of the screen, set it as the active page
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null, // Uses the browser window viewport
        rootMargin: "-45% 0px -45% 0px", // Trigger when the section occupies the center of the screen
        threshold: 0,
      }
    );

    // List of section IDs to observe
    const sections = ["home", "about", "skills", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    // Cleanup: disconnect the observer when the component is removed/unmounted
    return () => {
      observer.disconnect();
    };
  }, [setActive]);

  // This component handles background logic only, so it returns null (renders nothing)
  return null;
}

