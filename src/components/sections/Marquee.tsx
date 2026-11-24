import { siteConfig } from "@/data/config";

export default function Marquee() {
  const items = siteConfig.marqueeItems;
  const doubled = [...items, ...items];

  return (
    <section className="py-8 border-y border-[var(--border)] overflow-hidden bg-[var(--surface)]">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span className="font-heading text-lg md:text-xl uppercase tracking-widest text-[var(--text-muted)]/60 hover:text-[var(--accent)] transition-colors cursor-default">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]/30" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
