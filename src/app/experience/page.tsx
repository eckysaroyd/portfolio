"use client";

import { useState } from "react";
import info from "@/data/user_info";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Monitor, Globe, Download, ArrowRight, Mail,
  Trophy, Briefcase, Users, Heart, Code2, CheckCircle2,
  Star, BarChart2, Building2, Cpu,
} from "lucide-react";
import { hexRgba } from "@/lib/utils";

// ── Career milestones for hero ─────────────────────────────────────────────
const MILESTONES = [
  { year: "2018", label: "Started Journey",    icon: Star,      color: "#6366f1" },
  { year: "2021", label: "Software Developer", icon: Code2,     color: "#10b981" },
  { year: "2023", label: "Senior Developer",   icon: Briefcase, color: "#f97316" },
  { year: "2025", label: "Head of Engineering",icon: Trophy,    color: "#f59e0b" },
];

// ── Stats ──────────────────────────────────────────────────────────────────
const STATS = [
  { Icon: Users,    value: "6+",   label: "Years Experience"    },
  { Icon: BarChart2,value: "50+",  label: "Projects Delivered"  },
  { Icon: Building2,value: "8+",   label: "Companies / Clients" },
  { Icon: Code2,    value: "20+",  label: "Technologies"        },
  { Icon: Heart,    value: "100%", label: "Commitment"          },
];

// ── Highlights ─────────────────────────────────────────────────────────────
const HIGHLIGHTS = [
  { Icon: BarChart2, value: "50+",   label: "Projects Delivered",   color: "#2563eb" },
  { Icon: Star,      value: "6+",    label: "Years of Experience",  color: "#f59e0b" },
  { Icon: Building2, value: "8+",    label: "Companies / Clients",  color: "#10b981" },
  { Icon: Heart,     value: "100%",  label: "Client Satisfaction",  color: "#ef4444" },
];

const ACHIEVEMENTS = [
  "Led engineering team at Matchez",
  "Built 50+ scalable applications",
  "Integrated AI/LLM in real products",
  "Worked with global clients (UK, India)",
  "Delivered SaaS platforms with thousands of users",
  "Experience in web, mobile and cloud",
];

const LEADERSHIP = [
  { label: "Team Leadership",            color: "#f59e0b" },
  { label: "Client Communication",       color: "#6366f1" },
  { label: "Agile Development",          color: "#10b981" },
  { label: "Product Strategy",           color: "#2563eb" },
  { label: "Code Review & Mentoring",    color: "#ec4899" },
  { label: "Cross-functional Collaboration", color: "#f97316" },
];

const OPEN_TO = [
  { label: "Full-time Opportunities", color: "#10b981" },
  { label: "Remote Roles",            color: "#6366f1" },
  { label: "AI/LLM & SaaS Projects", color: "#2563eb" },
  { label: "CTO / Technical Leadership", color: "#f59e0b" },
];

// ── Employment type badge colors ───────────────────────────────────────────
function typeBadge(duration: string) {
  if (duration.includes("Present")) return { label: "Full-time", color: "#10b981" };
  if (duration.includes("Part-time")) return { label: "Part-time", color: "#f97316" };
  return { label: "Full-time", color: "#2563eb" };
}

