"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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

  // Format number with commas for display
  function formatCurrency(value: string): string {
    if (!value) return "";
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    // Add commas for thousands
    return Number(numericValue).toLocaleString("en-US");
  }

  // Parse formatted currency back to numeric string
  function parseCurrency(value: string): string {
    // Remove all non-digit characters
    return value.replace(/\D/g, "");
  }

  function handleChange(
    field: keyof Profile,
    value: string
  ) {
    // For currency fields, store the numeric value (without commas)
    const currencyFields: (keyof Profile)[] = ["income", "cashSavings", "investments", "retirementAccounts"];
    if (currencyFields.includes(field)) {
      const numericValue = parseCurrency(value);
      setProfile((prev) => ({ ...prev, [field]: numericValue }));
    } else {
      setProfile((prev) => ({ ...prev, [field]: value }));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Store profile data in localStorage for dashboard access
    localStorage.setItem("myfigenie-profile", JSON.stringify(profile));
    // Navigate to dashboard page
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 flex justify-center px-6 py-10">
      <div className="w-full max-w-2xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-600">
            Step 1 · Your basics
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Tell AstraHeritage about your finances
          </h1>
          <p className="text-slate-700 text-sm sm:text-base">
            A few high-level numbers are enough for now. You can refine the
            details later.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-slate-700">Your age</label>
              <input
                type="number"
                className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring focus:ring-emerald-500/60"
                value={profile.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">
                Target retirement age
              </label>
              <input
                type="number"
                className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring focus:ring-emerald-500/60"
                value={profile.targetRetirementAge}
                onChange={(e) =>
                  handleChange("targetRetirementAge", e.target.value)
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">
                Annual household income (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm">$</span>
                <input
                  type="text"
                  className="w-full rounded-lg bg-white border border-gray-300 pl-8 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring focus:ring-emerald-500/60"
                  value={formatCurrency(profile.income)}
                  onChange={(e) => handleChange("income", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">
                Cash / emergency savings (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm">$</span>
                <input
                  type="text"
                  className="w-full rounded-lg bg-white border border-gray-300 pl-8 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring focus:ring-emerald-500/60"
                  value={formatCurrency(profile.cashSavings)}
                  onChange={(e) => handleChange("cashSavings", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">
                Brokerage / stocks / ETFs (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm">$</span>
                <input
                  type="text"
                  className="w-full rounded-lg bg-white border border-gray-300 pl-8 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring focus:ring-emerald-500/60"
                  value={formatCurrency(profile.investments)}
                  onChange={(e) => handleChange("investments", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">
                Retirement accounts (401k, IRA, etc.) (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm">$</span>
                <input
                  type="text"
                  className="w-full rounded-lg bg-white border border-gray-300 pl-8 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring focus:ring-emerald-500/60"
                  value={formatCurrency(profile.retirementAccounts)}
                  onChange={(e) =>
                    handleChange("retirementAccounts", e.target.value)
                  }
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-700">
              Kids&apos; ages (e.g. &quot;8, 15&quot;)
            </label>
            <input
              type="text"
              className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring focus:ring-emerald-500/60"
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
          <div className="text-xs sm:text-sm text-slate-700 bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <p className="font-semibold mb-1">Preview of what AstraHeritage sees:</p>
            <pre className="whitespace-pre-wrap break-words text-slate-600">
{JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
