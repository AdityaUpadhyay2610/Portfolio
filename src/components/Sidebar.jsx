import React from "react";
import { NavLink } from "react-router";
import {
  Home,
  User,
  Code2,
  FolderGit2,
  Mail,
  Menu,
  X,
  Github,
  Linkedin,
  MoonStar,
  SunMedium,
} from "lucide-react";
import { usePortfolio, NAV_ITEMS } from "../context/PortfolioContext.jsx";

const ICON_MAP = {
  Home,
  User,
  Code2,
  FolderGit2,
  Mail,
};

export default function Sidebar() {
  const { active, isOpen, theme, onToggle, onNavigate, onToggleTheme } = usePortfolio();
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === active)
  );
  const progressPct =
    NAV_ITEMS.length > 1 ? (activeIndex / (NAV_ITEMS.length - 1)) * 100 : 0;

  return (
    <>
      {/* mobile toggle button */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        className="fixed top-4 right-4 z-50 md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-panel border border-line text-paper active:scale-95 transition-transform"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* backdrop for mobile drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/70 backdrop-blur-sm md:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-full flex flex-col justify-between
          w-72 md:w-sidebar-md lg:w-sidebar bg-panel border-r border-line
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* logo */}
        <div className="px-6 md:px-0 lg:px-8 pt-8 pb-6 flex md:justify-center lg:justify-start">
          <div className="flex w-full items-center justify-between gap-3">
            <NavLink
              to="/"
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 group"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-md border-2 border-amber font-mono font-medium text-amber text-sm shrink-0">
                AU
              </span>
              <span className="hidden lg:flex flex-col leading-tight">
                <span className="font-display font-semibold text-paper text-base">
                  Aditya Upadhyay
                </span>
                <span className="font-mono text-[11px] text-mute">
                  Aspiring Full-Stack Developer
                </span>
              </span>
            </NavLink>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel2 text-paper transition-colors hover:border-amber hover:text-amber"
            >
              {theme === "light" ? <MoonStar size={16} /> : <SunMedium size={16} />}
            </button>
          </div>
        </div>

        {/* nav list with progress rail */}
        <nav className="flex-1 px-6 md:px-0 lg:px-8 relative" aria-label="Section navigation">
          <div className="relative flex md:justify-center lg:justify-start">
            {/* progress rail track */}
            <div className="hidden md:block absolute left-0 lg:left-0 top-1 bottom-1 w-px bg-line md:mx-auto md:relative md:h-auto" />
          </div>

          <div className="mb-4 flex items-center justify-between rounded-md border border-line bg-panel2/70 px-3 py-2 md:hidden">
            <span className="text-sm text-mute">Theme</span>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel text-paper transition-colors hover:border-amber hover:text-amber"
            >
              {theme === "light" ? <MoonStar size={16} /> : <SunMedium size={16} />}
            </button>
          </div>

          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = ICON_MAP[item.icon];
              const isActive = item.id === active;
              return (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    onClick={() => onNavigate(item.id)}
                    className={`relative flex items-center gap-3 md:gap-0 lg:gap-3 md:justify-center lg:justify-start
                      py-3 px-3 md:px-0 lg:px-3 rounded-md transition-colors group
                      ${isActive ? "text-amber" : "text-mute hover:text-paper"}`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full transition-colors
                        ${isActive ? "bg-amber" : "bg-transparent"}`}
                      aria-hidden="true"
                    />
                    <Icon size={18} strokeWidth={1.8} className="shrink-0" />
                    <span className="inline font-body text-sm">
                      {item.label}
                    </span>
                    <span className="ml-auto hidden sm:inline font-mono text-[11px] text-mute/70">
                      {item.index}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* scroll progress rail, laptop+ only */}
          <div className="hidden lg:block absolute -left-4 top-0 bottom-0 w-px bg-line">
            <div
              className="absolute left-0 top-0 w-px bg-amber transition-all duration-300"
              style={{ height: `${progressPct}%` }}
            />
          </div>
        </nav>

        {/* footer: socials + status */}
        <div className="px-6 md:px-0 lg:px-8 pb-8 pt-6 border-t border-line">
          <div className="flex items-center gap-2 mb-4 md:justify-center lg:justify-start">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="hidden lg:inline font-mono text-[11px] text-mute">
              open to work
            </span>
          </div>
          <div className="flex items-center gap-4 md:justify-center lg:justify-start">
            <a
              href="https://github.com/AdityaUpadhyay2610"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-mute hover:text-paper transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/adityaupadhyay26/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-mute hover:text-paper transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:aditya2610upadhyay@gmail.com"
              aria-label="Email"
              className="text-mute hover:text-paper transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
