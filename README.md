# Alvar — personal design system

Håkan's private design system, for personal apps only. Named after the alvar — the
limestone plain on Öland — the same way the work system draws its name from
SeventyOne. This is the personal counterpart, living at `dev/templates/` rather
than `dev/projects/active/`, so it stays a reusable starting point rather than a
product of its own.

Do not confuse this with `so-design-system` (`dev/projects/active/so-design-system`),
which is the SeventyOne Consulting brand system for client and company work. Alvar
is for the apps that are just yours: workout-app, research-pod, and whatever comes
next.

---

## What's in here

| File | What it does |
|---|---|
| `DESIGN-SYSTEM.md` | The full spec — palette story, three usage modes, type scale, spacing, motion, icons, component inventory, and the reasoning behind each decision |
| `src/styles/tokens.css` | Tailwind v4 CSS-first token file — colors, type, radius, shadow, motion. Drop-in, same pattern as `so-design-system`'s `globals.css` |
| `src/components/ui/` | Starter components: Button, Badge, Card, StatDisplay |

---

## How to use in a new project

1. Copy `src/styles/tokens.css` into your project's `globals.css` (or merge — see the
   comment block at the top of the file for what to keep vs. replace)
2. Copy `src/components/ui/` into your component folder
3. Make sure the system font stack loads — no web font needed, SF Pro and New York
   ship with macOS/iOS Safari, so there's nothing to import
4. Decide your app's default mode:
   - Outdoor apps (glanceable, high-contrast, used at a distance): don't add `class="dark"` — light mode is the outdoor palette
   - Companion/studio apps (considered, screen-close use): add `class="dark"` to `<html>` by default
5. Import and use:
   ```tsx
   import { Button, Badge, Card, StatDisplay } from '@/components/ui'

   <Button variant="action">Finish set</Button>
   <Badge variant="new">new</Badge>
   <StatDisplay value={42} label="reps" />
   ```

---

## Why this exists, in one paragraph

SeventyOne's design system is built for client-facing, brand-consistent work. Your
personal apps don't need to look like a consultancy — they need to be legible on a
gym floor, calm enough to read on a screen at your desk, and yours. Alvar pulls its
palette from Öland and the Swedish mountains instead of a brand book, and its
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
