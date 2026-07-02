import type { ReactNode } from "react";
import Link from "next/link";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="text-xs uppercase tracking-[0.45em] text-[#C8FF00]">
            COLLAB CULTURE
          </Link>
          <div className="hidden items-center gap-6 text-sm uppercase tracking-[0.22em] text-[#f0ede6]/80 md:flex">
            <Link href="/" className="transition hover:text-[#C8FF00]">Home</Link>
            <Link href="/collab-board" className="transition hover:text-[#C8FF00]">Collab Board</Link>
            <Link href="/members" className="transition hover:text-[#C8FF00]">Members</Link>
            <Link href="/contact" className="transition hover:text-[#C8FF00]">Contact Us</Link>
          </div>
          <Link
            href="/join"
            className="rounded-full border border-[#C8FF00]/40 bg-[#C8FF00] px-4 py-2 text-xs uppercase tracking-[0.3em] text-black transition hover:bg-[#d7ff5c]"
          >
            Join the network
          </Link>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-white/10 bg-black/90 text-[#f0ede6]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8FF00]">Collab Culture</p>
            <p className="mt-2 max-w-md text-sm text-[#f0ede6]/75">A living ecosystem for creatives and business innovators across diverse sectors, with the ambition to scale and grow.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.32em] text-[#f0ede6]/80">
            <Link href="https://www.instagram.com/collabcultureuk?igsh=MWpvY2tzcThpZ2dnNA%3D%3D&utm_source=qr" className="transition hover:text-[#C8FF00]">Instagram</Link>
            <Link href="/" className="transition hover:text-[#C8FF00]">Twitter</Link>
            <Link href="/newsletter" className="transition hover:text-[#C8FF00]">Newsletter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
