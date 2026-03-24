"use client";

import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-semibold">Resume</h1>
          <Link
            href="/"
            className="text-sm px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 h-[85vh]">
          <iframe
            src="/resume/file"
            title="Resume PDF"
            className="w-full h-full"
          />
        </div>
      </div>
    </main>
  );
}
