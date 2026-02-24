import info from "@/data/user_info";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2 } from "lucide-react";

export default function EducationAndExperience() {
  return (
    <section id="experience" className="py-20 sm:py-24">

      {/* Header */}
      <div className="mb-12 space-y-3">
        <p className="text-sm font-mono text-primary tracking-widest uppercase">Background</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Experience &amp; Education
        </h2>
        <p className="text-muted-foreground max-w-xl">
          6+ years building production software across multiple countries, industries, and tech stacks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">

        {/* ── Experience (experience1 table pattern) ── */}
        <div className="lg:col-span-3 space-y-1">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono mb-6">
            Work Experience
          </h3>

          <div className="divide-y divide-border">
            {info.experience.map((exp) => (
              <div
                key={exp.company}
                className="py-6 grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-3 sm:gap-6 group"
              >
                {/* Period */}
                <p className="text-xs font-mono text-muted-foreground sm:pt-0.5 leading-relaxed flex-shrink-0">
                  {exp.duration}
                </p>

                {/* Role + descriptions */}
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {exp.position}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {exp.company.split("|")[0].trim()}
                        {exp.company.includes("|") && (
                          <span className="text-muted-foreground/60">
                            {" "}· {exp.company.split("|")[1].trim()}
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Company logo / fallback icon */}
                    <div className="relative w-8 h-8 rounded-md overflow-hidden border border-border flex-shrink-0 bg-muted flex items-center justify-center">
                      {exp.image ? (
                        <Image
                          src={exp.image}
                          alt={exp.company}
                          fill
                          className="object-contain p-0.5"
                        />
                      ) : (
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <ul className="space-y-1">
                    {exp.descriptions.map((d) => (
                      <li key={d} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-0.5 flex-shrink-0">›</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Education + Certificates ── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Education */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono mb-5">
              Education
            </h3>
            <div className="space-y-3">
              {info.education.map((edu) => (
                <Card
                  key={edu.school}
                  className="border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-md overflow-hidden border border-border flex-shrink-0 bg-background">
                      <Image
                        src={edu.image}
                        alt={edu.school}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{edu.school}</p>
                      <p className="text-xs text-primary mt-1 font-mono">{edu.duration}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Certifications */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono mb-5">
              Certifications
            </h3>
            <div className="space-y-3">
              {info.certificates.map((cert) => (
                <Card
                  key={cert.title}
                  className="border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-md overflow-hidden border border-border flex-shrink-0 bg-background">
                      <Image
                        src={cert.icon}
                        alt={cert.title}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{cert.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
