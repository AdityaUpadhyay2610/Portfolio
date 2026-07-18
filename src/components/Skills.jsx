import React from "react";

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
        {/* Section Heading Tag (previously <Eyebrow>) */}
        <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-amber uppercase mb-4">
          <span className="text-mute">§</span>
          03
          <span className="h-px w-8 bg-line" />
          Skills
        </p>

        {/* Section Sub-heading (previously <SectionHeading>) */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-paper mb-8 pb-4 border-b border-dashed border-line">
          What I work with
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
          {GROUPS.map((group) => (
            <div key={group.title}>
              {/* Group Annotation (previously <Annotation>) */}
              <div className="flex items-center gap-2 font-mono text-[11px] text-mute mb-3">
                <span className="w-5 h-px bg-mute/60" />
                {group.title}
              </div>

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

