"use client";

import { useState } from "react";
import info from "@/data/user_info";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

type Filter = "all" | "featured" | "more";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all",      label: "All Projects" },
  { id: "featured", label: "Featured"     },
  { id: "more",     label: "More Work"    },
];

export default function Projects() {
  const [active, setActive] = useState<Filter>("all");

  const displayed =
    active === "all"      ? info.projects :
    active === "featured" ? info.projects.filter((p) => p.featured) :
                            info.projects.filter((p) => !p.featured);

  const counts = {
    all:      info.projects.length,
    featured: info.projects.filter((p) => p.featured).length,
    more:     info.projects.filter((p) => !p.featured).length,
  };

  return (
    <section id="projects" className="py-20 sm:py-24">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <p className="text-sm font-mono text-primary tracking-widest uppercase">Work</p>
          {/* Total count pill */}
          <span className="text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
            {info.projects.length} projects
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Projects</h2>
        <p className="text-muted-foreground max-w-xl">
          Production applications I&apos;ve designed and shipped — from enterprise eCommerce
          to creator platforms and scalable SaaS.
        </p>
      </div>

      {/* ── Filter pills ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
              active === id
                ? "bg-primary text-primary-foreground border-primary shadow-[0_2px_14px_hsl(var(--primary)/0.4)]"
                : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            )}
          >
            {label}
            {/* Count badge */}
            <span
              className={cn(
                "min-w-[20px] h-5 inline-flex items-center justify-center text-[10px] font-mono rounded-full px-1.5",
                active === id
                  ? "bg-white/20 text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {counts[id]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Project grid — cards stagger-animate on filter change ─────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayed.map((project, idx) => {
          // Keep the original project number (01/02...) regardless of active filter
          const originalIndex = info.projects.findIndex((p) => p.title === project.title);
          return (
            <div
              key={`${project.title}-${active}`} // remount on filter change → triggers CSS animation
              className="anim-fade-up h-full"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <ProjectCard project={project} index={originalIndex} />
            </div>
          );
        })}
      </div>

    </section>
  );
}
