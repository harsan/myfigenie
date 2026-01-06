"use client";

import { FormEvent, useState } from "react";

type Profile = {
  age: string;
  income: string;
  cashSavings: string;
  investments: string;
  retirementAccounts: string;
  kidsAges: string;
  targetRetirementAge: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    age: "",
    income: "",
    cashSavings: "",
    investments: "",
    retirementAccounts: "",
    kidsAges: "",
    targetRetirementAge: "",
  });

  const [submitted, setSubmitted] = useState<Profile | null>(null);

  function handleChange(
    field: keyof Profile,
    value: string
  ) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(profile);
    console.log("MyFiGenie profile:", profile);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex justify-center px-6 py-10">
      <div className="w-full max-w-2xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Step 1 · Your basics
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Tell MyFiGenie about your finances
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            A few high-level numbers are enough for now. You can refine the
            details later.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-slate-200">Your age</label>
              <input
                type="number"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/60"
                value={profile.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-200">
                Target retirement age
              </label>
              <input
                type="number"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/60"
                value={profile.targetRetirementAge}
                onChange={(e) =>
                  handleChange("targetRetirementAge", e.target.value)
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-200">
                Annual household income (USD)
              </label>
              <input
                type="number"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/60"
                value={profile.income}
                onChange={(e) => handleChange("income", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-200">
                Cash / emergency savings (USD)
              </label>
              <input
                type="number"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/60"
                value={profile.cashSavings}
                onChange={(e) => handleChange("cashSavings", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-200">
                Brokerage / stocks / ETFs (USD)
              </label>
              <input
                type="number"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/60"
                value={profile.investments}
                onChange={(e) => handleChange("investments", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-200">
                Retirement accounts (401k, IRA, etc.) (USD)
              </label>
              <input
                type="number"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/60"
                value={profile.retirementAccounts}
                onChange={(e) =>
                  handleChange("retirementAccounts", e.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-200">
              Kids&apos; ages (e.g. &quot;8, 15&quot;)
            </label>
            <input
              type="text"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/60"
              value={profile.kidsAges}
              onChange={(e) => handleChange("kidsAges", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-medium text-sm sm:text-base hover:bg-emerald-400 transition"
          >
            Continue
          </button>
        </form>

        {submitted && (
          <div className="text-xs sm:text-sm text-slate-300 bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
            <p className="font-semibold mb-1">Preview of what MyFiGenie sees:</p>
            <pre className="whitespace-pre-wrap break-words text-slate-400">
{JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
