import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import Link from "next/link";
import { ClerkProvider, Show, UserButton } from "@clerk/nextjs";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory Docs | AI PDF Summarizer and Chat",
  description:
    "Summarize long PDFs, ask questions, and extract citation-backed insights in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${sora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-slate-50/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
              <Link href="/" className="text-lg font-semibold font-display tracking-tight text-slate-900">
                Memory Docs
              </Link>
              
              <nav className="hidden items-center gap-8 text-sm md:flex">
                <Link href="/#features" className="font-medium text-slate-600 hover:text-slate-950 transition">
                  Features
                </Link>
                <Link href="/#how" className="font-medium text-slate-600 hover:text-slate-950 transition">
                  How it works
                </Link>
                <Link href="/#pricing" className="font-medium text-slate-600 hover:text-slate-950 transition">
                  Pricing
                </Link>
                <Link href="/#faq" className="font-medium text-slate-600 hover:text-slate-950 transition">
                  FAQ
                </Link>
              </nav>

              <div className="flex items-center gap-4">
                <Show when="signed-out">
                  <Link href="/sign-in" className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition cursor-pointer">
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 hover:-translate-y-0.5 cursor-pointer">
                    Sign Up
                  </Link>
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </div>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

