import React from "react";

const STATS = [
  { value: "React", label: "Frontend Skills" },
  { value: "Java", label: "Backend Core" },
  { value: "Open", label: "To Opportunities" },
];

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-6 sm:px-10 md:px-12 lg:px-20 py-28 border-b border-line"
    >
      <div className="w-full max-w-4xl">
        {/* Section Heading Tag (previously <Eyebrow>) */}
        <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-amber uppercase mb-4">
          <span className="text-mute">§</span>
          02
          <span className="h-px w-8 bg-line" />
          About
        </p>

        {/* Section Sub-heading (previously <SectionHeading>) */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-paper mb-8 pb-4 border-b border-dashed border-line">
          A little about me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4 font-body text-base text-mute leading-relaxed">
            <p>
              I’m a final-year Computer Science student at Government Engineering College, Bharatpur, building my skills in full-stack development with React and Java.
            </p>
            <p>
              I’ve built projects like a Library Management Web App using Spring Boot, Spring Security, and MySQL, and I’m focused on creating practical software that solves real problems.
            </p>
            <p>
              I’m always eager to learn, build, and contribute to meaningful projects while strengthening my skills as a developer.
            </p>
          </div>

          <div className="space-y-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l-2 border-line pl-4">
                <p className="font-display text-3xl font-bold text-amber">
                  {stat.value}
                </p>
                <p className="font-mono text-xs text-mute uppercase tracking-wide mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

