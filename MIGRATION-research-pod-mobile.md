# Migration brief: research-pod (mobile) → Alvar (companion mode)

Hand this file to Claude Code in VS Code, working inside the `research-pod`
repo. Scope is **mobile only** — the six components under
`src/components/mobile/` plus `src/app/capture/page.tsx`. Desktop
(`src/components/ui/`, still on the SO teal/tegel tokens) is out of scope for
this pass; that's studio mode, a separate migration for later.

## Context — this isn't a blank slate

Unlike workout-app, research-pod's mobile UI already has a real design system
applied: **Nordic Fell**, shipped in the commit "Nordic Fell mobile redesign —
Direction 5." It's live across:

| File | `nf-` token usages |
|---|---|
| `src/components/mobile/MobileLayout.tsx` | 28 |
| `src/app/capture/page.tsx` | 13 |
| `src/components/mobile/NowPlaying.tsx` | 13 |
| `src/components/mobile/ArticleRow.tsx` | 4 |
| `src/components/mobile/icons.tsx` | 3 |
| `src/components/mobile/MobileTabBar.tsx` | 2 |
| `src/components/mobile/FeaturedCard.tsx` | 1 |

Tokens are declared in `src/app/globals.css` (search `Nordic Fell` — a
separate `:root` block below the main `@theme inline` config, plus two
mountain-gradient variables used as hero/player backgrounds).

Nordic Fell was already heading in a similar direction to Alvar — nature
palette, deliberately not the SO brand. This migration is a **refinement**,
not a rescue: same intent, more considered execution. But it's not a pure
find-and-replace either — three real changes are embedded in the token
mapping below, and Claude Code should flag each one visually before
finalizing, not apply them silently.

## Token mapping

| Nordic Fell (current) | Alvar (target) | Note |
|---|---|---|
| `--nf-paper` (`#f7f6f1`, light bg) | `--alvar-canvas` dark (`#15181b`) | **Mode flip.** Nordic Fell is light/paper-themed; Alvar's companion mode is dark by default (Spotify/Snipd pattern, decided deliberately during design — see `DESIGN-SYSTEM.md` section 1). This is the biggest visible change in this migration |
| `--nf-ink` / `--nf-ink-deep` (dark green text) | `--alvar-foreground` dark (`#f3f2ed`) | Follows the mode flip — light text on the new dark canvas |
| `--nf-muted` / `--nf-tab-inactive` | `--alvar-muted-text` dark (`#9ba1a8`) | Solid color, not opacity — see the contrast note below |
| `--nf-card-border` | `--alvar-border` dark (`#33383c`) | Direct swap |
| `--nf-play-accent` (`#3a7d54`, green) | `--alvar-accent` dark (`#6fa8de`, cikoria — blue) | **Color-family change**, not a rename. Nordic Fell's accent is green; Alvar's everyday accent is cikoria blue. Flag this explicitly for approval — it's the most opinion-laden swap in this table |
| `--nf-play-bg` | `--alvar-surface` dark (`#23272b`) | Direct swap |
| `--nf-chip-dark` | `--alvar-identity` dark (`#2b6e93`, baltic) | Matches the "header chip = baltic" pattern used in the companion mode mockup during design |
| `--nf-gradient-list` / `--nf-gradient-player` | **Open question — see below** | No direct Alvar equivalent |

### On the mountain gradients

Nordic Fell's hero and player backgrounds use a multi-stop gradient (sky
fading into a green mountain silhouette). Alvar's whole design direction —
established across every mockup during the design session — was flat, solid
color with deliberate, minimal accents, partly because that's what held up
best for contrast and legibility. Porting the gradient forward as-is would
sit oddly against that. Two honest options, not a prescribed answer:

1. Drop the gradient, use a flat `--alvar-canvas` / `--alvar-surface` background instead — consistent with everything else, lower visual interest
2. Keep a gradient but rebuild it from Alvar hues (baltic → moss, echoing sea-to-valley rather than sky-to-mountain) — keeps the hero moment but re-sources it

Don't decide silently — show both and let Håkan pick.

## Tasks

1. Read `DESIGN-SYSTEM.md` section 1 (companion mode) and section 2 (why cikoria vs. blåeld vs. baltic have different jobs) before touching component code — the color mapping above depends on that reasoning.
2. In `src/app/globals.css`, replace the Nordic Fell `:root` block (the one below the `@theme inline` config, prefixed `--nf-`) with `dev/templates/alvar-design-system/src/styles/tokens.css`'s dark-mode block. Leave the SO/`@theme inline` section alone — desktop still needs it until studio mode's migration happens separately.
3. Add `class="dark"` to wherever mobile's root layout sets `<html>` (or scope it to the mobile layout wrapper if desktop and mobile share a root) — companion mode defaults dark.
4. Work through the six files by usage count, highest first: `MobileLayout.tsx` (28), `capture/page.tsx` (13), `NowPlaying.tsx` (13), then `ArticleRow.tsx`, `icons.tsx`, `MobileTabBar.tsx`, `FeaturedCard.tsx`.
5. Resolve the gradient question (above) before finalizing `FeaturedCard.tsx` and `NowPlaying.tsx`, since both currently reference the mountain gradients.
6. Copy `dev/templates/alvar-design-system/src/components/ui/Badge.tsx`'s `new` variant pattern into wherever mobile shows a "new"/unplayed indicator — that's the one spot blåeld belongs here, per `DESIGN-SYSTEM.md`'s rare-highlight rule.
7. Icons: check `icons.tsx` — if it's a custom icon set, decide whether to fold it into Phosphor now or leave as a follow-up (this file only has 3 `nf-` references, so it's low-risk either way).

## Acceptance / how to check it worked

- Every `nf-` token reference should resolve to an `alvar-` one — grep for `nf-` in the mobile folder afterward and it should come back empty.
- The light-to-dark flip should be intentional and complete — no screen should end up half Nordic Fell paper, half Alvar dark.
- The green-to-blue accent change should be visible and deliberate, not accidentally inconsistent (some elements still green, others blue).
- Show Håkan the result on an actual device before merging — this app is used on the go, and how it reads in your hand is the real test, not how it looks in a browser preview.
