"use client";

import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";
import { Mail, MapPin, Calendar, ArrowRight, Linkedin, Github } from "lucide-react";

type ContactProps = {
  email: string;
  location: string;
  availability: string;
  linkedin: string;
  github: string;
  contactDescription: string;
  contactNote: string;
};

export default function Contact({
  email,
  location,
  availability,
  linkedin,
  github,
  contactDescription,
  contactNote,
}: ContactProps) {
  const [isOpen, setIsOpen] = useState(false);

  const INFO_CARDS = [
    { icon: Mail,     label: "Email",        value: email,        href: `mailto:${email}`, color: "#2563eb" },
    { icon: MapPin,   label: "Location",     value: location,     href: null,              color: "#10b981" },
    { icon: Calendar, label: "Availability", value: availability, href: null,              color: "#f59e0b" },
  ];

  return (
    <section id="contact" className="pt-20 pb-20 relative overflow-hidden">

      {/* Ambient glow */}
      <div aria-hidden className="absolute -top-40 left-1/3 w-[500px] h-[350px]
                                   bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative mb-10 space-y-3">
        <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
          Let&apos;s Work Together
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground">
          Let&apos;s Build Something <span className="text-primary">Great</span>
        </h2>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          {contactDescription}
        </p>
      </div>

      {/* Info cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {INFO_CARDS.map(({ icon: Icon, label, value, href, color }, i) => {
          const Wrapper = href ? "a" : "div";
          const props = href
            ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
            : {};
          return (
            <Wrapper
              key={label}
              {...props}
              className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card
                         hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200
                         anim-fade-up group"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                   style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary
                               transition-colors truncate">
                  {value}
                </p>
              </div>
            </Wrapper>
          );
        })}
      </div>

      {/* CTA card */}
      <div className="relative rounded-2xl border border-primary/20 overflow-hidden
                      bg-gradient-to-br from-primary/8 via-primary/4 to-transparent p-8
                      text-center anim-fade-up" style={{ animationDelay: "0.3s" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none"
             style={{
               backgroundImage: "radial-gradient(circle at 1.5px 1.5px, hsl(var(--primary)/0.08) 1px, transparent 0)",
               backgroundSize: "28px 28px",
             }} />
        <div className="relative space-y-5">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Ready to work together?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {contactNote}
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white
                       font-semibold rounded-xl shadow-lg shadow-primary/30
                       hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 text-sm"
          >
            Send a Message <ArrowRight className="h-4 w-4" />
          </button>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <a href={linkedin} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <span className="text-border">·</span>
            <a href={github} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
