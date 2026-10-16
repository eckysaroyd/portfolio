"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import info from "@/data/user_info";
import { hexRgba } from "@/lib/utils";
import Footer from "@/components/sections/Footer";
import {
  SiNextdotjs, SiReact, SiVuedotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiBootstrap, SiVite,
  SiNodedotjs, SiExpress, SiLaravel, SiPhp, SiCodeigniter,
  SiPostgresql, SiSupabase, SiMysql, SiMongodb,
  SiDocker, SiGithubactions, SiGitlab, SiLinux,
  SiFigma, SiAdobephotoshop, SiOpenai,
} from "react-icons/si";
import {
  Bot, BrainCircuit, Code2, Cpu, Zap, Workflow, Shield,
  Server, GitBranch, Globe, Layers, Cloud, Palette,
  FlaskConical, Database, Play, Gamepad2, Search,
  Monitor, ArrowRight, Sparkles, TrendingUp, BookOpen,
  CheckCircle2,
} from "lucide-react";

type AnyIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const SKILL_MAP: Record<string, { Icon: AnyIcon; color: string }> = {
  "LLM Integrations":    { Icon: SiOpenai as AnyIcon,        color: "#10a37f" },
  "AI Automation":       { Icon: Bot,                         color: "#00d4ff" },
  "RAG Pipelines":       { Icon: BrainCircuit,                color: "#a855f7" },
  "Prompt Engineering":  { Icon: Code2,                       color: "#f59e0b" },
  "LLM Fine-tuning":     { Icon: Cpu,                         color: "#ef4444" },
  "AI Agent Development":{ Icon: Zap,                         color: "#f97316" },
  "Playwright":          { Icon: Play,                        color: "#45ba4b" },
  "Workflow Automation": { Icon: Workflow,                    color: "#8b5cf6" },
  "n8n":                 { Icon: Workflow,                    color: "#ea4b71" },
  "Supabase Vector":     { Icon: SiSupabase as AnyIcon,       color: "#3ecf8e" },
  "Next.js":             { Icon: SiNextdotjs as AnyIcon,      color: "#94a3b8" },
  "React.js":            { Icon: SiReact as AnyIcon,          color: "#61dafb" },
  "Vue.js":              { Icon: SiVuedotjs as AnyIcon,       color: "#42b883" },
  "TypeScript":          { Icon: SiTypescript as AnyIcon,     color: "#3178c6" },
  "JavaScript":          { Icon: SiJavascript as AnyIcon,     color: "#f7df1e" },
  "Tailwind CSS":        { Icon: SiTailwindcss as AnyIcon,    color: "#06b6d4" },
  "Bootstrap":           { Icon: SiBootstrap as AnyIcon,      color: "#7952b3" },
  "Phaser 3":            { Icon: Gamepad2,                    color: "#4a90d9" },
  "Vite":                { Icon: SiVite as AnyIcon,           color: "#646cff" },
  "Node.js":             { Icon: SiNodedotjs as AnyIcon,      color: "#339933" },
  "Express.js":          { Icon: SiExpress as AnyIcon,        color: "#94a3b8" },
  "Laravel":             { Icon: SiLaravel as AnyIcon,        color: "#ff2d20" },
  "PHP":                 { Icon: SiPhp as AnyIcon,            color: "#777bb4" },
  "REST APIs":           { Icon: Globe,                       color: "#22d3ee" },
  "Microservices":       { Icon: Layers,                      color: "#818cf8" },
  "CodeIgniter":         { Icon: SiCodeigniter as AnyIcon,    color: "#ef4444" },
  "PostgreSQL":          { Icon: SiPostgresql as AnyIcon,     color: "#4169e1" },
  "Supabase":            { Icon: SiSupabase as AnyIcon,       color: "#3ecf8e" },
  "MySQL":               { Icon: SiMysql as AnyIcon,          color: "#4479a1" },
  "MongoDB":             { Icon: SiMongodb as AnyIcon,        color: "#47a248" },
  "AWS":                 { Icon: Cloud,                       color: "#ff9900" },
  "Docker":              { Icon: SiDocker as AnyIcon,         color: "#2496ed" },
  "CI/CD":               { Icon: GitBranch,                   color: "#f1502f" },
  "GitHub Actions":      { Icon: SiGithubactions as AnyIcon,  color: "#2088ff" },
  "GitLab":              { Icon: SiGitlab as AnyIcon,         color: "#fc6d26" },
  "Coolify":             { Icon: Server,                      color: "#6c47ff" },
  "Linux":               { Icon: SiLinux as AnyIcon,          color: "#fcc624" },
  "Figma":               { Icon: SiFigma as AnyIcon,          color: "#f24e1e" },
  "Photoshop":           { Icon: SiAdobephotoshop as AnyIcon, color: "#31a8ff" },
  "CorelDRAW":           { Icon: Palette,                     color: "#00a550" },
  "API Testing":         { Icon: FlaskConical,                color: "#f59e0b" },
  "JWT Security":        { Icon: Shield,                      color: "#10b981" },
};

