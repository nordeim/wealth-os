# Session 219 — R-16 "the parity-default and perceivability round" — delivered

The owner's standing directive with an EXPLICIT parity ask: iterate the
codebase toward visual + functional parity with the live reference
(`wealth-os-d93bd04e.base44.app` + `/Dashboard`), paying particular
attention to the mobile navigation menu. The workspace was reset (a
fresh sandbox); the repo re-cloned at `bd97385`; the doc set reviewed in
full; the environment rebuilt; the cold baseline gates green at exactly
the documented v2.15.0 state (817 unit · 97 e2e · smoke 14/14 · census
MATCH); `bun audit` unchanged.

## The live-reference decode (the round's foundation)

- The drift-probe: STABLE on all four standing layers (the bundle
  fingerprint · the demo census · the desktop nav · the TRUE-390 mobile
  menu — opens, 9 destinations).
- The mobile menu compared FUNCTIONALLY on both apps: open · 9
  destinations · the Goals round-trip lands + the drawer closes — MATCH
  (ours the labeled a11y superset). BUT both apps clip the drawer below
  ~800px viewport height (Sign Out measured at 787px against a 667px
  viewport — the reference shares the defect).
- The theme posture decoded END-TO-END: a fresh-context login lands
  `/Dashboard` with `html.dark`, body `#0a0a0a`, NO localStorage theme
  key — the choice persists SERVER-SIDE per user (the toggle round-trip
  proved it); the auth faces serve light always. The standing DARK
  posture was RESTORED after the probe mutated the demo user's choice.
- The CTA genus measured per-page: the reference's amber CTAs compute
  stone-900 `rgb(28,25,23)` — the a11y register's "white-on-amber"
  citation DISPROVEN (white measured 2.15:1); emerald→teal+white on
  Income/Investments; rose→red+white on Expenses; the dialog submits
  carry the same families.

## The round's headline cures (TDD throughout — 39+ pins born RED → GREEN, +2 e2e legs)

- **The default-theme parity (F-219c High)**: the fresh-visitor app
  shell now defaults DARK (the reference's own posture); the auth faces
  FORCE light (F-219t — closing the stranded-ink state where a stored
  dark left `rgb(250,250,250)` body text on the light login wash); a
  stored choice still wins (the localStorage superset). Three seams:
  `src/lib/theme-default.ts` (pure) + the no-FOUC bootstrap mirror +
  the ThemeProvider's pathname effect (the client-nav holes).
- **The CTA genus (F-219a/b High)**: `--color-primary-foreground`
  → `#1c1917`; `BUTTONS.primary` → `text-stone-900`; the `CTA`
  constants (amber/emerald/rose, the measured citations) applied across
  the 15 section button sites + the coach/error/period/filter-badge
  tails; the stale a11y register arm retired.
- **The mobile drawer scroll (F-219h)**: `overflow-y-auto` on the
  sheet's inner column — Sign Out reachable at 390×667 (the functional
  superset; the reference clips too).
- **The date-seam completion (F-219d/e/f/g)**: the investments
  purchaseDate prefill (the per-edit walk-back), the analytics
  mixed-mode regression (the refs now ride `toDate` like the rows), the
  goals card label, the income relative-day label.
- **The rate buckets (F-219l/m)**: the `reset:` key collision split;
  the CRUD writes family bucketed (60/15) + export (240/15) + search
  (60/15) — with the per-navigation dashboard aggregate DELIBERATELY
  unbucketed (the maiden census run tripped it mid-run: every hydrate
  fires it; the decode is pinned in the route's docblock).
- **The perceivability tail**: the dark metadata family (~25 sites →
  `dark:text-stone-400`), the EMPTY_STATE/FOOTER/KpiCard constants, the
  coach's polite live region + sr-only thinking text, the display-text
  cluster (Quick Actions h2, HealthGauge ink, import emerald-700, the
  error h1s), the ring leftovers, the analytics empty-state gates,
  moneyField 2dp, the nullable-clear semantics, InfoCallout
  role="status", the dead constants retired.

## Evidence (all executed)

lint 0/0 · tsc 0 · **869 unit / 64 files** (+52) · build · smoke 14/14
· **e2e 99/97 → 99/99** (+2: the fresh-visitor dark default, the drawer
scroll at 390×667) · **all six parity drift gates CLEAN on the
RE-DERIVED tables** (every page's diff moved DOWN — the CTA
convergence) · census MATCH · the capture set 82-87 (eight files incl.
the reference's own dark /Dashboard beside ours — VLM-verified a near
pixel match on the fresh-visitor genus) · `bun audit` unchanged.

Shipped as the session's atomic commits on `main`, pushed via the SSH
wrapper. Plan → v2.16.0; session 220 defaults to no open R-item.
