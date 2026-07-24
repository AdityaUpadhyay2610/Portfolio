import React from "react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    index: "01",
    title: "Library Management Web App",
    description:
      "A web application for managing library resources, built with Spring Boot, Spring Security, and MySQL.",
    tags: ["ReactJS", "Spring Boot", "MySQL", "Spring Security"],
    githubUrl: "https://github.com/AdityaUpadhyay2610/LibraryManagment.git",
    liveUrl: "https://library-managment-phi.vercel.app/",
  },
  {
    index: "02",
    title: "GroCart",
    description:
      "A grocery shopping web application that allows users to browse and purchase groceries online, built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind", "ReactJS", "Node.js", "Spring Boot"],
    githubUrl: "https://github.com/AdityaUpadhyay2610/GroCartAPP.git",
    liveUrl:"https://grocart-webapp.vercel.app/",
  },
  {
    index: "03",
    title: "TextUtils",
    description:
      "A text editing web application with real-time collaboration features, built with React and Node.js.",
    tags: ["Next.js", "Tailwind", "ReactJS", "Node.js"],
    githubUrl: "https://github.com/AdityaUpadhyay2610/text-app.git",
    liveUrl: "https://text-app-beryl-one.vercel.app/",

  },
  {
    index: "04",
    title: "Music Player",
    description:
      "A music player web application with a modern UI, built with React and Node.js.",
    tags: ["Next.js", "Tailwind", "ReactJS", "Node.js"],
    githubUrl: "https://github.com/AdityaUpadhyay2610/music-player.git",
    liveUrl: "",

  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center px-6 sm:px-10 md:px-12 lg:px-20 py-28 border-b border-line"
    >
      <div className="w-full max-w-5xl">
        {/* Section Heading Tag (previously <Eyebrow>) */}
        <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-amber uppercase mb-4">
          <span className="text-mute">§</span>
          04
          <span className="h-px w-8 bg-line" />
          Projects
        </p>

        {/* Section Sub-heading (previously <SectionHeading>) */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-paper mb-8 pb-4 border-b border-dashed border-line">
          A few things I've built
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.liveUrl || project.githubUrl || "#"}
              target={project.liveUrl || project.githubUrl ? "_blank" : undefined}
              rel={project.liveUrl || project.githubUrl ? "noreferrer" : undefined}
              className="group relative flex flex-col justify-between p-6 rounded-lg bg-panel2 border border-line hover:border-amber/60 transition-colors min-h-[220px]"
            >
              {/* Corner Crop Marks (previously <CornerMarks>) */}
              <div className="pointer-events-none absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                <span className="absolute w-3 h-3 border-amber/70 top-0 left-0 border-l-2 border-t-2" />
                <span className="absolute w-3 h-3 border-amber/70 top-0 right-0 border-r-2 border-t-2" />
                <span className="absolute w-3 h-3 border-amber/70 bottom-0 left-0 border-l-2 border-b-2" />
                <span className="absolute w-3 h-3 border-amber/70 bottom-0 right-0 border-r-2 border-b-2" />
              </div>

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
                {project.githubUrl && (
                  <span className="font-mono text-[11px] font-medium text-teal border border-teal/30 rounded-full px-2.5 py-1">
                    GitHub
                  </span>
                )}
                {project.liveUrl && (
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white bg-red-600 border border-red-500 rounded-full px-2.5 py-1 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_4px_10px_rgba(239,68,68,0.35)]">
                    Live
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

