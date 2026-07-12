import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, SectionHeading, CornerMarks } from "./ui.jsx";

const PROJECTS = [
  {
    index: "01",
    title: "Library Management Web App",
    description:
      "A web application for managing library resources, built with Spring Boot, Spring Security, and MySQL.",
    tags: ["ReactJS", "Spring Boot", "MySQL", "Spring Security"],
  },
  {
    index: "02",
    title: "GroCart",
    description:
      "A grocery shopping web application that allows users to browse and purchase groceries online, built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind","ReactJS","Node.js","Spring Boot"],
  },
  {
    index: "03",
    title: "TextUtils",
    description:
      "A text editing web application with real-time collaboration features, built with React and Node.js.",
    tags: ["Next.js", "Tailwind","ReactJS","Node.js"],
  }
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center px-6 sm:px-10 md:px-12 lg:px-20 py-28 border-b border-line"
    >
      <div className="w-full max-w-5xl">
        <Eyebrow index="04">Projects</Eyebrow>
        <SectionHeading>A few things I've built</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href="#"
              className="group relative flex flex-col justify-between p-6 rounded-lg bg-panel2 border border-line hover:border-amber/60 transition-colors min-h-[220px]"
            >
              <CornerMarks className="inset-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-xs text-mute">
                    {project.index}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-mute group-hover:text-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold text-paper mb-2">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-mute leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-teal border border-teal/30 rounded px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
