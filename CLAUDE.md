# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Connor, built with Astro 6 and TypeScript. Single-page site in Brazilian Portuguese (pt-BR) with hash-based navigation across sections: Hero, About, Experiences, Projects, Contact.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — preview production build

No test runner or linter is configured.

## Architecture

- **Framework**: Astro 6 with `@astrojs/react` integration for interactive islands
- **React islands**: Interactive components in `src/components/react/` hydrated client-side via `client:load` / `client:visible` directives. Astro components (`.astro`) handle static content and layout.
- **Layout**: Single layout in `src/layouts/Layout.astro` loads fonts, global styles, and scripts. Single page entry at `src/pages/index.astro`.
- **Animations**: GSAP (ScrollTrigger, Flip plugin) for scroll-driven effects + Motion (Framer Motion) for React component animations
- **Particles**: tsParticles (`@tsparticles/react` + `@tsparticles/slim`) renders per-section particle backgrounds in `src/scripts/particles.ts`
- **Styling**: Scoped CSS per Astro component + global CSS variables in `src/styles/global.css`. React components use co-located `.css` files.
- **Fonts**: Inter (sans) + JetBrains Mono (mono), loaded via Google Fonts
- **TypeScript**: Astro strict mode (`astro/tsconfigs/strict`), JSX configured for React (`react-jsx`)
- **Contact form**: Uses EmailJS (`@emailjs/browser`). Config via `PUBLIC_EMAILJS_*` env vars in `.env`.

## Key Patterns

- **Scroll pinning**: `src/scripts/panels.ts` uses GSAP ScrollTrigger to pin each `main > section` during scroll
- **Experiences section**: Uses GSAP Flip plugin for layout transitions when clicking items
- **React interactive components**: `DecryptedText` (character-by-character text reveal), `BorderGlow` (dynamic glow effect via CSS vars + cursor tracking), `PillNav`/`PillLink` (navigation with GSAP hover animations)
- **CSS variables**: Color palette and layout constants in `:root` (`global.css`). Accent: `#6c63ff` (purple)
- **Static assets**: Project images go in `public/images/projects/`

## Design

- Dark theme (background `#0f0f0f`, text `#e0e0e0`)
- Purple accent (`#6c63ff`)
- Max content width: 1100px
- All UI text is in Brazilian Portuguese
