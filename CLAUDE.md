# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # ESLint (zero warnings allowed)
```

No test suite is configured in this project.

## Architecture

This is a **single-page React portfolio** built with Vite, Tailwind CSS, and Preline UI. It has one real route (`/`) and a 404 catch-all.

### Data Layer

All personal content (name, bio, projects, skills, experience, education, certificates, contact info) lives in a single file:

**`src/data/user_info.js`** — the single source of truth. Every section component imports from here. To update any portfolio content, edit only this file.

### Component Structure

```
src/
  App.jsx              # Root: AppContext (theme), BrowserRouter, Routes
  pages/
    Homepage.jsx       # Composes all sections; calls Preline autoInit on route change
    404.jsx
  components/
    AnimatedStarfield.jsx   # Canvas-based background animation
    ContactModal.jsx        # EmailJS contact form modal
    ContactModalNew.jsx     # (unused alternate version)
    Project.jsx             # Project card sub-component
    ToggleTheme.jsx         # Dark/light toggle
    sections/
      Hero.jsx              # Profile image with pixel-explode animation, CTA buttons
      Projects.jsx          # Project grid using Project.jsx
      EducationAndExperience.jsx
      Skills.jsx
      Contact.jsx           # Opens ContactModal
      Footer.jsx
```

### Theme System

`App.jsx` manages a `theme` state (`"dark"` | `"light"`) persisted to `localStorage`. It toggles the `dark` class on `<html>`. Tailwind is configured with `darkMode: "class"`. The theme value and `switchTheme` function are provided via `AppContext`.

### EmailJS Integration

`ContactModal.jsx` uses EmailJS directly in the browser with hardcoded credentials:
- Public key: `5TU3vEpdsLSCDy_3G`
- Service ID: `service_qo0ohq1`
- Main template: `template_4cgzljh`
- Auto-reply template: `template_qqljtcc`

### Styling Conventions

- **Tailwind CSS** for all styling; no separate CSS modules
- Primary accent color: `#00d4ff` (cyan) — used throughout as the brand color
- Dark glassmorphism aesthetic: `bg-white/5 backdrop-blur-sm border border-white/10`
- The main layout container in `Homepage.jsx` has `xl:w-[1200px]` max-width with `md:mx-auto`

### Key Dependencies

- `react-router-dom` v6 — routing
- `preline` — UI component library (accordion, tabs); must call `window.HSStaticMethods.autoInit()` after route changes
- `@emailjs/browser` — client-side email sending
- `react-icons` — icon library (both `react-icons/fa6` and `react-icons/md` are used)
- `lucide-react` — additional icons

### File Duplication Notes

- `src/App.tsx` and `src/main.tsx` are stale Vite scaffold files — the actual entry point is `src/main.jsx` → `src/App.jsx`
- `ContactModalNew.jsx` is an unused alternate version of the contact modal
