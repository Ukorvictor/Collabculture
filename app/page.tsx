"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { members } from "@/app/members/data";

const disciplines = ["ART", "MUSIC", "FILM", "DESIGN", "PHOTOGRAPHY", "FASHION", "WRITING", "MOTION"];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative flex min-h-[92vh] items-center border-b border-white/10 px-6 py-10 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(200,255,0,0.08),_transparent_18%)]" />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex w-fit rounded-full border border-[#C8FF00]/30 bg-[#C8FF00]/10 px-4 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-[#C8FF00]">
            A living ecosystem for creatives and business innovators
          </motion.div>
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="space-y-5">
              <h1 className="max-w-4xl text-6xl uppercase tracking-[0.18em] text-[#f0ede6] md:text-7xl lg:text-[7rem]" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                COLLAB.<br />CREATE.<br />CULTURE.
              </h1>
              <p className="max-w-xl text-lg text-[#f0ede6]/75">A living ecosystem for creatives and business innovators across diverse sectors, with the ambition to scale and grow.</p>
              <Link href="/join" className="inline-flex rounded-full border border-[#C8FF00]/40 bg-[#C8FF00] px-6 py-3 text-sm uppercase tracking-[0.3em] text-black transition hover:bg-[#d7ff5c]">Join the network</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black/70 py-3 text-[#C8FF00]">
        <div className="marquee flex gap-6 whitespace-nowrap text-xs uppercase tracking-[0.45em]">
          {Array.from({ length: 2 }).flatMap(() => disciplines).map((item, index) => (
            <span key={`${item}-${index}`} className="opacity-90">{item} /</span>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C8FF00]">What is CollabCulture?</p>
          <h2 className="text-3xl uppercase tracking-[0.18em] text-[#f0ede6] md:text-5xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>A cultural operating system for the underground.</h2>
        </div>
        <div className="grid gap-6 text-[#f0ede6]/80 md:grid-cols-2">
          <p>Collab Culture is a living ecosystem built on urgency, experimentation, and real collaboration. It holds space for creatives and business innovators who want to grow beyond the ordinary and move into the next phase of their work.</p>
          <p>Think editorial energy, gallery atmosphere, and community-first design. We make room for bold partnerships, practical scale, and the kind of exchange that helps ideas become lasting impact.</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-4 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8FF00]">Featured Collabs</p>
            <h2 className="text-3xl uppercase tracking-[0.18em] text-[#f0ede6] md:text-5xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>Current calls to make.</h2>
          </div>
          <a href="/collab-board" className="text-xs uppercase tracking-[0.35em] text-[#f0ede6]/80 hover:text-[#C8FF00]">View all</a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ProjectCard title="Midnight Radio" discipline="Film / Sound" blurb="A nocturnal audio-visual commission for live projection and site-specific soundscapes." accent="linear-gradient(135deg, #1d1d1d 0%, #7b5cff 45%, #C8FF00 100%)" />
          <ProjectCard title="Future Archive" discipline="Design / Fashion" blurb="A tactile zine series exploring identity, memory, and handmade print culture." accent="linear-gradient(135deg, #0f0f0f 0%, #153c25 45%, #C8FF00 100%)" />
          <ProjectCard title="Static Bloom" discipline="Photography / Motion" blurb="A visual essay on urban light, textures, and motion captured after dark." accent="linear-gradient(135deg, #0b0b0b 0%, #2d2d2d 45%, #C8FF00 100%)" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_14px_44px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#C8FF00]">Member spotlight</p>
          <div className="mt-5 flex w-full overflow-hidden">
            <div className="marquee-track flex min-w-max gap-3">
              {[...members, ...members].map((member, index) => {
                const spotlightLabel =
                  member.name === "Victor Ukor"
                    ? "Music Executive & AI Innovator"
                    : member.name === "Mayowa Komolafe"
                      ? "Creative Strategist & Founder"
                      : member.name === "David Muzan"
                        ? "Property Investment Strategist"
                        : member.name === "Ilerioluwa Bamidele"
                          ? "Digital Artist & Founder"
                          : member.name === "Olumide Oyewunmi"
                            ? "Creative Director & Founder"
                            : member.alias ?? "Creative";

                return (
                  <article
                    key={`${member.name}-${index}`}
                    className="group flex h-[260px] w-[220px] flex-col items-center justify-start rounded-[18px] border border-[#2a2a2a] bg-[linear-gradient(145deg,rgba(16,16,16,0.95),rgba(10,10,10,0.92))] p-4 text-center shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8FF00]/35 hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#C8FF00]/30 bg-black/40 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-300 group-hover:shadow-[0_0_0_1px_rgba(200,255,0,0.14)]">
                      <Image src={member.image} alt={member.name} width={64} height={64} className="h-full w-full object-cover" />
                    </div>

                    <div className="flex h-[62px] flex-col justify-start">
                      <h3 className="text-[16px] font-semibold uppercase tracking-[0.12em] text-[#f0ede6]">
                        {member.name}
                      </h3>
                      {member.alias ? (
                        <p className="mt-1 text-[13px] font-medium text-[#f0ede6]/70">({member.alias})</p>
                      ) : null}
                    </div>

                    <div className="mt-4 flex h-[44px] items-start justify-center">
                      <p className="text-[11px] font-medium uppercase leading-4 tracking-[0.22em] text-[#f0ede6]/60">
                        {spotlightLabel}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
