export interface SkillGroup {
  title: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Redux", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Backend & APIs",
    items: ["Node.js", "Express.js", "RESTful APIs", "Axios", "Schema Design", "Data Flow Pipelines"],
  },
  {
    title: "Databases",
    items: ["MongoDB (Atlas)", "MySQL", "PostgreSQL"],
  },
  {
    title: "Languages & Concepts",
    items: ["Java", "OOP","Reusable Components"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code"],
  },
];
