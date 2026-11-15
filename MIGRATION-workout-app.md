# Migration brief: workout-app → Alvar (outdoor mode)

Hand this file to Claude Code in VS Code, working inside the `workout-app`
repo, to run a design session. This is a brief, not a diff — Claude Code
should propose the actual changes and show them for review before touching
committed code, per this repo's own `/design` convention (approval from
Håkan, explicit, never assumed).

## Context

workout-app has no visual design system applied yet — `globals.css` is a
single unstyled rule (`background: #0b0b0c; color: #ffffff`). The gap isn't
just "unstyled," though: this repo's own `/design` workflow
(`.claude/commands/design.md` and `.claude/agents/designer.md`) currently
hardcodes SeventyOne's work brand teal (`#00968C`) as its "brand" color and
`bg-gray-950` / `bg-gray-50` as its background rule. Every mockup that
workflow produces defaults to the work brand — that's very likely a leftover
default rather than a deliberate choice, and it should be fixed as part of
this migration, not just the visible screens.

Full design reasoning lives in `dev/templates/alvar-design-system/DESIGN-SYSTEM.md`
— read that first. This app maps to **outdoor mode**: used at arm's length or
on the floor mid-workout, often outdoors or in bright gym light, so it wants
the highest-contrast, most spare expression of Alvar. Light mode by default
— do not add `class="dark"` to `<html>`.

## Current screens (for scope)

- `src/components/HomeScreen.tsx`
- `src/components/WorkoutScreen.tsx` — likely the primary target; this is where a `StatDisplay`-style big number (reps/time) belongs
- `src/components/ExerciseLibraryScreen.tsx`
- `src/components/MuscleDiagram.tsx`
- `src/components/ExerciseAnimation.tsx`
- Routes: `/`, `/workout`, `/exercises`, `/done`, `/settings`

Only one outdoor-mode screen has actually been designed in the ideation phase
(the stat/CTA pattern in `DESIGN-SYSTEM.md`). Expect to design the rest —
library, muscle diagram, done, settings — fresh, using the tokens and
principles below rather than a finished screen spec.

## Tasks

1. **Fix the `/design` workflow first.** In `.claude/commands/design.md` and
   `.claude/agents/designer.md`, replace the brand color override
   (`tailwind.config = { theme: { extend: { colors: { brand: '#00968C' } } } }`,
   `bg-gray-950` / `bg-gray-50`) with Alvar's outdoor tokens — `--alvar-action`
   (`#3e4a96`) as the CTA color, `--alvar-canvas` (`#ede8dc`) / `--alvar-foreground`
   (`#15181b`) as the background/text pair. This is what every future mockup
   from this workflow will default to, so get it right once.

2. **Drop in the token file.** Copy
   `dev/templates/alvar-design-system/src/styles/tokens.css` into
   `src/app/globals.css`, replacing the current single-rule file. Do not add
   `class="dark"` to `<html>` — outdoor mode's default light palette is the
   whole point here.

3. **Copy the component starters.** `dev/templates/alvar-design-system/src/components/ui/`
   → wherever this repo's UI primitives should live (check if one already
   exists, e.g. `src/components/ui/`). `StatDisplay` and the `outdoor` button
   size are the two components most directly relevant to `WorkoutScreen.tsx`.

4. **Redesign `WorkoutScreen.tsx`** using `StatDisplay` for the rep/time count
   and a `Button variant="action" size="outdoor"` for the primary action
   (finish set, next exercise, etc.). This is the screen where the
   high-contrast, large-touch-target, near-zero-motion principles from
   `DESIGN-SYSTEM.md` sections 4–5 matter most.

5. **Pass over the remaining screens** (`HomeScreen`, `ExerciseLibraryScreen`,
   `MuscleDiagram`, `ExerciseAnimation`, `done`, `settings`) applying the same
   token set. These weren't individually designed during ideation — use
   `Card` / `Badge` / `Button` from the starter kit and outdoor mode's spacing
   bias (32–64px blocks, generous air) as the guide, and flag anything that
   doesn't fit cleanly rather than forcing it.

6. **Icons:** swap in Phosphor at bold weight (`DESIGN-SYSTEM.md` section 6).
   Check what icon set is currently in use, if any, before adding a new
   dependency.

## Acceptance / how to check it worked

- Nothing in the app should read as "corporate teal" anymore — if `#00968C`
  or its near neighbors still appear anywhere (including the `/design`
  command config), that's a miss.
- Body text should be 16px minimum, captions 13px minimum — check against
  `DESIGN-SYSTEM.md` section 3 rather than eyeballing it.
- The primary action on the workout screen should be reachable and legible
  at arm's length — if you have to squint at a normal screen brightness, the
  contrast isn't there yet.
- Show Håkan the result in a real browser before merging, same as this repo's
  existing `/design` convention already requires.
