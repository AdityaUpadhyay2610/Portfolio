/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        panel: "var(--color-panel)",
        panel2: "var(--color-panel2)",
        line: "var(--color-line)",
        paper: "var(--color-paper)",
        mute: "var(--color-mute)",
        amber: "var(--color-amber)",
        teal: "var(--color-teal)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      spacing: {
        sidebar: "17rem",
        "sidebar-md": "5.5rem",
      },
    },
  },
  plugins: [],
};
