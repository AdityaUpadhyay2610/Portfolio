import React from "react";
import { Eyebrow, SectionHeading, Annotation } from "./ui.jsx";

const GROUPS = [
  {
    title: "Languages & core",
    items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Java"],
  },
  {
    title: "Frameworks & libraries",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "Redux"],
  },
  {
    title: "Tools & workflow",
    items: ["Git"],
  },
  {
    title: "Backend & data",
    items: ["Node.js", "Express", "REST APIs"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex items-center px-6 sm:px-10 md:px-12 lg:px-20 py-28 border-b border-line"
    >
      <div className="w-full max-w-4xl">
        <Eyebrow index="03">Skills</Eyebrow>
        <SectionHeading>What I work with</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <Annotation className="mb-3">{group.title}</Annotation>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full border border-line font-mono text-xs text-paper hover:border-amber hover:text-amber transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
