# Alvar — personal design system

Håkan's design system for personal apps. Named after the alvar — the limestone
plain on Öland. It is a reusable starting point rather than a product of its own,
used by workout-app, research-pod, training-coach and whatever comes next.

---

## What's in here

| File | What it does |
|---|---|
| `DESIGN-SYSTEM.md` | The full spec — palette story, three usage modes, type scale, spacing, motion, icons, component inventory, and the reasoning behind each decision |
| `src/styles/tokens.css` | Tailwind v4 CSS-first token file — colors, type, radius, shadow, motion. Imported as `alvar-design-system/tokens.css` |
| `src/components/ui/` | Starter components: Button, Badge, Card, StatDisplay |

---

## How to use in a new project

Alvar is installed as a git dependency, so every project uses the same versioned
source instead of a copy that drifts.

1. Install a tagged version:
   ```bash
   npm install git+https://github.com/hakanappelgren/alvar-design-system.git#v0.1.0
   ```
2. `src/app/globals.css` — replace `@import 'tailwindcss';` with:
   ```css
   @import 'alvar-design-system/tokens.css';
   ```
   The token file imports Tailwind itself and tells Tailwind to scan the packaged
   components, so nothing else is needed.
3. `next.config.ts` — the components ship as TypeScript source:
   ```ts
   const nextConfig: NextConfig = { transpilePackages: ['alvar-design-system'] }
   ```
4. Decide your app's default mode:
   - Outdoor apps (glanceable, high-contrast, used at a distance): don't add `class="dark"` — light mode is the outdoor palette
   - Companion/studio apps (considered, screen-close use): add `class="dark"` to `<html>` by default
5. Import and use:
   ```tsx
   import { Button, Badge, Card, StatDisplay } from 'alvar-design-system'

   <Button variant="action">Finish set</Button>
   <Badge variant="new">new</Badge>
   <StatDisplay value={42} label="reps" />
   ```

No web font needed — SF Pro and New York ship with macOS/iOS Safari.

### Releasing a change

Change tokens or components here, bump `version` in `package.json`, merge, then tag
(`git tag v0.2.0 && git push origin v0.2.0`). Each project upgrades when it chooses by
changing the tag in its `package.json`. App-specific components stay in the app;
only what two apps genuinely share moves here.

---

## Why this exists, in one paragraph

Personal apps need to be legible on a gym floor, calm enough to read on a screen
at your desk, and yours. Alvar pulls its palette from Öland and the Swedish
mountains instead of a brand book, and its
structure — one shared token source, mode-specific application — is built to scale
to more personal apps without redoing this thinking each time.

See `DESIGN-SYSTEM.md` for the full reasoning, including why native iOS was
considered and rejected for now (Apple Developer account cost, Xcode dependency)
in favor of PWAs, with Capacitor named as the upgrade path if research-pod's
background-audio limitations become a real problem in daily use.

---

## Color tokens quick reference

| Token | Role | Use for |
|---|---|---|
| `--alvar-canvas` | Neutral | Page background |
| `--alvar-surface` | Neutral | Cards, panels |
| `--alvar-raised` | Neutral | Elevated elements (sheets, popovers) |
| `--alvar-foreground` | Neutral | Primary text |
| `--alvar-muted-text` | Neutral | Secondary/helper text — always a solid color, never opacity |
| `--alvar-border` | Neutral | Borders and dividers |
| `--alvar-action` (blåeld) | Rare highlight | The one loud color — outdoor CTAs, milestones, "new" badges. Used sparingly by design |
| `--alvar-accent` (cikoria) | Everyday interactive | Links, active nav states, "continue listening" |
| `--alvar-identity` (baltic) | Chrome, not interaction | App header/chrome, launch screen, paused state |
| `--alvar-success` (moss) | Status | Completion, streaks |
| `--alvar-warning` (lichen) | Status | Attention, saved-for-later |
| `--alvar-error` (rowan) | Status | Errors — added to complete the status set; flag if you want a different reference point than rowan berries |
