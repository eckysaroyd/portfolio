import info from "@/data/user_info";
import Link from "next/link";
import { Mail, Linkedin, Github, ArrowUp, Sparkles } from "lucide-react";

// ── Data ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",       href: "#hero"       },
  { label: "Projects",   href: "#projects"   },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

const SOCIAL_LINKS = [
  { icon: Mail,     label: "Email",    value: info.main.email,           href: `mailto:${info.main.email}`, color: "#0ea5e9" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/eckysaroyd", href: info.socials.linkedin,       color: "#0a66c2" },
  { icon: Github,   label: "GitHub",   value: "github.com/eckysaroyd",   href: info.socials.github,           color: "#8b5cf6" },
];

const BUILT_WITH = ["Next.js", "TailwindCSS", "TypeScript", "shadcn/ui"];

// ── Component ──────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 overflow-hidden">

      {/* Top gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-12" />

      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2
                                  w-[600px] h-48 bg-primary/5 blur-3xl rounded-full" />

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">

        {/* ── Brand col (spans 2 on lg) ──────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Name + role */}
          <div>
            <p className="text-xl font-black text-foreground tracking-tight">
              {info.main.name.split(" ")[0]}{" "}
              <span className="text-primary">{info.main.name.split(" ")[1]}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-xs">
              Senior Full-Stack &amp; AI Automation Engineer — building scalable systems
              and intelligent automation that drives real business value.
            </p>
          </div>

          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20
                          text-green-600 dark:text-green-400 rounded-full px-4 py-1.5 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Open to new opportunities
          </div>

          {/* Built with chips */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
              Built with
            </p>
            <div className="flex flex-wrap gap-1.5">
              {BUILT_WITH.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-full border border-border
                             bg-muted/50 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Quick links ────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
            Navigation
          </p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground
                             hover:text-primary transition-colors duration-200"
                >
                  <span className="h-px w-4 bg-border group-hover:w-6 group-hover:bg-primary
                                   transition-all duration-200" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Connect ────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
            Connect
          </p>
          <ul className="space-y-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, value, href, color }) => (
              <li key={label}>
                <Link
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                               transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: `${color}18`, border: `1px solid ${color}28` }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground/60 font-mono">{label}</p>
                    <p className="text-xs font-medium text-muted-foreground group-hover:text-primary
                                  transition-colors truncate">
                      {value}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="relative border-t border-border pt-6 pb-8 flex flex-col sm:flex-row
                      items-center justify-between gap-4">

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary/60" />
          <span>
            &copy; {year}{" "}
            <span className="font-medium text-foreground">{info.main.name}</span>
            {" · "}All Rights Reserved
          </span>
        </div>

        {/* Back to top */}
        <a
          href="#hero"
          aria-label="Back to top"
          className="group flex items-center gap-2 text-xs text-muted-foreground
                     hover:text-primary transition-colors duration-200"
        >
          <span className="hidden sm:inline">Back to top</span>
          <span className="w-7 h-7 rounded-full border border-border bg-muted/50
                           flex items-center justify-center
                           group-hover:border-primary/40 group-hover:bg-primary/10
                           transition-all duration-200">
            <ArrowUp className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </footer>
  );
}
