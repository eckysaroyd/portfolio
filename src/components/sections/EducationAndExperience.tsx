import { getExperience } from "@/lib/portfolio-data";
import Image from "next/image";
import { Building2, MapPin, Download } from "lucide-react";

export default async function EducationAndExperience() {
  const experience = await getExperience();
  return (
    <section id="experience" className="pt-20 pb-20">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
            My Professional Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            6+ years building production software across multiple countries, industries, and tech stacks.
          </p>
        </div>
        <a
          href="/Eckysaroyd-CV.pdf"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl
                     text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary
                     hover:-translate-y-0.5 transition-all duration-200 bg-card flex-shrink-0 self-start sm:self-auto"
        >
          <Download className="h-4 w-4" />
          Download Full CV
        </a>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-4 bottom-4 w-px
                        bg-gradient-to-b from-primary/60 via-border to-transparent" />

        <div className="space-y-6">
          {experience.map((exp, i) => {
            const isCurrent = exp.duration.toLowerCase().includes("present");
            const [company, location] = exp.company.split("|").map((s) => s.trim());

            return (
              <div
                key={exp.company + i}
                className="relative pl-16 anim-fade-up group"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Timeline node */}
                <div className={`absolute left-0 top-4 w-10 h-10 rounded-full border-2 bg-background
                                  flex items-center justify-center z-10 transition-all duration-300
                                  ${isCurrent
                                    ? "border-primary shadow-[0_0_14px_hsl(var(--primary)/0.4)]"
                                    : "border-border group-hover:border-primary/40"}`}>
                  {exp.image ? (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image src={exp.image} alt={company} fill className="object-contain" />
                    </div>
                  ) : (
                    <Building2 className={`h-4 w-4 ${isCurrent ? "text-primary" : "text-muted-foreground"}`} />
                  )}
                </div>

                {/* Entry card */}
                <div className={`rounded-xl border p-5 transition-all duration-300
                                  group-hover:shadow-[0_8px_28px_hsl(var(--primary)/0.10)]
                                  ${isCurrent
                                    ? "border-primary/30 bg-gradient-to-br from-primary/5 to-card group-hover:border-primary/50"
                                    : "border-border bg-card group-hover:border-primary/25"}`}>

                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-sm text-foreground">{exp.position}</p>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium
                                          px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                            </span>
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <p className="text-xs font-medium text-muted-foreground">{company}</p>
                        {location && (
                          <>
                            <span className="text-border text-xs">·</span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground/60">
                              <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
                              {location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-muted
                                     px-2.5 py-1 rounded-lg flex-shrink-0 border border-border whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Bullets */}
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

      <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
