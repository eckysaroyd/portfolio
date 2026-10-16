"use client";

import { useState } from "react";
import info from "@/data/user_info";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

type Filter = "all" | "ai" | "webapps" | "business";

const AI_CATEGORIES       = ["AI SaaS Platform"];
const BUSINESS_CATEGORIES = ["Business Website", "Corporate Website"];

function getFilter(category: string): Filter {
  if (AI_CATEGORIES.includes(category))       return "ai";
  if (BUSINESS_CATEGORIES.includes(category)) return "business";
  return "webapps";
}

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all",      label: "All Projects"  },
  { id: "ai",       label: "AI & SaaS"     },
  { id: "webapps",  label: "Web Apps"      },
  { id: "business", label: "Business Sites"},
];

export default function Projects() {
  const [active, setActive] = useState<Filter>("all");

  const displayed =
    active === "all"
      ? info.projects
      : info.projects.filter((p) => getFilter(p.category) === active);

  return (
    <section id="projects" className="pt-20 pb-20">

      {/* Header */}
      <div className="mb-10 space-y-3">
        <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
          Featured Projects
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground">
          Building Real World Solutions
        </h2>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          Production applications I&apos;ve designed and shipped — from AI-powered SaaS
          and enterprise platforms to transportation systems and business sites.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200",
              active === id
                ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayed.map((project, idx) => (
          <div
            key={`${project.title}-${active}`}
            className="anim-fade-up h-full"
            style={{ animationDelay: `${idx * 0.07}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
