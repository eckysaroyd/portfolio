import { getPortfolioMeta, getServices } from "@/lib/portfolio-data";
import Link from "next/link";
import Image from "next/image";
import { Mail, Linkedin, Github, ArrowUp } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home",       href: "/"           },
  { label: "About",      href: "/about"      },
  { label: "Projects",   href: "/projects"   },
  { label: "Experience", href: "/experience" },
  { label: "Skills",     href: "/skills"     },
  { label: "Contact",    href: "/contact"    },
];

export default async function Footer() {
  const [meta, services] = await Promise.all([getPortfolioMeta(), getServices()]);
  const year = new Date().getFullYear();

  const SOCIALS = [
    { icon: Mail,     label: "Email",    href: `mailto:${meta.email}` },
    { icon: Linkedin, label: "LinkedIn", href: meta.linkedin          },
    { icon: Github,   label: "GitHub",   href: meta.github            },
  ];

  return (
    <footer className="relative border-t border-border pt-12 pb-8 overflow-hidden">

      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2
                                   w-[600px] h-40 bg-primary/5 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-10">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex w-fit">
              <Image
                src="/images/en-logo.png"
                alt={meta.name}
                width={360}
                height={197}
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Head of Engineering &amp; Full-Stack AI Engineer building scalable systems
              and intelligent automation that drives real business value.
            </p>
            {/* Social row */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-border bg-muted/50 flex items-center justify-center
                             text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-200"
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Quick Links</p>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}
                     className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Services</p>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {year}{" "}
            <span className="font-medium text-foreground">{meta.name}</span>
            {" · "}All Rights Reserved
          </p>

          <a href="#" aria-label="Back to top"
             className="group flex items-center gap-2 text-xs text-muted-foreground
                        hover:text-primary transition-colors duration-200">
            <span className="hidden sm:inline">Back to top</span>
            <span className="w-7 h-7 rounded-full border border-border bg-muted/50 flex items-center justify-center
                             group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-200">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}
