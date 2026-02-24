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
  FlaskConical, Monitor, Database, Play,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type AnyIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
type SkillKey = "frontend" | "backend" | "databases" | "devops" | "design" | "testing";

// ── Skill → brand icon + color registry ───────────────────────────────────
const SKILL_MAP: Record<string, { Icon: AnyIcon; color: string }> = {
  // AI & Automation
  "LLM Integrations":     { Icon: SiOpenai as AnyIcon,        color: "#10a37f" },
  "AI Automation":        { Icon: Bot,                         color: "#00d4ff" },
  "RAG Pipelines":        { Icon: BrainCircuit,                color: "#a855f7" },
  "Prompt Engineering":   { Icon: Code2,                       color: "#f59e0b" },
  "LLM Fine-tuning":      { Icon: Cpu,                         color: "#ef4444" },
  "AI Agent Development": { Icon: Zap,                         color: "#f97316" },
  "Playwright":           { Icon: Play,                        color: "#45ba4b" },
  "Workflow Automation":  { Icon: Workflow,                    color: "#8b5cf6" },
  "n8n":                  { Icon: Workflow,                    color: "#ea4b71" },
  "Supabase Vector":      { Icon: SiSupabase as AnyIcon,       color: "#3ecf8e" },
  // Frontend
  "Next.js":              { Icon: SiNextdotjs as AnyIcon,      color: "#94a3b8" },
  "React.js":             { Icon: SiReact as AnyIcon,          color: "#61dafb" },
  "Vue.js":               { Icon: SiVuedotjs as AnyIcon,       color: "#42b883" },
  "TypeScript":           { Icon: SiTypescript as AnyIcon,     color: "#3178c6" },
  "JavaScript":           { Icon: SiJavascript as AnyIcon,     color: "#f7df1e" },
  "Tailwind CSS":         { Icon: SiTailwindcss as AnyIcon,    color: "#06b6d4" },
  "Bootstrap":            { Icon: SiBootstrap as AnyIcon,      color: "#7952b3" },
  // Backend
  "Node.js":              { Icon: SiNodedotjs as AnyIcon,      color: "#339933" },
  "Express.js":           { Icon: SiExpress as AnyIcon,        color: "#94a3b8" },
  "Laravel":              { Icon: SiLaravel as AnyIcon,        color: "#ff2d20" },
  "PHP":                  { Icon: SiPhp as AnyIcon,            color: "#777bb4" },
  "REST APIs":            { Icon: Globe,                       color: "#22d3ee" },
  "Microservices":        { Icon: Layers,                      color: "#818cf8" },
  "CodeIgniter":          { Icon: SiCodeigniter as AnyIcon,    color: "#ef4444" },
  // Databases
  "PostgreSQL":           { Icon: SiPostgresql as AnyIcon,     color: "#4169e1" },
  "Supabase":             { Icon: SiSupabase as AnyIcon,       color: "#3ecf8e" },
  "MySQL":                { Icon: SiMysql as AnyIcon,          color: "#4479a1" },
  "MongoDB":              { Icon: SiMongodb as AnyIcon,        color: "#47a248" },
  // DevOps & Cloud
  "AWS":                  { Icon: Cloud,                       color: "#ff9900" },
  "Docker":               { Icon: SiDocker as AnyIcon,         color: "#2496ed" },
  "CI/CD":                { Icon: GitBranch,                   color: "#f1502f" },
  "GitHub Actions":       { Icon: SiGithubactions as AnyIcon,  color: "#2088ff" },
  "GitLab":               { Icon: SiGitlab as AnyIcon,         color: "#fc6d26" },
  "Coolify":              { Icon: Server,                      color: "#6c47ff" },
  "Linux":                { Icon: SiLinux as AnyIcon,          color: "#fcc624" },
  // Design
  "Figma":                { Icon: SiFigma as AnyIcon,          color: "#f24e1e" },
  "Photoshop":            { Icon: SiAdobephotoshop as AnyIcon, color: "#31a8ff" },
  "CorelDRAW":            { Icon: Palette,                     color: "#00a550" },
  // Testing & Security
  "API Testing":          { Icon: FlaskConical,                color: "#f59e0b" },
  "JWT Security":         { Icon: Shield,                      color: "#10b981" },
};

