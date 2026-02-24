import info from "@/data/user_info";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/TypingText";
import { hexRgba } from "@/lib/utils";
import {
  ArrowRight, Mail,
  Briefcase, Rocket, Bot, Sparkles,
} from "lucide-react";
import {
  SiNextdotjs, SiTypescript, SiNodedotjs, SiReact,
  SiOpenai, SiSupabase, SiDocker, SiPostgresql,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

// ── Core stack chips ────────────────────────────────────────────────────────
const TECH_STACK: { icon: IconType; name: string; color: string }[] = [
  { icon: SiNextdotjs,  name: "Next.js",    color: "#94a3b8" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
  { icon: SiNodedotjs,  name: "Node.js",    color: "#339933" },
  { icon: SiReact,      name: "React",      color: "#61dafb" },
  { icon: SiOpenai,     name: "OpenAI",     color: "#10a37f" },
  { icon: SiSupabase,   name: "Supabase",   color: "#3ecf8e" },
  { icon: SiDocker,     name: "Docker",     color: "#2496ed" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169e1" },
];

// ── Stats — value + label + icon ────────────────────────────────────────────
const STATS: { value: string; label: string; Icon: LucideIcon }[] = [
  { value: "6+",  label: "Years Experience",   Icon: Briefcase },
  { value: "50+", label: "Projects Delivered", Icon: Rocket    },
  { value: "70%", label: "Ops Automated",      Icon: Bot       },
];

const IMPACT = [
  "Reduced manual workload by 70% via AI automation bots",
  "Improved API performance by 35% through optimisations",
  "Deployed real-time systems supporting 10,000+ active users",
];

export default function Hero() {
  return (
    <section id="hero" className="relative pt-10 pb-12 sm:pt-12 sm:pb-14">

      {/* ── Status badge ─────────────────────────────────────────────────── */}
      <div className="inline-flex mb-7 anim-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="rounded-full p-[1px] bg-gradient-to-r from-primary/50 via-sky-400/70 to-primary/50 shadow-[0_0_18px_hsl(var(--primary)/0.25)]">
          <div className="flex items-center gap-3 rounded-full bg-background/85 backdrop-blur-md px-5 py-2">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.8)]" />
            </span>
            <span className="text-sm font-medium tracking-wide">
              <span className="text-muted-foreground">Open to </span>
              <span className="bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent font-semibold">
                Senior / AI Automation
              </span>
              <span className="text-muted-foreground"> Roles</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

        {/* ── Left column ──────────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-7">

          {/* Name + typing title */}
          <div className="space-y-2 anim-fade-up" style={{ animationDelay: "0.15s" }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              <span className="block text-foreground">{info.main.name.split(" ")[0]}</span>
              <span className="block bg-gradient-to-r from-primary via-sky-400 to-primary/70 bg-clip-text text-transparent">
                {info.main.name.split(" ")[1]}
              </span>
            </h1>
            <TypingText />
          </div>

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl anim-fade-up"
            style={{ animationDelay: "0.25s" }}>
            {info.main.description}
          </p>

          {/* Impact highlights */}
          <ul className="space-y-1.5 anim-fade-up" style={{ animationDelay: "0.35s" }}>
            {IMPACT.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5 flex-shrink-0 font-bold">›</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Stats — value + icon + label */}
          <div className="grid grid-cols-3 gap-4 py-5 border-y border-border anim-fade-up"
            style={{ animationDelay: "0.4s" }}>
            {STATS.map(({ value, label, Icon }) => (
              <div key={label} className="space-y-1 group cursor-default">
                <div className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary/50 flex-shrink-0" />
                  <span className="text-2xl sm:text-3xl font-black text-primary
                                   group-hover:scale-110 transition-transform duration-200 inline-block">
                    {value}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 anim-fade-up" style={{ animationDelay: "0.5s" }}>
            {/* Primary — gradient with glow */}
            <Button
              size="lg"
              className="gap-2 font-semibold border-0 text-white
                         bg-gradient-to-r from-primary to-sky-500
                         shadow-[0_4px_20px_hsl(var(--primary)/0.4)]
                         hover:shadow-[0_6px_30px_hsl(var(--primary)/0.55)]
                         hover:-translate-y-0.5 transition-all duration-200"
              asChild
            >
              <Link href="#projects">
                View My Work <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {/* Secondary — outline */}
            <Button size="lg" variant="outline"
              className="gap-2 border-border hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-200"
              asChild>
              <Link href="#contact">
                <Mail className="h-4 w-4" /> Let&apos;s Connect
              </Link>
            </Button>
          </div>

          {/* Core Stack */}
          <div className="space-y-3 pt-1 anim-fade-up" style={{ animationDelay: "0.6s" }}>
            <p className="text-xs font-mono text-muted-foreground/70 tracking-[0.2em] uppercase">
              Core Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map(({ icon: Icon, name, color }) => (
                <div
                  key={name}
                  title={name}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-default
                             transition-all duration-200 hover:brightness-125 hover:scale-105
                             hover:-translate-y-px select-none"
                  style={{
                    backgroundColor: hexRgba(color, 0.08),
                    borderColor:     hexRgba(color, 0.28),
                  }}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" style={{ color }} />
                  <span className="text-xs font-mono font-medium leading-none"
                    style={{ color: hexRgba(color, 0.9) }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column — photo ──────────────────────────────────────── */}
        <div className="order-first lg:order-last lg:col-span-2 flex justify-center lg:justify-end
                        anim-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative">

            {/* Ambient glow */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />

            {/* Gradient border wrapper — same 1px padding trick as status badge */}
            <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-b from-primary/50 via-primary/20 to-transparent">
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-[360px] rounded-2xl overflow-hidden
                              shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
                <Image
                  src={info.main.photo}
                  alt={`${info.main.name} — Senior Full-Stack & AI Automation Engineer`}
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Bottom depth fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>

            {/* Floating badge — top right: speciality */}
            <div className="absolute -top-4 -right-3 lg:-right-6 z-10 anim-fade-up"
              style={{ animationDelay: "0.55s" }}>
              <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-border
                              rounded-xl px-3 py-2 shadow-xl">
                <div className="h-6 w-6 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground">Speciality</p>
                  <p className="text-xs font-semibold text-foreground mt-0.5">AI Engineer</p>
                </div>
              </div>
            </div>

            {/* Floating badge — left middle: experience */}
            <div className="absolute top-1/3 -left-6 lg:-left-14 z-10 anim-fade-up"
              style={{ animationDelay: "0.65s" }}>
              <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-border
                              rounded-xl px-3 py-2 shadow-xl">
                <div className="h-6 w-6 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground">Experience</p>
                  <p className="text-xs font-semibold text-foreground mt-0.5">6+ Years</p>
                </div>
              </div>
            </div>

            {/* Floating chip — available for hire */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap
                            bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium shadow-lg">
              <span className="text-primary">●</span>{" "}
              <span className="text-foreground">Available for hire</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section divider ──────────────────────────────────────────────── */}
      <div className="mt-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    </section>
  );
}
