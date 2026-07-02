"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    if (!name.trim() || !email.trim() || !message.trim() || !email.includes("@")) {
      setStatus("Please fill in your name, a valid email address, and your message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus(data.message || 'Thanks! We received your message and will respond as soon as possible.');
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.message || 'Unable to send your message right now. Please try again later.');
      }
    } catch (error) {
      setStatus('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-8 rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8FF00]">Contact Us</p>
            <h1 className="text-4xl uppercase tracking-[0.18em] text-[#f0ede6] md:text-5xl" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Thanks for visiting.
            </h1>
            <p className="text-base leading-8 text-[#f0ede6]/80">
              We value your feedback, questions, and inquiries. Reach out to us using the contact information below, and we will respond as soon as possible.
            </p>
          </div>

          <div className="space-y-6 rounded-[28px] border border-white/10 bg-black/50 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#C8FF00]">Contact information</p>
            <div className="space-y-3 text-sm text-[#f0ede6]/80">
              <p><strong className="text-[#f0ede6]">Email:</strong> info@collabculture.co.uk</p>
            </div>
          </div>

          <p className="text-sm leading-7 text-[#f0ede6]/70">
            If you'd like us to follow up directly, please complete the form and share your contact details and message. We’re here to help and will be in touch promptly.
          </p>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.2em] text-[#f0ede6]/80">
                <span>Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-[#f0ede6] outline-none transition focus:border-[#C8FF00]/50"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.2em] text-[#f0ede6]/80">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-[#f0ede6] outline-none transition focus:border-[#C8FF00]/50"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.2em] text-[#f0ede6]/80">
                <span>Message</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-[#f0ede6] outline-none transition focus:border-[#C8FF00]/50"
                  required
                />
              </label>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full border border-[#C8FF00]/40 bg-[#C8FF00] px-6 py-3 text-sm uppercase tracking-[0.3em] text-black transition hover:bg-[#d7ff5c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
              <Link href="/" className="text-sm uppercase tracking-[0.3em] text-[#f0ede6]/80 transition hover:text-[#C8FF00]">
                Back to home
              </Link>
            </div>

            {status ? <p className="text-sm text-[#f0ede6]/80">{status}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
}
