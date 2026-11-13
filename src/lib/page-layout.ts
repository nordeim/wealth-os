// WealthOS layout contracts — session-199. The class strings the shell
// and pages share (sidebar construction, mobile drawer, page headers,
// cards, buttons), derived from the reference's live DOM (see
// docs/implementation-plan-session-199-wealthos.md §2.2).

export const SHELL_LAYOUT = {
  root: "flex h-screen overflow-hidden bg-background page-wash dark:bg-[#0e1310]",
  sidebar: "hidden lg:flex lg:w-64 lg:flex-col",
  mainColumn: "flex flex-1 flex-col overflow-hidden",
  main: "flex-1 overflow-y-auto scrollbar-thin",
} as const;

export const NAV_LAYOUT = {
  container: "flex flex-col flex-1 min-h-0 sidebar-gradient relative",
  // The reference's brand block: h-16 px-6, amber-bordered bottom.
  brand: "flex items-center h-16 px-6 border-b border-amber-500/20 relative z-10",
  brandLogo:
    "w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20",
  brandWordmark:
    "text-xl font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent",
  brandTagline: "text-xs text-amber-400/80",
  nav: "flex-1 px-4 py-6 space-y-2 relative z-10",
  // The reference's exact link contracts (live-extracted).
  link: "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-stone-300 hover:bg-gradient-to-r hover:from-white/5 hover:to-amber-500/5 hover:text-amber-100 hover:border hover:border-amber-500/10",
  linkActive:
    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-amber-500/20 to-emerald-600/20 text-amber-200 shadow-lg border border-amber-400/30 backdrop-blur-sm",
  footer: "p-4 space-y-3 border-t border-amber-500/20 relative z-10",
  // Session-207 (F-207h): the Synced badge genus, live-extracted from
  // the reference's sidebar footer — the SAME badge the mobile topbar
  // carries (rounded-md, semibold, green + the wifi glyph). Session-223
  // (R-20, F-223f): the DESKTOP pairing is unconditional — the sidebar
  // gradient is near-black in BOTH themes, so the mobile twin's light
  // arm (green-700, correct on the topbar's light wash) computed
  // 3.49:1 here in light mode; green-400/green-600 compute 10.04:1.
  // The mobile pill keeps its light/dark arms (MOBILE_HEADER below).
  syncedPill:
    "inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold text-green-400 border-green-600",
} as const;

/** The mobile drawer — the reference's construction: a FULL-SCREEN
 *  gradient overlay (fixed inset-0, z-40) under the sticky mobile
 *  header (z-50), content starting at pt-20. */
export const MOBILE_NAV_LAYOUT = {
  // The auto-close breakpoint matches the sidebar's lg show/hide (1024).
  autoCloseQuery: "(min-width: 1024px)",
} as const;

export const MOBILE_NAV_SHEET = {
  // Session-207 (F-207d): the sheet carries the reference's sheen — its
  // own inline-style overlay (a 3%-alpha gold→emerald tint, extracted
  // verbatim) layered over the stone gradient. We keep the OPAQUE base
  // (the readable superset — the reference's sheet is a transparent
  // veil whose light mode ships stone-300-on-light text) and adopt the
  // tint via the mobile-drawer-sheen utility (globals.css).
  content: "lg:hidden fixed inset-0 z-40 mobile-drawer-sheen",
  // Session-219 (R-16, F-219h): overflow-y-auto — the sheet scrolls
  // internally below ~800px viewport height (Sign Out live-measured
  // UNREACHABLE at 390×667 before; the reference clips too — this is
  // the functional superset, the Escape-to-close class).
  inner: "flex flex-col h-full pt-20 overflow-y-auto",
  nav: "flex-1 px-4 py-6 space-y-2",
  link: "flex items-center gap-3 px-4 py-4 rounded-xl font-medium transition-all duration-200 text-stone-300 hover:bg-gradient-to-r hover:from-white/5 hover:to-amber-500/5 hover:text-amber-100",
  // The active pill STAYS (the F-207c withdrawal): the reference's
  // drawer renders it on the current-page link — byte-identical genus,
  // re-verified live at full class length (session 207).
  linkActive:
    "flex items-center gap-3 px-4 py-4 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-amber-500/20 to-emerald-600/20 text-amber-200 shadow-lg border border-amber-400/30",
  label: "text-lg",
  // Session-207 (F-207d): the reference's drawer footer — a bordered
  // band under the nav, with the ghost Sign Out (slate border,
  // white/10 hover) — replacing our margin-footer chip.
  footer: "p-4 border-t border-amber-500/20",
  signOut:
    "flex w-full h-9 items-center justify-center gap-2 rounded-md border border-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
} as const;

