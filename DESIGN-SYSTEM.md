# Alvar design system — full spec

Personal design system for Håkan's private apps. Covers workout-app and
research-pod today; built to extend to future personal apps without redoing
this thinking each time.

## 1. The core structural decision

These apps don't split neatly into "mobile" and "web." There are three distinct
usage contexts, two of which share a platform:

| Mode | App | Platform | How it's used |
|---|---|---|---|
| Outdoor | workout-app | iPhone only | Arm's length or floor distance, often outdoors or bright gym light |
| Companion | research-pod | iPhone | Pocket, glance, queue-browsing — Snipd/Spotify pattern |
| Studio | research-pod | Mac/iPad browser | Desk, sustained reading — Linear/dotwork pattern |

Rather than two design systems (mobile / web), Alvar is **one shared foundation —
tokens, scales, principles — with three mode-specific expressions.** Outdoor and
companion are both "mobile" but pull in opposite directions: outdoor wants maximum
contrast and zero subtlety, companion wants a considered, editorial touch. Forcing
them into one mobile system would flatten what makes each work.

**Architecture:** one shared token file (`tokens.css`), independent component
implementations per app. Change a color once, both apps update; components and
layouts stay free to diverge because the jobs are genuinely different. This also
means Alvar survives the native-vs-web question below without a rewrite — see
section 7.

## 2. Color story

Palette drawn from two landscapes: Öland (the Baltic coast, the alvar limestone
plain) and the Swedish mountains (Kebnekaise, Helags), rather than a generic
brand palette.

### Neutrals

| Name | Light (outdoor) | Dark (companion/studio) |
|---|---|---|
| Alvar stone / Granite | `#EDE8DC` canvas | `#15181B` canvas |
| Glacier | `#F6F5F1` surface | `#23272B` surface |

### The three blues — and why there are three

Three blues only earns its keep if each one has a distinct job. The variable that
separates them is frequency and function, not vibe:

