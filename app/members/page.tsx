import Image from "next/image";
import { members } from "./data";

export default function MembersPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-14 lg:px-8">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C8FF00]">Members</p>
        <h1 className="max-w-3xl text-4xl uppercase tracking-[0.18em] text-[#f0ede6] md:text-6xl">A constellation of makers, editors, and scene-builders.</h1>
        <p className="max-w-2xl text-[#f0ede6]/75">Browse the community behind the culture. Each profile is a gateway into a new collaboration.</p>
      </header>
      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {members.map((member) => (
          <article key={member.name} className="mb-6 break-inside-avoid overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={member.image}
                alt={`${member.name} portrait`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                {member.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#C8FF00]/30 bg-[#C8FF00]/10 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-[#C8FF00]">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 text-2xl uppercase tracking-[0.18em] text-[#f0ede6]">{member.name}</h2>
              {member.alias ? <p className="mt-1 text-sm uppercase tracking-[0.3em] text-[#f0ede6]/70">{member.alias}</p> : null}
              <p className="mt-3 text-sm font-medium text-[#f0ede6]/90">{member.headline}</p>
              <p className="mt-3 text-sm leading-6 text-[#f0ede6]/75">{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
