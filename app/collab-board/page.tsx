import { ProjectCard } from "@/components/project-card";

export default function CollabBoardPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-14 lg:px-8">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C8FF00]">Collab Board</p>
        <h1 className="max-w-3xl text-4xl uppercase tracking-[0.18em] text-[#f0ede6] md:text-6xl">Filter the next cultural exchange.</h1>
        <p className="max-w-2xl text-[#f0ede6]/75">A raw, living feed of calls, collaborations, and artists looking for the right crew.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ProjectCard
          title="Midnight Radio"
          discipline="Film / Sound"
          blurb="A nocturnal audio-visual commission for live projection and site-specific soundscapes."
          accent="linear-gradient(135deg, #1d1d1d 0%, #7b5cff 45%, #C8FF00 100%)"
        />
        <ProjectCard
          title="Future Archive"
          discipline="Design / Fashion"
          blurb="A tactile zine series exploring identity, memory, and handmade print culture."
          accent="linear-gradient(135deg, #0f0f0f 0%, #153c25 45%, #C8FF00 100%)"
        />
        <ProjectCard
          title="Static Bloom"
          discipline="Photography / Motion"
          blurb="A visual essay on urban light, textures, and motion captured after dark."
          accent="linear-gradient(135deg, #0b0b0b 0%, #2d2d2d 45%, #C8FF00 100%)"
        />
      </div>
    </section>
  );
}
