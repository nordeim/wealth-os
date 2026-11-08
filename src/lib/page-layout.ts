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
  icon: "h-5 w-5",
  label: "",
  footer: "p-4 space-y-3 border-t border-amber-500/20 relative z-10",
} as const;

/** The mobile drawer — the reference's construction: a FULL-SCREEN
 *  gradient overlay (fixed inset-0, z-40) under the sticky mobile
 *  header (z-50), content starting at pt-20. */
export const MOBILE_NAV_LAYOUT = {
  // The auto-close breakpoint matches the sidebar's lg show/hide (1024).
  autoCloseQuery: "(min-width: 1024px)",
} as const;

export const MOBILE_NAV_SHEET = {
  overlay: "fixed inset-0 z-40 bg-black/50 lg:hidden",
  content:
    "lg:hidden fixed inset-0 z-40 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 focus:outline-none",
  inner: "flex flex-col h-full pt-20",
  nav: "flex-1 px-4 py-6 space-y-2",
  link: "flex items-center gap-3 px-4 py-4 rounded-xl font-medium transition-all duration-200 text-stone-300 hover:bg-gradient-to-r hover:from-white/5 hover:to-amber-500/5 hover:text-amber-100",
  linkActive:
    "flex items-center gap-3 px-4 py-4 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-amber-500/20 to-emerald-600/20 text-amber-200 shadow-lg border border-amber-400/30",
  icon: "w-6 h-6",
  label: "text-lg",
  signOut:
    "mx-4 mb-6 flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-800/60 px-4 py-3 text-stone-300 transition-all hover:border-red-500/40 hover:text-red-300",
} as const;

/** The mobile sticky header (lg:hidden, above the drawer). */
export const MOBILE_HEADER = {
  root: "lg:hidden sticky top-0 z-50 border-b border-stone-200/60 bg-[#faf9f7]/90 backdrop-blur-md dark:border-stone-800 dark:bg-[#0e1310]/90",
  inner: "flex h-16 items-center justify-between px-4",
  brandRow: "flex items-center gap-3",
  brandLogo:
    "w-9 h-9 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-md shadow-amber-500/20",
  brandWordmark: "text-lg font-bold text-amber-600 dark:text-amber-400",
  syncedPill:
    "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400",
  iconButton:
    "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800",
} as const;

/** Page headers inside main (every page's own top block). */
export const PAGE_HEADER = {
  root: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
  title: "text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50",
  subtitle: "text-sm text-stone-500 dark:text-stone-400",
  actions: "flex flex-wrap items-center gap-2",
} as const;

export const PAGE_ROOT = {
  standard: "p-4 md:p-6 lg:p-8 space-y-6",
  bare: "",
} as const;

export const CARD = {
  base: "rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900/60",
  padding: "p-4 md:p-6",
  title: "text-base font-semibold leading-none tracking-tight text-stone-900 dark:text-stone-100",
  subtitle: "text-xs text-stone-500 dark:text-stone-400",
} as const;

export const BUTTONS = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-500/25 transition-all hover:from-amber-600 hover:to-yellow-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-50",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 dark:text-stone-300 dark:hover:bg-stone-800",
} as const;

export const EMPTY_STATE = {
  root: "flex flex-col items-center justify-center gap-2 py-12 text-center",
  icon: "h-12 w-12 text-stone-300 dark:text-stone-600",
  title: "text-base font-semibold text-stone-500 dark:text-stone-400",
  subtitle: "text-sm text-stone-400 dark:text-stone-500",
} as const;

export const APP_FOOTER = {
  footer:
    "border-t border-stone-200/60 px-6 py-4 text-xs text-stone-400 dark:border-stone-800",
  copyright: "© 2026 WealthOS — Premium Finance Suite",
} as const;

/** The reference's segmented period control (1M 3M 6M 1Y). */
export const PERIOD_SEGMENT = {
  container:
    "inline-flex items-center rounded-lg bg-stone-100 p-1 dark:bg-stone-800",
  button:
    "rounded-md px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100",
  buttonActive:
    "rounded-md bg-amber-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm",
} as const;

// ---------------------------------------------------------------------------
// UI primitive contracts (the shadcn-style components' class seams)
// ---------------------------------------------------------------------------

export const DIALOG_OVERLAY =
  "fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" as const;

export const DIALOG_CONTENT = {
  base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-line bg-surface p-6 shadow-lg outline-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  wide: "max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin",
} as const;

export const DIALOG_HEADER = "flex flex-col gap-1.5 text-left" as const;

export const DIALOG_TITLE =
  "text-lg font-semibold leading-none tracking-tight text-stone-900 dark:text-stone-100" as const;

export const DIALOG_FOOTER =
  "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end" as const;

export const DIALOG_FOOTER_WIDE =
  "flex flex-col-reverse gap-2 sm:flex-row sm:justify-between" as const;

export const DIALOG_CLOSE =
  "absolute right-4 top-4 rounded-md text-stone-400 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:pointer-events-none" as const;

