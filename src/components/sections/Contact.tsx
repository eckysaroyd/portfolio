"use client";

import { useState } from "react";
import info from "@/data/user_info";
import { ContactModal } from "@/components/ContactModal";
import {
  Mail, Linkedin, Github, MessageSquare,
  ArrowRight, Clock, CheckCircle, Zap,
} from "lucide-react";

// ── Data ───────────────────────────────────────────────────────────────────
const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: info.main.email,
    href: `mailto:${info.main.email}`,
    description: "Best for detailed project inquiries",
    color: "#0ea5e9",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/eckysaroyd",
    href: info.socials.linkedin,
    description: "Connect professionally",
    color: "#0a66c2",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/eckysaroyd",
    href: info.socials.github,
    description: "Browse my open-source work",
    color: "#8b5cf6",
  },
];

const STATS = [
  { value: "24/7",  label: "Response time" },
  { value: "15+",   label: "Projects shipped" },
  { value: "6+",    label: "Years experience" },
];

const OPEN_TO = ["Freelance Projects", "Consulting", "Full-time Roles"];

// ── Component ──────────────────────────────────────────────────────────────
export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="contact" className="py-20 sm:py-24 relative overflow-hidden">

      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/3 w-[500px] h-[350px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-400/5 rounded-full blur-3xl" />
      </div>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="relative mb-12 space-y-4 anim-fade-up">
        <p className="text-sm font-mono text-primary tracking-widest uppercase">Contact</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Let&apos;s Build Something{" "}
              <span className="text-primary">Great</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Available for freelance, consulting, and full-time opportunities.
              I respond to every message personally within 24 hours.
            </p>
          </div>

          {/* Availability pill */}
          <div className="flex items-center gap-2 flex-shrink-0 bg-green-500/10 border border-green-500/25
                          text-green-600 dark:text-green-400 rounded-full px-4 py-2 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Available for new projects
          </div>
        </div>
      </div>

      {/* ── Body grid ─────────────────────────────────────────────────────── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* ── Left: 3 cols ────────────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-4">

          {/* Contact cards */}
          {CONTACT_LINKS.map(({ icon: Icon, label, value, href, description, color }, i) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-border
                         bg-card/60 backdrop-blur-sm hover:border-primary/40
                         transition-all duration-300 anim-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              {/* Icon bubble */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                           transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary
                              transition-colors truncate">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
              </div>

              {/* Arrow */}
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0
                                     group-hover:text-primary group-hover:translate-x-1
                                     transition-all duration-200" />
            </a>
          ))}

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-3 pt-1 anim-fade-up"
            style={{ animationDelay: "0.34s" }}
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-border bg-card/60 p-4 text-center">
                <p className="text-xl font-bold text-primary font-mono">{value}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </div>

          {/* Note */}
          <p
            className="text-sm text-muted-foreground leading-relaxed pt-1 anim-fade-up"
            style={{ animationDelay: "0.42s" }}
          >
            {info.contact.note}
          </p>
        </div>

        {/* ── Right: 2 cols ───────────────────────────────────────────────── */}
        <div className="lg:col-span-2 anim-fade-up" style={{ animationDelay: "0.18s" }}>
          <div className="relative rounded-2xl overflow-hidden border border-primary/20
                          bg-gradient-to-br from-primary/8 via-primary/4 to-transparent">

            {/* Dot-grid */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  `radial-gradient(circle at 1.5px 1.5px, hsl(var(--primary)/0.1) 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />
            {/* Glow blobs */}
            <div aria-hidden className="absolute -top-8 -right-8 w-36 h-36 bg-primary/10 rounded-full blur-2xl" />
            <div aria-hidden className="absolute -bottom-8 -left-8 w-28 h-28 bg-sky-400/8 rounded-full blur-2xl" />

            <div className="relative p-7 space-y-6">

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25
                              flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>

              {/* Copy */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Start a Conversation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Have a project in mind or just want to say hi? Fill out the form and
                  I&apos;ll reply with a thoughtful response.
                </p>
              </div>

              {/* Open to */}
              <div className="space-y-2.5">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Open to
                </p>
                <div className="flex flex-wrap gap-2">
                  {OPEN_TO.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs font-medium
                                 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      <CheckCircle className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                Typical response:&nbsp;
                <span className="font-semibold text-foreground">within 24 hours</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-primary/20 to-transparent" />

              {/* CTA button */}
              <button
                onClick={() => setIsOpen(true)}
                className="group w-full flex items-center justify-center gap-2.5 rounded-xl
                           py-3.5 px-6 bg-primary text-primary-foreground font-semibold text-sm
                           shadow-[0_4px_24px_hsl(var(--primary)/0.35)]
                           hover:shadow-[0_6px_32px_hsl(var(--primary)/0.5)]
                           hover:brightness-110 transition-all duration-200"
              >
                <Zap className="h-4 w-4" />
                Send a Message
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
