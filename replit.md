# Joos Chip

## Overview
A Next.js 16 application with a personal message card interface featuring parallax effects and animations.

## Project Structure
```
joos-chip/           # Main Next.js application
├── app/            # Next.js App Router pages and components
│   ├── components/ # React components (Rolodex, ParallaxHero, etc.)
│   ├── page.tsx    # Main page
│   └── layout.tsx  # Root layout
├── images/         # Project images
├── public/         # Static assets
└── package.json    # Dependencies and scripts
```

## Tech Stack
- Next.js 16.1.1 with Turbopack
- React 19
- TypeScript
- Tailwind CSS 4
- Material UI
- Framer Motion (animations)

## Development
- Dev server runs on port 5000 with host 0.0.0.0
- Command: `cd joos-chip && npm run dev -- -p 5000 -H 0.0.0.0`

## Recent Changes
- 2026-01-13: Initial Replit environment setup
  - Configured Next.js to allow all dev origins for Replit proxy
  - Set up workflow for dev server on port 5000
