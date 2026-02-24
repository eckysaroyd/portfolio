import info from "@/data/user_info";
import Image from "next/image";
import Link from "next/link";
import { Building2, GraduationCap, Award, MapPin, ExternalLink } from "lucide-react";

export default function EducationAndExperience() {
  return (
    <section id="experience" className="py-20 sm:py-24">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="mb-12 space-y-3">
        <p className="text-sm font-mono text-primary tracking-widest uppercase">Background</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Experience &amp; Education
        </h2>
        <p className="text-muted-foreground max-w-xl">
          6+ years building production software across multiple countries, industries, and tech stacks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

        {/* ══════════════════════════════════════════════════════════════
            LEFT — Work Experience — vertical timeline
        ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-3">

          {/* Sub-header */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
              <Building2 className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
              Work Experience
            </span>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-4 top-3 bottom-3 w-px
                            bg-gradient-to-b from-primary/50 via-border/60 to-transparent" />

            <div className="space-y-5">
              {info.experience.map((exp, i) => {
                const isCurrent = exp.duration.toLowerCase().includes("present");
                const [company, location] = exp.company.split("|").map((s) => s.trim());

                return (
                  <div
                    key={exp.company}
                    className="relative pl-14 anim-fade-up group"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {/* Timeline node */}
                    <div className={`absolute left-0 top-3.5 flex items-center justify-center
                                    w-8 h-8 rounded-full border-2 bg-background z-10
                                    transition-all duration-300
                                    ${isCurrent
                                      ? "border-primary shadow-[0_0_14px_hsl(var(--primary)/0.45)]"
                                      : "border-border group-hover:border-primary/40"}`}>
                      {exp.image ? (
                        <div className="relative w-5 h-5 rounded-full overflow-hidden">
                          <Image src={exp.image} alt={company} fill className="object-contain" />
                        </div>
                      ) : (
                        <Building2 className={`h-3.5 w-3.5 ${isCurrent ? "text-primary" : "text-muted-foreground"}`} />
                      )}
                    </div>

                    {/* Entry card */}
                    <div className={`rounded-xl border p-4 sm:p-5 transition-all duration-300
                                    group-hover:shadow-[0_6px_24px_hsl(var(--primary)/0.08)]
                                    ${isCurrent
                                      ? "border-primary/25 bg-gradient-to-br from-primary/5 to-transparent group-hover:border-primary/40"
                                      : "border-border bg-card group-hover:border-primary/25"}`}>

                      {/* Top row: title + duration badge */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="min-w-0">

                          {/* Position + Current badge */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-sm text-foreground">
                              {exp.position}
                            </p>
                            {isCurrent && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-mono
                                              px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25">
                                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                                </span>
                                Current
                              </span>
                            )}
                          </div>

                          {/* Company + location */}
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <p className="text-xs font-medium text-muted-foreground">{company}</p>
                            {location && (
                              <>
                                <span className="text-border text-xs">·</span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground/55">
                                  <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
                                  {location}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Duration chip */}
                        <span className="text-xs font-mono text-muted-foreground bg-muted
                                         px-2.5 py-1 rounded-lg flex-shrink-0 whitespace-nowrap border border-border">
                          {exp.duration}
                        </span>
                      </div>

                      {/* Bullet descriptions */}
                      <ul className="space-y-1.5 border-t border-border/50 pt-3">
                        {exp.descriptions.map((d) => (
                          <li key={d} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                            <span className="text-primary mt-0.5 flex-shrink-0 font-bold">›</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            RIGHT — Education + Certifications
        ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-2 space-y-10">

          {/* ── Education ─────────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="h-6 w-6 rounded-md bg-violet-500/10 flex items-center justify-center">
                <GraduationCap className="h-3.5 w-3.5 text-violet-400" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
                Education
              </span>
            </div>

            <div className="space-y-3">
              {info.education.map((edu, i) => (
                <div
                  key={edu.school}
                  className="flex gap-4 items-start p-4 rounded-xl border border-border bg-card
                             hover:border-violet-500/30 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.07)]
                             transition-all duration-300 anim-fade-up"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {/* Logo */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border
                                  flex-shrink-0 bg-background">
                    <Image src={edu.image} alt={edu.school} fill className="object-contain p-1" />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-foreground leading-snug">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{edu.school}</p>
                    <span className="inline-block mt-2 text-xs font-mono text-primary
                                     bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                      {edu.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* ── Certifications ────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="h-6 w-6 rounded-md bg-amber-500/10 flex items-center justify-center">
                <Award className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
                Certifications
              </span>
            </div>

            <div className="space-y-3">
              {info.certificates.map((cert, i) => (
                <Link
                  key={cert.title}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card
                             hover:border-amber-500/30 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.07)]
                             transition-all duration-300 group anim-fade-up"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {/* Icon */}
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border
                                  flex-shrink-0 bg-background">
                    <Image src={cert.icon} alt={cert.title} fill className="object-contain p-0.5" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm text-foreground
                                   group-hover:text-primary transition-colors duration-200">
                        {cert.title}
                      </p>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/30
                                              group-hover:text-primary transition-colors duration-200 flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
