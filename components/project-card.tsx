export function ProjectCard({
  title,
  discipline,
  blurb,
  accent,
}: {
  title: string;
  discipline: string;
  blurb: string;
  accent: string;
}) {
  return (
    <article className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#C8FF00]/60 hover:bg-white/6">
      <div className="h-48 w-full" style={{ background: accent }} />
      <div className="space-y-3 p-5">
        <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#C8FF00]">{discipline}</p>
        <h3 className="text-xl uppercase tracking-[0.18em] text-[#f0ede6]">{title}</h3>
        <p className="text-sm text-[#f0ede6]/75">{blurb}</p>
      </div>
    </article>
  );
}
