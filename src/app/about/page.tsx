import type { Metadata } from "next";
import info from "@/data/user_info";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Briefcase, Globe, Download, ArrowRight,
  Star, BarChart2, Cpu, Quote, Monitor, Layers,
  Cloud, Users, Lightbulb, CheckSquare, Handshake,
  Heart, GraduationCap, Award,
} from "lucide-react";
import {
  SiNextdotjs, SiReact, SiTypescript, SiJavascript,
  SiNodedotjs, SiPython, SiPostgresql, SiSupabase,
  SiAmazonwebservices, SiDocker, SiVercel, SiOpenai,
  SiTailwindcss, SiGit, SiGithub, SiFigma,
} from "react-icons/si";
import { hexRgba } from "@/lib/utils";

export const metadata: Metadata = {
  title: `About — ${info.main.name}`,
  description: info.main.description,
};

// ── Stats ──────────────────────────────────────────────────────────────────
const STATS = [
  { value: "6+",   label: "Years Experience",    Icon: Star         },
  { value: "50+",  label: "Projects Delivered",  Icon: BarChart2    },
  { value: "20+",  label: "Technologies",        Icon: Cpu          },
  { value: "100%", label: "Client Satisfaction", Icon: Heart        },
];

// ── Services ───────────────────────────────────────────────────────────────
const SERVICES = [
  {
    Icon: Monitor,
    label: "Full-Stack Development",
    desc: "Building modern, scalable web and mobile applications using Next.js, React, Node.js and modern technologies.",
    color: "#8b5cf6",
    bg: "bg-violet-500/10",
  },
  {
    Icon: Cpu,
    label: "AI & LLM Integration",
    desc: "Building AI-powered features and integrating LLMs like OpenAI, with real-world applications.",
    color: "#2563eb",
    bg: "bg-blue-500/10",
  },
  {
    Icon: Cloud,
    label: "Cloud & DevOps",
    desc: "Deploying and maintaining scalable infrastructure using AWS, Docker, and CI/CD pipelines.",
    color: "#10b981",
    bg: "bg-emerald-500/10",
  },
  {
    Icon: Users,
    label: "Team Leadership",
    desc: "Leading engineering teams, mentoring developers, and driving technical strategy and product development.",
    color: "#f97316",
    bg: "bg-orange-500/10",
  },
];

// ── Values ─────────────────────────────────────────────────────────────────
const VALUES = [
  { Icon: Lightbulb,   label: "Innovation",    desc: "Always exploring new technologies and better ways to solve problems.",       color: "#f59e0b", bg: "bg-amber-500/10"  },
  { Icon: CheckSquare, label: "Quality",       desc: "Writing clean, maintainable code and delivering reliable solutions.",        color: "#8b5cf6", bg: "bg-violet-500/10" },
  { Icon: Handshake,   label: "Collaboration", desc: "Working with teams and clients to achieve shared goals.",                   color: "#3b82f6", bg: "bg-blue-500/10"   },
  { Icon: Heart,       label: "Impact",        desc: "Building products that create real value and positive change.",             color: "#ef4444", bg: "bg-red-500/10"    },
];

