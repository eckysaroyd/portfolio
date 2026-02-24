"use client";

import { useState } from "react";
import info from "@/data/user_info";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactModal } from "@/components/ContactModal";
import { Mail, Linkedin, Github, MessageSquare } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: info.main.email,
    href: `mailto:${info.main.email}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "eckysaroyd",
    href: info.socials.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "eckysaroyd",
    href: info.socials.github,
  },
];

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="contact" className="py-20 sm:py-24">
      {/* Header */}
      <div className="mb-12 space-y-3">
        <p className="text-sm font-mono text-primary tracking-widest uppercase">Contact</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Let&apos;s Work Together
        </h2>
        <p className="text-muted-foreground max-w-xl">
          Available for freelance projects, consulting, and full-time opportunities. Typical
          response time: within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left — contact methods */}
        <div className="space-y-3">
          {contactLinks.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {value}
                </p>
              </div>
            </a>
          ))}

          <p className="text-sm text-muted-foreground pt-4 leading-relaxed">
            {info.contact.note}
          </p>
        </div>

        {/* Right — CTA card */}
        <Card className="border-border bg-card">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">Start a Conversation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have a project in mind or just want to say hi? Fill out the form and I&apos;ll
                get back to you shortly.
              </p>
            </div>

            {/* Availability indicator */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Currently available for new projects
            </div>

            <Button
              size="lg"
              className="w-full gap-2 font-semibold shadow-[0_4px_20px_hsl(var(--primary)/0.3)]"
              onClick={() => setIsOpen(true)}
            >
              <MessageSquare className="h-4 w-4" />
              Send a Message
            </Button>
          </CardContent>
        </Card>
      </div>

      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