export default function ExperiencePage() {
  const [filter, setFilter] = useState<"all" | "current" | "past">("all");

  const displayed = info.experience.filter((exp) => {
    if (filter === "all") return true;
    const isCurrent = exp.duration.toLowerCase().includes("present");
    return filter === "current" ? isCurrent : !isCurrent;
  });

  return (
    <main className="min-h-screen bg-background pt-14 sm:pt-16 md:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="pt-10 pb-0">
          <div className="relative rounded-3xl overflow-hidden min-h-[340px]">
            {/* Mountain background */}
            <Image
              src="/images/experience-hero-bg.png"
              alt="Journey background"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-12 items-center min-h-[340px]">

              {/* Left */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                                bg-white/15 border border-white/25 text-white text-xs font-semibold backdrop-blur-sm">
                  <Briefcase className="h-3.5 w-3.5" />
                  Professional Experience
                </div>

                <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight">
                  My Professional<br />
                  <span className="text-blue-400">Journey</span>
                </h1>

                <p className="text-sm text-white/80 leading-relaxed max-w-md">
                  A journey of continuous learning, building scalable solutions, and
                  leading engineering teams to create real-world impact.
                </p>

                {/* Info pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { Icon: MapPin,  label: "Tanzania (Remote)"     },
                    { Icon: Monitor, label: "Open to Opportunities"  },
                    { Icon: Globe,   label: "Available Worldwide"    },
                  ].map(({ Icon, label }) => (
                    <span key={label}
                          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
                                     bg-white/10 border border-white/20 text-white/90 backdrop-blur-sm">
                      <Icon className="h-3 w-3" /> {label}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-3 pt-1">
                  <a href="/Eckysaroyd-Nyato-CV.pdf" download
                     className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white
                                font-semibold rounded-xl text-sm shadow-lg hover:bg-primary/90
                                hover:-translate-y-0.5 transition-all duration-200">
                    <Download className="h-4 w-4" /> Download CV
                  </a>
                  <Link href="/#contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/30
                                   text-white font-semibold rounded-xl text-sm backdrop-blur-sm
                                   hover:bg-white/20 transition-all duration-200">
                    Let&apos;s Connect
                  </Link>
                </div>
              </div>

              {/* Right — milestone cards */}
              <div className="hidden lg:flex flex-col items-end gap-3 pr-2">
                {MILESTONES.map(({ year, label, icon: Icon, color }, i) => (
                  <div key={year}
                       className={`flex items-center gap-3 bg-white/90 dark:bg-card/90 backdrop-blur-sm
                                   rounded-xl px-4 py-2.5 shadow-lg border border-white/30
                                   ${i % 2 === 0 ? "mr-0" : "mr-10"}`}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: hexRgba(color, 0.15), border: `1px solid ${hexRgba(color, 0.3)}` }}>
                      <Icon className="h-4 w-4" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{year}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {STATS.map(({ Icon, value, label }) => (
              <div key={label}
                   className="flex flex-col sm:flex-row items-center justify-center gap-2 py-5 px-4
                              bg-card hover:bg-primary/5 transition-colors text-center sm:text-left">
                <Icon className="h-5 w-5 text-primary/60 flex-shrink-0" />
                <div>
                  <p className="text-xl font-black text-primary leading-none">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience + Sidebar ───────────────────────────────────────── */}
        <section className="pt-14 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Timeline — 2 cols */}
            <div className="lg:col-span-2">
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" /> Career Timeline
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground">Professional Experience</h2>
                  <p className="text-sm text-muted-foreground max-w-lg">
                    A detailed look at my professional journey, key responsibilities, and achievements.
                  </p>
                </div>
                {/* Filter dropdown */}
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as typeof filter)}
                  className="text-sm border border-border rounded-xl px-3 py-2 bg-card text-foreground
                             focus:outline-none focus:border-primary/50 flex-shrink-0"
                >
                  <option value="all">All Experience</option>
                  <option value="current">Current</option>
                  <option value="past">Past</option>
                </select>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />

                <div className="space-y-5">
                  {displayed.map((exp, i) => {
                    const isCurrent = exp.duration.toLowerCase().includes("present");
                    const [company, location] = exp.company.split("|").map((s) => s.trim());
                    const badge = typeBadge(exp.duration);
                    const startYear = exp.duration.split(/[–-]/)[0].trim().split(" ").pop();

                    return (
                      <div key={exp.company + i} className="relative pl-16 group">
                        {/* Year label */}
                        <div className="absolute left-0 top-4 text-right" style={{ width: "38px" }}>
                          <p className="text-xs font-bold text-primary leading-none">{startYear}</p>
                          {isCurrent && <p className="text-[10px] text-muted-foreground mt-0.5">Present</p>}
                        </div>

                        {/* Timeline dot */}
                        <div className={`absolute top-3.5 flex items-center justify-center
                                         w-10 h-10 rounded-full border-2 bg-background z-10
                                         transition-all duration-300 ${
                          isCurrent
                            ? "border-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                            : "border-border group-hover:border-primary/40"
                        }`} style={{ left: "28px" }}>
                          {exp.image ? (
                            <div className="relative w-6 h-6 rounded-full overflow-hidden">
                              <Image src={exp.image} alt={company} fill className="object-contain" />
                            </div>
                          ) : (
                            <Building2 className={`h-4 w-4 ${isCurrent ? "text-primary" : "text-muted-foreground"}`} />
                          )}
                        </div>

                        {/* Card */}
                        <div className={`rounded-2xl border p-5 transition-all duration-300
                                         group-hover:shadow-lg ${
                          isCurrent
                            ? "border-primary/30 bg-gradient-to-br from-primary/5 to-card group-hover:border-primary/50"
                            : "border-border bg-card group-hover:border-primary/25"
                        }`}>
                          {/* Top row */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-bold text-sm text-foreground">{exp.position}</h3>
                                {isCurrent && (
                                  <span className="inline-flex items-center gap-1 text-xs font-medium
                                                   px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25">
                                    <span className="relative flex h-1.5 w-1.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                                    </span>
                                    Current
                                  </span>
                                )}
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full border"
                                      style={{ color: badge.color, backgroundColor: hexRgba(badge.color, 0.1), borderColor: hexRgba(badge.color, 0.3) }}>
                                  {badge.label}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <p className="text-xs font-semibold text-muted-foreground">{company}</p>
                                {location && (
                                  <>
                                    <span className="text-border text-xs">·</span>
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground/60">
                                      <MapPin className="h-2.5 w-2.5" />{location}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1
                                             rounded-lg border border-border whitespace-nowrap flex-shrink-0">
                              {exp.duration}
                            </span>
                          </div>

                          {/* Bullets */}
                          <ul className="space-y-1.5 border-t border-border/50 pt-3">
                            {exp.descriptions.map((d) => (
                              <li key={d} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                                <span className="text-primary mt-0.5 flex-shrink-0">›</span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar — 1 col */}
            <div className="space-y-5 lg:sticky lg:top-20">

              {/* Professional Highlights */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <h3 className="font-bold text-sm text-foreground">Professional Highlights</h3>
                </div>
                <div className="space-y-3">
                  {HIGHLIGHTS.map(({ Icon, value, label, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                           style={{ backgroundColor: hexRgba(color, 0.12), border: `1px solid ${hexRgba(color, 0.25)}` }}>
                        <Icon className="h-4 w-4" style={{ color }} />
                      </div>
                      <div>
                        <p className="text-base font-black text-foreground leading-none">{value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Achievements */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <h3 className="font-bold text-sm text-foreground">Key Achievements</h3>
                </div>
                <ul className="space-y-2">
                  {ACHIEVEMENTS.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Leadership & Collaboration */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">Leadership &amp; Collaboration</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {LEADERSHIP.map(({ label, color }) => (
                    <span key={label}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg border"
                          style={{ backgroundColor: hexRgba(color, 0.1), borderColor: hexRgba(color, 0.25), color }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Currently Open To */}
              <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">Currently Open To</h3>
                </div>
                <ul className="space-y-2">
                  {OPEN_TO.map(({ label, color }) => (
                    <li key={label} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/#contact"
                      className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5
                                 bg-primary text-white text-sm font-semibold rounded-xl
                                 hover:bg-primary/90 transition-colors duration-200">
                  <Mail className="h-3.5 w-3.5" /> Let&apos;s Discuss <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA with wave background ───────────────────────────────────── */}
        <section className="pt-14 pb-16">
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src="/images/experience-cta-bg.png"
              alt="CTA background"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-white/60 dark:bg-black/50 backdrop-blur-[2px]" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between
                            gap-6 p-10 sm:p-14">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5" /> Let&apos;s Build Together
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                  Interested in <span className="text-primary">Working Together?</span>
                </h2>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  I&apos;m always open to discussing new opportunities, exciting projects,
                  or ways to collaborate. Let&apos;s create something amazing together.
                </p>
              </div>
              <Link href="/#contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white
                               font-semibold rounded-xl shadow-lg shadow-primary/30 text-sm flex-shrink-0
                               hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
                <Mail className="h-4 w-4" /> Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 border-t border-border pt-8 pb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs font-black">EN</span>
                </div>
                <span className="font-bold text-foreground text-sm">{info.main.name}</span>
              </Link>
              <div className="flex items-center gap-5">
                {[
                  { label: "Home",     href: "/"          },
                  { label: "About",    href: "/about"     },
                  { label: "Projects", href: "/projects"  },
                  { label: "Skills",   href: "/#skills"   },
                  { label: "Contact",  href: "/#contact"  },
                ].map(({ label, href }) => (
                  <Link key={label} href={href}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Built with <span className="text-primary">Next.js</span>
              </p>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
