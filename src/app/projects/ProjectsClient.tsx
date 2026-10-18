"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink, ArrowRight, Search, LayoutGrid,
  Rocket, Cpu, Globe, Briefcase, Gamepad2, Mail,
} from "lucide-react";
import { hexRgba } from "@/lib/utils";
import { ProjectModal } from "@/components/ProjectModal";
import type { Project } from "@/types";
import {
  SiNextdotjs, SiReact, SiVuedotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress, SiLaravel,
  SiPhp, SiPostgresql, SiMysql, SiMongodb, SiSupabase, SiDocker,
  SiGithubactions, SiHtml5, SiCss3,
} from "react-icons/si";
import { Bot, Server, Zap, Play, BookOpen } from "lucide-react";

// ── Tech icon map ──────────────────────────────────────────────────────────
type AnyIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const TECH_MAP: Record<string, { Icon: AnyIcon; color: string }> = {
  "Next.js":      { Icon: SiNextdotjs as AnyIcon,    color: "#94a3b8" },
  "React":        { Icon: SiReact as AnyIcon,         color: "#61dafb" },
  "React.js":     { Icon: SiReact as AnyIcon,         color: "#61dafb" },
  "Vue.js":       { Icon: SiVuedotjs as AnyIcon,      color: "#42b883" },
  "TypeScript":   { Icon: SiTypescript as AnyIcon,    color: "#3178c6" },
  "JavaScript":   { Icon: SiJavascript as AnyIcon,    color: "#f7df1e" },
  "Tailwind CSS": { Icon: SiTailwindcss as AnyIcon,   color: "#06b6d4" },
  "Bootstrap":    { Icon: SiBootstrap as AnyIcon,     color: "#7952b3" },
  "Node.js":      { Icon: SiNodedotjs as AnyIcon,     color: "#339933" },
  "Express.js":   { Icon: SiExpress as AnyIcon,       color: "#94a3b8" },
  "Laravel":      { Icon: SiLaravel as AnyIcon,       color: "#ff2d20" },
  "PHP":          { Icon: SiPhp as AnyIcon,            color: "#777bb4" },
  "PostgreSQL":   { Icon: SiPostgresql as AnyIcon,    color: "#4169e1" },
  "MySQL":        { Icon: SiMysql as AnyIcon,          color: "#4479a1" },
  "MongoDB":      { Icon: SiMongodb as AnyIcon,        color: "#47a248" },
  "Supabase":     { Icon: SiSupabase as AnyIcon,       color: "#3ecf8e" },
  "Docker":       { Icon: SiDocker as AnyIcon,         color: "#2496ed" },
  "GitHub Actions":{ Icon: SiGithubactions as AnyIcon, color: "#2088ff" },
  "HTML5":        { Icon: SiHtml5 as AnyIcon,          color: "#e34f26" },
  "CSS3":         { Icon: SiCss3 as AnyIcon,           color: "#1572b6" },
  "Claude AI":    { Icon: Bot,                          color: "#d97706" },
  "pdf-lib":      { Icon: BookOpen,                     color: "#6366f1" },
  "Coolify":      { Icon: Server,                       color: "#6c47ff" },
  "AOS":          { Icon: Zap,                          color: "#6366f1" },
  "Phaser 3":     { Icon: Gamepad2,                     color: "#4a90d9" },
  "Vite":         { Icon: Play,                         color: "#646cff" },
  "PLpgSQL":      { Icon: SiPostgresql as AnyIcon,     color: "#4169e1" },
  "Python":       { Icon: Bot,                          color: "#3776ab" },
};

// ── Filter config ──────────────────────────────────────────────────────────
type FilterId = "all" | "ai" | "webapps" | "business" | "other";

const FILTERS: { id: FilterId; label: string; Icon: AnyIcon }[] = [
  { id: "all",      label: "All Projects",  Icon: LayoutGrid },
  { id: "ai",       label: "AI & SaaS",     Icon: Cpu        },
  { id: "webapps",  label: "Web Apps",      Icon: Globe      },
  { id: "business", label: "Business",      Icon: Briefcase  },
  { id: "other",    label: "Other",         Icon: Gamepad2   },
];

const AI_CATS       = ["AI SaaS Platform"];
const BUSINESS_CATS = ["Business Website", "Corporate Website"];
const OTHER_CATS    = ["Browser Game"];

function getFilter(category: string): FilterId {
  if (AI_CATS.includes(category))       return "ai";
  if (BUSINESS_CATS.includes(category)) return "business";
  if (OTHER_CATS.includes(category))    return "other";
  return "webapps";
}

// ── Category badge color ───────────────────────────────────────────────────
const CAT_COLORS: Record<string, string> = {
  "AI SaaS Platform":       "#8b5cf6",
  "Real Estate Platform":   "#2563eb",
  "Business Website":       "#10b981",
  "Transportation Platform":"#f97316",
  "Healthcare Platform":    "#06b6d4",
  "Browser Game":           "#ec4899",
  "E-Commerce Platform":    "#f59e0b",
};

