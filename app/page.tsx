export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full space-y-10">
        {/* Header */}
        <header className="space-y-3">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-slate-400">
            AstraHeritage presents
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold">
            MyFiGenie
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
            An AI-powered financial guide that helps you make smarter decisions
            about retirement, housing, college planning, and investments—without
            spreadsheets or analysis paralysis.
          </p>
        </header>

        {/* Benefits */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">What MyFiGenie will help you with:</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2 text-sm sm:text-base">
            <li>See if you&apos;re on track to retire on your terms.</li>
            <li>Understand how much house you can comfortably afford.</li>
            <li>Plan 529 and college savings for your kids.</li>
            <li>Spot if your portfolio is too concentrated in a few stocks.</li>
          </ul>
        </section>

        {/* Call to action */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/profile"
            className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-medium text-sm sm:text-base hover:bg-emerald-400 transition text-center"
          >
            Start free financial checkup
          </a>

          <button className="px-5 py-3 rounded-xl border border-slate-700 text-slate-200 text-sm sm:text-base hover:bg-slate-900 transition">
            See what&apos;s coming next
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] sm:text-xs text-slate-500">
          MyFiGenie provides educational guidance only and does not give
          individualized financial, legal, or tax advice.
        </p>
      </div>
    </main>
  );
}
