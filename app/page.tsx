export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full space-y-10">
        {/* Header */}
        <header className="space-y-4">
          {/* Logo and Heading */}
          <div className="flex items-center gap-4 sm:gap-6 justify-start flex-wrap">
            {/* Logo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
              <img 
                src="/astraheritage-logo.jpg" 
                alt="AstraHeritage Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            {/* Heading */}
            <div className="space-y-1 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                ASTRA HERITAGE
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 uppercase tracking-wider">
                Advanced Intelligence. Enduring Heritage.
              </p>
            </div>
          </div>
          <p className="text-slate-700 text-sm sm:text-lg leading-relaxed">
            An AI-powered financial guide that helps you make smarter decisions
            about retirement, housing, college planning, and investments—without
            spreadsheets or analysis paralysis.
          </p>
        </header>

        {/* Benefits */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">What AstraHeritage will help you with:</h2>
          <ul className="list-disc list-inside text-slate-700 space-y-2 text-sm sm:text-base">
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

          <button className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 text-sm sm:text-base hover:bg-gray-50 transition">
            See what&apos;s coming next
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] sm:text-xs text-slate-600">
          AstraHeritage provides educational guidance only and does not give
          individualized financial, legal, or tax advice.
        </p>
      </div>
    </main>
  );
}
