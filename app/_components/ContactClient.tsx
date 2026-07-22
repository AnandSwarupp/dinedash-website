"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Check, ArrowRight, Zap } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface Settings { email?: string; phone?: string; address?: string; }

const subjects = [
  "I want to list my restaurant",
  "I have a question about pricing",
  "I need help with setup",
  "I have a technical issue",
  "General enquiry",
  "Press / partnership",
];

export default function ContactClient() {
  const [settings, setSettings] = useState<Settings>({
    email: "hello@dinedash.app",
    phone: "+44 20 0000 0000",
    address: "London, United Kingdom",
  });

  useEffect(() => {
    fetch("/api/content/settings")
      .then((r) => r.json())
      .then((data) => { if (data?.data) setSettings(data.data); })
      .catch(() => {});
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    restaurantName: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
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

  const inputClass = "w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent text-sm bg-[var(--surface-alt)] transition-shadow duration-300";

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-100 dark:bg-green-500/5 rounded-full opacity-40 blur-3xl" />
        </div>
        <Reveal className="relative max-w-2xl mx-auto">
          <div className="eyebrow justify-center mb-6">Get in touch</div>
          <h1 className="headline-lg text-[var(--text-primary)] mb-4">
            We&apos;d love to <span className="gradient-text">hear from you</span>
          </h1>
          <p className="body-lead">
            Restaurant owner? Curious diner? Press enquiry? Fill in the form below — we reply within 24 hours.
          </p>
        </Reveal>
      </section>

      {/* MAIN CONTENT */}
      <section className="section-padding px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info sidebar */}
            <Reveal className="lg:col-span-2 space-y-6">
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Contact information</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="icon-tile">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] text-xs mb-1">Email</div>
                      <div className="text-[var(--text-primary)] font-medium">{settings.email || "hello@dinedash.app"}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="icon-tile">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] text-xs mb-1">Phone</div>
                      <div className="text-[var(--text-primary)] font-medium">{settings.phone || "+44 20 0000 0000"}</div>
                      <div className="text-[var(--text-muted)] text-xs mt-0.5">Mon–Fri, 9am–6pm GMT</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="icon-tile">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] text-xs mb-1">Location</div>
                      <div className="text-[var(--text-primary)] font-medium">{settings.address || "London, United Kingdom"}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-3xl p-8">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Quick links</h3>
                <div className="space-y-3">
                  {[
                    { label: "Ready to get started?", href: "/get-started", desc: "Start your 30-day free trial" },
                    { label: "See our pricing", href: "/pricing", desc: "Transparent plans from £49/mo" },
                    { label: "How it works", href: "/how-it-works", desc: "Full guide for restaurants & diners" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-start gap-3 group">
                      <div className="w-8 h-8 bg-[var(--brand-light)] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--brand)] transition-colors duration-300">
                        <ArrowRight className="w-4 h-4 text-[var(--brand-text)] group-hover:text-[#0F1623] transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="text-[var(--text-primary)] font-semibold text-sm group-hover:text-[var(--brand-text)] transition-colors duration-300">{link.label}</div>
                        <div className="text-[var(--text-muted)] text-xs">{link.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1} className="lg:col-span-3">
              {success ? (
                <div className="bg-[var(--brand-light)] border-2 border-[var(--brand)] rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 bg-[var(--brand)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-[#0F1623]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Message sent!</h2>
                  <p className="text-[var(--text-secondary)] mb-6">
                    Thanks for reaching out. We&apos;ll reply to <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <Link href="/" className="btn-primary px-8 py-3">
                    Back to Home
                  </Link>
                </div>
              ) : (
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-9 h-9 bg-[var(--brand)] rounded-xl flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#0F1623] fill-[#0F1623]" />
                    </div>
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">Send us a message</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Your name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Email address *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@restaurant.com" className={inputClass} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Restaurant name <span className="text-[var(--text-muted)] font-normal">(optional)</span></label>
                        <input type="text" name="restaurantName" value={form.restaurantName} onChange={handleChange} placeholder="The Golden Fork" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Phone <span className="text-[var(--text-muted)] font-normal">(optional)</span></label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+44 7700 000000" className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Subject *</label>
                      <select name="subject" value={form.subject} onChange={handleChange} className={inputClass}>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us how we can help..." className={`${inputClass} resize-none`} />
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
                        {error}
                      </div>
                    )}

                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </button>

                    <p className="text-[var(--text-muted)] text-xs text-center">
                      We reply to all messages within 24 hours during weekdays.
                    </p>
                  </form>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
