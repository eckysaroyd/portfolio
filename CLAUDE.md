# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start Next.js development server
npm run build   # Production build
npm run start   # Run production build locally
npm run lint    # ESLint (zero warnings allowed)
```

No test suite is configured in this project.

## Architecture

This is a **Next.js 14 App Router portfolio** built with TypeScript, Tailwind CSS, and shadcn/ui. Single page (`/`) with a fixed sticky header and 6 sections.

### Data Layer

All personal content (name, bio, projects, skills, experience, education, certificates, contact) lives in one file:

**`src/data/user_info.ts`** — the single source of truth. Every section imports from here. To update any content, edit only this file.

### Component Structure

```
src/
  app/
    layout.tsx           # ThemeProvider (light default) + Header mount
    page.tsx             # pt-16 offset + all sections composed here
    not-found.tsx        # 404 page
    globals.css          # CSS variables, anim-fade-up keyframes
    api/contact/
      route.ts           # POST — Nodemailer Gmail SMTP (server-side)
  components/
    Header.tsx           # "use client" — sticky nav, glassmorphism on scroll,
                         #   active section via IntersectionObserver, mobile menu
    ProjectCard.tsx      # TechChip with brand icon + hexRgba colors
    ContactModal.tsx     # "use client" — Dialog, calls /api/contact
    ThemeToggle.tsx      # "use client" — next-themes sun/moon toggle
    TypingText.tsx       # "use client" — animated role title typewriter
    ui/                  # shadcn/ui: button, card, badge, dialog,
                         #   separator, input, textarea
    sections/
      Hero.tsx           # Server — floating badges, stats, core stack chips
      Projects.tsx       # "use client" — 8 projects, category filter pills
      Skills.tsx         # "use client" — AI hero card + 6 category cards
      EducationAndExperience.tsx  # Server — vertical timeline
      Contact.tsx        # "use client" — contact cards, stats, CTA card
      Footer.tsx         # Server — logo, nav, social, dynamic year
```

### Theme System

`next-themes` manages theme with `defaultTheme="light"`. Toggles the `dark` class on `<html>`. `enableSystem` is intentionally disabled to prevent OS preference from overriding the light default. `ThemeToggle.tsx` uses `useTheme()` hook.

### Email — Server-Side (Nodemailer)

`ContactModal.tsx` calls `POST /api/contact` which uses Nodemailer + Gmail SMTP:
- Sends notification email to owner inbox
- Sends auto-reply to the person who submitted the form
- Credentials stored in `.env.local` (never committed)

Required environment variables (also set in Vercel dashboard):
```
GMAIL_USER=enyato98@gmail.com
GMAIL_APP_PASSWORD=<gmail app password>
CONTACT_TO_EMAIL=enyato98@gmail.com
```

### Styling Conventions

- **Tailwind CSS** for all styling — no CSS modules
- **Primary color:** sky-500 (`--primary: 198.6 88.7% 48.4%`)
- **`hexRgba(hex, alpha)`** utility in `lib/utils.ts` — used for dynamic inline brand colors on skill/tech chips
- **`anim-fade-up`** CSS class with stagger via `animationDelay` inline style
- `max-w-5xl mx-auto` container in `page.tsx`

### Project Filters (Projects section)

Filtered by `project.category` field in `user_info.ts`:
- **All Projects** — all 8
- **AI & SaaS** — category: `"AI SaaS Platform"`
- **Web Apps** — everything else (Transportation, Healthcare, E-Commerce, Service, Social)
- **Business Sites** — category: `"Business Website"` or `"Corporate Website"`

### Images

All images live in `/public/images/`. Paths in `user_info.ts` and `layout.tsx` use `/images/filename.ext`.

### Git / Deploy

- **Remote:** `git@github-eckysaroyd:eckysaroyd/portfolio.git`
- **SSH alias:** `github-eckysaroyd` → requires `~/.ssh/id_ed25519_eckysaroyd`
- **Push:** `git push git@github-eckysaroyd:eckysaroyd/portfolio.git main`
- **Deployed:** Vercel auto-deploys on push to `main`

### Key Dependencies

- `next` + `react` — App Router framework
- `next-themes` — dark/light theme manager
- `shadcn/ui` — component library (new-york style)
- `nodemailer` — server-side email sending
- `react-icons` — brand icons (si, fa6)
- `lucide-react` — UI icons
- `geist` — Geist Sans + Mono fonts
