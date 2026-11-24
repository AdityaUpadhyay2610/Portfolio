export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    id: "sheryians",
    role: "Full-Stack Development",
    company: "Sheryians Coding School",
    period: "Jun 2026 — Sep 2026",
    description: [
      "Built full-stack apps and integrated web services",
      "Scalable Node.js backends and RESTful APIs",
      "Responsive React and Tailwind interfaces with modular state management",
    ],
    tags: ["React", "Node.js", "Express", "Tailwind", "REST APIs"],
  },
  {
    id: "internshala",
    role: "Web Development Intern",
    company: "Internshala",
    period: "Jun 2025 — Sep 2025",
    description: [
      "Built and maintained responsive interfaces with HTML5, CSS3, JavaScript",
      "Created modular interactive features for production apps",
      "Improved UI/UX and site performance across projects",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "UI/UX", "Performance"],
  },
];
