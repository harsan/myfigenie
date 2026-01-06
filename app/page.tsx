export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            AstraHeritage presents
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold">
            MyFiGenie
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Your AI-powered financial guide for retirement planning, housing
            affordability, college funding, and smarter investing—
            built for busy professionals who want clarity, not confusion.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">What MyFiGenie can help you with:</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Check if you're on track for retirement</li>
            <li>Know how much house you can truly afford</li>
            <li>Plan 529 contributions for your kids</li>
            <li>Detect if your portfolio is over-concentrated</li>
          </ul>
        </section>

        <div className="flex gap-3">
          <a
            href="/profile"
            className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-medium hover:bg-emerald-400 transition"
          >
            Start Free Financial Checkup
          </a>

          <button className="px-5 py-3 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-900 transition">
            Learn More
          </button>
        </div>

        <p className="text-xs text-slate-500">
          *This tool provides educational guidance, not individualized financial advice.
        </p>
      </div>
    </main>
  );
}
