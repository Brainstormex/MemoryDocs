const faqs = [
  {
    question: "What PDF size is supported?",
    answer:
      "Plans support documents from quick briefs to large handbooks. Higher tiers include larger file limits and priority processing.",
  },
  {
    question: "Can I use it for legal or compliance documents?",
    answer:
      "Yes. Citation-backed answers make it ideal for legal, compliance, procurement, and policy workflows.",
  },
  {
    question: "Is my data used to train models?",
    answer:
      "No. Your workspace data stays isolated. We do not use your private documents to train shared models.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
      <div className="mb-12 max-w-2xl reveal">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl">FAQ</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <article
            key={faq.question}
            className="reveal rounded-2xl border border-slate-200 bg-white p-6"
            style={{ animationDelay: `${80 + index * 70}ms` }}
          >
            <h3 className="text-lg font-semibold tracking-tight">{faq.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