/** The mobile sticky header (lg:hidden, above the drawer). Session-207
 *  (F-207b): re-pinned to the reference's live topbar genus — the
 *  stone→amber→stone gradient wash with the amber/20 border + shadow-lg,
 *  the w-8 h-8 logo, the gradient-clip wordmark, the borderless ghost
 *  icon buttons. Kept supersets: sticky positioning (our in-flow flex
 *  model — the reference's fixed bar is a positioning choice, not a
 *  visible genus) and the aria-labels + focus ring. */
export const MOBILE_HEADER = {
  root: "lg:hidden sticky top-0 z-50 bg-gradient-to-r from-stone-50 via-amber-50/50 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 backdrop-blur-md border-b border-amber-500/20 shadow-lg",
  inner: "flex h-16 items-center justify-between px-4",
  brandRow: "flex items-center gap-3",
  brandLogo:
    "w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-md shadow-amber-500/20",
  // Session-224 (F-224y): the brand WORDMARK — WCAG 1.4.3 exempts
  // "text that is part of a logo or brand name", and the genus is the
  // reference's own (F-207b, live-pinned): the light arm's gradient
  // stops compute 3.05:1 (amber-600) and 2.81:1 (yellow-600) on the
  // near-white wash; the dark arm passes easily. Recorded so a future
  // arm-retirement sweep does not "discover" it.
  brandWordmark:
    "text-lg font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400 bg-clip-text text-transparent",
  // The reference's badge genus (rounded-md, semibold, green + wifi),
  // rendered in its RIGHT cluster beside the theme toggle + hamburger
  // (F-207a: always visible — the pill's old form rode a phantom
  // sub-sm breakpoint Tailwind v4 never defines, which hid it below
  // the small viewport; the cure retired the construction).
  // Session-223 (F-223f): the MOBILE twin keeps its light/dark arms
  // (the topbar wash IS light in light mode) — only the desktop
  // NAV_LAYOUT.syncedPill carries the unconditional dark-surface
  // pairing.
  syncedPill:
    "inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold text-green-700 border-green-300 dark:text-green-400 dark:border-green-600",
  iconButton:
    "inline-flex items-center justify-center rounded-md h-9 w-9 text-gray-700 dark:text-gray-300 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
} as const;

/** Page headers inside main (every page's own top block). Session-207
 *  (F-207e): re-pinned to the reference's rhythm — the lg: breakpoints,
 *  the mb-8 band, the navy H1 token the seven non-dashboard pages carry
 *  (Dashboard + Investments keep stone + mb-1), tracking-tight dropped. */
export const PAGE_HEADER = {
  root: "flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4",
  title: "text-3xl lg:text-4xl font-bold text-stone-900 dark:text-white mb-1",
  titleNavy: "text-3xl lg:text-4xl font-bold text-primary-navy dark:text-white mb-2",
  subtitle: "text-sm text-stone-500 dark:text-stone-400",
  actions: "flex gap-2 flex-wrap",
} as const;

/** The section shells. Session-207 (F-207e/g): re-pinned to the
 *  reference's construction — a full-width gradient wash (p-4 lg:p-8,
 *  min-h-screen) carrying ONE inner container that centers and spaces
 *  the page (space-y-6 rides the container, matching the reference's
 *  header mb-8 collapsing with the container rhythm). Import ships its
 *  own navy wash — the reference's one divergent shell (F-205b). */
export const PAGE_ROOT = {
  standard:
    "p-4 lg:p-8 min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-emerald-50/40 dark:from-stone-950 dark:via-stone-900 dark:to-emerald-950/30 transition-colors duration-300",
  navy:
    "p-4 lg:p-8 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300",
  containerWide: "max-w-7xl mx-auto space-y-6",
  containerMid: "max-w-6xl mx-auto space-y-6",
  containerNarrow: "max-w-4xl mx-auto space-y-6",
  // Session-232 (R-29, F-232h): the bare member retired — zero
  // references (the F-229f re-entry rule); MOBILE_NAV_SHEET's icon
  // member retired with it in the same round.
} as const;

