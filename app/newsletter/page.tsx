"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus(data.message || 'Thank you! You’re signed up for newsletter updates.');
        setEmail("");
      } else {
        setStatus(data.message || 'Unable to sign you up right now. Please try again later.');
      }
    } catch (error) {
      setStatus('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C8FF00]">Newsletter</p>
          <h1 className="text-4xl uppercase tracking-[0.18em] text-[#f0ede6] md:text-5xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            Stay in the loop.
          </h1>
          <p className="text-base leading-7 text-[#f0ede6]/80">
            Get the latest calls, culture updates, and curated collaborations delivered straight to your inbox. Sign up with your email and be the first to hear what’s next from Collab Culture.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1.8fr_1fr]">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="rounded-full border border-white/10 bg-black/70 px-5 py-4 text-base text-[#f0ede6] outline-none ring-0 transition focus:border-[#C8FF00]/50 focus:ring-2 focus:ring-[#C8FF00]/20"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full border border-[#C8FF00]/40 bg-[#C8FF00] px-6 py-4 text-sm uppercase tracking-[0.3em] text-black transition hover:bg-[#d7ff5c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Signing up…' : 'Subscribe'}
            </button>
          </form>

          {status ? <p className="text-sm text-[#f0ede6]/70">{status}</p> : null}

          <div className="flex flex-col gap-2 text-sm text-[#f0ede6]/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Already part of the network? <Link href="/" className="text-[#C8FF00] transition hover:text-[#d7ff5c]">Return home</Link>
            </p>
            <p className="text-[#f0ede6]/70">
              We respect your privacy — no spam, just creative updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
