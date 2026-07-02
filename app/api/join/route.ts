import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

type Submission = {
  fullName: string;
  alias: string;
  story: string;
  email: string;
  phone: string;
  consent: boolean;
  submittedAt: string;
};

const filePath = path.join(process.cwd(), 'data', 'prospective-members.json');

function escapeCsvValue(value: string) {
  const escaped = value.replace(/"/g, '""');
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

async function readSubmissions() {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content) as Submission[];
  } catch (error) {
    const typedError = error as NodeJS.ErrnoException;
    if (typedError.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const submissions = await readSubmissions();
    const format = request.nextUrl.searchParams.get('format');

    if (format === 'csv') {
      const header = ['fullName', 'alias', 'story', 'email', 'phone', 'consent', 'submittedAt'];
      const rows = submissions.map((submission) =>
        header
          .map((key) => escapeCsvValue(String((submission as Record<string, unknown>)[key] ?? '')))
          .join(','),
      );
      const csv = [header.join(','), ...rows].join('\n');

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="prospective-members.csv"',
        },
      });
    }

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Unable to read join submissions', error);
    return NextResponse.json(
      { success: false, message: 'Unable to read submissions right now.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      typeof body?.fullName !== 'string' ||
      !body.fullName.trim() ||
      typeof body?.story !== 'string' ||
      !body.story.trim() ||
      typeof body?.email !== 'string' ||
      !body.email.trim() ||
      typeof body?.phone !== 'string' ||
      !body.phone.trim() ||
      typeof body?.consent !== 'boolean' ||
      !body.consent
    ) {
      return NextResponse.json(
        { success: false, message: 'Please complete all required fields and consent to the GDPR notice.' },
        { status: 400 },
      );
    }

    const submission: Submission = {
      fullName: body.fullName.trim(),
      alias: typeof body.alias === 'string' ? body.alias.trim() : '',
      story: body.story.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      consent: true,
      submittedAt: new Date().toISOString(),
    };

    await fs.mkdir(path.dirname(filePath), { recursive: true });

    const existing = await readSubmissions();

    existing.push(submission);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf8');

    // If WEB3FORMS_API_KEY is configured, forward the submission to Web3Forms
    const web3Key = process.env.WEB3FORMS_API_KEY || process.env.WEB3FORMS_ACCESS_KEY;
    if (web3Key) {
      try {
        // Web3Forms expects multipart/form-data (FormData). Build FormData here.
        const formData = new FormData();
        formData.append('access_key', web3Key);
        formData.append('api_key', web3Key);
        formData.append('subject', 'New Join Submission');
        formData.append('name', submission.fullName);
        formData.append('email', submission.email);
        formData.append('message', submission.story);
        formData.append('alias', submission.alias);
        formData.append('phone', submission.phone);
        formData.append('consent', String(submission.consent));
        formData.append('submittedAt', submission.submittedAt);
        formData.append('source', 'Collab Culture');

        const web3Resp = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          // include Origin header in case Web3Forms enforces origin checks
          headers: {
            Origin: 'http://localhost:3000',
          },
          body: formData,
        });

        // Capture response body safely
        let respBody: unknown = null;
        try {
          respBody = await web3Resp.json();
        } catch (e) {
          try {
            respBody = await web3Resp.text();
          } catch (_) {
            respBody = null;
          }
        }

        const logPath = path.join(process.cwd(), 'data', 'web3forms-log.json');
        const logEntry = {
          submittedAt: submission.submittedAt,
          status: web3Resp.status,
          ok: web3Resp.ok,
          body: respBody,
        };

        try {
          const existingLogContent = await fs.readFile(logPath, 'utf8');
          const existingLogs = JSON.parse(existingLogContent) as unknown[];
          existingLogs.push(logEntry);
          await fs.writeFile(logPath, JSON.stringify(existingLogs, null, 2), 'utf8');
        } catch (e) {
          const typedErr = e as NodeJS.ErrnoException;
          if (typedErr.code === 'ENOENT') {
            await fs.mkdir(path.dirname(logPath), { recursive: true });
            await fs.writeFile(logPath, JSON.stringify([logEntry], null, 2), 'utf8');
          } else {
            console.error('Failed to write Web3Forms log', e);
          }
        }
      } catch (err) {
        console.error('Forwarding to Web3Forms failed', err);
      }
    }

    return NextResponse.json({ success: true, message: 'Your application has been received. We will be in touch soon.' });
  } catch (error) {
    console.error('Join form submission failed', error);
    return NextResponse.json(
      { success: false, message: 'Your application could not be submitted right now. Please try again later.' },
      { status: 500 },
    );
  }
}
