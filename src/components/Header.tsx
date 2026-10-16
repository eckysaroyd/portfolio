"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import info from "@/data/user_info";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Github, Linkedin, Menu, X, Download } from "lucide-react";

const NAV = [
  { label: "Home",       href: "/#hero",      id: "hero"       },
  { label: "About",      href: "/about",       id: "about"      },
  { label: "Projects",   href: "/projects",   id: "projects"   },
  { label: "Experience", href: "/experience",  id: "experience" },
  { label: "Skills",     href: "/skills",     id: "skills"     },
  { label: "Contact",    href: "/contact",    id: "contact"    },
];

const SOCIALS = [
  { icon: Github,   label: "GitHub",   href: info.socials.github  },
  { icon: Linkedin, label: "LinkedIn", href: info.socials.linkedin },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("hero");
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Set active nav item for dedicated route pages
  useEffect(() => {
    if (pathname === "/about")      setActive("about");
    else if (pathname === "/projects")  setActive("projects");
    else if (pathname === "/experience") setActive("experience");
    else if (pathname === "/skills")    setActive("skills");
    else if (pathname === "/contact")   setActive("contact");
    else setActive("hero");
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["hero", "projects", "experience", "skills", "contact"];
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
  }, [pathname]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md
                            group-hover:shadow-primary/40 transition-shadow duration-200">
              <span className="text-white text-sm font-black tracking-tight">EN</span>
            </div>
            <span className="font-bold text-foreground text-sm hidden sm:block">
              {info.main.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV.map(({ label, href, id }) => {
              const isActive = active === id;
              return (
                <Link
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
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Social icons — desktop */}
            <div className="hidden sm:flex items-center gap-0.5">
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

            {/* Download CV button */}
            <a
              href="/Eckysaroyd-Nyato-CV.pdf"
              download
              className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm
                         font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200
                         shadow-md hover:shadow-primary/30"
            >
              <Download className="h-3.5 w-3.5" />
              Download CV
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground
                         hover:bg-accent transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-t border-border px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV.map(({ label, href, id }) => {
              const isActive = active === id;
              return (
                <Link
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
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 pt-3 mt-3 border-t border-border">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <a
              href="/Eckysaroyd-Nyato-CV.pdf"
              download
              onClick={() => setMenuOpen(false)}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs
                         font-semibold rounded-lg"
            >
              <Download className="h-3 w-3" />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
