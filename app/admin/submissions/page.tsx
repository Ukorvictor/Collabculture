'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Submission = {
  fullName: string;
  alias: string;
  story: string;
  email: string;
  phone: string;
  consent: boolean;
  submittedAt: string;
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const response = await fetch('/api/join');
        const data = await response.json();
        setSubmissions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Unable to load submissions', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubmissions();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-16 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C8FF00]">Submission dashboard</p>
          <h1 className="text-4xl uppercase tracking-[0.18em] text-[#f0ede6] md:text-5xl" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
            Prospective members
          </h1>
          <p className="max-w-2xl text-base text-[#f0ede6]/75">
            Review incoming applications and download the full list as a CSV file.
          </p>
        </div>
        <a
          href="/api/join?format=csv"
          className="rounded-full border border-[#C8FF00]/40 bg-[#C8FF00] px-6 py-3 text-sm uppercase tracking-[0.3em] text-black transition hover:bg-[#d7ff5c]"
        >
          Download CSV
        </a>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/55 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        {isLoading ? (
          <div className="p-8 text-sm text-[#f0ede6]/70">Loading submissions...</div>
        ) : submissions.length === 0 ? (
          <div className="p-8 text-sm text-[#f0ede6]/70">No submissions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-white/5 text-[#C8FF00]">
                <tr>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Name</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Alias</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Email</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Phone</th>
                  <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-[#f0ede6]/80">
                {submissions.map((submission) => (
                  <tr key={`${submission.email}-${submission.submittedAt}`} className="hover:bg-white/5">
                    <td className="px-4 py-3">{submission.fullName}</td>
                    <td className="px-4 py-3">{submission.alias || '—'}</td>
                    <td className="px-4 py-3">{submission.email}</td>
                    <td className="px-4 py-3">{submission.phone}</td>
                    <td className="px-4 py-3">{new Date(submission.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Link href="/join" className="text-sm uppercase tracking-[0.25em] text-[#f0ede6]/70 transition hover:text-[#C8FF00]">
        Back to join form
      </Link>
    </div>
  );
}