/** The in-page card genera — session-209 (F-209a, R-7.10): the reference
 *  deploys FOUR card families by surface (live census, every page walked).
 *  CARD.base is the WARM-SIMPLE genus (Dashboard's mid cards + Investments'
 *  charts/tables); CARD.kpi is the WARM-HOVER genus (Dashboard's KPI row —
 *  p-6 in-base, the custom .card-hover utility, backdrop-blur-md, the
 *  via-amber-50/20 layer). Padding is a flat p-6 — the reference's
 *  shadcn CardHeader/CardContent anatomy resolves to 24px on every face
 *  (a 16px→24px responsive upsize was once drafted as added chrome; it
 *  never shipped live). The glass + stock families
 *  live in GLASS_CARD/STOCK_CARD below; Settings keeps its own converged
 *  SETTINGS_CARD. */
export const CARD = {
  base: "rounded-xl text-card-foreground bg-gradient-to-br from-white/90 to-stone-50/90 dark:from-stone-900/90 dark:to-stone-950/90 border border-amber-100/50 dark:border-amber-900/30 shadow-xl",
  kpi: "rounded-xl text-card-foreground p-6 card-hover bg-gradient-to-br from-white/90 via-amber-50/20 to-white/90 dark:from-stone-900/90 dark:via-amber-950/10 dark:to-stone-900/90 backdrop-blur-md border border-amber-100/50 dark:border-amber-900/30 shadow-xl",
  padding: "p-6",
  title: "text-base font-semibold leading-none tracking-tight text-stone-900 dark:text-stone-100",
  subtitle: "text-xs text-stone-500 dark:text-stone-400",
} as const;

// Session-209 (F-209a): the GLASS genus — the reference's card family for
// the list pages (Expenses summary ×3 WITH card-hover + content, Analytics
// chart cards, Dashboard's Recent Activity + AI Insights bottom row,
// Income, Goals). The base is SETTINGS_CARD's own genus (F-208d) — the
// reference reuses the same glass construction everywhere it wants the
// border-less frosted look.
export const GLASS_CARD = {
  base: "rounded-xl text-card-foreground bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg",
  hover: "rounded-xl text-card-foreground bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg card-hover",
} as const;

// Session-209 (F-209a): the STOCK shadcn card — the reference's family for
// Accounts + Import (`bg-card` on the --color-card token; the empty-state
// variant appends the centered dashed-border classes with a roomy 48px
// pad).
export const STOCK_CARD = "rounded-xl border bg-card text-card-foreground shadow";

// Session-209 (F-209a): the Quick Actions one-off — the reference's own
// variant (via-amber-50/30, rounded-2xl, the amber-200 border, no hover).
export const QUICK_ACTIONS_CARD =
  "bg-gradient-to-br from-white/90 via-amber-50/30 to-white/90 dark:from-stone-900/90 dark:via-amber-950/10 dark:to-stone-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-amber-200/50 dark:border-amber-900/30 p-6";

// Session-209 (F-209b): the Analytics stat row's saturated to-r gradients.
export const STAT_GRADIENTS = {
  emerald: "bg-gradient-to-r from-emerald-500 to-emerald-600",
  red: "bg-gradient-to-r from-red-500 to-red-600",
  blue: "bg-gradient-to-r from-blue-500 to-blue-600",
} as const;

// Session-208 (F-208a): the reference's saturated KPI tile gradients —
// live-extracted from its Dashboard (all four tiles, full class strings):
// `w-12 h-12 rounded-xl <gradient> flex items-center justify-center` with
// `w-6 h-6 text-white` icons. FIXED size — the reference carries no md:
// upsize (a 56px responsive pair was once drafted as added chrome; it never
// shipped live).
export const KPI_TONES = {
  emerald: "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600",
  rose: "bg-gradient-to-r from-rose-500 via-red-500 to-rose-600",
  amber: "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600",
  purple: "bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600",
} as const;

