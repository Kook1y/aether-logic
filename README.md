# Aether Logic

> The Engine of Absolute Precision

A premium AI-powered math learning platform built with a **liquid glass (glassmorphism)** design system. Solve equations step-by-step, graph functions interactively, and practice with past exam papers.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v3 (custom design tokens) |
| Animations | Framer Motion |
| Math Rendering | KaTeX |
| Graphing | function-plot (D3-based) |
| State | Zustand |
| Routing | React Router v6 |
| Auth | Supabase Auth |

## Features

- **AI Solver** — Step-by-step animated solution breakdown with LaTeX rendering
- **Interactive Graphing** — Real-time graph updates with variable sliders
- **Practice & Past Papers** — Curated exam papers with difficulty filters
- **Auth** — Supabase email/password sign-in + guest mode
- **Command Palette** — `Ctrl+K` for instant navigation
- **Liquid Glass UI** — Celestial Observatory design system with glassmorphism

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Start dev server
npm run dev

# Build for production
npm run build
```

## Environment Variables

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── components/       # Reusable UI (GlassPanel, GradientButton, Chip, ...)
├── pages/            # Route-level page components
├── stores/           # Zustand state stores
├── layouts/          # RootLayout, AuthLayout
├── hooks/            # useAuth, useGraph, useCommandPalette
├── data/             # Mock solutions, practice sets, equations
├── lib/              # KaTeX wrapper, graph engine
├── types/            # TypeScript interfaces
└── config/           # Supabase client
```

---

© 2025 Aether Logic. The clarity of a solved equation.
