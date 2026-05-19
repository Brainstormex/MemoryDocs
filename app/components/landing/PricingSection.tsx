export function PricingSection() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
      <div className="mb-12 max-w-2xl reveal">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl">
          Pricing that scales with your team.
        </h2>
        <p className="mt-4 text-lg text-slate-700">
          Start free, then unlock advanced collaboration and higher limits as
          your document intelligence stack grows.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <article className="reveal rounded-3xl border border-slate-200 bg-white p-7">
          <p className="text-sm font-semibold text-slate-500">Starter</p>
          <p className="mt-2 font-display text-4xl tracking-tight">$0</p>
          <p className="mt-3 text-sm text-slate-600">For individuals testing workflows.</p>
          <ul className="mt-5 space-y-2 text-sm text-slate-700">
            <li>Up to 20 PDFs/month</li>
            <li>Basic summaries</li>
            <li>Single-user workspace</li>
          </ul>
          <a
            href="#"
            className="mt-7 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold"
          >
            Get Started
          </a>
        </article>

        <article
          className="reveal rounded-3xl border border-slate-900 bg-slate-900 p-7 text-white shadow-[0_28px_60px_-30px_rgba(15,23,42,0.9)]"
          style={{ animationDelay: "120ms" }}
        >
          <p className="text-sm font-semibold text-emerald-300">Growth</p>
          <p className="mt-2 font-display text-4xl tracking-tight">$29</p>
          <p className="mt-3 text-sm text-slate-300">Per user/month for high-output teams.</p>
          <ul className="mt-5 space-y-2 text-sm text-slate-100">
            <li>Unlimited summaries</li>
            <li>Advanced PDF chat + citations</li>
            <li>Shared workspaces and exports</li>
          </ul>
          <a
            href="#"
            className="mt-7 inline-flex rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-emerald-950"
          >
            Start 14-Day Trial
          </a>
        </article>

        <article
          className="reveal rounded-3xl border border-slate-200 bg-white p-7"
          style={{ animationDelay: "220ms" }}
        >
          <p className="text-sm font-semibold text-slate-500">Enterprise</p>
          <p className="mt-2 font-display text-4xl tracking-tight">Custom</p>
          <p className="mt-3 text-sm text-slate-600">For security, controls, and procurement readiness.</p>
          <ul className="mt-5 space-y-2 text-sm text-slate-700">
            <li>SSO and role-based access</li>
            <li>Dedicated support</li>
            <li>Private deployment options</li>
          </ul>
          <a
            href="#"
            className="mt-7 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold"
          >
            Talk to Sales
          </a>
        </article>
      </div>
    </section>
  );
}
