import { ExternalLink, Github, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hexRgba } from "@/lib/utils";
import type { Project } from "@/types";
import Link from "next/link";

// ── Category → brand accent color ────────────────────────────────────────
const CATEGORY_COLOR: Record<string, string> = {
  "E-Commerce Platform": "#f59e0b",
  "Service Management":  "#10b981",
  "Social Platform":     "#8b5cf6",
  "Corporate Website":   "#3b82f6",
  "Business Website":    "#06b6d4",
};
const FALLBACK_COLOR = "#00d4ff";

interface ProjectCardProps {
  project: Project;
  index: number; // original index in info.projects — drives the "01 / 02" display
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const technologies = project.technologies.split(",").map((t) => t.trim());
  const color = CATEGORY_COLOR[project.category] ?? FALLBACK_COLOR;
  const num   = String(index + 1).padStart(2, "0");

  return (
    <div
      className="group flex flex-col h-full rounded-2xl border border-border bg-card
                 overflow-hidden transition-all duration-300
                 hover:border-primary/40 hover:-translate-y-1.5
                 hover:shadow-[0_16px_48px_hsl(var(--primary)/0.14)]"
    >
      {/* ── Colored top section ────────────────────────────────────────── */}
      <div
        className="relative h-28 flex-shrink-0 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${hexRgba(color, 0.18)}, ${hexRgba(color, 0.04)})`,
        }}
      >
        {/* Decorative dot-grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, ${hexRgba(color, 0.35)} 1px, transparent 0)`,
            backgroundSize: "22px 22px",
          }}
        />

        {/* Large faint project number */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-4 text-7xl font-black font-mono select-none leading-none"
          style={{ color: hexRgba(color, 0.14) }}
        >
          {num}
        </span>

        {/* Featured badge */}
        {project.featured && (
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1.5
                       text-xs font-semibold tracking-wide px-2.5 py-1
                       rounded-full border backdrop-blur-sm"
            style={{
              color:           color,
              backgroundColor: hexRgba(color, 0.12),
              borderColor:     hexRgba(color, 0.35),
            }}
          >
            <Sparkles className="h-2.5 w-2.5" />
            Featured
          </span>
        )}

        {/* Bottom separator line — fades right */}
        <div
          className="absolute inset-x-0 bottom-0 h-[1.5px]"
          style={{ background: `linear-gradient(to right, ${hexRgba(color, 0.7)}, transparent)` }}
        />
      </div>

      {/* ── Card body ──────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 space-y-4">

        {/* Title + category chip */}
        <div className="space-y-2">
          <h3 className="font-bold text-base text-foreground leading-snug
                         group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <span
            className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border"
            style={{
              color:           color,
              backgroundColor: hexRgba(color, 0.09),
              borderColor:     hexRgba(color, 0.28),
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Highlights — checkmark list */}
        <ul className="space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
              <CheckCircle2
                className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                style={{ color: hexRgba(color, 0.75) }}
              />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-0.5 rounded-md border
                         text-muted-foreground border-border bg-muted/40"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── CTAs ─────────────────────────────────────────────────────── */}
        <div className="flex gap-2 pt-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 hover:border-primary/50 transition-colors"
            asChild
          >
            <Link href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-3.5 w-3.5" />
              Code
            </Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 gap-1.5 border-0 text-white
                       bg-gradient-to-r from-primary to-sky-500
                       hover:opacity-90 hover:shadow-[0_4px_14px_hsl(var(--primary)/0.45)]
                       transition-all duration-200"
            asChild
          >
            <Link href={project.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