| Name | Role | Light value | Dark value | Reasoning |
|---|---|---|---|---|
| **Cikoria** (chicory) | Everyday interactive accent | `#3E6FA0` | `#6FA8DE` | High-frequency, low-intensity — links, active nav, "continue listening." Calm enough to recede when seen constantly |
| **Blåeld** (viper's bugloss) | Rare highlight | `#3E4A96` | `#4E5AB0` | Low-frequency, high-intensity — the single CTA in outdoor mode (its saturation cuts through sunlight glare where cikoria would wash out), milestone flashes, "new" badges. If it shows up in body UI it stops meaning anything |
| **Baltic** | Identity / chrome, not interaction | `#1B4B66` | `#2B6E93` | Not a button color — an app-icon, header-bar, splash-screen color. Also the "paused/resting" state opposite blåeld's "active/go" state |

Sourced against real reference points: blåeld (Echium vulgare) is vivid,
violet-leaning blue with red stamens; cikoria (chicory) is a clearer, calmer sky
blue. See conversation sources: [Echium vulgare](https://en.wikipedia.org/wiki/Echium_vulgare),
[Chicory](https://en.wikipedia.org/wiki/Chicory).

### Status colors

| Name | Role | Light | Dark |
|---|---|---|---|
| Moss | Success — completion, streaks | `#5C7A52` | `#7FA06E` |
| Lichen | Warning — attention, saved-for-later | `#B8894A` | `#D9A567` |
| Rowan | Error | `#B23A34` | `#D9695F` |

Moss and lichen came directly out of the Öland/mountain-valley story. Rowan
(rönnbär, the red Nordic rowan berry) is my addition to complete the status set
— flag it if you'd rather source error red from somewhere else.

### Contrast discipline

Every text color in this system is a **solid** value, never `opacity`. Opacity
dims against whatever's behind it and drifts per surface — it reads as "muted"
to the eye but often fails contrast in practice, which matters given you wear
reading glasses. Body text floor is 16px; caption floor is 13px; nothing in the
system goes smaller.

## 3. Typography

One shared UI typeface, one reading typeface, both native — nothing to license
or load:

- **UI (all modes):** SF Pro — `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif`. Ships on macOS/iOS, tuned hard for small-size legibility.
- **Reading (studio only):** New York — `ui-serif, Georgia, serif`. Ships alongside SF Pro on Apple platforms; `ui-serif` resolves to New York in Safari/WebKit automatically. Used for research-pod's long-form article body only — this is the editorial shift that makes studio mode feel like dotwork rather than pure Linear.
- **Numerals (outdoor):** tabular/monospaced figures so digits don't shift width mid-change.

### Scale

| Level | Size | Weight | Where |
|---|---|---|---|
| Display (stat) | 64–96px | 500 | Outdoor mode's big number only |
| H1 | 26px | 500 | Rare, top-level screen titles |
| H2 | 22px | 500 | Section headings |
| H3 | 18px | 500 | Card/subsection headings |
| Body | 16px | 400, 1.6 leading | Default floor — bumped up from typical 13–15px app defaults deliberately |
| Reading | 18px | 400, 1.7 leading, New York | Studio article body only |
| Caption | 13px | 500 | Absolute floor — nothing smaller anywhere in the system |

## 4. Spacing

One 4px-based scale, shared everywhere: `4, 8, 12, 16, 24, 32, 48, 64`. What
differs by mode is which steps get used most:

- **Outdoor** leans on the big end (32–64) — lots of air around one number
- **Companion** uses the middle (12–16) — Spotify-style list density
- **Studio** uses the full range — dense sidebar next to a spacious reading column

### Touch targets

- Outdoor: 56–64px minimum. Sweat, gloves, glancing rather than aiming — the CTA needs to be unmissable
- Companion / studio: 44px minimum (Apple HIG standard) — calmer, more deliberate taps

## 5. Motion

Three distinct motion characters, not one animation style applied everywhere:

| Mode | Duration | Easing | Why |
|---|---|---|---|
| Outdoor | 100–150ms | None (linear/instant) | Animation competes with a number read mid-set at arm's length — it should just be there |
| Companion | 250–350ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring-like) | Physical, tactile — matches Spotify/Snipd's drag-to-expand mini-player |
| Studio | 120–180ms | `ease-out` | Fast and precise — a springy sidebar next to serif reading text would feel frivolous |

## 6. Icons

**Phosphor**, not SF Symbols. SF Symbols is Apple-native and not licensed for
web use — since research-pod's desktop is a browser app and everything is built
through Claude Code rather than Xcode, an icon set that renders identically in
a browser or a native shell is the safer bet. Phosphor ships multiple weights
(thin/regular/bold) in one consistent shape language, mirroring the "one family,
contextual intensity" logic already used for type and motion:

- **Outdoor:** bold weight — needs to read at a glance, same reasoning as tabular numerals
- **Companion / studio:** regular weight

## 7. Native vs. web — the decision and why

Both apps are **web (Next.js/PWA)**, not native Swift, for one concrete reason:
distributing a native iOS app to your own phone outside the App Store requires
Apple's signing process, and without a paid Developer account ($99/yr, which you
don't want to pay for a personal project) that means re-signing through Xcode
every 7 days. A PWA installed via "add to home screen" sidesteps this entirely —
no account, no signing, no expiry.

The honest trade-off: iOS Safari PWAs handle **background audio** inconsistently
— playback can get suspended on screen lock or app-switch, and lock-screen
controls are unreliable. That's a real limitation for research-pod's
Spotify-like listening pattern, not a paper cut to ignore.

**Decision:** ship as PWA now, live with the limitation, and name the upgrade
path rather than pretend it doesn't exist: **Capacitor** wraps an existing web
app in a thin native shell to get proper background audio and lock-screen
controls, without a rewrite — same codebase, same Alvar tokens, no fork.
Revisit only if the audio limitation proves to be a real daily annoyance, not
before.

## 8. Component inventory

| Component | Shared or mode-specific | Notes |
|---|---|---|
| Button (primary/secondary/action) | Shared shape, mode-specific sizing | 56px+ in outdoor, 44px elsewhere. `action` variant uses blåeld |
| Card / list row | Shared | Padding and density vary by mode |
| Badge / status pill | Shared | `new` variant uses blåeld — the one place it's allowed outside outdoor's CTA |
| StatDisplay (big number + label) | Outdoor-only | Doesn't exist in the other two modes |
| Mini-player | Companion-only | Persistent, expand/collapse, spring motion |
| Sidebar nav | Studio-only | Doesn't fit a phone screen |
| Bottom tab bar | Companion-only | Studio uses the sidebar instead |
| Search / command input | Shared component, different entry points | Bottom sheet on companion, command palette on studio |

**Known gap:** only one screen per mode has been designed in detail so far
(workout stat screen, research-pod queue, research-pod article view). Empty
states, error states, a workout history view, and a research-pod library grid
haven't been touched — expect to design those as you build, using this spec as
the foundation rather than a finished screen set.