// Session-208 (F-208d): the Settings glass-card genus — the reference's
// settings page carries its OWN card family (the F-205b navy/blue
// treatment): border-0 frosted glass (the blur wash) with shadow-lg, the
// shadcn
// CardHeader/CardTitle/CardContent anatomy, the navy CardTitle token, and
// the blue GDPR / amber import boxes. Every other page keeps CARD (the
// warm genus — the reference's own split).
export const SETTINGS_CARD = {
  base: "rounded-xl text-card-foreground bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg",
  header: "flex flex-col space-y-1.5 p-6",
  title: "font-semibold leading-none tracking-tight flex items-center gap-2 text-primary-navy dark:text-white",
  content: "p-6 pt-0 space-y-4",
  gdprBox: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4",
  gdprTitle: "font-semibold text-blue-800 dark:text-blue-200 mb-1",
  importBox: "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4",
  importTitle: "font-semibold text-amber-800 dark:text-amber-200 mb-1",
  boxBody: "flex items-start gap-3",
  boxText: "text-sm text-stone-600 dark:text-stone-400",
  saveRow: "flex justify-end",
  saveButton:
    "inline-flex items-center justify-center gap-2 rounded-md text-sm h-9 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-stone-900 font-semibold shadow-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
} as const;

export const BUTTONS = {
  // Session-219 (R-16, F-219a): text-stone-900 — the reference's own
  // amber-CTA genus (live-measured: its "Add Transaction" computes
  // rgb(28,25,23) over the amber-500→yellow-600 gradient; the old
  // text-white measured 2.15:1). The dead outline/ghost constants
  // retired the same round (F-219u — zero consumers, sub-3:1 focus
  // rings; the live Button variants carry the real genera).
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-2.5 text-sm font-semibold text-stone-900 shadow-md shadow-amber-500/25 transition-all hover:from-amber-600 hover:to-yellow-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
} as const;

/** Session-219 (R-16, F-219b): the per-page CTA genera — the reference
 * deploys THREE CTA families by section (live-measured, fresh login):
 *   - emerald→teal + white: Income ("Add Income Source"),
 *     Investments ("Add Investment") — white-on-gradient rides the
 *     F-208a KPI_TONES register class (the reference's own);
 *   - rose→red + white: Expenses ("Add Expense") — the same register;
 *   - amber→yellow + stone-900: Dashboard/Accounts/Goals/Settings (the
 *     F-219a genus — the reference's dialog submits carry the SAME
 *     per-page families, measured inside the open dialogs).
 * Applied to both the toolbar CTA and the dialog submit per section.
 *
 * Session-226 (R-23, F-226m): the WCAG exemption register, the F-224y
 * pattern. The white-on-gradient arms compute BELOW AA across most of
 * each gradient — measured: white on emerald-500 #10b981 = 2.54:1
 * (rising to 3.74:1 on teal-600), white on rose-500 #f43f5e = 3.67:1
 * (4.83:1 on red-600). These are the REFERENCE'S OWN CTA genera
 * (F-219b, live-measured per-page gradients — the amber arm carries
 * stone-900 ink at 8.14:1 and passes); the values are registered here
 * so a future contrast sweep does not "discover" them again. The
 * a11y two-gate sanctions the arms (the F-219b/F-208a citations);
 * the register entry is the honest record. */
export const CTA = {
  amber:
    "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-stone-900 font-semibold shadow-md",
  emerald:
    "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-md",
  rose:
    "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-semibold shadow-md",
} as const;

export const EMPTY_STATE = {
  root: "flex flex-col items-center justify-center gap-2 py-12 text-center",
  icon: "h-12 w-12 text-stone-300 dark:text-stone-600",
  title: "text-base font-semibold text-stone-500 dark:text-stone-400",
  // Session-219 (R-16, F-219i): the AA arms — stone-400 on white was
  // 2.52:1; stone-500 light / stone-400 dark passes both modes.
  subtitle: "text-sm text-stone-500 dark:text-stone-400",
} as const;

export const APP_FOOTER = {
  footer:
    "border-t border-stone-200/60 px-6 py-4 text-xs text-stone-500 dark:text-stone-400 dark:border-stone-800",
  copyright: "© 2026 WealthOS — Premium Finance Suite",
} as const;

// ---------------------------------------------------------------------------
// UI primitive contracts (the shadcn-style components' class seams)
// ---------------------------------------------------------------------------

export const DIALOG_OVERLAY =
  "fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" as const;

// Session-231 (R-28, F-231h): the wide geometry arm retired — zero
// consumers (the F-229f re-entry rule; WealthOS's one wide dialog, the
// AI coach, passes the 672px cap directly at its call site). The object
// wrapper went with it: the base geometry is a flat const again.
export const DIALOG_CONTENT = "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-line bg-surface p-6 shadow-lg outline-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg" as const;

export const DIALOG_HEADER = "flex flex-col gap-1.5 text-left" as const;

export const DIALOG_TITLE =
  "text-lg font-semibold leading-none tracking-tight text-stone-900 dark:text-stone-100" as const;

