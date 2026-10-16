"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import info from "@/data/user_info";
import Footer from "@/components/sections/Footer";
import {
  Mail, MapPin, Phone, Share2, Zap, Handshake, Globe2,
  ArrowRight, Send, Loader2, CheckCircle2, XCircle,
  Calendar, Clock, Linkedin, Github,
} from "lucide-react";
import { SiWhatsapp, SiX, SiYoutube } from "react-icons/si";

const FEATURES = [
  {
    icon: Zap,
    label: "Quick Response",
    sub: "Usually within 24 hours",
    color: "#3b82f6",
    bg: "bg-blue-500/10",
  },
  {
    icon: Handshake,
    label: "Open to Opportunities",
    sub: "Projects, freelancing, or full-time",
    color: "#10b981",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Globe2,
    label: "Global Collaboration",
    sub: "Remote-friendly",
    color: "#6366f1",
    bg: "bg-indigo-500/10",
  },
];

const SOCIALS = [
  { icon: Linkedin, href: info.socials.linkedin, label: "LinkedIn",  color: "#0a66c2" },
  { icon: Github,   href: info.socials.github,   label: "GitHub",    color: "#6e40c9" },
  { icon: SiX,      href: "#",                   label: "X",         color: "#000000" },
  { icon: SiYoutube,href: "#",                   label: "YouTube",   color: "#ff0000" },
  { icon: Globe2,   href: "/",                   label: "Website",   color: "#3b82f6" },
];

const HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM (EAT)", status: "Available",   badge: "bg-green-500/15 text-green-600 border-green-500/30" },
  { day: "Saturday",        time: "Flexible hours",           status: "Limited",     badge: "bg-amber-500/15 text-amber-600 border-amber-500/30"  },
  { day: "Sunday",          time: "Mostly offline",           status: "Unavailable", badge: "bg-red-500/15 text-red-500 border-red-500/30"         },
];

const INITIAL = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm]           = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]       = useState<"idle" | "success" | "error">("idle");
  const [errMsg, setErrMsg]       = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrMsg("");
    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, projectType: "", budget: "", timeline: "" }),
      });
      const data = await res.json();
      if (!res.ok) { setErrMsg(data.error ?? "Something went wrong."); setStatus("error"); return; }
      setStatus("success");
      setTimeout(() => { setForm(INITIAL); setStatus("idle"); }, 4000);
    } catch {
      setErrMsg("Network error — please try again.");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = submitting || !form.name.trim() || !form.email.trim() || !form.message.trim();

  return (
    <main className="min-h-screen bg-background pt-16">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[340px] sm:min-h-[380px]">
          <Image
            src="/images/contact-hero-bg.png"
            alt="Contact hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-100/80 via-white/60 to-background dark:from-sky-900/70 dark:via-sky-950/60 dark:to-background" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-xl">
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary/30 bg-primary/10 mb-4">
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  GET IN TOUCH
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                Let&apos;s Work
                <span className="block text-primary">Together</span>
              </h1>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
                Have a project in mind, a question, or just want to say hello?
                I&apos;m always open to new opportunities, collaborations,
                and meaningful conversations.
              </p>

              {/* Feature pills */}
              <div className="mt-6 flex flex-wrap gap-3">
                {FEATURES.map(({ icon: Icon, label, sub, color, bg }) => (
                  <div key={label}
                       className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-card/80 backdrop-blur-sm shadow-sm`}>
                    <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-3.5 w-3.5" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breadcrumb */}
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <span>/</span>
                <span className="text-foreground font-medium">Contact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Form ── */}
          <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Send a Message</h2>
                <p className="text-xs text-muted-foreground">Fill out the form below and I&apos;ll get back to you as soon as possible.</p>
              </div>
            </div>

            {status === "success" ? (
              <div className="py-12 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                    Thanks for reaching out. I&apos;ll reply within 24 hours. Check your inbox for a confirmation.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <input
                        name="name" value={form.name} onChange={onChange} required
                        placeholder="John Doe"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                   text-foreground placeholder:text-muted-foreground outline-none
                                   focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </span>
                      <input
                        type="email" name="email" value={form.email} onChange={onChange} required
                        placeholder="john@example.com"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                   text-foreground placeholder:text-muted-foreground outline-none
                                   focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 12h10M7 17h4" />
                      </svg>
                    </span>
                    <input
                      name="subject" value={form.subject} onChange={onChange}
                      placeholder="Project Inquiry"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                 text-foreground placeholder:text-muted-foreground outline-none
                                 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-muted-foreground">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </span>
                    <textarea
                      name="message" value={form.message} onChange={onChange} required rows={5}
                      placeholder="Tell me about your project, idea, or question..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                 text-foreground placeholder:text-muted-foreground outline-none resize-none
                                 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600">
                    <XCircle className="h-4 w-4 flex-shrink-0" />
                    {errMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={disabled}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                             bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30
                             hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200"
                >
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Contact Info ── */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Contact Information</h3>
                  <p className="text-xs text-muted-foreground">Feel free to reach out through any of the following channels.</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Email */}
                <a
                  href={`mailto:${info.main.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30
                             hover:bg-primary/5 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-violet-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-semibold text-primary truncate">{info.main.email}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/255742123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-green-500/30
                             hover:bg-green-500/5 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <SiWhatsapp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <p className="text-sm font-semibold text-foreground">+255 742 123 456</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-green-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-semibold text-foreground">Dar es Salaam, Tanzania</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              </div>

              {/* Follow Me */}
              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-bold text-foreground">Follow Me</p>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Connect with me on social media.</p>
                <div className="flex items-center gap-2">
                  {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-xl border border-border bg-background flex items-center justify-center
                                 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                      style={{ ["--hover-color" as string]: color }}
                    >
                      <Icon className="h-4 w-4 text-muted-foreground hover:text-foreground" style={{ color }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Map + Hours ── */}
          <div className="lg:col-span-3 space-y-4">
            {/* Map */}
            <div className="rounded-2xl border border-border overflow-hidden shadow-sm bg-card">
              <div className="relative h-48">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=39.1083%2C-6.9524%2C39.3083%2C-6.6524&layer=mapnik&marker=-6.7924%2C39.2083"
                  className="w-full h-full border-0"
                  title="Dar es Salaam, Tanzania"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 bg-white dark:bg-card text-xs font-semibold text-foreground
                                px-2.5 py-1 rounded-lg border border-border shadow-sm flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-red-500" />
                  Dar es Salaam, Tanzania
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Working Hours</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">I&apos;m usually available during these hours.</p>
              <div className="space-y-3">
                {HOURS.map(({ day, time, status: s, badge }) => (
                  <div key={day} className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{day}</p>
                        <p className="text-xs text-muted-foreground">{time}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${badge}`}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA bar ── */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row
                        items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Open to New Opportunities</h3>
              <p className="text-sm text-muted-foreground max-w-lg">
                I&apos;m currently open to freelance projects, full-time opportunities, and interesting collaborations.
                Let&apos;s create something amazing together!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Paper plane decorative */}
            <Send className="h-6 w-6 text-primary/40 hidden sm:block" />
            <button
              onClick={() => {
                document.querySelector("form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white
                         font-bold text-sm rounded-xl hover:bg-primary/90 transition-all duration-200
                         shadow-md shadow-primary/30"
            >
              <Send className="h-4 w-4" />
              Start a Conversation
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      <Footer />
    </main>
  );
}
