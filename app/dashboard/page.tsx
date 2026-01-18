"use client";

import { useState, useEffect } from "react";

type Profile = {
  age: string;
  income: string;
  cashSavings: string;
  investments: string;
  retirementAccounts: string;
  kidsAges: string;
  targetRetirementAge: string;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load profile data from localStorage
    const storedProfile = localStorage.getItem("myfigenie-profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  async function handleGetAdvice() {
    if (!profile) return;

    setLoading(true);
    setError(null);
    setAdvice(null);

    try {
      const response = await fetch("/api/advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get advice");
      }

      const data = await response.json();
      setAdvice(data.advice);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(value: string): string {
    if (!value) return "$0";
    const num = Number(value);
    if (isNaN(num)) return "$0";
    return `$${num.toLocaleString("en-US")}`;
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No profile data found</h1>
          <p className="text-slate-600 mb-6">Please fill out your profile first.</p>
          <a
            href="/profile"
            className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-medium hover:bg-emerald-400 transition inline-block"
          >
            Go to Profile
          </a>
        </div>
      </main>
    );
  }

  const totalInvestable =
    Number(profile.investments || 0) +
    Number(profile.retirementAccounts || 0);

  return (
    <main className="min-h-screen bg-white text-slate-900 flex justify-center px-6 py-10">
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-600">
            AstraHeritage · Dashboard
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Your financial snapshot
          </h1>
          <p className="text-slate-700 text-sm sm:text-base">
            A high-level view based on the numbers you shared. Next step will be
            to run AI analysis on this.
          </p>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-1">
            <p className="text-xs text-slate-600 uppercase tracking-wide">
              Age / Target
            </p>
            <p className="text-xl font-semibold text-slate-900">
              {profile.age || "--"}{" "}
              <span className="text-sm text-slate-600">
                → {profile.targetRetirementAge || "--"}
              </span>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-1">
            <p className="text-xs text-slate-600 uppercase tracking-wide">
              Annual income
            </p>
            <p className="text-xl font-semibold text-slate-900">
              {formatCurrency(profile.income)}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-1">
            <p className="text-xs text-slate-600 uppercase tracking-wide">
              Total investable
            </p>
            <p className="text-xl font-semibold text-slate-900">
              {formatCurrency(totalInvestable.toString())}
            </p>
          </div>
        </section>

        {/* Detailed breakdown */}
        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Financial Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-slate-600">Cash / Emergency Savings</p>
              <p className="text-lg font-medium text-slate-900">
                {formatCurrency(profile.cashSavings)}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-slate-600">Brokerage / Stocks / ETFs</p>
              <p className="text-lg font-medium text-slate-900">
                {formatCurrency(profile.investments)}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-slate-600">Retirement Accounts</p>
              <p className="text-lg font-medium text-slate-900">
                {formatCurrency(profile.retirementAccounts)}
              </p>
            </div>

            {profile.kidsAges && (
              <div className="space-y-1">
                <p className="text-sm text-slate-600">Kids&apos; Ages</p>
                <p className="text-lg font-medium text-slate-900">{profile.kidsAges}</p>
              </div>
            )}
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/profile"
            className="px-5 py-3 rounded-xl border border-gray-300 text-slate-700 text-sm sm:text-base hover:bg-gray-50 transition text-center"
          >
            Edit Profile
          </a>
          <button
            onClick={handleGetAdvice}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-medium text-sm sm:text-base hover:bg-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Generating Advice..." : "Get AI Financial Advice"}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* AI Advice */}
        {advice && (
          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">AI Financial Advice</h2>
            <div className="text-slate-700 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
              {advice}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
