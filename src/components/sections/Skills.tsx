"use client";

import info from "@/data/user_info";
import { hexRgba } from "@/lib/utils";
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
  FlaskConical, Monitor, Database, Play, Gamepad2,
} from "lucide-react";

type AnyIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
type SkillKey = "frontend" | "backend" | "databases" | "devops" | "design" | "testing";

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

const CATEGORIES: {
  key: SkillKey;
  label: string;
  Icon: AnyIcon;
  color: string;
  accentClass: string;
  iconBgClass: string;
  glowColor: string;
}[] = [
  { key: "frontend",  label: "Frontend",          Icon: Monitor,   color: "#8b5cf6", accentClass: "text-violet-500",  iconBgClass: "bg-violet-500/10",  glowColor: "rgba(139,92,246,0.12)" },
  { key: "backend",   label: "Backend",            Icon: Server,    color: "#10b981", accentClass: "text-emerald-500", iconBgClass: "bg-emerald-500/10", glowColor: "rgba(16,185,129,0.12)" },
  { key: "databases", label: "Databases",          Icon: Database,  color: "#f97316", accentClass: "text-orange-500",  iconBgClass: "bg-orange-500/10",  glowColor: "rgba(249,115,22,0.12)"  },
  { key: "devops",    label: "DevOps & Cloud",     Icon: Cloud,     color: "#3b82f6", accentClass: "text-blue-500",    iconBgClass: "bg-blue-500/10",    glowColor: "rgba(59,130,246,0.12)"  },
  { key: "design",    label: "Design Tools",       Icon: Palette,   color: "#ec4899", accentClass: "text-pink-500",    iconBgClass: "bg-pink-500/10",    glowColor: "rgba(236,72,153,0.12)"  },
  { key: "testing",   label: "Testing & Security", Icon: Shield,    color: "#f59e0b", accentClass: "text-amber-500",   iconBgClass: "bg-amber-500/10",   glowColor: "rgba(245,158,11,0.12)"  },
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

export default function Skills() {
  return (
    <section id="skills" className="pt-20 pb-20">

      {/* Header */}
      <div className="mb-10 space-y-3 anim-fade-up">
        <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
          Technical Skills
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground">
          Technologies &amp; Tools I Work With
        </h2>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          Full-spectrum engineering — from LLM integrations and AI automation to
          cloud-native deployments and production-grade frontend.
        </p>
      </div>

      {/* AI hero card */}
      <div className="relative mb-5 rounded-2xl border border-primary/30 overflow-hidden
                      shadow-[0_0_50px_hsl(var(--primary)/0.10)] anim-fade-up"
           style={{ animationDelay: "0.1s" }}>
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
                    AI &amp; Automation
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
            {info.skills.ai_automation.map((skill) => (
              <SkillChip key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat, i) => {
          const skills = info.skills[cat.key] as string[];
          return (
            <div
              key={cat.key}
              className="group relative rounded-2xl border border-border bg-card p-5 space-y-4
                         transition-all duration-300 hover:-translate-y-0.5 anim-fade-up"
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${cat.glowColor}`;
                (e.currentTarget as HTMLElement).style.borderColor = hexRgba(cat.color, 0.35);
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.borderColor = "";
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${cat.iconBgClass} flex items-center justify-center flex-shrink-0`}>
                  <cat.Icon className={`h-4 w-4 ${cat.accentClass}`} />
                </div>
                <span className={`text-sm font-bold ${cat.accentClass}`}>{cat.label}</span>
                <span className="ml-auto text-xs font-mono text-muted-foreground bg-muted
                                 border border-border px-2 py-0.5 rounded-full">
                  {skills.length}
                </span>
              </div>

              <div className="h-px" style={{ background: `linear-gradient(to right, ${hexRgba(cat.color, 0.3)}, transparent)` }} />

              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <SkillChip key={skill} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
