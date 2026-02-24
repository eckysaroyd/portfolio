"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import info from "@/data/user_info";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Github, Linkedin, Menu, X } from "lucide-react";

// ── Data ───────────────────────────────────────────────────────────────────
const NAV = [
  { label: "Home",       href: "#hero"       },
  { label: "Projects",   href: "#projects"   },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

const SOCIALS = [
  { icon: Github,   label: "GitHub",   href: info.socials.github  },
  { icon: Linkedin, label: "LinkedIn", href: info.socials.linkedin },
];

// ── Component ──────────────────────────────────────────────────────────────
export function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("hero");
  const [menuOpen,  setMenuOpen]  = useState(false);

  // ── Scroll glass effect ────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section via IntersectionObserver ────────────────────────────
  useEffect(() => {
    const ids = ["hero", "projects", "skills", "experience", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <a href="#hero" className="flex items-center gap-2.5 group flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt={info.main.name}
              width={36}
              height={36}
              className="rounded-lg object-contain
                         group-hover:opacity-90 transition-opacity duration-200"
              priority
            />
            <div className="hidden sm:block leading-none">
              <span className="text-sm font-bold text-foreground">
                {info.main.name.split(" ")[0]}
              </span>{" "}
              <span className="text-sm font-bold text-primary">
                {info.main.name.split(" ")[1]}
              </span>
            </div>
          </a>

          {/* ── Desktop nav ───────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV.map(({ label, href }) => {
              const id      = href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={label}
                  href={href}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-px h-[2px] bg-primary rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Right controls ────────────────────────────────────────── */}
          <div className="flex items-center gap-1">

            {/* Social icons — desktop */}
            <div className="hidden sm:flex items-center gap-0.5 pr-1 border-r border-border mr-1">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent
                             rounded-lg transition-colors duration-200"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>

            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground
                         hover:bg-accent transition-colors duration-200 ml-1"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen
                ? <X    className="h-5 w-5" />
                : <Menu className="h-5 w-5" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-t border-border px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV.map(({ label, href }) => {
              const id      = href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {isActive && <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />}
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Mobile social row */}
          <div className="flex items-center gap-3 pt-3 mt-3 border-t border-border">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-muted-foreground
                           hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
