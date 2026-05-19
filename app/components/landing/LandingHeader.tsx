export function LandingHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
      <a href="#" className="text-lg font-semibold tracking-tight">
        Memory Docs
      </a>
      <nav className="hidden items-center gap-8 text-sm md:flex">
        <a href="#features" className="hover:text-slate-600">
          Features
        </a>
        <a href="#how" className="hover:text-slate-600">
          How it works
        </a>
        <a href="#pricing" className="hover:text-slate-600">
          Pricing
        </a>
        <a href="#faq" className="hover:text-slate-600">
          FAQ
        </a>
      </nav>
      <a
        href="#pricing"
        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700"
      >
        Start Free
      </a>
    </header>
  );
}