// ── Category card config — full static Tailwind strings (no dynamic parts) ─
const CATEGORIES: {
  key: SkillKey;
  label: string;
  Icon: AnyIcon;
  labelClass: string;
  borderTopClass: string;
  fromClass: string;
}[] = [
  {
    key: "frontend",
    label: "Frontend",
    Icon: Monitor,
    labelClass: "text-violet-400",
    borderTopClass: "border-t-violet-500",
    fromClass: "from-violet-500/10",
  },
  {
    key: "backend",
    label: "Backend",
    Icon: Server,
    labelClass: "text-emerald-400",
    borderTopClass: "border-t-emerald-500",
    fromClass: "from-emerald-500/10",
  },
  {
    key: "databases",
    label: "Databases",
    Icon: Database,
    labelClass: "text-orange-400",
    borderTopClass: "border-t-orange-500",
    fromClass: "from-orange-500/10",
  },
  {
    key: "devops",
    label: "DevOps & Cloud",
    Icon: Cloud,
    labelClass: "text-blue-400",
    borderTopClass: "border-t-blue-500",
    fromClass: "from-blue-500/10",
  },
  {
    key: "design",
    label: "Design",
    Icon: Palette,
    labelClass: "text-pink-400",
    borderTopClass: "border-t-pink-500",
    fromClass: "from-pink-500/10",
  },
  {
    key: "testing",
    label: "Testing & Security",
    Icon: Shield,
    labelClass: "text-amber-400",
    borderTopClass: "border-t-amber-500",
    fromClass: "from-amber-500/10",
  },
];

// ── Reusable skill chip: brand icon + brand-tinted pill ───────────────────
function SkillChip({ skill }: { skill: string }) {
  const entry = SKILL_MAP[skill];
  const color = entry?.color ?? "#64748b";
  const Icon  = entry?.Icon  ?? Code2;

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-default
                 transition-all duration-200 hover:brightness-125 hover:scale-105
                 hover:-translate-y-px select-none"
      style={{
        backgroundColor: hexRgba(color, 0.08),
        borderColor:     hexRgba(color, 0.28),
      }}
    >
      <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color }} />
      <span
        className="text-xs font-medium whitespace-nowrap"
        style={{ color: hexRgba(color, 0.9) }}
      >
        {skill}
      </span>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24">

      {/* Header */}
      <div className="mb-12 space-y-3">
        <p className="text-sm font-mono text-primary tracking-widest uppercase">Expertise</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Technical Skills</h2>
        <p className="text-muted-foreground max-w-xl">
          Full-spectrum engineering — from LLM integrations and AI automation to
          cloud-native deployments and production-grade frontend.
        </p>
      </div>

      {/* ── AI & Automation — featured full-width card ─────────────────── */}
      <div className="mb-6 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/8 to-transparent p-5 sm:p-6 space-y-4 shadow-[0_0_40px_hsl(var(--primary)/0.07)]">
        <div className="flex items-center gap-2.5">
          {/* Pulsing live dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider font-mono">
            AI &amp; Automation
          </h3>
          <span className="ml-auto text-xs font-mono text-primary/70 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
            Primary Focus
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {info.skills.ai_automation.map((skill) => (
            <SkillChip key={skill} skill={skill} />
          ))}
        </div>
      </div>

      {/* ── Category grid ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const skills = info.skills[cat.key] as string[];
          return (
            <div
              key={cat.key}
              className={`rounded-2xl border border-border border-t-2 ${cat.borderTopClass}
                          bg-gradient-to-b ${cat.fromClass} to-transparent p-5 space-y-4`}
            >
              {/* Category header */}
              <div className={`flex items-center gap-2 ${cat.labelClass}`}>
                <cat.Icon className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                  {cat.label}
                </span>
                {/* Skill count badge */}
                <span className="ml-auto text-xs font-mono opacity-50">
                  {skills.length}
                </span>
              </div>

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
