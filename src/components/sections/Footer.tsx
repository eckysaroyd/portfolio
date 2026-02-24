import info from "@/data/user_info";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pb-10">
      <Separator className="mb-8" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <Link
            href={info.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline underline-offset-4"
          >
            {info.main.name}
          </Link>
          {" · "}
          {info.footer}
        </p>

        <div className="flex items-center gap-1">
          {[
            { href: `mailto:${info.main.email}`, icon: Mail, label: "Email" },
            { href: info.socials.linkedin,        icon: Linkedin, label: "LinkedIn" },
            { href: info.socials.github,          icon: Github,   label: "GitHub" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/10"
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
