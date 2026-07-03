"use client";

import ContactForm from '../../components/contact-form';

export default function ContactPage() {
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
              We value your feedback, questions, and inquiries. Reach out to us using the contact form below, and we will respond as soon as possible.
            </p>
          </div>

          <div className="space-y-6 rounded-[28px] border border-white/10 bg-black/50 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#C8FF00]">Contact information</p>
            <div className="space-y-3 text-sm text-[#f0ede6]/80">
              <p><strong className="text-[#f0ede6]">Email:</strong> info@collabculture.co.uk</p>
            </div>
          </div>

          <p className="text-sm leading-7 text-[#f0ede6]/70">
            If you'd like us to follow up directly, complete the form and share your contact details and message.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