// ── Tech chips ─────────────────────────────────────────────────────────────
type AnyIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const TECH: { Icon: AnyIcon; name: string; color: string }[] = [
  { Icon: SiNextdotjs as AnyIcon,         name: "Next.js",      color: "#94a3b8" },
  { Icon: SiReact as AnyIcon,             name: "React.js",     color: "#61dafb" },
  { Icon: SiTypescript as AnyIcon,        name: "TypeScript",   color: "#3178c6" },
  { Icon: SiJavascript as AnyIcon,        name: "JavaScript",   color: "#f7df1e" },
  { Icon: SiNodedotjs as AnyIcon,         name: "Node.js",      color: "#339933" },
  { Icon: SiPython as AnyIcon,            name: "Python",       color: "#3776ab" },
  { Icon: SiPostgresql as AnyIcon,        name: "PostgreSQL",   color: "#4169e1" },
  { Icon: SiSupabase as AnyIcon,          name: "Supabase",     color: "#3ecf8e" },
  { Icon: SiAmazonwebservices as AnyIcon, name: "AWS",          color: "#ff9900" },
  { Icon: SiDocker as AnyIcon,            name: "Docker",       color: "#2496ed" },
  { Icon: SiVercel as AnyIcon,            name: "Vercel",       color: "#000000" },
  { Icon: SiOpenai as AnyIcon,            name: "OpenAI API",   color: "#10a37f" },
  { Icon: SiTailwindcss as AnyIcon,       name: "Tailwind CSS", color: "#06b6d4" },
  { Icon: SiGit as AnyIcon,              name: "Git",          color: "#f1502f" },
  { Icon: SiGithub as AnyIcon,           name: "GitHub",       color: "#6e6e6e" },
  { Icon: SiFigma as AnyIcon,            name: "Figma",        color: "#f24e1e" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="pt-12 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div className="space-y-6 order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-primary/10 border border-primary/25 text-primary text-xs font-semibold">
                <Briefcase className="h-3.5 w-3.5" />
                About Me
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                <span className="block text-foreground">Turning Ideas into</span>
                <span className="block text-primary">Real-World Impact</span>
              </h1>

              {/* Description */}
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                I&apos;m {info.main.name}, a Full-Stack &amp; AI Engineer with 6+ years of
                experience building scalable web and mobile applications.
                Currently, I lead the engineering team at Matchez, where I drive
                technical strategy, AI/LLM integrations, and product development.
              </p>

              {/* Info pills */}
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 text-xs font-medium bg-muted border border-border
                                 px-3 py-1.5 rounded-full text-foreground">
                  <MapPin className="h-3 w-3 text-primary" /> Tanzania (Remote)
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium bg-muted border border-border
                                 px-3 py-1.5 rounded-full text-foreground">
                  <Briefcase className="h-3 w-3 text-primary" /> Head of Engineering
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium bg-muted border border-border
                                 px-3 py-1.5 rounded-full text-foreground">
                  <Globe className="h-3 w-3 text-primary" /> Open to Opportunities
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/Eckysaroyd-Nyato-CV.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white
                             font-semibold rounded-xl shadow-lg shadow-primary/30 text-sm
                             hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Download className="h-4 w-4" /> Download CV
                </a>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border
                             text-foreground font-semibold rounded-xl text-sm bg-background
                             hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Let&apos;s Connect
                </Link>
              </div>
            </div>

            {/* Right — photo */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 rounded-3xl bg-primary/8 blur-3xl" />
                <div className="relative p-[2px] rounded-2xl bg-gradient-to-b from-primary/60 via-primary/20 to-transparent">
                  <div className="relative w-64 h-80 sm:w-72 sm:h-[360px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={info.main.photo}
                      alt={info.main.name}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Name signature */}
                    <div className="absolute bottom-3 left-0 right-0 text-center">
                      <p className="text-white/90 text-sm font-semibold italic drop-shadow">{info.main.name}</p>
                    </div>
                  </div>
                </div>

                {/* Badge — top right: 6+ Years */}
                <div className="absolute -top-4 -right-4 sm:-right-6 z-10">
                  <div className="flex items-center gap-2 bg-card border border-border rounded-xl
                                  px-3 py-2 shadow-xl backdrop-blur-sm">
                    <div className="h-7 w-7 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                      <Star className="h-3.5 w-3.5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="text-sm font-black text-foreground">6+ Years</p>
                    </div>
                  </div>
                </div>

                {/* Badge — left: 50+ Projects */}
                <div className="absolute top-1/3 -left-4 sm:-left-16 z-10">
                  <div className="-ml-10 sm:ml-0 flex items-center gap-2 bg-card border border-border
                                  rounded-xl px-3 py-2 shadow-xl backdrop-blur-sm">
                    <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <BarChart2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Delivered</p>
                      <p className="text-sm font-black text-foreground">50+ Projects</p>
                    </div>
                  </div>
                </div>

                {/* Badge — bottom: AI & LLM */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                  <div className="flex items-center gap-2 bg-card border border-border rounded-xl
                                  px-4 py-2 shadow-xl backdrop-blur-sm">
                    <div className="h-6 w-6 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                      <Cpu className="h-3.5 w-3.5 text-violet-500" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">AI &amp; LLM Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden
                          border border-border shadow-sm">
            {STATS.map(({ value, label, Icon }) => (
              <div key={label}
                   className="flex flex-col items-center justify-center py-6 px-4 bg-card
                              hover:bg-primary/5 transition-colors duration-200 text-center gap-1">
                <Icon className="h-5 w-5 text-primary/50 mb-1" />
                <span className="text-3xl font-black text-primary">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        {/* ── My Story ──────────────────────────────────────────────────── */}
        <section className="pt-20 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — photo + quote */}
            <div className="relative">
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-b from-primary/40 to-transparent">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-muted">
                  <Image
                    src={info.main.photo}
                    alt={info.main.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Quote overlay */}
              <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-6">
                <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-xl
                                border border-border/50">
                  <Quote className="h-5 w-5 text-primary mb-2" />
                  <p className="text-sm font-medium text-foreground leading-relaxed italic">
                    &ldquo;Technology, AI, and people — a combination that creates real opportunities.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right — story */}
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-2">
                  My Story
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground">From Passion to Purpose</h2>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  My journey in technology started with a simple curiosity — how things work
                  and how software can solve real-world problems. That curiosity turned into a
                  passion for building, learning, and creating products that make a difference.
                </p>
                <p>
                  Over the years, I&apos;ve worked with startups, agencies, and enterprises,
                  building web and mobile applications, integrating AI/LLM solutions, and leading
                  teams to deliver scalable and secure systems. Today, as the Head of Engineering
                  at Matchez, I focus on engineering strategy, product development, and innovation
                  using modern technologies.
                </p>
                <p>
                  I&apos;m driven by the belief that technology should create real value — for people,
                  businesses, and communities. I enjoy working on challenging problems, learning
                  new technologies, and helping teams grow.
                </p>
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white
                           font-semibold rounded-xl shadow-lg shadow-primary/30 text-sm
                           hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
              >
                Let&apos;s Work Together <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        {/* ── What I Do ─────────────────────────────────────────────────── */}
        <section className="pt-20 pb-0">
          <div className="mb-8 space-y-2">
            <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">What I Do</p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">What I Do</h2>
            <p className="text-muted-foreground text-sm max-w-lg">
              I work at the intersection of software engineering, AI, and product development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(({ Icon, label, desc, color, bg }) => (
              <div key={label}
                   className="group p-6 rounded-2xl border border-border bg-card
                              hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg
                              transition-all duration-300 space-y-4">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}
                     style={{ border: `1px solid ${color}28` }}>
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        {/* ── Values + Tech Stack ───────────────────────────────────────── */}
        <section className="pt-20 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Values */}
            <div>
              <div className="mb-6 space-y-2">
                <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">My Values</p>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">What Drives Me</h2>
                <p className="text-sm text-muted-foreground">
                  These are the core values that shape my work, decisions,
                  and how I collaborate with teams and clients.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {VALUES.map(({ Icon, label, desc, color, bg }) => (
                  <div key={label}
                       className="p-4 rounded-xl border border-border bg-card hover:border-primary/30
                                  hover:-translate-y-0.5 transition-all duration-200 space-y-2">
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}
                         style={{ border: `1px solid ${color}25` }}>
                      <Icon className="h-4 w-4" style={{ color }} />
                    </div>
                    <p className="font-bold text-xs text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <div className="mb-6 space-y-2">
                <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">Tech Stack</p>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">Technologies I Work With</h2>
                <p className="text-sm text-muted-foreground">
                  A selection of the technologies and tools I use to build modern applications.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TECH.map(({ Icon, name, color }) => (
                  <div key={name}
                       className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border
                                  bg-card hover:border-primary/30 hover:-translate-y-0.5
                                  transition-all duration-200 cursor-default"
                       style={{ borderColor: hexRgba(color, 0.2) }}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" style={{ color }} />
                    <span className="text-xs font-medium text-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        {/* ── Education & Certifications ────────────────────────────────── */}
        <section className="pt-20 pb-0">
          <div className="mb-8 space-y-2">
            <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5" /> Educations
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-black text-foreground">Education &amp; Certifications</h2>
              <p className="text-sm text-muted-foreground">My academic background and professional certifications.</p>
            </div>
          </div>

          {/* Education timeline — horizontal */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-4 left-4 right-4 h-px bg-primary/25 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {info.education.map((edu, i) => (
                <div key={edu.school}
                     className="relative p-5 rounded-2xl border border-border bg-card
                                hover:border-primary/30 hover:-translate-y-1 hover:shadow-md
                                transition-all duration-300 space-y-3">
                  {/* Year pill */}
                  <span className="inline-block text-xs font-mono font-semibold text-primary
                                   bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                    {edu.duration}
                  </span>

                  {/* Logo */}
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border bg-background flex-shrink-0">
                    <Image src={edu.image} alt={edu.school} fill className="object-contain p-1" />
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-sm text-foreground leading-snug">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{edu.school}</p>
                  </div>
                </div>
              ))}

              {/* Certificates as cards */}
              {info.certificates.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-5 rounded-2xl border border-amber-500/25 bg-amber-500/5
                             hover:border-amber-500/50 hover:-translate-y-1 hover:shadow-md
                             transition-all duration-300 space-y-3 group"
                >
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-amber-600 dark:text-amber-400
                                   bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full">
                    <Award className="h-3 w-3" /> Certification
                  </span>

                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border bg-background">
                    <Image src={cert.icon} alt={cert.title} fill className="object-contain p-0.5" />
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                      {cert.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cert.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="pt-20 pb-16">
          <div className="relative rounded-2xl border border-primary/20 overflow-hidden
                          bg-gradient-to-br from-primary/8 via-primary/3 to-transparent p-10 sm:p-14">
            <div aria-hidden className="absolute inset-0 pointer-events-none"
                 style={{
                   backgroundImage: "radial-gradient(circle at 1.5px 1.5px, hsl(var(--primary)/0.08) 1px, transparent 0)",
                   backgroundSize: "28px 28px",
                 }} />
            <div aria-hidden className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
                  Let&apos;s Build Together
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                  Have a <span className="text-primary">Project</span> in Mind?
                </h2>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  I&apos;m always open to discussing new opportunities, exciting projects,
                  or ways to collaborate. Let&apos;s create something amazing together.
                </p>
              </div>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white
                           font-semibold rounded-xl shadow-lg shadow-primary/30 text-sm flex-shrink-0
                           hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
              >
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
