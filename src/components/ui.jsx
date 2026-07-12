import React from "react";

/** Four small L-shaped crop marks at the corners of a panel — a print/spec-sheet tell. */
export function CornerMarks({ className = "" }) {
  const arm = "absolute w-3 h-3 border-amber/70";
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <span className={`${arm} top-0 left-0 border-l-2 border-t-2`} />
      <span className={`${arm} top-0 right-0 border-r-2 border-t-2`} />
      <span className={`${arm} bottom-0 left-0 border-l-2 border-b-2`} />
      <span className={`${arm} bottom-0 right-0 border-r-2 border-b-2`} />
    </div>
  );
}

/** Mono "§ 02 — label" tag used to open every section, like a spec-sheet header. */
export function Eyebrow({ index, children }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-amber uppercase mb-4">
      <span className="text-mute">§</span>
      {index}
      <span className="h-px w-8 bg-line" />
      {children}
    </p>
  );
}

/** A large display heading with a thin dashed underline rule. */
export function SectionHeading({ children }) {
  return (
    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-paper mb-8 pb-4 border-b border-dashed border-line">
      {children}
    </h2>
  );
}

/** Small annotation caption with a leader line, like a figure label in a notebook. */
export function Annotation({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-2 font-mono text-[11px] text-mute ${className}`}>
      <span className="w-5 h-px bg-mute/60" />
      {children}
    </div>
  );
}
