# The Symbiosis OS

A premium, interactive cyborg-themed landing page focusing on a sophisticated cybernetic core experience.

## Description
"The Symbiosis OS" represents the visual transition between human and machine. It is designed to feel like a premium interactive product rather than a generic template, featuring composed procedural 3D elements, native scroll-driven animations, and a strong futuristic visual identity.

## Tech Stack
- **React** & **Vite**
- **Tailwind CSS v3**
- **Three.js** & **React Three Fiber (R3F)** & **Drei**
- **GSAP** (ScrollTrigger)
- **Framer Motion**

## Features
- **Project Setup**: Vite + React + Tailwind + R3F + GSAP + Framer Motion.
- **Cybernetic Core**: A highly procedural, multi-layered 3D mechanical machine built using primitive geometries.
- **Human vs Cyborg Mode**: A seamless, global theme toggle transitioning between dark technical (Cyborg) and light readable (Human) aesthetics with synchronized 3D material changes.
- **Interactive Mouse Parallax**: Smooth, damped core tilting driven by pointer movement (Desktop).
- **Hero Scroll Transformation**: Native scroll-driven GSAP timeline that tightens mechanical rings and smoothly scales the core away as the user scrolls.
- **Subtle HUD Overlays**: Small, atmospheric data nodes framing the primary hero content.
- **Full Landing Page**: Integrated responsive sections including Symbiosis framework, Capabilities, System Diagnostics/Interface HUD, and Final CTA.
- **Accessibility & UX**: Includes `useReducedMotion` support for disable-able animations, keyboard-navigable components, layout-stable text decoding, and touch-friendly scaling.

## Installation
```bash
npm install
```

## Development
```bash
npm run dev
```
Starts the local development server on port 5173.

## Production Build
```bash
npm run build
```
Creates an optimized, production-ready bundle in the `dist/` directory.

## Project Status
- **Final (Phase 5 Stable)**: Complete. The project has been fully built, tested across screen sizes, verified for performance/accessibility, and checkpointed for submission.
