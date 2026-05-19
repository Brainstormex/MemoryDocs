const features = [
  {
    title: "AI Summaries in Seconds",
    description:
      "Turn long PDFs into crisp executive summaries with key takeaways, action items, and risks.",
  },
  {
    title: "Chat With Any Document",
    description:
      "Ask natural language questions and get grounded answers with source-aware responses.",
  },
  {
    title: "Citations You Can Trust",
    description:
      "Every answer is linked to the exact section in the PDF so your team can verify instantly.",
  },
  {
    title: "Multi-File Intelligence",
    description:
      "Compare contracts, policies, and reports across multiple PDFs in one unified chat thread.",
  },
  {
    title: "Team Workspaces",
    description:
      "Organize documents by project, invite teammates, and keep decisions synced across teams.",
  },
  {
    title: "Secure by Default",
    description:
      "Enterprise-grade encryption, role controls, and audit-friendly workflows built in.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
      <div className="mb-12 max-w-2xl reveal">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl">
          Built for teams that read a lot and decide fast.
        </h2>
        <p className="mt-4 text-lg text-slate-700">
          From sales decks to policy docs, Memory Docs helps you turn static
          files into searchable, conversational knowledge.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className="reveal rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.45)]"
            style={{ animationDelay: `${120 + index * 80}ms` }}
          >
            <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}