const CATEGORIES = [
  {
    id: "ai",
    label: "AI & LLM Integration",
    Icon: Bot,
    color: "#00d4ff",
    accentClass: "text-cyan-400",
    iconBgClass: "bg-cyan-500/10",
    glowColor: "rgba(0,212,255,0.12)",
    skills: info.skills.ai_automation,
  },
  {
    id: "frontend",
    label: "Frontend Development",
    Icon: Monitor,
    color: "#8b5cf6",
    accentClass: "text-violet-500",
    iconBgClass: "bg-violet-500/10",
    glowColor: "rgba(139,92,246,0.12)",
    skills: info.skills.frontend,
  },
  {
    id: "backend",
    label: "Backend Development",
    Icon: Server,
    color: "#10b981",
    accentClass: "text-emerald-500",
    iconBgClass: "bg-emerald-500/10",
    glowColor: "rgba(16,185,129,0.12)",
    skills: info.skills.backend,
  },
  {
    id: "databases",
    label: "Database & Cloud",
    Icon: Database,
    color: "#f97316",
    accentClass: "text-orange-500",
    iconBgClass: "bg-orange-500/10",
    glowColor: "rgba(249,115,22,0.12)",
    skills: info.skills.databases,
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    Icon: Cloud,
    color: "#3b82f6",
    accentClass: "text-blue-500",
    iconBgClass: "bg-blue-500/10",
    glowColor: "rgba(59,130,246,0.12)",
    skills: info.skills.devops,
  },
  {
    id: "testing",
    label: "Testing & Security",
    Icon: Shield,
    color: "#f59e0b",
    accentClass: "text-amber-500",
    iconBgClass: "bg-amber-500/10",
    glowColor: "rgba(245,158,11,0.12)",
    skills: info.skills.testing,
  },
  {
    id: "design",
    label: "Design & UI/UX",
    Icon: Palette,
    color: "#ec4899",
    accentClass: "text-pink-500",
    iconBgClass: "bg-pink-500/10",
    glowColor: "rgba(236,72,153,0.12)",
    skills: info.skills.design,
  },
];

const OTHER_SKILLS = [
  "Agile / Scrum",
  "Project Management",
  "Technical Architecture",
  "Code Review & Mentoring",
  "API Design & Documentation",
  "Performance Optimization",
  "SEO Optimization",
  "Responsive Web Design",
];

const LEARNING = [
  "Rust Programming",
  "WebAssembly (WASM)",
  "Kubernetes Orchestration",
  "Advanced AI Agent Architectures",
  "Blockchain & Smart Contracts",
  "React Native / Mobile Dev",
];

const STATS = [
  { value: "50+",  label: "Technologies" },
  { value: "6+",   label: "Years Experience" },
  { value: "8",    label: "Skill Categories" },
  { value: "20+",  label: "Projects with AI" },
];

function SkillChip({ skill }: { skill: string }) {
  const entry = SKILL_MAP[skill];
  const color = entry?.color ?? "#64748b";
  const Icon  = entry?.Icon  ?? Code2;
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border cursor-default
                 transition-all duration-200 hover:brightness-125 hover:scale-105 select-none"
      style={{ backgroundColor: hexRgba(color, 0.08), borderColor: hexRgba(color, 0.25) }}
    >
      <Icon className="h-3 w-3 flex-shrink-0" style={{ color }} />
      <span className="text-xs font-medium whitespace-nowrap" style={{ color: hexRgba(color, 0.9) }}>
        {skill}
      </span>
    </div>
  );
}