function TechTag({ tech }: { tech: string }) {
  const entry = TECH_MAP[tech];
  const color = entry?.color ?? "#64748b";
  const Icon  = entry?.Icon;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border"
      style={{ backgroundColor: hexRgba(color, 0.1), borderColor: hexRgba(color, 0.25), color: hexRgba(color, 0.9) }}
    >
      {Icon && <Icon className="h-3 w-3 flex-shrink-0" style={{ color }} />}
      {tech}
    </span>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const techs = project.technologies.split(",").map((t) => t.trim());
  const catColor = CAT_COLORS[project.category] ?? "#2563eb";

  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden
                    hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl
                    transition-all duration-300">

      {/* Screenshot */}
      <div className="relative h-48 flex-shrink-0 overflow-hidden bg-muted">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category badge */}
        <span
          className="absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: hexRgba(catColor, 0.85), color: "#fff" }}
        >
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {techs.slice(0, 4).map((t) => <TechTag key={t} tech={t} />)}
          {techs.length > 4 && (
            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-md border border-border bg-muted">
              +{techs.length - 4}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border
                       text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary
                       transition-all duration-200"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live Demo
          </Link>
          <button
            onClick={onClick}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary
                       text-white text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [search, setSearch]             = useState("");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const counts = useMemo(() =>
    FILTERS.reduce((acc, { id }) => {
      acc[id] = id === "all"
        ? projects.length
        : projects.filter((p) => getFilter(p.category) === id).length;
      return acc;
    }, {} as Record<FilterId, number>),
  [projects]);

  const displayed = useMemo(() =>
    projects.filter((p) => {
      const matchesFilter = activeFilter === "all" || getFilter(p.category) === activeFilter;
      const matchesSearch = search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.technologies.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    }),
  [activeFilter, search, projects]);

  return (
    <main className="min-h-screen bg-background pt-14 sm:pt-16 md:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="pt-12 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-primary/10 border border-primary/25 text-primary text-xs font-semibold">
                <Rocket className="h-3.5 w-3.5" />
                My Projects
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                <span className="block text-foreground">Real Projects.</span>
                <span className="block text-primary">Real Impact.</span>
              </h1>

              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                A collection of projects I&apos;ve built and contributed to, ranging from SaaS
                platforms to AI-powered applications and enterprise systems.
              </p>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-5 pt-2">
                {[
                  { Icon: LayoutGrid, value: "50+", label: "Projects Delivered" },
                  { Icon: Cpu,        value: "20+", label: "Technologies Used"  },
                  { Icon: Rocket,     value: "100%",label: "Real-World Impact"  },
                ].map(({ Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-black text-primary leading-none">{value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — decorative grid of tech boxes */}
            <div className="hidden lg:flex justify-end">
              <div className="relative w-80 h-64">
                <div className="absolute inset-0" style={{
                  backgroundImage: "radial-gradient(circle at 1.5px 1.5px, hsl(var(--primary)/0.15) 1px, transparent 0)",
                  backgroundSize: "28px 28px",
                }} />
                {/* Floating tech cards */}
                {[
                  { label: "Next.js",    color: "#94a3b8", top: "8%",  left: "5%"  },
                  { label: "Supabase",   color: "#3ecf8e", top: "8%",  left: "40%" },
                  { label: "TypeScript", color: "#3178c6", top: "8%",  right: "5%" },
                  { label: "Node.js",    color: "#339933", top: "42%", left: "5%"  },
                  { label: "OpenAI",     color: "#10a37f", top: "42%", left: "38%" },
                  { label: "Docker",     color: "#2496ed", top: "42%", right: "5%" },
                  { label: "React",      color: "#61dafb", top: "76%", left: "5%"  },
                  { label: "PostgreSQL", color: "#4169e1", top: "76%", left: "40%" },
                  { label: "AWS",        color: "#ff9900", top: "76%", right: "5%" },
                ].map(({ label, color, ...pos }) => (
                  <div key={label}
                       className="absolute px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md"
                       style={{ ...pos, backgroundColor: hexRgba(color, 0.15), border: `1px solid ${hexRgba(color, 0.35)}`, color }}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        {/* ── Filter bar ────────────────────────────────────────────────── */}
        <section className="pt-8 pb-0">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
                              border transition-all duration-200 ${
                    activeFilter === id
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeFilter === id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {counts[id]}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-sm
                           text-foreground placeholder:text-muted-foreground
                           focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25
                           transition-all duration-200"
              />
            </div>
          </div>
        </section>

        {/* ── Grid ──────────────────────────────────────────────────────── */}
        <section className="pt-6 pb-20">
          {displayed.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground text-sm">No projects match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map((project, i) => (
                <div key={project.title} className="anim-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  <ProjectCard project={project} onClick={() => setModalProject(project)} />
                </div>
              ))}
            </div>
          )}

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <div className="mt-16 relative rounded-2xl border border-primary/20 overflow-hidden
                          bg-gradient-to-br from-primary/8 via-primary/3 to-transparent p-10">
            <div aria-hidden className="absolute inset-0 pointer-events-none"
                 style={{
                   backgroundImage: "radial-gradient(circle at 1.5px 1.5px, hsl(var(--primary)/0.08) 1px, transparent 0)",
                   backgroundSize: "28px 28px",
                 }} />
            <div aria-hidden className="absolute -top-16 -right-16 w-52 h-52 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase flex items-center gap-2">
                  <Rocket className="h-3.5 w-3.5" /> Let&apos;s Build Together
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                  Have a <span className="text-primary">Project</span> in Mind?
                </h2>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  I&apos;m always open to discussing new opportunities, exciting projects,
                  or ways to collaborate. Let&apos;s create something amazing together.
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white
                           font-semibold rounded-xl shadow-lg shadow-primary/30 text-sm flex-shrink-0
                           hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
              >
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
                <span className="font-bold text-foreground text-sm">Eckysaroyd Nyato</span>
              </Link>

              <div className="flex items-center gap-5">
                {[
                  { label: "Home",       href: "/"          },
                  { label: "About",      href: "/about"     },
                  { label: "Experience", href: "/#experience"},
                  { label: "Skills",     href: "/#skills"   },
                  { label: "Contact",    href: "/#contact"  },
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

      {/* Project detail modal */}
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </main>
  );
}