export const DIALOG_FOOTER =
  "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end" as const;

// Session-231 (R-28, F-231h): the between-justified wide-footer
// constant retired with its component — zero consumers, the F-229f
// re-entry rule; reintroduce WITH a consumer if that dialog lands.

export const DIALOG_CLOSE =
  // Session-221 (R-18, F-221l): stone-500 at full opacity, no dimming —
  // the old stone-400 at 70% blended to ≈1.85:1 on white (below the 3:1
  // non-text bar; full-opacity stone-400 was 2.52:1). The F-220f toast ✕
  // cure's mirror: stone-500 computes 4.95:1.
  // Session-222 (R-19, F-222h): the dark arms — the hover pair stepped
  // DOWN to 2.47:1 in dark (stone-600 on the flipped surface); the 400
  // resting / 300 hover mirror keeps the affordance rising in both modes.
  // Session-235 (R-32, F-235f): the hit area — the button's box was the
  // bare 16px glyph; the padding lifts the touch target toward the 24px
  // floor (the toast dismiss's own p-1 superset family), invisible to
  // every captured class axis.
  "absolute right-4 top-4 rounded-md p-1.5 text-stone-500 transition-colors hover:text-stone-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none dark:text-stone-400 dark:hover:text-stone-300" as const;

// Session-232 (R-29, F-232a): the three input-family constants here
// (the input base map, the dialog textarea, the checkbox kit) retired
// with the vendored input/label stock — zero consumers after the file
// retirement (the F-231h Avatar precedent, the F-229f re-entry rule;
// reintroduce WITH a consumer).

export const SELECT_TRIGGER = {
  base: "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background",
  placeholderState: "data-[placeholder]:text-muted-ink",
  focusRing: "focus:outline-none focus:ring-2 focus:ring-ring",
} as const;

export const BUTTON_BASE = {
  focusRing: "focus-visible:ring-2 focus-visible:ring-ring",
  svgSize: "[&_svg]:size-4",
  rounded: "rounded-md",
} as const;

// Session-226 (R-23, F-226l): the token family — border-line bg-surface.
// The stone literals this constant carried measured WRONG against the
// reference's own dark menu panel (live-probed on both apps,
// probe-226-menu: the reference's panel computes rgb(10,10,10)/
// rgb(38,38,38) — the flipped token family — while our stone-900/700
// literals rendered #1c1917/#44403c in the default dark posture). The
// light arm is byte-identical either way (#ffffff/#e7e5e4); the dark
// arm now matches the reference AND the sibling popover families
// (Select listbox, dialogs, Popover).
export const MENU_CONTENT =
  "z-50 min-w-44 overflow-hidden rounded-lg border border-line bg-surface p-1 shadow-lg" as const;

export const MENU_ITEM =
  "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-2 text-sm outline-none transition-colors focus:bg-stone-100 focus:text-stone-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-stone-800 dark:focus:text-stone-100" as const;

export const TABS_SEGMENTED = {
  // Session-199: the inactive arm rides stone-600 (5.4:1 on the stone-100
  // track — AA; stone-500 computed 4.0:1 and failed the two-gate).
  // Session-226 (R-23, F-226i): the trigger GAINS ring-offset-background —
  // the reference's own class (live-probed on its Analytics tabs,
  // probe-226-ring: its triggers carry the class and compute the offset
  // to its --background token — #0a0a0a in the fresh-visitor dark
  // posture). Without the class our focused tab painted the v4 DEFAULT
  // #fff offset — a WHITE halo under the focus ring on a dark page.
  // (SELECT_TRIGGER keeps it too — both byte-extracted
  // from the reference's own DOM strings.)
  // Session-229 (R-26, F-229f): the pill twin (the rounded-full track
  // pair) retired with its variant — zero consumers (both Tabs call
  // sites ride segmented).
  track: "inline-flex h-10 items-center justify-center rounded-lg bg-stone-100 p-1 text-stone-600 dark:bg-stone-800 dark:text-stone-300",
  trigger:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-stone-900 dark:data-[state=active]:text-stone-100",
} as const;


// ---------------------------------------------------------------------------
// The login card (WealthOS) — the reference's single centered card on a
// light blue-gray wash: the round WealthOS image logo (the reference's own
// 192×192 asset, fetched to public/wealthos-logo.png at session 208 — the
// CSS bar-chart mark retired), "Welcome to WealthOS", the four social
// buttons, the OR divider, and the navy Sign in submit.
// ---------------------------------------------------------------------------

