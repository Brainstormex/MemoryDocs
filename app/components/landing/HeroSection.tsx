export function HeroSection() {
  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-8 md:grid-cols-2 md:px-10 md:pt-16">
      <div className="reveal">
        <p className="mb-4 inline-flex rounded-full border border-slate-300/70 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
          PDF Summarizer + Chat
        </p>
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
          Understand any PDF in minutes, not hours.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700 md:text-xl">
          Memory Docs extracts the signal from dense documents. Summarize,
          query, compare, and share insights from your PDFs in one
          lightning-fast workspace.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-400"
          >
            Upload Your First PDF
          </a>
          <a
            href="#how"
            className="rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5"
          >
            Watch Product Tour
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-600">
          <p>No credit card required</p>
          <p>2-minute onboarding</p>
          <p>Trusted by fast-moving teams</p>
        </div>
      </div>

      <div className="reveal md:justify-self-end" style={{ animationDelay: "140ms" }}>
        <div className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-[0_22px_70px_-30px_rgba(16,24,40,0.45)] backdrop-blur">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <p className="text-sm font-semibold">Quarterly-Finance-Review.pdf</p>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Summarized
            </span>
          </div>
          <div className="space-y-4 py-5 text-sm text-slate-700">
            <p>
              Summary: Revenue grew 18% YoY, but margin pressure increased due
              to vendor costs.
            </p>
            <p>
              Risk: Renewal risk in two enterprise accounts with low product
              utilization.
            </p>
            <p>
              Action: Prioritize customer health outreach and renegotiate
              infrastructure contracts.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Ask your PDF
            </p>
            <p className="mt-2 text-sm text-slate-700">
              "Which sections mention renewal risk and what mitigation is
              proposed?"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}