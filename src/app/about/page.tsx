import type { Metadata } from "next";
import info from "@/data/user_info";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Briefcase, Globe, Download, ArrowRight,
  Star, BarChart2, Cpu, Monitor, Layers,
  Cloud, Users, Lightbulb, CheckSquare, Handshake,
  Heart, GraduationCap, Award, Send,
} from "lucide-react";
import {
  SiNextdotjs, SiReact, SiTypescript, SiJavascript,
  SiNodedotjs, SiPython, SiPostgresql, SiSupabase,
  SiAmazonwebservices, SiDocker, SiVercel, SiOpenai,
  SiTailwindcss, SiGit, SiGithub, SiFigma, SiStripe, SiExpo,
} from "react-icons/si";
import { hexRgba } from "@/lib/utils";

export const metadata: Metadata = {
  title: `About — ${info.main.name}`,
  description: info.main.description,
};

const STATS = [
  { value: "6+",   label: "Years Experience",    Icon: Star      },
  { value: "50+",  label: "Projects Delivered",  Icon: BarChart2 },
  { value: "20+",  label: "Technologies",        Icon: Layers    },
  { value: "100%", label: "Client Satisfaction", Icon: Heart     },
];

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

const VALUES = [
  { Icon: Lightbulb,   label: "Innovation",    desc: "Always exploring new technologies and better ways to solve problems.",  color: "#f59e0b", bg: "bg-amber-500/10"  },
  { Icon: CheckSquare, label: "Quality",       desc: "Writing clean, maintainable code and delivering reliable solutions.",   color: "#8b5cf6", bg: "bg-violet-500/10" },
  { Icon: Handshake,   label: "Collaboration", desc: "Working with teams and clients to achieve shared goals.",              color: "#3b82f6", bg: "bg-blue-500/10"   },
  { Icon: Heart,       label: "Impact",        desc: "Building products that create real value and positive change.",        color: "#ef4444", bg: "bg-red-500/10"    },
];

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
  { Icon: SiVercel as AnyIcon,            name: "Vercel",       color: "#94a3b8" },
  { Icon: SiOpenai as AnyIcon,            name: "OpenAI API",   color: "#10a37f" },
  { Icon: SiTailwindcss as AnyIcon,       name: "Tailwind CSS", color: "#06b6d4" },
  { Icon: SiGit as AnyIcon,              name: "Git",          color: "#f1502f" },
  { Icon: SiGithub as AnyIcon,           name: "GitHub",       color: "#6e6e6e" },
  { Icon: SiFigma as AnyIcon,            name: "Figma",        color: "#f24e1e" },
  { Icon: SiStripe as AnyIcon,           name: "Stripe",       color: "#635bff" },
  { Icon: SiExpo as AnyIcon,             name: "React Native", color: "#000020" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-14 sm:pt-16 md:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="pt-12 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            {/* Left — text */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-primary/10 border border-primary/25 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                About Me
              </div>

              <h1 className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight">
                <span className="block text-foreground">Turning Ideas into</span>
                <span className="block text-primary">Real-World Impact</span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                I&apos;m {info.main.name}, a Full-Stack &amp; AI Engineer with 6+ years of experience
                building scalable web and mobile applications. I currently lead the engineering
                team at Matchez, where I drive technical strategy, AI/LLM integrations, and
                product development.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { icon: MapPin,    text: "Tanzania (Remote)" },
                  { icon: Briefcase, text: "Head of Engineering" },
                  { icon: Globe,     text: "Open to Opportunities" },
                ].map(({ icon: Icon, text }) => (
                  <span key={text}
                        className="flex items-center gap-1.5 text-xs font-medium bg-muted border border-border
                                   px-3 py-1.5 rounded-full text-foreground">
                    <Icon className="h-3 w-3 text-primary" /> {text}
                  </span>
                ))}
              </div>

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
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border
                             text-foreground font-semibold rounded-xl text-sm bg-background
                             hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Let&apos;s Connect <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right — tech illustration */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 rounded-3xl bg-sky-100/60 dark:bg-sky-900/20 blur-2xl" />
                <Image
                  src="/images/about-hero.png"
                  alt="Full-Stack & AI Engineering"
                  width={560}
                  height={400}
                  className="relative w-full h-auto object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden
                          border border-border shadow-sm">
            {STATS.map(({ value, label, Icon }) => (
              <div key={label}
                   className="flex flex-col items-center justify-center py-6 px-4 bg-card
                              hover:bg-primary/5 transition-colors duration-200 text-center gap-1">
                <Icon className="h-5 w-5 text-primary/60 mb-1" />
                <span className="text-3xl font-black text-primary">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        {/* ── My Story ────────────────────────────────────────────────────── */}
        <section className="pt-20 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — dashboard illustration */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 rounded-3xl bg-blue-100/50 dark:bg-blue-900/20 blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
                  <Image
                    src="/images/about-story.png"
                    alt="Cloud Development"
                    width={560}
                    height={420}
                    className="w-full h-auto object-contain p-4"
                  />
                </div>
              </div>
            </div>

            {/* Right — story text */}
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-2">
                  My Story
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground">
                  From Passion to Purpose
                </h2>
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
                  I&apos;m driven by the belief that technology should create real value — for
                  people, businesses, and communities. I enjoy working on challenging problems,
                  learning new technologies, and helping teams grow.
                </p>
              </div>

              <Link
                href="/contact"
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

        {/* ── What I Do ───────────────────────────────────────────────────── */}
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

        {/* ── Values + Tech Stack ──────────────────────────────────────────── */}
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
                       className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border bg-card
                                  hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                       style={{ borderColor: hexRgba(color, 0.25) }}
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

        {/* ── Education & Certifications ───────────────────────────────────── */}
        <section className="pt-20 pb-0">
          <div className="mb-8">
            <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase flex items-center gap-1.5 mb-2">
              <GraduationCap className="h-3.5 w-3.5" /> Education &amp; Certifications
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <h2 className="text-3xl sm:text-4xl font-black text-foreground">
                Education &amp; Certifications
              </h2>
              <p className="text-sm text-muted-foreground">My academic background and professional certifications.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {info.education.map((edu) => (
              <div key={edu.school}
                   className="p-5 rounded-2xl border border-border bg-card
                              hover:border-primary/30 hover:-translate-y-1 hover:shadow-md
                              transition-all duration-300 space-y-3">
                <span className="inline-block text-xs font-mono font-semibold text-primary
                                 bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                  {edu.duration}
                </span>
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border bg-background">
                  <Image src={edu.image} alt={edu.school} fill className="object-contain p-1" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-sm text-foreground leading-snug">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{edu.school}</p>
                </div>
              </div>
            ))}

            {info.certificates.map((cert) => (
              <a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl border border-amber-500/25 bg-amber-500/5
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

          <div className="mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="pt-20 pb-16">
          <div className="relative rounded-2xl border border-primary/20 overflow-hidden
                          bg-gradient-to-br from-primary/8 via-primary/3 to-transparent px-8 py-12 sm:px-14 sm:py-16">
            <div aria-hidden className="absolute inset-0 pointer-events-none"
                 style={{
                   backgroundImage: "radial-gradient(circle at 1.5px 1.5px, hsl(var(--primary)/0.07) 1px, transparent 0)",
                   backgroundSize: "28px 28px",
                 }} />
            <div aria-hidden className="absolute -top-16 -right-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />

            {/* Paper plane decoration */}
            <div aria-hidden className="absolute right-8 bottom-6 opacity-10">
              <Send className="h-28 w-28 text-primary -rotate-12" strokeWidth={1} />
            </div>

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
                href="/contact"
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