export const LOGIN_LAYOUT = {
  page: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-[#f5f7fa] to-slate-100 p-4",
  // Session-207 (F-207f): re-pinned to the reference's live auth card —
  // the borderless glass (border-0 shadow-2xl bg-white/95 + the blur
  // wash) with the SLATE accent strip and the taller md: padding rhythm
  // (the docblock always claimed this genus; the constants had drifted).
  card: "relative overflow-hidden rounded-2xl border-0 bg-white/95 shadow-2xl backdrop-blur-sm",
  accent: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200",
  inner: "p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10",
  centered: "flex flex-col items-center text-center space-y-6",
  // Session-208 (F-208e): the reference's image-logo construction — the
  // round `sm:`-upsizing wrapper with ring-white/50, the real asset inside
  // (the retired construction was a CSS bar-chart mark on a navy disc).
  logoWrap: "relative group",
  logo: "flex shrink-0 overflow-hidden rounded-full relative h-20 w-20 sm:h-24 sm:w-24 shadow-lg ring-4 ring-white/50 group-hover:shadow-xl transition-all duration-300",
  title: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight",
  subtitle: "text-slate-500 text-sm sm:text-base font-medium",
  google:
    // Session-222 (R-19, F-222g): the house focus ring joins the auth
    // face's hand-rolled buttons (the submit already carried it; the
    // UA-default outline was the only affordance here, tinted ≈3:1 by
    // the globals outline-color).
    "flex w-full items-center justify-center gap-3 rounded-xl border border-[#e3e7ee] bg-white px-5 py-3 font-medium text-[#1b2437] text-[15px] transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
  googleIcon: "shrink-0",
  divider: "relative my-6",
  dividerLine: "shrink-0 h-[1px] w-full bg-[#e3e7ee]",
  dividerLabel: "relative flex justify-center text-xs uppercase",
  dividerLabelSpan: "bg-white px-3 font-medium tracking-wider text-[#6b7688]",
  form: "w-full space-y-4",
  fields: "space-y-3 sm:space-y-4",
  field: "[&>*+*]:mt-1.5",
  label: "text-sm font-medium text-slate-700",
  inputWrap: "relative",
  inputIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7688]",
  input:
    "h-11 w-full rounded-xl border border-[#e3e7ee] bg-white pl-10 pr-3 placeholder:text-[#a3adc2] focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40 text-base md:text-sm",
  submit:
    "flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-[#131b33] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#0f1630] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-sm",
  footer: "flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0",
  footerLink:
    // Session-222 (R-19, F-222g): the house focus ring (the auth-face
    // amber genus, matching the submit/google pair).
    "text-sm text-[#6b7688] transition-colors hover:text-[#1b2437] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-sm",
  footerLinkStrong: "font-semibold text-[#1b2437]",
} as const;
export const NOT_FOUND_LAYOUT = {
  // Session-222 (R-19, F-222f): the dark arms — the theme seam resolves
  // DARK for any non-auth path with no stored choice, so a fresh dark
  // visitor's 404 rendered a light page under html.dark (the whiplash
  // defect). The reference (a client SPA) serves its 404 INSIDE the
  // authenticated shell — dark for fresh visitors — so dark arms are
  // the parity-correct genus; light mode is untouched.
  page: "min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-[#0a0a0a]",
  card: "max-w-md w-full",
  center: "text-center space-y-6",
  headingGroup: "space-y-2",
  h1: "text-7xl font-light text-slate-500 dark:text-stone-400",
  divider: "h-0.5 w-16 bg-slate-200 mx-auto dark:bg-stone-800",
  textGroup: "space-y-3",
  h2: "text-2xl font-medium text-slate-800 dark:text-stone-100",
  p: "text-slate-600 dark:text-stone-400 leading-relaxed",
  pathSpan: "font-medium text-slate-700 dark:text-stone-300",
  buttonGroup: "pt-6",
  homeButton:
    // Session-222 (R-19, F-222g): the house focus ring (focus-visible,
    // not the legacy focus:) + the dark arms.
    "inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-stone-200 dark:bg-stone-900 dark:border-stone-700 dark:hover:bg-stone-800 dark:hover:border-stone-600",
  homeIcon: "w-4 h-4 mr-2",
  homeHref: "/",
} as const;