export default function SkillsPage() {
  const [query, setQuery] = useState("");

  const allSkills = useMemo(() => {
    const set = new Set<string>();
    CATEGORIES.forEach((c) => c.skills.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  const totalSkills = allSkills.length;

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return CATEGORIES;
    const q = query.toLowerCase();
    return CATEGORIES.map((cat) => ({
      ...cat,
      skills: cat.skills.filter((s) => s.toLowerCase().includes(q)),
    })).filter((cat) => cat.skills.length > 0);
  }, [query]);

  return (
    <main className="min-h-screen bg-background pt-16">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[340px] sm:h-[380px]">
          <Image
            src="/images/skills-hero-bg.png"
            alt="Skills hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/60 via-sky-800/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />

          <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <p className="text-xs font-semibold text-sky-300 tracking-[0.2em] uppercase mb-3">
              MY SKILLS
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight max-w-2xl">
              Tools, Technologies
              <span className="block text-sky-300">and Expertise</span>
            </h1>
            <p className="mt-4 text-base text-sky-100/80 max-w-xl leading-relaxed">
              A comprehensive overview of the technologies, tools and skills I use to design,
              develop and deliver high-quality software solutions.
            </p>

            {/* Breadcrumb */}
            <div className="mt-6 flex items-center gap-2 text-sm text-sky-200/70">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Skills</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border shadow-lg">
            {STATS.map(({ value, label }) => (
              <div key={label}
                   className="flex flex-col items-center justify-center py-5 px-4 bg-card
                              hover:bg-primary/5 transition-colors duration-200 text-center">
                <span className="text-3xl font-black text-primary">{value}</span>
                <span className="text-xs text-muted-foreground mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Technologies ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-20">

        {/* Section header + search */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
              TECHNICAL SKILLS
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Core Technologies
            </h2>
            <p className="text-sm text-muted-foreground">
              {totalSkills} technologies powering modern web applications.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search skills..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm
                         text-foreground placeholder:text-muted-foreground outline-none
                         focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        {/* AI Hero card */}
        {(!query || filteredCategories.find((c) => c.id === "ai")) && (
          <div className="relative mb-5 rounded-2xl border border-primary/30 overflow-hidden
                          shadow-[0_0_50px_hsl(var(--primary)/0.10)]">
            <div aria-hidden className="absolute inset-0 pointer-events-none"
                 style={{
                   backgroundImage: "radial-gradient(circle at 1.5px 1.5px, hsl(var(--primary)/0.10) 1px, transparent 0)",
                   backgroundSize: "28px 28px",
                 }} />
            <div aria-hidden className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

            <div className="relative p-6 sm:p-7 bg-gradient-to-br from-primary/8 via-primary/3 to-transparent">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25
                                  flex items-center justify-center flex-shrink-0">
                    <Bot className="text-primary" style={{ width: 20, height: 20 }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                      </span>
                      <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
                        AI &amp; LLM Integration
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Primary specialisation · Production-grade</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20
                                 px-3 py-1 rounded-full flex-shrink-0">
                  Core Focus
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(query
                  ? filteredCategories.find((c) => c.id === "ai")?.skills ?? []
                  : info.skills.ai_automation
                ).map((skill) => (
                  <SkillChip key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category grid */}
        {filteredCategories.filter((c) => c.id !== "ai").length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {filteredCategories
              .filter((c) => c.id !== "ai")
              .map((cat) => (
                <div
                  key={cat.id}
                  className="group relative rounded-2xl border border-border bg-card p-5 space-y-4
                             transition-all duration-300 hover:-translate-y-0.5"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${cat.glowColor}`;
                    (e.currentTarget as HTMLElement).style.borderColor = hexRgba(cat.color, 0.35);
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${cat.iconBgClass} flex items-center justify-center flex-shrink-0`}>
                      <cat.Icon className={`h-4 w-4 ${cat.accentClass}`} />
                    </div>
                    <span className={`text-sm font-bold ${cat.accentClass}`}>{cat.label}</span>
                    <span className="ml-auto text-xs font-mono text-muted-foreground bg-muted
                                     border border-border px-2 py-0.5 rounded-full">
                      {cat.skills.length}
                    </span>
                  </div>

                  <div className="h-px" style={{ background: `linear-gradient(to right, ${hexRgba(cat.color, 0.3)}, transparent)` }} />

                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <SkillChip key={skill} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* No results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No skills match &ldquo;{query}&rdquo;</p>
            <p className="text-sm mt-1">Try a different keyword</p>
          </div>
        )}

        {/* Other Skills + Learning & Growth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

          {/* Other Skills */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-500/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 text-slate-400" />
              </div>
              <span className="text-sm font-bold text-foreground">Other Skills</span>
            </div>
            <div className="h-px bg-gradient-to-r from-border to-transparent" />
            <ul className="space-y-2">
              {OTHER_SKILLS.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Learning & Growth */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-4 w-4 text-violet-400" />
              </div>
              <span className="text-sm font-bold text-foreground">Learning &amp; Growth</span>
              <span className="ml-auto text-xs font-medium text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                Continuous
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-border to-transparent" />
            <ul className="space-y-2">
              {LEARNING.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5 text-violet-400 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA card */}
        <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-sky-500 to-blue-600" />
          <div aria-hidden className="absolute inset-0 opacity-20"
               style={{
                 backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)",
                 backgroundSize: "24px 24px",
               }} />
          <div className="relative px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                <Zap className="h-5 w-5 text-yellow-300" />
                <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                  Let&apos;s Build Something Great
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Ready to turn ideas into
                <span className="block">real products?</span>
              </h3>
              <p className="mt-2 text-sm text-white/70 max-w-md">
                I bring the full stack — from AI pipelines to polished UIs — to every project I take on.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary
                           font-bold rounded-xl hover:bg-white/90 transition-all duration-200 text-sm shadow-lg"
              >
                Get In Touch <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white
                           border border-white/30 font-semibold rounded-xl hover:bg-white/20
                           transition-all duration-200 text-sm"
              >
                View My Work
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      <Footer />
    </main>
  );
}
