import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
};

const filePath = path.join(process.cwd(), 'data', 'contact-messages.json');

async function readSubmissions() {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content) as ContactSubmission[];
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
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !email.includes('@') || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid name, email address, and message.' },
        { status: 400 },
      );
    }

    const submission: ContactSubmission = {
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    };

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    const existing = await readSubmissions();
    existing.push(submission);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf8');

    const formData = new FormData();
    formData.append('access_key', 'f723ff27-46bc-43d2-a71c-c7c23c49abc2');
    formData.append('name', submission.name);
    formData.append('email', submission.email);
    formData.append('message', submission.message);

    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const web3Data = await web3Response.json();
    if (!web3Response.ok || web3Data.success !== true) {
      console.error('Web3Forms submission failed', web3Data);
      return NextResponse.json(
        { success: false, message: 'Unable to submit your message to Web3Forms right now. Please try again later.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, message: 'Thanks! Your message has been received. We will respond as soon as possible.' });
  } catch (error) {
    console.error('Contact submission failed', error);
    return NextResponse.json(
      { success: false, message: 'Unable to submit your message right now. Please try again later.' },
      { status: 500 },
    );
  }
}
