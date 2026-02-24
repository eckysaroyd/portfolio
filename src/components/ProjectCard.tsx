"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle2, Sparkles, Globe, Server, Zap, BookOpen, Bot } from "lucide-react";
import { hexRgba } from "@/lib/utils";
import type { Project } from "@/types";
import Link from "next/link";
import { ProjectModal } from "@/components/ProjectModal";
import {
  SiLaravel, SiMysql, SiVuedotjs, SiDocker, SiTailwindcss,
  SiJavascript, SiPhp, SiFlutter, SiBootstrap, SiJquery,
  SiHtml5, SiCss3, SiNextdotjs, SiReact, SiNodedotjs,
  SiTypescript, SiPostgresql, SiMongodb, SiSupabase, SiOpenai,
} from "react-icons/si";

type AnyIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

// ── Technology → brand icon + color registry ──────────────────────────────
export const TECH_MAP: Record<string, { Icon: AnyIcon; color: string }> = {
  "Laravel":         { Icon: SiLaravel as AnyIcon,     color: "#ff2d20" },
  "MySQL":           { Icon: SiMysql as AnyIcon,       color: "#4479a1" },
  "Vue.js":          { Icon: SiVuedotjs as AnyIcon,    color: "#42b883" },
  "Docker":          { Icon: SiDocker as AnyIcon,      color: "#2496ed" },
  "Tailwind CSS":    { Icon: SiTailwindcss as AnyIcon, color: "#06b6d4" },
  "JavaScript":      { Icon: SiJavascript as AnyIcon,  color: "#f7df1e" },
  "PHP":             { Icon: SiPhp as AnyIcon,         color: "#777bb4" },
  "Flutter":         { Icon: SiFlutter as AnyIcon,     color: "#54c5f8" },
  "Bootstrap":       { Icon: SiBootstrap as AnyIcon,   color: "#7952b3" },
  "jQuery":          { Icon: SiJquery as AnyIcon,      color: "#0769ad" },
  "HTML5":           { Icon: SiHtml5 as AnyIcon,       color: "#e34f26" },
  "CSS3":            { Icon: SiCss3 as AnyIcon,        color: "#1572b6" },
  "Next.js":         { Icon: SiNextdotjs as AnyIcon,   color: "#94a3b8" },
  "React":           { Icon: SiReact as AnyIcon,       color: "#61dafb" },
  "Node.js":         { Icon: SiNodedotjs as AnyIcon,   color: "#339933" },
  "TypeScript":      { Icon: SiTypescript as AnyIcon,  color: "#3178c6" },
  "PostgreSQL":      { Icon: SiPostgresql as AnyIcon,  color: "#4169e1" },
  "MongoDB":         { Icon: SiMongodb as AnyIcon,     color: "#47a248" },
  "Supabase":        { Icon: SiSupabase as AnyIcon,    color: "#3ecf8e" },
  "Claude AI":       { Icon: Bot,                      color: "#d97706" },
  "OpenAI":          { Icon: SiOpenai as AnyIcon,      color: "#10a37f" },
  "Coolify":         { Icon: Server,                   color: "#6c47ff" },
  "API Integration": { Icon: Globe,                    color: "#22d3ee" },
  "AOS":             { Icon: Zap,                      color: "#6366f1" },
};

const FALLBACK_COLOR = "#64748b";

// ── TechChip — exported for use in ProjectModal ───────────────────────────
export function TechChip({ tech }: { tech: string }) {
  const entry = TECH_MAP[tech];
  const color = entry?.color ?? FALLBACK_COLOR;
  const Icon  = entry?.Icon;

  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border cursor-default
                 transition-all duration-150 hover:brightness-125 hover:scale-105 select-none"
      style={{
        backgroundColor: hexRgba(color, 0.08),
        borderColor:     hexRgba(color, 0.28),
      }}
    >
      {Icon && <Icon className="h-3 w-3 flex-shrink-0" style={{ color }} />}
      <span className="text-xs font-mono" style={{ color: hexRgba(color, 0.9) }}>
        {tech}
      </span>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────
export function ProjectCard({ project }: { project: Project }) {
  const [modalOpen, setModalOpen] = useState(false);
  const technologies = project.technologies.split(",").map((t) => t.trim());

  return (
    <>
      <div
        className="group flex flex-col h-full rounded-2xl border border-border bg-card
                   overflow-hidden transition-all duration-300
                   hover:border-primary/40 hover:-translate-y-1.5
                   hover:shadow-[0_16px_48px_hsl(var(--primary)/0.14)]"
      >
        {/* ── Top accent ──────────────────────────────────────────────── */}
        <div className="relative h-24 flex-shrink-0 overflow-hidden
                        bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1.5px 1.5px, hsl(var(--primary) / 0.18) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <span className="absolute bottom-3 left-4 text-xs font-mono font-semibold
                           text-foreground/75 tracking-wider uppercase">
            {project.category}
          </span>
          {project.featured && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1.5
                             text-xs font-semibold tracking-wide px-2.5 py-1 rounded-full border
                             text-primary bg-primary/10 border-primary/30 backdrop-blur-sm">
              <Sparkles className="h-2.5 w-2.5" />
              Featured
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 h-px
                          bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
        </div>

        {/* ── Body ────────────────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-5 space-y-4">

          {/* Title */}
          <h3 className="font-bold text-base text-foreground leading-snug
                         group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>

          {/* Description — clamped to 2 lines on card */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Highlights — first 2 only */}
          <ul className="space-y-1.5">
            {project.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-primary/55" />
                {h}
              </li>
            ))}
            {project.highlights.length > 2 && (
              <li className="text-xs text-primary/60 font-mono pl-5">
                +{project.highlights.length - 2} more highlights
              </li>
            )}
          </ul>

          {/* Tech chips — first 4 only */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {technologies.slice(0, 4).map((tech) => (
              <TechChip key={tech} tech={tech} />
            ))}
            {technologies.length > 4 && (
              <span className="flex items-center px-2.5 py-1 rounded-lg border border-border
                               text-xs font-mono text-muted-foreground bg-muted/50">
                +{technologies.length - 4}
              </span>
            )}
          </div>

          {/* ── Buttons ─────────────────────────────────────────────── */}
          <div className="pt-2 mt-auto grid grid-cols-2 gap-2">
            {/* Read More */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3
                         border border-border text-sm font-medium text-foreground
                         hover:border-primary/50 hover:text-primary hover:bg-primary/5
                         transition-all duration-200"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Read More
            </button>

            {/* Live Preview */}
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3
                         bg-gradient-to-r from-primary to-sky-500 text-white text-sm font-semibold
                         shadow-[0_2px_12px_hsl(var(--primary)/0.3)]
                         hover:shadow-[0_4px_20px_hsl(var(--primary)/0.5)]
                         hover:brightness-110 transition-all duration-200"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Preview
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={modalOpen ? project : null}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
