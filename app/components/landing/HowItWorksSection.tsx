const steps = [
  "Upload one or many PDFs.",
  "Get auto summaries and structured highlights.",
  "Ask questions, compare files, and export insights.",
];

export function HowItWorksSection() {
  return (
    <section id="how" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
      <div className="grid gap-10 rounded-4xl border border-slate-200/70 bg-white/85 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
        <div className="reveal">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            Three steps to document clarity.
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Move from upload to confident decisions with a workflow that is
            simple enough for everyone and powerful enough for experts.
          </p>
        </div>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li
              key={step}
              className="reveal flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4"
              style={{ animationDelay: `${160 + index * 90}ms` }}
            >
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <p className="text-sm text-slate-700">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
