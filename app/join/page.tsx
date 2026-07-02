'use client';

import Link from 'next/link';
import ContactForm from '../../components/contact-form';
import { type ChangeEvent, type FormEvent, useState } from 'react';

type FormState = {
  fullName: string;
  alias: string;
  story: string;
  email: string;
  phone: string;
  consent: boolean;
};

const initialForm: FormState = {
  fullName: '',
  alias: '',
  story: '',
  email: '',
  phone: '',
  consent: false,
};

export default function JoinPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name as keyof FormState]: value }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setForm((prev) => ({ ...prev, [name as keyof FormState]: checked }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });

    if (!form.consent) {
      setStatus({
        type: 'error',
        message: 'Please consent to the GDPR notice before submitting your application.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Your application could not be submitted.');
      }

      setStatus({ type: 'success', message: payload.message || 'Thanks for joining the network.' });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Your application could not be submitted.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 lg:px-8">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C8FF00]">Prospective member intake</p>
        <h1 className="text-4xl uppercase tracking-[0.18em] text-[#f0ede6] md:text-5xl" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
          Join the network
        </h1>
        <p className="max-w-2xl text-base text-[#f0ede6]/75">
          Share your practice, your story, and the kind of work you are building. We use this to understand how you fit into the wider Collab Culture network.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <ContactForm />

        <aside className="space-y-5 rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8FF00]">What we look for</p>
            <h2 className="mt-3 text-2xl uppercase tracking-[0.18em] text-[#f0ede6]" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              Creative operators, builders, and cultural connectors.
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-[#f0ede6]/75">
            <li>• Artists, founders, strategists, and operators building with intent.</li>
            <li>• People looking for partnerships, collaboration, and shared momentum.</li>
            <li>• Practices that want to grow beyond a single project and enter a wider cultural ecosystem.</li>
          </ul>
          <div className="rounded-2xl border border-[#C8FF00]/20 bg-[#C8FF00]/10 p-4 text-sm text-[#f0ede6]/75">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C8FF00]">GDPR notice</p>
            <p className="mt-2">
              Your information is used only to review your application and keep you informed about future opportunities. If you want your data removed, reach out to the team directly.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
