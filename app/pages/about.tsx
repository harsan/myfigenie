export default function About() {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900 py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* Navigation Back */}
          <a href="../page.tsx" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition">
            ← Back to Astra Heritage
          </a>
  
          <header className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Our Leadership</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              <b>Astra Heritage Holdings LLC</b> was founded to simplify wealth management through the 
              responsible use of Artificial Intelligence.
            </p>
          </header>
  
          <div className="grid gap-12 pt-8">
            {/* Founder 1 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Harsan Singh</h2>
              <p className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Founder & CTO</p>
              <p className="text-slate-700 leading-relaxed text-base">
              is a technologist and visionary dedicated to democratizing complex financial modeling. As the CTO of Astra Heritage, he leads the development of our AI-driven core, ensuring that the engine behind your financial checkup is both powerful and secure. His work focuses on transforming "spreadsheet stress" into actionable insights, allowing families to build their heritage with confidence.
              </p>
            </div>
  
            <div className="h-px bg-slate-200 w-full" />
  
            {/* Founder 2 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Andy Singh</h2>
              <p className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Product & US Manager</p>
              <p className="text-slate-700 leading-relaxed text-base">
              leads the product strategy and UX for Astra Heritage. With a focus on the user journey, Andy ensures that the platform addresses the real-world complexities of the American financial landscape—from 529 college savings to sustainable retirement paths. He is committed to making Astra Heritage a trusted partner for families across the country.
              </p>
            </div>
          </div>
  
          {/* Legal Footer */}
          <footer className="pt-20 text-[11px] text-slate-400 uppercase tracking-widest text-center">
            © 2026 Astra Heritage Holdings LLC.
          </footer>
        </div>
      </main>
    );
  }