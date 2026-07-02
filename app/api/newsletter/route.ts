import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

type NewsletterSubmission = {
  email: string;
  submittedAt: string;
};

const filePath = path.join(process.cwd(), 'data', 'newsletter-signups.json');

async function readSubmissions() {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content) as NewsletterSubmission[];
  } catch (error) {
    const typedError = error as NodeJS.ErrnoException;
    if (typedError.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    const submission: NewsletterSubmission = {
      email,
      submittedAt: new Date().toISOString(),
    };

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    const existing = await readSubmissions();
    existing.push(submission);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf8');

    const web3Key = process.env.WEB3FORMS_API_KEY || process.env.WEB3FORMS_ACCESS_KEY;
    if (web3Key) {
      try {
        const formData = new FormData();
        formData.append('access_key', web3Key);
        formData.append('api_key', web3Key);
        formData.append('subject', 'Collab Culture Newsletter Signup');
        formData.append('email', submission.email);
        formData.append('message', `Newsletter signup from ${submission.email}`);
        formData.append('submittedAt', submission.submittedAt);

        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
      } catch (error) {
        console.error('Web3Forms newsletter forwarding failed', error);
      }
    }

    return NextResponse.json({ success: true, message: 'Thank you! You are signed up for the newsletter.' });
  } catch (error) {
    console.error('Newsletter submission failed', error);
    return NextResponse.json(
      { success: false, message: 'Unable to submit your newsletter signup right now. Please try again later.' },
      { status: 500 },
    );
  }
}
