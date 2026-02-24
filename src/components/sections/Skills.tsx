"use client";

import info from "@/data/user_info";
import { hexRgba } from "@/lib/utils";
import {
  SiNextdotjs, SiReact, SiVuedotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiLaravel, SiPhp, SiCodeigniter,
  SiPostgresql, SiSupabase, SiMysql, SiMongodb,
  SiDocker, SiGithubactions, SiGitlab, SiLinux,
  SiFigma, SiAdobephotoshop, SiOpenai,
} from "react-icons/si";
import {
  Bot, BrainCircuit, Code2, Cpu, Zap, Workflow, Shield,
  Server, GitBranch, Globe, Layers, Cloud, Palette,
  FlaskConical, Monitor, Database, Play, Sparkles,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type AnyIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
type SkillKey = "frontend" | "backend" | "databases" | "devops" | "design" | "testing";

// ── Skill → brand icon + color ─────────────────────────────────────────────
const SKILL_MAP: Record<string, { Icon: AnyIcon; color: string }> = {
  "LLM Integrations":   { Icon: SiOpenai as AnyIcon,        color: "#10a37f" },
  "AI Automation":      { Icon: Bot,                         color: "#00d4ff" },
  "RAG Pipelines":      { Icon: BrainCircuit,                color: "#a855f7" },
  "Prompt Engineering": { Icon: Code2,                       color: "#f59e0b" },
  "LLM Fine-tuning":    { Icon: Cpu,                         color: "#ef4444" },
  "AI Agent Development":{ Icon: Zap,                        color: "#f97316" },
  "Playwright":         { Icon: Play,                        color: "#45ba4b" },
  "Workflow Automation":{ Icon: Workflow,                    color: "#8b5cf6" },
  "n8n":                { Icon: Workflow,                    color: "#ea4b71" },
  "Supabase Vector":    { Icon: SiSupabase as AnyIcon,       color: "#3ecf8e" },
  "Next.js":            { Icon: SiNextdotjs as AnyIcon,      color: "#94a3b8" },
  "React.js":           { Icon: SiReact as AnyIcon,          color: "#61dafb" },
  "Vue.js":             { Icon: SiVuedotjs as AnyIcon,       color: "#42b883" },
  "TypeScript":         { Icon: SiTypescript as AnyIcon,     color: "#3178c6" },
  "JavaScript":         { Icon: SiJavascript as AnyIcon,     color: "#f7df1e" },
  "Tailwind CSS":       { Icon: SiTailwindcss as AnyIcon,    color: "#06b6d4" },
  "Bootstrap":          { Icon: SiBootstrap as AnyIcon,      color: "#7952b3" },
  "Node.js":            { Icon: SiNodedotjs as AnyIcon,      color: "#339933" },
  "Express.js":         { Icon: SiExpress as AnyIcon,        color: "#94a3b8" },
  "Laravel":            { Icon: SiLaravel as AnyIcon,        color: "#ff2d20" },
  "PHP":                { Icon: SiPhp as AnyIcon,            color: "#777bb4" },
  "REST APIs":          { Icon: Globe,                       color: "#22d3ee" },
  "Microservices":      { Icon: Layers,                      color: "#818cf8" },
  "CodeIgniter":        { Icon: SiCodeigniter as AnyIcon,    color: "#ef4444" },
  "PostgreSQL":         { Icon: SiPostgresql as AnyIcon,     color: "#4169e1" },
  "Supabase":           { Icon: SiSupabase as AnyIcon,       color: "#3ecf8e" },
  "MySQL":              { Icon: SiMysql as AnyIcon,          color: "#4479a1" },
  "MongoDB":            { Icon: SiMongodb as AnyIcon,        color: "#47a248" },
  "AWS":                { Icon: Cloud,                       color: "#ff9900" },
  "Docker":             { Icon: SiDocker as AnyIcon,         color: "#2496ed" },
  "CI/CD":              { Icon: GitBranch,                   color: "#f1502f" },
  "GitHub Actions":     { Icon: SiGithubactions as AnyIcon,  color: "#2088ff" },
  "GitLab":             { Icon: SiGitlab as AnyIcon,         color: "#fc6d26" },
  "Coolify":            { Icon: Server,                      color: "#6c47ff" },
  "Linux":              { Icon: SiLinux as AnyIcon,          color: "#fcc624" },
  "Figma":              { Icon: SiFigma as AnyIcon,          color: "#f24e1e" },
  "Photoshop":          { Icon: SiAdobephotoshop as AnyIcon, color: "#31a8ff" },
  "CorelDRAW":          { Icon: Palette,                     color: "#00a550" },
  "API Testing":        { Icon: FlaskConical,                color: "#f59e0b" },
  "JWT Security":       { Icon: Shield,                      color: "#10b981" },
};

// ── Category config — static Tailwind strings only (no purge issues) ───────
const CATEGORIES: {
  key: SkillKey;
  label: string;
  Icon: AnyIcon;
  color: string;
  labelClass: string;
  iconBgClass: string;
  borderTopClass: string;
  fromClass: string;
  glowColor: string;
}[] = [
  {
    key: "frontend",   label: "Frontend",          Icon: Monitor,
    color: "#8b5cf6",  labelClass: "text-violet-400", iconBgClass: "bg-violet-500/10",
    borderTopClass: "border-t-violet-500", fromClass: "from-violet-500/5",
    glowColor: "rgba(139,92,246,0.12)",
  },
  {
    key: "backend",    label: "Backend",            Icon: Server,
    color: "#10b981",  labelClass: "text-emerald-400", iconBgClass: "bg-emerald-500/10",
    borderTopClass: "border-t-emerald-500", fromClass: "from-emerald-500/5",
    glowColor: "rgba(16,185,129,0.12)",
  },
  {
    key: "databases",  label: "Databases",          Icon: Database,
    color: "#f97316",  labelClass: "text-orange-400", iconBgClass: "bg-orange-500/10",
    borderTopClass: "border-t-orange-500", fromClass: "from-orange-500/5",
    glowColor: "rgba(249,115,22,0.12)",
  },
  {
    key: "devops",     label: "DevOps & Cloud",     Icon: Cloud,
    color: "#3b82f6",  labelClass: "text-blue-400", iconBgClass: "bg-blue-500/10",
    borderTopClass: "border-t-blue-500", fromClass: "from-blue-500/5",
    glowColor: "rgba(59,130,246,0.12)",
  },
  {
    key: "design",     label: "Design",             Icon: Palette,
    color: "#ec4899",  labelClass: "text-pink-400", iconBgClass: "bg-pink-500/10",
    borderTopClass: "border-t-pink-500", fromClass: "from-pink-500/5",
    glowColor: "rgba(236,72,153,0.12)",
  },
  {
    key: "testing",    label: "Testing & Security", Icon: Shield,
    color: "#f59e0b",  labelClass: "text-amber-400", iconBgClass: "bg-amber-500/10",
    borderTopClass: "border-t-amber-500", fromClass: "from-amber-500/5",
    glowColor: "rgba(245,158,11,0.12)",
  },
];

// ── SkillChip ──────────────────────────────────────────────────────────────
function SkillChip({ skill }: { skill: string }) {
  const entry = SKILL_MAP[skill];
  const color = entry?.color ?? "#64748b";
  const Icon  = entry?.Icon  ?? Code2;

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-default
                 transition-all duration-200 hover:brightness-125 hover:scale-105
                 hover:-translate-y-px select-none"
      style={{ backgroundColor: hexRgba(color, 0.08), borderColor: hexRgba(color, 0.28) }}
    >
      <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color }} />
      <span className="text-xs font-medium whitespace-nowrap" style={{ color: hexRgba(color, 0.9) }}>
        {skill}
      </span>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function Skills() {
  const totalSkills =
    info.skills.ai_automation.length +
    CATEGORIES.reduce((sum, cat) => sum + (info.skills[cat.key] as string[]).length, 0);

  return (
    <section id="skills" className="py-20 sm:py-24">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="mb-10 space-y-4 anim-fade-up">
        <p className="text-sm font-mono text-primary tracking-widest uppercase">Expertise</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Technical Skills</h2>
            <p className="text-muted-foreground max-w-xl">
              Full-spectrum engineering — from LLM integrations and AI automation to
              cloud-native deployments and production-grade frontend.
            </p>
          </div>
          {/* Total count pill */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono
                             bg-primary/10 text-primary border border-primary/20
                             px-3 py-1.5 rounded-full">
              <Sparkles className="h-3 w-3" />
              {totalSkills}+ technologies
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono
                             bg-muted text-muted-foreground border border-border
                             px-3 py-1.5 rounded-full">
              7 domains
            </span>
          </div>
        </div>
      </div>

      {/* ── AI & Automation — hero card ─────────────────────────────────── */}
      <div
        className="relative mb-5 rounded-2xl border border-primary/25 overflow-hidden
                   shadow-[0_0_60px_hsl(var(--primary)/0.1)] anim-fade-up"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Decorative dot-grid background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, hsl(var(--primary)/0.12) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Ambient glow blobs */}
        <div aria-hidden="true"
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div aria-hidden="true"
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

        <div className="relative p-6 sm:p-7 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent">
          {/* Card header */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              {/* Icon bubble */}
              <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25
                              flex items-center justify-center flex-shrink-0">
                <Bot className="h-4.5 w-4.5 text-primary" style={{ width: 18, height: 18 }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {/* Pulsing live dot */}
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider font-mono">
                    AI &amp; Automation
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Primary specialisation · Production-grade</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-mono text-primary/80 bg-primary/10
                               border border-primary/20 px-2.5 py-1 rounded-full">
                Primary Focus
              </span>
              <span className="text-xs font-mono text-muted-foreground bg-muted
                               border border-border px-2.5 py-1 rounded-full">
                {info.skills.ai_automation.length} skills
              </span>
            </div>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {info.skills.ai_automation.map((skill) => (
              <SkillChip key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Category grid ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat, i) => {
          const skills = info.skills[cat.key] as string[];
          return (
            <div
              key={cat.key}
              className={`group relative rounded-2xl border border-border border-t-2
                          ${cat.borderTopClass} bg-gradient-to-b ${cat.fromClass}
                          to-transparent p-5 space-y-4 transition-all duration-300
                          hover:-translate-y-0.5 anim-fade-up`}
              style={{
                animationDelay: `${0.15 + i * 0.07}s`,
                ["--glow" as string]: cat.glowColor,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${cat.glowColor}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3">
                {/* Icon bubble */}
                <div className={`w-8 h-8 rounded-lg ${cat.iconBgClass} flex items-center
                                 justify-center flex-shrink-0 transition-transform duration-300
                                 group-hover:scale-110`}>
                  <cat.Icon className={`h-4 w-4 ${cat.labelClass}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-bold uppercase tracking-wider font-mono ${cat.labelClass}`}>
                    {cat.label}
                  </span>
                </div>

                {/* Count badge */}
                <span className={`text-xs font-mono px-2 py-0.5 rounded-full border
                                  ${cat.labelClass} opacity-70`}
                  style={{
                    backgroundColor: hexRgba(cat.color, 0.08),
                    borderColor: hexRgba(cat.color, 0.2),
                  }}
                >
                  {skills.length}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: `linear-gradient(to right, ${hexRgba(cat.color, 0.25)}, transparent)` }} />

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillChip key={skill} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