export const INPUT_BASE = {
  size: "text-base md:text-sm",
  bg: "bg-transparent",
  ink: "text-ink",
  placeholder: "placeholder:text-muted-ink",
  transition: "transition-colors",
  focusRing: "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  file: "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
} as const;

export const DIALOG_TEXTAREA =
  "flex min-h-[60px] w-full rounded-md border border-line bg-transparent px-3 py-2 text-base md:text-sm text-ink shadow-sm transition-colors placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

export const SELECT_TRIGGER = {
  base: "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background",
  placeholderState: "data-[placeholder]:text-muted-ink",
  focusRing: "focus:outline-none focus:ring-1 focus:ring-ring",
} as const;

export const BUTTON_BASE = {
  focusRing: "focus-visible:ring-1 focus-visible:ring-ring",
  svgSize: "[&_svg]:size-4",
  rounded: "rounded-md",
} as const;

export const MENU_CONTENT =
  "z-50 min-w-44 overflow-hidden rounded-lg border border-stone-200 bg-white p-1 shadow-lg dark:border-stone-700 dark:bg-stone-900" as const;

export const MENU_ITEM =
  "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-2 text-sm outline-none transition-colors focus:bg-stone-100 focus:text-stone-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-stone-800 dark:focus:text-stone-100" as const;

export const CHECKBOX = {
  control:
    "peer h-4 w-4 shrink-0 rounded border border-stone-300 text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-600",
  indicator: "flex items-center justify-center text-current",
  row: "flex items-start space-x-2",
  label: "text-sm leading-none font-medium text-stone-700 dark:text-stone-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
} as const;

export const TABS_SEGMENTED = {
  // Session-199: the inactive arm rides stone-600 (5.4:1 on the stone-100
  // track — AA; stone-500 computed 4.0:1 and failed the two-gate).
  track: "inline-flex h-10 items-center justify-center rounded-lg bg-stone-100 p-1 text-stone-600 dark:bg-stone-800 dark:text-stone-300",
  trigger:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-stone-900 dark:data-[state=active]:text-stone-100",
} as const;

export const TABS_PILL = {
  track: "inline-flex h-9 items-center justify-center rounded-full bg-stone-100 p-1 text-stone-600 dark:bg-stone-800 dark:text-stone-300",
  trigger:
    "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-stone-900 dark:data-[state=active]:text-stone-100",
} as const;

export const GRID_COLS: Record<number, string> = {
  2: "grid grid-cols-2",
  3: "grid grid-cols-3",
  4: "grid grid-cols-4",
  5: "grid grid-cols-5",
};

// ---------------------------------------------------------------------------
// The login card (WealthOS) — the reference's single centered card on a
// light blue-gray wash: circular navy logo badge with the bar-chart mark,
// "Welcome to WealthOS", the four social buttons, the OR divider, and the
// navy Sign in submit.
// ---------------------------------------------------------------------------

export const LOGIN_LAYOUT = {
  page: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-[#f5f7fa] to-slate-100 p-4",
  card: "relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-xl",
  accent: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300",
  inner: "p-8 sm:p-10",
  centered: "flex flex-col items-center text-center space-y-6",
  logoWrap: "relative",
  logoGlow: "absolute inset-0 rounded-full bg-amber-200/40 blur-xl",
  logo: "relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#0f1e3d] shadow-lg ring-4 ring-white/60",
  title: "text-2xl sm:text-3xl font-bold text-[#1b2437] tracking-tight",
  subtitle: "text-[#6b7688] text-sm sm:text-base font-medium",
  google:
    "flex w-full items-center justify-center gap-3 rounded-xl border border-[#e3e7ee] bg-white px-5 py-3 font-medium text-[#1b2437] text-[15px] transition-all duration-200 hover:border-slate-300 hover:bg-slate-50",
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
    "h-11 w-full rounded-xl border border-[#e3e7ee] bg-white pl-10 pr-3 placeholder:text-[#a3adc2] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 text-base md:text-sm",
  submit:
    "flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-[#131b33] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#0f1630] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-sm",
  footer: "flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0",
  footerLink: "text-sm text-[#6b7688] transition-colors hover:text-[#1b2437]",
  footerLinkStrong: "font-semibold text-[#1b2437]",
} as const;
export const NOT_FOUND_LAYOUT = {
  page: "min-h-screen flex items-center justify-center p-6 bg-slate-50",
  card: "max-w-md w-full",
  center: "text-center space-y-6",
  headingGroup: "space-y-2",
  h1: "text-7xl font-light text-slate-500",
  divider: "h-0.5 w-16 bg-slate-200 mx-auto",
  textGroup: "space-y-3",
  h2: "text-2xl font-medium text-slate-800",
  p: "text-slate-600 leading-relaxed",
  pathSpan: "font-medium text-slate-700",
  buttonGroup: "pt-6",
  homeButton:
    "inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
  homeIcon: "w-4 h-4 mr-2",
  homeHref: "/",
} as const;
