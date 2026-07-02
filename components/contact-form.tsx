"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [result, setResult] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult('Sending....');

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Ensure consent is explicit
    const consentEl = form.elements.namedItem('consent') as HTMLInputElement | null;
    if (consentEl) {
      formData.set('consent', consentEl.checked ? 'true' : 'false');
    }

    // Public form access key (from your Web3Forms dashboard)
    formData.set('access_key', 'f723ff27-46bc-43d2-a71c-c7c23c49abc2');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult('Form Submitted Successfully');
        form.reset();
      } else {
        setResult('Error submitting form');
      }
    } catch (err) {
      setResult('Network error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-[28px] border border-white/10 bg-black/55 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.2em] text-[#f0ede6]/80">
          <span>Full name</span>
          <input required name="fullName" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm lowercase tracking-normal text-[#f0ede6] outline-none ring-0 transition focus:border-[#C8FF00]/50" />
        </label>

        <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.2em] text-[#f0ede6]/80">
          <span>Alias</span>
          <input name="alias" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm lowercase tracking-normal text-[#f0ede6] outline-none ring-0 transition focus:border-[#C8FF00]/50" />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.2em] text-[#f0ede6]/80">
        <span>Story of your brand, business, or skill</span>
        <textarea required name="story" rows={5} placeholder="Tell us what you build, who it serves, and why it matters." className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm lowercase tracking-normal text-[#f0ede6] outline-none ring-0 transition focus:border-[#C8FF00]/50" />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.2em] text-[#f0ede6]/80">
          <span>Email address</span>
          <input required type="email" name="email" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm lowercase tracking-normal text-[#f0ede6] outline-none ring-0 transition focus:border-[#C8FF00]/50" />
        </label>

        <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.2em] text-[#f0ede6]/80">
          <span>Phone number</span>
          <input required type="tel" name="phone" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm lowercase tracking-normal text-[#f0ede6] outline-none ring-0 transition focus:border-[#C8FF00]/50" />
        </label>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[#f0ede6]/75">
        <input required type="checkbox" name="consent" value="true" className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-[#C8FF00] focus:ring-[#C8FF00]" />
        <span>
          I consent to Collab Culture storing my details for the purpose of reviewing my application and keeping in touch about future opportunities. I understand that I can request deletion of my data at any time.
        </span>
      </label>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <a href="/" className="text-sm uppercase tracking-[0.25em] text-[#f0ede6]/70 transition hover:text-[#C8FF00]">Back to home</a>
          <a href="/admin/submissions" className="text-sm uppercase tracking-[0.25em] text-[#C8FF00] transition hover:text-[#d7ff5c]">View submissions</a>
        </div>
        <button type="submit" className="rounded-full border border-[#C8FF00]/40 bg-[#C8FF00] px-6 py-3 text-sm uppercase tracking-[0.3em] text-black transition hover:bg-[#d7ff5c]">Submit application</button>
      </div>

      <div className="mt-2 text-sm text-[#f0ede6]/85">{result}</div>
    </form>
  );
}
