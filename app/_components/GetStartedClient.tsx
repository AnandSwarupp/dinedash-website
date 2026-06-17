"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Zap, ChefHat, QrCode, BarChart3 } from "lucide-react";

const plans = [
  { id: "starter", name: "Starter", price: "£49/mo", tables: "Up to 10 tables" },
  { id: "growth", name: "Growth", price: "£99/mo", tables: "Up to 30 tables", popular: true },
  { id: "enterprise", name: "Enterprise", price: "£249/mo", tables: "Unlimited tables" },
];

const tableRanges = [
  "1–5 tables",
  "6–10 tables",
  "11–20 tables",
  "21–50 tables",
  "50+ tables",
];

const perks = [
  { icon: ChefHat, text: "14-day free trial — no card needed" },
  { icon: QrCode, text: "QR codes ready to print in minutes" },
  { icon: BarChart3, text: "Live dashboard from day one" },
  { icon: Zap, text: "Go live in under 1 hour" },
];

export default function GetStartedClient() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    numberOfTables: tableRanges[0],
    plan: "growth",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.restaurantName || !form.ownerName || !form.email) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/get-started", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] text-sm bg-[var(--surface-alt)]";

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-green-100 dark:bg-green-500/5 rounded-full opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-amber-100 dark:bg-amber-500/5 rounded-full opacity-30 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left: info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-8">
                <div className="w-9 h-9 bg-[var(--brand)] rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#0F1623] fill-[#0F1623]" />
                </div>
                <span className="text-xl font-bold text-[var(--text-primary)]">
                  Dine<span className="text-[var(--brand)]">Dash</span>
                </span>
              </Link>

              <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4 leading-tight">
                Start your<br />
                <span className="gradient-text">free 14-day trial</span>
              </h1>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                Join hundreds of restaurants already using DineDash to increase table turnover. No credit card required. Cancel any time.
              </p>

              <div className="space-y-4 mb-8">
                {perks.map((perk) => (
                  <div key={perk.text} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[var(--brand-light)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <perk.icon className="w-4 h-4 text-[var(--brand)]" />
                    </div>
                    <span className="text-[var(--text-secondary)] text-sm font-medium">{perk.text}</span>
                  </div>
                ))}
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-[var(--brand)] text-[#0F1623]" : "bg-[var(--border)] text-[var(--text-muted)]"}`}>1</div>
                <div className={`flex-1 h-0.5 ${step >= 2 ? "bg-[var(--brand)]" : "bg-[var(--border)]"}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-[var(--brand)] text-[#0F1623]" : "bg-[var(--border)] text-[var(--text-muted)]"}`}>2</div>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-muted)] mt-2 px-1">
                <span>Your details</span>
                <span>Plan & finish</span>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              {success ? (
                <div className="bg-[var(--brand-light)] border-2 border-[var(--brand)] rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 bg-[var(--brand)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-[#0F1623]" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-3">You&apos;re in!</h2>
                  <p className="text-[var(--text-secondary)] mb-2">
                    Welcome to DineDash, <strong>{form.restaurantName}</strong>!
                  </p>
                  <p className="text-[var(--text-muted)] text-sm mb-8">
                    We&apos;ll email setup instructions to <strong>{form.email}</strong> within 24 hours. Your trial starts today — 14 days, completely free.
                  </p>
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6 text-left">
                    <h3 className="font-bold text-[var(--text-primary)] mb-3">What happens next</h3>
                    <ul className="space-y-2">
                      {["Check your email for setup instructions","Log into your dashboard and add your menu","Print your table & till QR codes","Place them in your restaurant — you're live!"].map((s, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                          <div className="w-5 h-5 bg-[var(--brand-light)] rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-[var(--brand)]">{i + 1}</div>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/" className="btn-primary px-8 py-3">
                    Back to Home
                  </Link>
                </div>
              ) : step === 1 ? (
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-sm">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Step 1 of 2 — Your details</h2>
                  <form onSubmit={handleStep1} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Restaurant name *</label>
                      <input type="text" name="restaurantName" value={form.restaurantName} onChange={handleChange} required placeholder="The Golden Fork" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Your name *</label>
                      <input type="text" name="ownerName" value={form.ownerName} onChange={handleChange} required placeholder="Jane Smith" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Email address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="jane@restaurant.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Phone <span className="text-[var(--text-muted)] font-normal">(optional)</span></label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+44 7700 000000" className={inputClass} />
                    </div>
                    {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>}
                    <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                      Continue <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setStep(1)} className="text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors text-sm">
                      ← Back
                    </button>
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">Step 2 of 2 — Choose your plan</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Plan selector */}
                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-3">Select a plan *</label>
                      <div className="space-y-3">
                        {plans.map((plan) => (
                          <label
                            key={plan.id}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                              form.plan === plan.id
                                ? "border-[var(--brand)] bg-[var(--brand-light)]"
                                : "border-[var(--border)] hover:border-[var(--brand)]/40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="plan"
                                value={plan.id}
                                checked={form.plan === plan.id}
                                onChange={handleChange}
                                className="accent-green-600 w-4 h-4"
                              />
                              <div>
                                <div className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                                  {plan.name}
                                  {plan.popular && <span className="bg-[var(--brand)] text-[#0F1623] text-xs px-2 py-0.5 rounded-full">Popular</span>}
                                </div>
                                <div className="text-[var(--text-muted)] text-xs">{plan.tables}</div>
                              </div>
                            </div>
                            <div className="font-bold text-[var(--text-primary)]">{plan.price}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Number of tables */}
                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Number of tables</label>
                      <select name="numberOfTables" value={form.numberOfTables} onChange={handleChange} className={inputClass}>
                        {tableRanges.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Anything else? <span className="text-[var(--text-muted)] font-normal">(optional)</span></label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us about your restaurant, any questions, or special requirements..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Starting your trial...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Start Free Trial <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </button>

                    <p className="text-[var(--text-muted)] text-xs text-center">
                      No credit card required. 14-day free trial. Cancel anytime.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
