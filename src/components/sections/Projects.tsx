"use client";

import { useState } from "react";
import info from "@/data/user_info";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

// ── Filter logic — driven by category keywords ─────────────────────────────
type Filter = "all" | "ai" | "webapps" | "business";

const AI_CATEGORIES       = ["AI SaaS Platform"];
const BUSINESS_CATEGORIES = ["Business Website", "Corporate Website"];

function getFilter(category: string): Filter {
  if (AI_CATEGORIES.includes(category))       return "ai";
  if (BUSINESS_CATEGORIES.includes(category)) return "business";
  return "webapps";
}

const FILTERS: { id: Filter; label: string; emoji: string }[] = [
  { id: "all",      label: "All Projects",   emoji: "◈" },
  { id: "ai",       label: "AI & SaaS",      emoji: "✦" },
  { id: "webapps",  label: "Web Apps",        emoji: "⬡" },
  { id: "business", label: "Business Sites",  emoji: "◇" },
];

export default function Projects() {
  const [active, setActive] = useState<Filter>("all");

  const displayed =
    active === "all"
      ? info.projects
      : info.projects.filter((p) => getFilter(p.category) === active);

  const counts = FILTERS.reduce((acc, { id }) => {
    acc[id] =
      id === "all"
        ? info.projects.length
        : info.projects.filter((p) => getFilter(p.category) === id).length;
    return acc;
  }, {} as Record<Filter, number>);

  return (
    <section id="projects" className="pt-14 pb-20 sm:pt-16 sm:pb-24">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <p className="text-sm font-mono text-primary tracking-widest uppercase">Work</p>
          <span className="text-xs font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
            {info.projects.length} projects
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Projects</h2>
        <p className="text-muted-foreground max-w-xl">
          Production applications I&apos;ve designed and shipped — from AI-powered SaaS
          and enterprise platforms to creator apps and business sites.
        </p>
      </div>

      {/* ── Filter pills ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
              active === id
                ? "bg-primary text-primary-foreground border-primary shadow-[0_2px_14px_hsl(var(--primary)/0.4)]"
                : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
            )}
          >
            <span className="text-xs">{emoji}</span>
            {label}
            <span
              className={cn(
                "min-w-[20px] h-5 inline-flex items-center justify-center text-xs font-mono rounded-full px-1.5",
                active === id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
              )}
            >
              {counts[id]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Project grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayed.map((project, idx) => (
          <div
            key={`${project.title}-${active}`}
            className="anim-fade-up h-full"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
