import { getPortfolioMeta } from "@/lib/portfolio-data";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Download, ArrowRight, Star, BarChart2, Cpu } from "lucide-react";

const STATS = [
  { value: "6+",   label: "Years Experience"    },
  { value: "50+",  label: "Projects Delivered"  },
  { value: "20+",  label: "Technologies"        },
  { value: "100%", label: "Client Satisfaction" },
];

const TAGS = ["Next.js", "Node.js", "TypeScript", "AI/LLM", "Supabase"];

export default async function Hero() {
  const meta = await getPortfolioMeta();
  const [firstName, ...rest] = meta.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="hero" className="relative pt-10 pb-0">

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left column */}
        <div className="space-y-6 order-2 lg:order-1">

          {/* Available badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800
                          text-green-700 dark:text-green-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </div>

          {/* Name */}
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black tracking-tight leading-[1.08]">
              <span className="block text-foreground">{firstName}</span>
              <span className="block text-primary">{lastName}</span>
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-semibold text-muted-foreground">
              {meta.role}
            </p>
          </div>

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
            {meta.description}
          </p>

          {/* Location + tech tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground
                             bg-muted px-3 py-1.5 rounded-full border border-border">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              {meta.location}
            </span>
            {TAGS.map((t) => (
              <span key={t} className="text-sm text-primary bg-primary/10 border border-primary/20
                                       px-3 py-1.5 rounded-full font-medium">
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white
                         font-semibold rounded-xl shadow-lg shadow-primary/30
                         hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 text-sm"
            >
              View My Work <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/Eckysaroyd-CV.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border
                         text-foreground font-semibold rounded-xl hover:border-primary/50
                         hover:-translate-y-0.5 transition-all duration-200 text-sm bg-background"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
        </div>

        {/* Right column — photo */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">

            {/* Ambient glow */}
            <div className="absolute -inset-8 rounded-3xl bg-primary/10 blur-3xl" />

            {/* Photo frame */}
            <div className="relative p-[2px] rounded-2xl bg-gradient-to-b from-primary/60 via-primary/20 to-transparent">
              <div className="relative w-60 h-72 sm:w-72 sm:h-[340px] lg:w-80 lg:h-[380px]
                              rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={meta.photo}
                  alt={`${meta.name} — ${meta.role}`}
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/30 to-transparent" />
              </div>
            </div>

            {/* Badge — top right: 6+ Years */}
            <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-6 z-10">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-card border border-border rounded-xl
                              px-2 py-1 sm:px-3 sm:py-2 shadow-xl backdrop-blur-sm">
                <div className="h-5 w-5 sm:h-7 sm:w-7 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                  <Star className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-amber-500" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-xs text-muted-foreground font-mono">Experience</p>
                  <p className="text-xs sm:text-sm font-black text-foreground">6+ Years</p>
                </div>
              </div>
            </div>

            {/* Badge — left middle: 50+ Projects */}
            <div className="absolute top-1/3 -left-2 sm:-left-16 z-10 hidden sm:block">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-card border border-border
                              rounded-xl px-2 py-1 sm:px-3 sm:py-2 shadow-xl backdrop-blur-sm">
                <div className="h-5 w-5 sm:h-7 sm:w-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <BarChart2 className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-xs text-muted-foreground font-mono">Delivered</p>
                  <p className="text-xs sm:text-sm font-black text-foreground">50+ Projects</p>
                </div>
              </div>
            </div>

            {/* Badge — bottom: AI & LLM Expert */}
            <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-card border border-border rounded-xl
                              px-2.5 py-1 sm:px-4 sm:py-2 shadow-xl backdrop-blur-sm">
                <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                  <Cpu className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-violet-500" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-foreground">AI &amp; LLM Expert</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden
                      border border-border shadow-sm">
        {STATS.map(({ value, label }) => (
          <div key={label}
               className="flex flex-col items-center justify-center py-5 px-4 bg-card
                          hover:bg-primary/5 transition-colors duration-200 text-center">
            <span className="text-3xl font-black text-primary">{value}</span>
            <span className="text-xs text-muted-foreground mt-1">{label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    </section>
  );
}
