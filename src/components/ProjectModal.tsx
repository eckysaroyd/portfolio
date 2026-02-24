"use client";

import {
  Dialog, DialogContent, DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, CheckCircle2, Sparkles, X } from "lucide-react";
import { TechChip } from "@/components/ProjectCard";
import type { Project } from "@/types";
import Link from "next/link";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const technologies = project.technologies.split(",").map((t) => t.trim());

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[92vh] overflow-y-auto gap-0">

        {/* ── Gradient header ─────────────────────────────────────────────── */}
        <div
          className="relative px-7 pt-8 pb-7 overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, #0ea5e9 100%)" }}
        >
          {/* Dot grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
              backgroundSize: "22px 22px",
            }}
          />
          {/* Glow blob */}
          <div aria-hidden className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          <div className="relative">
            {/* Category + Featured row */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
                {project.category}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold
                                 px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                  <Sparkles className="h-2.5 w-2.5" />
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <DialogTitle className="text-2xl font-bold text-white leading-tight">
              {project.title}
            </DialogTitle>
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div className="px-7 py-6 space-y-6">

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
              Key Highlights
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-primary/20 to-transparent" />

          {/* Tech stack */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <TechChip key={tech} tech={tech} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-1 pb-1">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full flex items-center justify-center gap-2 rounded-xl py-3
                         bg-gradient-to-r from-primary to-sky-500 text-white font-semibold text-sm
                         shadow-[0_4px_20px_hsl(var(--primary)/0.35)]
                         hover:shadow-[0_6px_30px_hsl(var(--primary)/0.5)]
                         hover:brightness-110 transition-all duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              Live Preview
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
