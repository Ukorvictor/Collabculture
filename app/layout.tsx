import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const displayFont = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collab Culture | Creative Network",
  description: "A dark, editorial ecosystem for creatives and business innovators across diverse sectors, with the ambition to scale and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--text)]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
