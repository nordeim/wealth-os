// ---------------------------------------------------------------------------
// scripts/interior-census.ts — the INTERIOR full-geometry census gate (the
// SIXTH gate)
//
// Session-206 (R-4.3): the WealthOS re-anchor — the page set, the
// data-page scope, and the reference URL re-pointed at the WealthOS
// reference (the CRM-era config retired on the R-4 ladder; the tool's
// doctrine unchanged). Session-152 (the 152-c rotation): the walk41
// throwaway promoted into a
// standing repo tool. The L-151c2 lesson: below-every-fold (inside
// main.overflow-auto, past the 844 phone fold and the ~900 desktop sweep
// fold) is structurally invisible to ALL five standing gates — the pixel
// sweeps clip at their capture height, the fullpage gate sees only public
// long-scroll documents. The F-151c1 ghost buttons (two stale "+ Add"
// constructions the s7 bundle extraction pinned, 143 sessions old) lived
// exactly there; only the full-geometry census saw them. This tool makes
// that census a one-command gate chained into gate:full after
// sweep:fullpage — the dead zone is closed STRUCTURALLY, not by rotation
// memory.
//
// THE MUTATION-PROOF DOCTRINE (walk42 PASS 2, part of this tool's
// contract): replanting the F-151c1 ghost (a "+ Add" button in a dashboard
// card header, below every fold) must RED this gate with the ghost decoded
// as OURS-EXTRA/unexplained — the exact defect class that survived 143
// sessions now fails `bun run census:interior -- --fail-on-drift` in one
// command. Executed and verified at s152; re-execute on any decoder change.
// The s153 extension adds the DESKTOP leg (walk43): the same ghost at the
// desktop axis (`--axis desktop --pages dashboard` — the ghost lived at
// y≈905 @1440, below every desktop sweep fold) must RED the desktop leg
// exactly as the phone leg REDs — the dead zone is PER-AXIS (L-153c1),
// and the census now walks BOTH legs in one invocation. The s154
// extension adds the TABLET legs (walk44): the same ghost at the md-boundary
// axis (`--axis tablet --pages dashboard` — 768×1024, the sidebar's
// first-appearance frame, the 448px content regime) must RED the tablet
// leg exactly as the phone/desktop legs RED — the F-151c1 class then
// fails the gate at ALL FOUR axes, and no leg masks another. The s155
// extension adds the PUBLIC leg (walk45): a ghost planted in the
// landing (`--pages landing` — the public marketing surface, GUEST
// contexts) must RED the public leg at all four axes exactly as the
// app pages RED — the F-151c1 class then fails the gate on EVERY
// censused surface, and no SURFACE masks another (L-155c1).
//
// The protocol (sweep.ts's, reused not duplicated): reuse-or-boot the dev
// server (the platform DATABASE_URL spawn guard) → zero our domain data
// (scripts/zero-data.ts — users + the Setting singleton stay) → login BOTH
// apps → per page: nav + main-visible wait + settle + the census evaluate
// → decode → report → the seed restored in a FINALLY (the never-zeroed
// doctrine — this tool closes the gap sweep.ts leaves when it throws
// mid-run: the restore rides the finally, so the workspace is never left
// zeroed even on a thrown census).
//
// THE PUBLIC LEG (the 155-c extension): the landing at `/` is the
// public marketing surface — it renders to GUESTS (NO login, NO
// storageState, the s149 fullpage doctrine) in a fresh GUEST context
// per axis. The anchor is div.min-h-screen.bg-white (ours id=top at
// body level, the reference's #root first child — querySelector's
// first document-order match on both apps), so the reference's guest
// pill (the body-level div#base44-edit-badge sibling, position:fixed)
// and both apps' shadcn Toaster portal sit OUTSIDE the anchor and
// never enter the census — the pill genus stays in the fullpage
// gate's STANDING_EXPLAINED, never censused, never mirrored. The
// landing scrolls the DOCUMENT (no main.overflow-auto): the height
// seam is documentElement.scrollHeight (docH) and the s95 floor
// travels with the frame as the VIEWPORT column (axis.width).
//
// The census (the walk41 idiom): both apps logged in at the CENSUS AXES
// — 390×844 (phone, the walk41 axis) + 768×1024 (tablet, the 154-c
// extension: the md BOUNDARY — the sidebar's first-appearance frame,
// the 448px content regime) + 1024×768 (landscape, the 154-c extension:
// the 704px column at half the desktop slack) + 1440×900 (desktop, the
// 153-c extension: the F-151c1 axis) — every element inside `main`
// censused: content-relative top/left, w, h, tag, class, leaf-text,
// plus mainH = main.scrollHeight (the internal scroller's content
// height). The PURE decode seams (alignCensus / attributeGenera /
// censusVerdict / contentFloor / parseAxisArg) are what the unit pins
// exercise. The dead zone is PER-AXIS (L-153c1): the phone leg proves
// the 390 interior, the tablet/landscape legs the 768/1024 interiors,
// the desktop leg the 1440 interior — one viewport never covers
// another's layout tree, and the sweep-viewport classes and the census
// axes now coincide.
//
// The verdict is BYTE-PARITY, zero margin: geometry gates have no raster
// floor, so every delta must ATTRIBUTE to a documented genus or it is
// drift. The documented genera (never for mirroring):
//   • token-mirror   — cls-only pairs, geometry byte-equal (the
//                      lucide DOM-composition + v3-compat class-order +
//                      space-y-hazard families, the walk41 decode)
//   • live-data      — text-only pairs, geometry byte-equal, ONLY on
//                      the DATA surfaces (the 9 CENSUS_DATA_PAGES —
//                      the reference's intraday workspace data; the
//                      157-c scope keys on the POSITIVE class:
//                      absorb-only-on-members — every other surface
//                      [the static-marketing trio + the login wall]
//                      carries no workspace data, so a text-only pair
//                      there is REAL content drift and REDs by
//                      DEFAULT — the s155/s156 hazard closed at the
//                      invariant, L-156c2 taken to the DEFAULT form)
//   • composition-split — the TEXT-NODE CARDINALITY face (the walk45
//                      landing decode): whitespace-stripped byte-equal
//                      texts at byte-equal boxes — ours MERGES the
//                      text nodes the reference SPLITS ([TEXT("$8")]
//                      vs [TEXT("$"), TEXT("8")]), the census's
//                      join(" ") between direct text nodes the only
//                      witness; the walk42 cls-merge twin
//   • recharts-internal — paired shifts with all deltas ≤ 3px (the
//                      3px y-axis top/height drift, version-borne)
//   • dead-stub      — one-sided extras at w=0 AND h=0 (the s125/s141
//                      hidden-stub genus; invisible geometry)
//   • chart-suppression — ours-extra `chart-no-outline` wrappers (the
//                      pinned focus-outline construction, 2+3+4 sites)
//   • s95-wrapper    — ours-extra `px-0` CardContent (our min-w-0
//                      in-box-scroll table fix)
//   • s95-poke-out   — position-aligned width-only shifts where OURS
//                      carries the min-w-0/overflow-x-auto/px-0 clamp
//                      and the REFERENCE pokes wider (its bare flex-1
//                      cards, its own standing defect)
//   • settings-data  — the settings page's picklist rows (the row
//                      signature + bbox-contained subtrees; both sides
//                      render the identical template, counts differ
//                      intraday) + the settings-data-cascade shifts
//                      (the row-count delta displaces everything below)
//   • login-logo-mark — ours-extra brand-mark SPAN on the login wall
//                      (the walk47 decode): our CSS brand mark where
//                      the reference's ring loads the workspace
//                      owner's UPLOADED LOGO (live branding data, the
//                      Base44-pill genus class, never mirrored); the
//                      ring pairs byte-equal + the ref img is the
//                      ring's wrapper-twin; the exact-token
//                      signature never absorbs a restyle or a ghost
//
// The ONE margin exception (L-152c3, the L-150c2 doctrine extended): the
// settings page's mainH is SKIPPED and its shift face is REPORT-ONLY —
// the picklist DATA is LIVE-EDITED INTRADAY by the owner, so mainH and
// the below-rows displacement are functions of the row count, not of the
// template. The settings gate face is the EXTRAS census (a new or missing
// element on the page still REDs) + the pairwise row alignment when
// counts match; the pixel sweeps hold the band structure at their own
// settings baseline. Never widened — skipped, and documented.
//
// Run: bun run census:interior [--fail-on-drift] [--json]
//      [--axis phone|desktop|all]  (default all — the gate covers both
//      legs in one command; the mutation-proof runs one axis)
//      [--pages income,settings]  (the sweep's subset idiom,
//      fail-fast, over the combined list; composes with --axis; the
//      auth faces (login, reset-password) are the STATIC-AUTH
//      surfaces: no workspace data, the text-only RED default)
//      [--parallel N]  (default 1 — the standing sequential protocol,
//      one axis at a time, the observable behavior byte-identical; N
//      walks the axes N-at-a-time: the planAxisBatches partition, each
//      batch's axes CONCURRENT with the worker starts STAGGERED
//      WALK_STAGGER_MS per worker, the batches sequential; the 158-c
//      probe validated 4-way on the 2-core standing box — all 24 walks
//      reproduced the standing values byte-for-byte, 2.7× on the
//      subset; gate:full runs --parallel 4, the ~26-min census leg
//      ~7-8 min. THE LOGIN-BUDGET DOCTRINE — the 160-c structural
//      cure (L-160c1): the login COUNT is the budget's true axis —
//      the census's own logins are a scarce resource (the login
//      limiter is 10-per-IP/15-min fixed-window and 429s also
//      increment), and the per-axis logins that exhausted it three
//      rounds running (s158, s159, s160's audit: 13 chain logins, 2 ×
//      429s) collapsed at 160-c into ONE pre-flight login pair per
//      invocation: login the reference + ours ONCE in a neutral
//      context, capture the COMBINED storageState (two origins, one
//      cookie jar), hand it to every axis worker's fresh context — the
//      stateless HMAC cookie survives context recreation and the
//      zero-data phase keeps the users table (L-160c2, the
//      consolidation license; a server-side session store would break
//      it); the app's own limiter — a deliberate security contract —
//      is NEVER touched. The stagger (L-157c3's arrival doctrine,
//      re-anchored) now spaces the worker STARTS — spreading the
//      4-way walk load, the no-burst spirit intact. L-160c3: the
//      recurring operational fix (the same manual dev-server restart
//      + re-run three rounds running) is a standing defect — this
//      round is its structural cure. The batch gathers through
//      Promise.allSettled — INPUT order, never completion order — so
//      the report + the --json shape stay byte-identical under
//      concurrency; a rejected worker drains the batch then rethrows.
//      [--parallel N] carries THE QUIESCENCE EXTENSION (the PASS-1
//      decode): the fixed 2500ms settle does not survive 4-way load —
//      the read-too-early class hit ours ([desktop] reports' recharts
//      tooltip read MID-ENTRANCE) and the reference inside our slowed
//      browser (its settings rows read PRE-MOUNT); every census read
//      is now a SETTLED read — a geometry fingerprint polled until
//      QUIESCENCE_STABLE_SAMPLES consecutive samples agree, the
//      standing settle the floor, QUIESCENCE_CEILING_MS the
//      never-weaker fallback.)
//      Session-159: waitQuiescent + censusPage + settingsRowSignature are
//      additionally EXPORTED for scripts/settings-rhythm.ts (the
//      intraday-rhythm observation instrument gets the settled read + the
//      row contract for free — additive exports, zero behavior).
// Env: OUR_URL / REF_URL / REF_EMAIL / REF_PASSWORD (the sweep contract)
// ---------------------------------------------------------------------------

import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { chromium } from "@playwright/test";
import { login, waitOnUrl, parsePagesArg } from "./sweep";

/** Re-exported for the unit pins (the --pages fail-fast is the sweep's
 *  own seam — reused, not duplicated; the s95 idiom). */
export { parsePagesArg };

/** Session-206 (R-4.3): the WealthOS interior page set — LOCKSTEP with
 *  the sweep's PAGES list (the R-4.1 seam: one page set, two tools —
 *  pinned in tests/interior-census-tool.test.ts). The 9 finance
 *  sections (the app's own nav list, tests/nav-config.test.ts's
 *  contract) + the two public auth faces (login/reset-password — both
 *  render a `main` card family on both apps; the R-4.1 verified-200
 *  set, captured authenticated). The CRM-era marketing interiors
 *  (about/contact) and the CRM page set retired with the re-anchor:
 *  the WealthOS reference serves no such routes. */
export const INTERIOR_PAGES = [
  { name: "dashboard", path: "/dashboard" },
  { name: "income", path: "/income" },
  { name: "expenses", path: "/expenses" },
  { name: "accounts", path: "/accounts" },
  { name: "investments", path: "/investments" },
  { name: "import", path: "/import" },
  { name: "analytics", path: "/analytics" },
  { name: "goals", path: "/goals" },
  { name: "settings", path: "/settings" },
  // the auth faces — the STATIC-AUTH surfaces (no workspace data; a
  // text-only pair there is REAL content drift, RED by default)
  { name: "login", path: "/login" },
  { name: "reset-password", path: "/reset-password" },
] as const;

export type InteriorPage = (typeof INTERIOR_PAGES)[number];

// -- the PUBLIC leg (the 155-c extension) ----------------------------------
//
// Session-206 (R-4.3): the public leg is RETIRED for WealthOS — the
// reference has no public marketing surface (`/` login-walls guests:
// a client redirect to /login?from_url=…, verified live this session;
// the CRM-era landing at `/` does not exist here). The leg's machinery
// (the list, the isPublicPage dispatch, the censusPublicPage collector)
// stays for a future public surface; an empty list runs no public walk.
// The explicit annotation (the sweep.ts PAGES idiom, not a bare
// `as const` on the literal — an empty `as const` tuple types every
// member `never` and breaks the dispatch) keeps the entry shape live.

export const PUBLIC_PAGES: readonly { name: string; path: string }[] = [];

export type PublicPage = (typeof PUBLIC_PAGES)[number];

/** The combined filter list: the --pages idiom selects across BOTH legs
 *  (the s95 seam, composed — `--pages landing` runs only the public
 *  leg; mixed selections compose; unknown names fail-fast). */
export const CENSUS_ALL_PAGES = [...INTERIOR_PAGES, ...PUBLIC_PAGES] as const;

/** The dispatch: a census page is public iff its name is in PUBLIC_PAGES
 *  (the guest contexts + the document-scroller collector follow it). */
export function isPublicPage(p: { name: string }): boolean {
  return PUBLIC_PAGES.some((pub) => pub.name === p.name);
}

// -- the POSITIVE DATA scope (the 157-c form — L-156c2 at the invariant) ---
//
// The live-data genus is a WORKSPACE-SURFACE genus: the reference's
// intraday workspace data lives on the 9 DATA pages only. The scope
// keys on the POSITIVE class — live-data absorbs text-only pairs
// ONLY on CENSUS_DATA_PAGES members — so every other surface (the
// static-marketing trio (landing, about, contact) + the login wall,
// and any FUTURE surface) REDs BY DEFAULT: a text-only pair there is
// REAL content drift (a changed headline, a reprice, a changed
// 'Sign in'). The s155 !isPublicPage keying and the s156 negative
// static-list keying were each correct only until the next static
// surface arrived — the login leg was the next face of the exact
// walk45 hazard both re-anchors closed; the DEFAULT is the hazard's
// next face, so the scope absorbs only-on-members (L-157c2).

/** The DATA surfaces by name — the ONLY pages whose text-only pairs
 *  absorb as live-data (the workspace-data-bearing sections).
 *  Session-206 (R-4.3): the WealthOS scope — the reference's
 *  workspace renders EMPTY STATES today (the F-206a decode); the
 *  absorption stays for the day it re-seeds (the drift-probe's
 *  sentinel census watches that side). */
export const CENSUS_DATA_PAGES = [
  "dashboard",
  "income",
  "expenses",
  "accounts",
  "investments",
  "import",
  "analytics",
  "goals",
  "settings",
] as const;

/** The scope predicate: live-data absorbs text-only pairs ONLY on the
 *  DATA members; every other surface REDs by default. */
export function isCensusDataPage(p: { name: string }): boolean {
  return CENSUS_DATA_PAGES.some((s) => s === p.name);
}

/** The walk41 census element (the geometry floor is integer px). */
export interface CensusEl {
  top: number;
  left: number;
  w: number;
  h: number;
  tag: string;
  cls: string;
  text: string;
}

export type CensusEventKind =
  | "match"
  | "cls-only"
  | "text-only"
  | "shift"
  | "tag-swap"
  | "ours-extra"
  | "ref-extra";

export interface CensusEvent {
  kind: CensusEventKind;
  el?: CensusEl;
  ref?: CensusEl;
  dTop?: number;
  dLeft?: number;
  dW?: number;
  dH?: number;
}

/** The recharts-internal genus bound: paired shifts with every delta
 *  ≤ this are version drift below the pixel floor (walk41: the 3px
 *  y-axis top/height shift). Anything larger must attribute elsewhere. */
export const RECHARTS_TOL = 3;

/** Session-176: the recharts-3 STRUCTURAL token vocabulary — the
 *  tick-machinery classes the 2.x DOM does not carry (the per-axis
 *  tick-labels layers, the tick-lines containers, the axis-specific
 *  ticks containers, the zIndex wrappers). A paired g-element shift
 *  carrying one of these against a recharts-classed counterpart is the
 *  version-borne restructure face (the recharts3-restructure genus);
 *  the wrapper DIVs never carry these tokens and stay under the
 *  ≤3px bound. */
export const RECHARTS3_STRUCT =
  /recharts-(?:xAxis|yAxis)-tick(?:s|-labels|-lines)|recharts-cartesian-axis-tick-(?:labels?|lines)|recharts-zIndex-layer/;

/** The 390×844 frame's content-column floor (the walk41 decode: main's
 *  p-4 padding leaves 358px). The s95 poke-out discriminator: the
 *  REFERENCE's bare flex-1 tables poke past it (w=472); a width delta
 *  between two in-container boxes is NOT the poke-out. */
export const PHONE_CONTENT_FLOOR = 358;

// -- the census axes (the 153-c extension) -------------------------------

export interface CensusAxis {
  name: string;
  width: number;
  height: number;
}

/** The four census legs (the L-153c1 doctrine: the dead zone is PER-AXIS).
 *  Phone 390×844 — the walk41 axis, the s152 gate. Desktop 1440×900 —
 *  the F-151c1 axis (the s153 leg: the ghost buttons lived at y≈905
 *  @1440, below every desktop sweep fold). Tablet 768×1024 + landscape
 *  1024×768 — the s154 legs: the md BOUNDARY axis (the sidebar's
 *  first-appearance frame — `hidden md:flex w-64`; at exactly 768 the
 *  content column drops from 703 to 448, the L-154c1 boundary face) and
 *  the lg-adjacent 704px column. The four legs align the census coverage
 *  with the four pixel-sweep viewport classes — no blind interior axis
 *  remains. */
export const CENSUS_AXES: ReadonlyArray<CensusAxis> = [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "landscape", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

/** The content-column floor at a frame width (the L-153c2 seam: the
 *  floor travels with the frame, never a constant): <640 the sidebar is
 *  hidden and the page root pads p-4 (390→358, the walk41 anchor);
 *  640-767 the sidebar still hidden, the sm:p-8 root (640→576); ≥768
 *  the w-64 sidebar is in flow AND the sm:p-8 root (1440→1120, the
 *  F-151c1 axis). The s95 poke-out discriminator reads the AXIS's
 *  floor — a past-the-floor reference width absorbs, an in-container
 *  width delta stays RED at both axes. */
export function contentFloor(width: number): number {
  if (width < 640) return width - 32;
  if (width < 768) return width - 64;
  return width - 256 - 64;
}

/** The --axis CLI seam (the --pages idiom): default ALL legs (the
 *  standing gate command covers both); one-axis subsets for the
 *  targeted mutation-proof runs; unknown names fail fast listing the
 *  valid ones. */
export function parseAxisArg(argv: string[]): ReadonlyArray<CensusAxis> {
  const i = argv.indexOf("--axis");
  if (i === -1) return CENSUS_AXES;
  const wanted = argv[i + 1];
  if (wanted === "all") return CENSUS_AXES;
  const axis = CENSUS_AXES.find((a) => a.name === wanted);
  if (!axis) {
    throw new Error(
      `unknown --axis "${wanted}" — valid: all, ${CENSUS_AXES.map((a) => a.name).join(", ")}`,
    );
  }
  return [axis];
}

// -- the PARALLEL-AXES option (the 158-c rotation) --------------------------

/** The worker-START stagger between the workers of one batch (the
 *  no-burst load form — re-anchored at the 160-c rotation): the
 *  login-arrival role is RETIRED — the logins live in ONE pre-flight
 *  pair per invocation now (L-160c1: the count is the budget's true
 *  axis; the 10-per-IP/15-min limiter stays untouched, a deliberate
 *  security contract). Worker i of a batch delays its START by
 *  i × WALK_STAGGER_MS, spreading the 4-way first-read load over
 *  ~12s (the s158 LOAD decode rides: the concurrent walks still
 *  enter one at a time). `--parallel 1` workers are always worker 0:
 *  zero added delay, the standing cadence. */
export const WALK_STAGGER_MS = 4000;

/** The --parallel CLI seam (the --axis idiom): default 1 = the standing
 *  sequential protocol (the no-flag form byte-identical — one axis at a
 *  time); N > 1 walks the axes in batches of ≤ N concurrent workers.
 *  The fail-fast negatives mirror --axis: never a silent fall-back on a
 *  typo (a missing value, a non-numeric value, or n < 1 throws). */
export function parseParallelArg(argv: string[]): number {
  const i = argv.indexOf("--parallel");
  if (i === -1) return 1;
  const wanted = argv[i + 1];
  const n = Number(wanted);
  if (wanted === undefined || wanted === "" || !Number.isInteger(n) || n < 1) {
    throw new Error(
      `invalid --parallel "${wanted ?? ""}" — an integer ≥ 1 (1 = the standing sequential protocol; 4 = the probe-validated gate:full form on the 2-core box)`,
    );
  }
  return n;
}

/** The pure partition seam (the s158 walk48 orchestration): the axes are
 *  walked in CONSECUTIVE BATCHES of ≤ parallel; each batch's axes run
 *  CONCURRENTLY (a worker per axis — the standing per-axis body, logins
 *  staggered), the batches themselves run sequentially. The partition is
 *  order-preserving (flattened batches === the input axes order) and
 *  CAPPED at the axes count (no empty workers — a 4-way flag on one
 *  selected axis is one worker, the single-axis mutation-proof runs).
 *  parallel 1 → one axis per batch = the standing sequential semantics,
 *  observable behavior byte-identical. */
export function planAxisBatches(
  axes: ReadonlyArray<CensusAxis>,
  parallel: number,
): ReadonlyArray<ReadonlyArray<CensusAxis>> {
  if (axes.length === 0) return [];
  const n = Math.max(1, Math.min(Math.trunc(parallel), axes.length));
  const batches: Array<ReadonlyArray<CensusAxis>> = [];
  for (let i = 0; i < axes.length; i += n) {
    batches.push(axes.slice(i, i + n));
  }
  return batches;
}

// -- the pure decoder -------------------------------------------------------

/** Position-alignment window for pairing (the greedy pass 1). */
const POS_TOL = 4;
/** The constant-offset window for the displaced-tail resync (pass 2). */
const OFFSET_TOL = 2;
/** The diagonal resync bound (mixed ours/ref skips). */
const RESYNC_WINDOW = 12;
/** The pure one-sided run bound (a settings row subtree is ~6 nodes per
 *  row; several rows plus chart internals fit well inside this). */
const PURE_RUN_MAX = 256;
/** The offset-candidate scan windows (ours-side deep — the row subtree
 *  runs; ref-side shallow). */
const OFFSET_M_MAX = 96;
const OFFSET_N_MAX = 16;
/** A displacement offset is accepted only if it yields this many
 *  consecutive pairs — a single coincidental alignment is NOT a
 *  displaced tail, it is the one-sided face (extras). */
const SUSTAINED = 3;

/** Pairing at a running offset: same tag + the position delta within
 *  POS_TOL of the offset. Width/height are UNCONSTRAINED at pairing —
 *  a position-aligned geometry delta is a SHIFT event (reported with
 *  its deltas), never a cascade.
 *  THE TAG-SWAP RELAXATION (the walk42 calendar decode): when tags
 *  differ but the geometry is byte-equal RELATIVE to the running
 *  offset — (a.top - b.top === offset) && lefts equal && w/h equal —
 *  the pair is the s76 composition genus (our SPAN/BUTTON vs its DIV
 *  at the identical box). Without this, a tag-mismatched zone blocks
 *  EVERY resync scan (the tags gate them all) and the walk loses sync
 *  — the maiden decode's -206 card misalignment came exactly from a
 *  7-element SPAN/DIV zone. The strictness (byte-equal, not
 *  near-equal) keeps a planted ghost (75×32 vs a 24px title row)
 *  one-sided. */
function pairableAt(a: CensusEl, b: CensusEl, offset: number): boolean {
  if (a.tag === b.tag) {
    return (
      Math.abs(a.top - b.top - offset) <= POS_TOL &&
      Math.abs(a.left - b.left) <= POS_TOL
    );
  }
  // the walk42 debug decoded a standing -1px running offset (subpixel
  // rounding drift, absorbed by the recharts ≤3px rule on the same-tag
  // face) — an EXACT a.top-b.top === offset check broke the entire cell
  // zone. The window form keeps the strictness where it matters: w/h
  // byte-equal (a NEAR-twin is never paired), position within the
  // pairing window relative to the running offset.
  return (
    Math.abs(a.top - b.top - offset) <= POS_TOL &&
    Math.abs(a.left - b.left) <= POS_TOL &&
    a.w === b.w &&
    a.h === b.h
  );
}

function byteEqualGeometry(a: CensusEl, b: CensusEl): boolean {
  return a.top === b.top && a.left === b.left && a.w === b.w && a.h === b.h;
}

/**
 * The greedy resync-alignment decoder (the walk41 lesson, promoted:
 * index-pairwise alignment saturates on one-sided runs — the diff cap
 * cascaded; the greedy resync skips to the next pairable element).
 *
 * Two passes, one state machine:
 *  - pass 1 pairs at the RUNNING OFFSET (0 at page top). A paired event
 *    with byte-equal geometry is match/cls-only/text-only; anything else
 *    is a SHIFT carrying its four deltas.
 *  - on divergence the resync tries, in order: a pure ours-run, a pure
 *    ref-run, then CONSTANT-OFFSET candidates (the displaced tail — the
 *    F-151c1 signature: an in-flow extra element displaces everything
 *    below by its height; the tail re-pairs at the new offset and the
 *    extras stay one-sided). An offset is accepted only when it yields
 *    SUSTAINED consecutive pairs — a single coincidental alignment is
 *    the one-sided face, not a displacement.
 *  - when nothing resyncs, the current pair goes one-sided BOTH ways
 *    (an ours-extra + a ref-extra) and the walk advances — no rest-dump,
 *    no cascade.
 */
export function alignCensus(ours: CensusEl[], ref: CensusEl[]): CensusEvent[] {
  const events: CensusEvent[] = [];
  let i = 0;
  let j = 0;
  let offset = 0;

  const pushPair = (a: CensusEl, b: CensusEl) => {
    if (a.tag !== b.tag) {
      // the tag-swap composition genus — byte-equal-relative geometry,
      // different DOM composition (the s76 calendar cells)
      events.push({
        kind: "tag-swap",
        el: a,
        ref: b,
        dTop: a.top - b.top,
        dLeft: a.left - b.left,
        dW: a.w - b.w,
        dH: a.h - b.h,
      });
      return;
    }
    if (byteEqualGeometry(a, b)) {
      if (a.cls !== b.cls) {
        events.push({ kind: "cls-only", el: a, ref: b });
      } else if (a.text !== b.text) {
        events.push({ kind: "text-only", el: a, ref: b });
      } else {
        events.push({ kind: "match", el: a, ref: b });
      }
    } else {
      events.push({
        kind: "shift",
        el: a,
        ref: b,
        dTop: a.top - b.top,
        dLeft: a.left - b.left,
        dW: a.w - b.w,
        dH: a.h - b.h,
      });
    }
  };

  const pureRun = (side: "ours" | "ref", o: number): number => {
    for (let d = 1; d <= PURE_RUN_MAX; d++) {
      const ik = side === "ours" ? i + d : i;
      const jl = side === "ours" ? j : j + d;
      if (ik >= ours.length || jl >= ref.length) break;
      if (pairableAt(ours[ik], ref[jl], o)) return d;
    }
    return -1;
  };

  /** Count consecutive pairs at (k, l) under offset o. */
  const sustainedFrom = (k: number, l: number, o: number): number => {
    let n = 0;
    while (i + k + n < ours.length && j + l + n < ref.length && pairableAt(ours[i + k + n], ref[j + l + n], o)) {
      n++;
    }
    return n;
  };

  /** A resync run is acceptable when it yields SUSTAINED pairs OR it is
   *  a real tail run (>= 2 pairs reaching a list end — a SINGLE pair at
   *  the end is indistinguishable from a coincidence and never
   *  anchors). The maiden-census decode (walk42): without the sustained
   *  face, a pure run grabs a COINCIDENTAL single pair at a stale
   *  offset (the settings piecewise cascade — each card boundary shifts
   *  the displacement; the first same-tag element at the old offset is
   *  a false anchor and the alignment loses sync card by card). */
  const runAcceptable = (k: number, l: number, o: number): boolean => {
    const n = sustainedFrom(k, l, o);
    return (
      n >= SUSTAINED ||
      (n >= 2 && (i + k + n >= ours.length || j + l + n >= ref.length))
    );
  };

  while (i < ours.length || j < ref.length) {
    // the exhausted tails: one-sided, no cascade
    if (i >= ours.length) {
      for (; j < ref.length; j++) events.push({ kind: "ref-extra", ref: ref[j] });
      break;
    }
    if (j >= ref.length) {
      for (; i < ours.length; i++) events.push({ kind: "ours-extra", el: ours[i] });
      break;
    }
    // pass 1: pair at the running offset
    if (pairableAt(ours[i], ref[j], offset)) {
      // THE BYTE-EQUAL-CLS PREFERENCE (the walk42 mispair decode): a
      // pairable-but-class-different immediate pair can be a MISPAIR
      // — a nesting wrapper on one side (ours' merged toolbar div vs
      // the reference's p-4 > flex gap-3 pair; our px-0 CardContent
      // wrapping the same empty-state div the reference renders
      // bare). When a STRICT twin — byte-equal geometry AND equal
      // class — sits within 2 on either side, pair the twins; the
      // skipped nesting wrappers go one-sided to the absorption
      // passes. The strictness keeps the ghost path untouched (a
      // planted ours-only BUTTON never pairs, so this never fires).
      if (ours[i].cls !== ref[j].cls) {
        let prefer = false;
        for (let k = 1; k <= 2 && !prefer && j + k < ref.length; k++) {
          if (
            pairableAt(ours[i], ref[j + k], offset) &&
            ours[i].cls === ref[j + k].cls &&
            byteEqualGeometry(ours[i], ref[j + k])
          ) {
            for (let y = 0; y < k; y++) events.push({ kind: "ref-extra", ref: ref[j + y] });
            j += k;
            prefer = true;
          }
        }
        for (let k = 1; k <= 2 && !prefer && i + k < ours.length; k++) {
          if (
            pairableAt(ours[i + k], ref[j], offset) &&
            ours[i + k].cls === ref[j].cls &&
            byteEqualGeometry(ours[i + k], ref[j])
          ) {
            for (let x = 0; x < k; x++) events.push({ kind: "ours-extra", el: ours[i + x] });
            i += k;
            prefer = true;
          }
        }
      }
      pushPair(ours[i], ref[j]);
      i++;
      j++;
      continue;
    }
    // resync 0 — THE DIRECT RE-ANCHOR (the piecewise cascade): when the
    // next two elements are the same family at a NEW constant offset
    // (a settings card boundary: the row-count delta changes the
    // displacement in 62px quanta), re-anchor at the direct top delta
    // instead of scanning — the sustained guard keeps coincidences out
    if (
      ours[i].tag === ref[j].tag &&
      Math.abs(ours[i].left - ref[j].left) <= POS_TOL
    ) {
      const oDirect = ours[i].top - ref[j].top;
      if (oDirect !== offset && runAcceptable(0, 0, oDirect)) {
        offset = oDirect;
        continue;
      }
    }
    // resync A: a pure one-sided run at the CURRENT offset (the
    // sustained/end guard — a coincidental single pair at a stale
    // offset must never steal the resync)
    const kA = pureRun("ours", offset);
    const lA = pureRun("ref", offset);
    const kOk = kA > 0 && runAcceptable(kA, 0, offset);
    const lOk = lA > 0 && runAcceptable(0, lA, offset);
    if (kOk && (!lOk || kA <= lA)) {
      for (let d = 0; d < kA; d++) events.push({ kind: "ours-extra", el: ours[i + d] });
      i += kA;
      continue;
    }
    if (lOk) {
      for (let d = 0; d < lA; d++) events.push({ kind: "ref-extra", ref: ref[j + d] });
      j += lA;
      continue;
    }
    // resync B: CONSTANT-OFFSET candidates (the displaced tail)
    const cand = new Set<number>();
    for (let m = 0; m <= OFFSET_M_MAX && i + m < ours.length; m++) {
      for (let n = 0; n <= OFFSET_N_MAX && j + n < ref.length; n++) {
        if (ours[i + m].tag === ref[j + n].tag) {
          cand.add(ours[i + m].top - ref[j + n].top);
        }
      }
    }
    let resynced = false;
    for (const o of [...cand].sort((a, b) => Math.abs(a) - Math.abs(b))) {
      if (Math.abs(o) <= 0) continue; // offset 0 already failed above
      // diagonal first (small mixed skips), then pure runs at o
      for (let d = 1; d <= RESYNC_WINDOW && !resynced; d++) {
        for (let k = 0; k <= d && !resynced; k++) {
          const l = d - k;
          if (sustainedFrom(k, l, o) >= SUSTAINED) {
            for (let x = 0; x < k; x++) events.push({ kind: "ours-extra", el: ours[i + x] });
            for (let y = 0; y < l; y++) events.push({ kind: "ref-extra", ref: ref[j + y] });
            i += k;
            j += l;
            offset = o;
            resynced = true;
          }
        }
      }
      if (resynced) break;
      const kO = pureRun("ours", o);
      if (kO > 0 && runAcceptable(kO, 0, o)) {
        for (let x = 0; x < kO; x++) events.push({ kind: "ours-extra", el: ours[i + x] });
        i += kO;
        offset = o;
        resynced = true;
        break;
      }
      const lO = pureRun("ref", o);
      if (lO > 0 && runAcceptable(0, lO, o)) {
        for (let y = 0; y < lO; y++) events.push({ kind: "ref-extra", ref: ref[j + y] });
        j += lO;
        offset = o;
        resynced = true;
        break;
      }
    }
    if (resynced) continue;
    // resync C: nothing re-pairs — the current pair is genuinely
    // one-sided BOTH ways; advance without a rest-dump
    events.push({ kind: "ours-extra", el: ours[i] });
    events.push({ kind: "ref-extra", ref: ref[j] });
    i++;
    j++;
  }
  return events;
}

// -- the settings segmentation -----------------------------------------------

/**
 * THE SETTINGS CARD SEGMENTATION (the walk42 settings decode, the third
 * instrument lesson): the settings page's picklist DATA is
 * LIVE-EDITED INTRADAY (the L-150c2 genus) — the row counts differ per
 * card, and each card's delta displaces everything below it
 * (piecewise offsets in 62px quanta). On ONE continuous walk, the
 * resync's offset candidates include CROSS-CARD pairs — ours card1's
 * rows against the reference's card2 rows (rows look like rows: the
 * same class, the same subtree shape, a sustained 9+ run at a NEGATIVE
 * offset) — and the backward resync loses the walk's sync card by card
 * (the live decode: offset -162 consuming the reference's add-row +
 * card2 head as phantom extras, 61 unexplained).
 *
 * The picklist cards are a FIXED TEMPLATE (the same card count and
 * order on both sides — Sources/Industries/Activity Types…): the card
 * is the alignment UNIT. Segment both censuses at the card containers
 * and align card k against card k — the row-count deltas stay INSIDE
 * their segment, the per-segment walk re-anchors at one delta per
 * card (bounded by the segment), and a cross-card pairing is
 * structurally impossible. A template change (a card count delta)
 * falls out as one-sided card subtrees — unexplained, RED, correctly.
 */
export function alignSettings(ours: CensusEl[], ref: CensusEl[]): CensusEvent[] {
  const isCard = (e: CensusEl) => /rounded-xl border/.test(e.cls) && e.w >= 300;
  const split = (els: CensusEl[]): Array<CensusEl[]> => {
    const segs: Array<CensusEl[]> = [[]];
    for (const e of els) {
      if (isCard(e)) segs.push([e]);
      else segs[segs.length - 1].push(e);
    }
    return segs;
  };
  const oSegs = split(ours);
  const rSegs = split(ref);
  const events: CensusEvent[] = [];
  // segment 0: the fixed head (the shell + the tabs + the Defaults
  // zone above the first card) — pairs at offset 0
  const n = Math.max(oSegs.length, rSegs.length);
  for (let k = 0; k < n; k++) {
    const o = oSegs[k] ?? [];
    const r = rSegs[k] ?? [];
    if (o.length === 0) {
      for (const e of r) events.push({ kind: "ref-extra", ref: e });
      continue;
    }
    if (r.length === 0) {
      for (const e of o) events.push({ kind: "ours-extra", el: e });
      continue;
    }
    events.push(...alignCensus(o, r));
  }
  return events;
}

// -- the genera attribution ---------------------------------------------------

export interface AttributedEvent {
  event: CensusEvent;
  genus: string;
}

export interface AttributionResult {
  matches: number;
  explained: AttributedEvent[];
  unexplained: CensusEvent[];
}

/** The settings picklist-row signature (SETTINGS_PICKLIST.itemRow, the
 *  bundle-decoded bordered row): token-SUBSET so the reference's
 *  class-order variance still matches. Session-159: exported for
 *  scripts/settings-rhythm.ts (the intraday-rhythm observation instrument
 *  reuses the row contract verbatim — the reuse-not-duplicate doctrine;
 *  additive export, zero behavior). */
const SETTINGS_ROW_TOKENS = ["items-center", "gap-2", "p-2", "border", "rounded-lg"];

export function settingsRowSignature(cls: string): boolean {
  const tokens = new Set(cls.split(/\s+/));
  return SETTINGS_ROW_TOKENS.every((t) => tokens.has(t));
}

/** The login brand-mark token set (the walk47 decode): the exact
 *  standing construction — the CSS brand mark where the reference's
 *  ring loads the workspace owner's UPLOADED LOGO (live branding
 *  data, the Base44-pill genus class, never mirrored). */
const LOGIN_MARK_TOKENS = [
  "flex",
  "h-10",
  "w-10",
  "items-center",
  "justify-center",
  "rounded-full",
  "bg-sidebar",
  "sm:h-12",
  "sm:w-12",
];

/** The login brand-mark signature (the settingsRowSignature idiom —
 *  order-independent exact-token matching; the tag rides along: the
 *  mark is a SPAN). Exported for the unit pins. */
export function loginLogoMarkSignature(tag: string, cls: string): boolean {
  if (tag !== "SPAN") return false;
  const tokens = new Set(cls.split(/\s+/));
  return LOGIN_MARK_TOKENS.every((t) => tokens.has(t));
}

function containedIn(el: CensusEl, boxes: Array<{ top: number; left: number; w: number; h: number }>): boolean {
  return boxes.some(
    (b) =>
      el.top >= b.top &&
      el.top <= b.top + b.h &&
      el.left >= b.left &&
      el.left <= b.left + b.w,
  );
}

/** Token-subset: every token of `sub` appears in `sup` (the merged-div
 *  signature — order-free, the v3-compat class-order immunity). */
function tokenSubset(sub: string, sup: string): boolean {
  const supTokens = new Set(sup.split(/\s+/));
  return sub.split(/\s+/).every((t) => supTokens.has(t));
}

/**
 * Attribute every census event to a documented genus or leave it
 * UNEXPLAINED. The one page-scoped exception: the settings DATA face
 * (rows + subtrees + the displacement cascade) — the L-150c2 doctrine.
 */
export function attributeGenera(
  events: CensusEvent[],
  page: string,
  floor: number = PHONE_CONTENT_FLOOR,
): AttributionResult {
  const matches = events.filter((e) => e.kind === "match").length;
  // the attribution map — the EXPLAINED list is emitted in EVENT ORDER
  // (the decode report reads as the page reads)
  const genusOf = new Map<CensusEvent, string>();
  const unexplained: CensusEvent[] = [];
  // the containment boxes, collected during pass 1:
  //   • the absorbed settings-row boxes (the subtree containment)
  //   • the PAIRED chart-family boxes (recharts/chart-no-outline — the
  //     version-drift interiors absorb inside them)
  //   • the PAIRED svg boxes (the lucide icon carriers — the interior
  //     shape vocabulary absorbs inside them)
  //   • the absorbed chart-wrapper boxes (ours' extra wrappers carry
  //     the same interiors)
  const rowBoxes: Array<{ top: number; left: number; w: number; h: number }> = [];
  const chartBoxes: Array<{ top: number; left: number; w: number; h: number }> = [];
  // the s95 poke-out boxes (the walk44 extension): every ABSORBED poke
  // root registers its REF-side box + the poke delta — the cascade
  // (the descendants inside the poked box: the search row 440 + the
  // input 335 at tablet; the whole table chain at landscape) + the
  // displaced byte-equal twins (the Export CSV pair) + the rail
  // squeeze (the displacement === the poke delta) all ride these.
  const pokeBoxes: Array<{ box: { top: number; left: number; w: number; h: number }; delta: number }> = [];
  // Session-176: the recharts3-restructure cascade boxes — every
  // absorbed restructure face registers BOTH sides' boxes; the
  // descendants inside them (the grid elements riding the zIndex
  // wrappers, whose classes exist in both versions and only the
  // POSITION moved) absorb by containment (the s95 poke-cascade
  // precedent, scoped to the registered recharts3 boxes).
  const r3Boxes: Array<{ top: number; left: number; w: number; h: number }> = [];
  // the shifts that survive pass 1 (the s95 cascade candidates — kept
  // in order for the post-poke pass)
  const pendingShifts: CensusEvent[] = [];
  const boxOf = (el: CensusEl) => ({ top: el.top, left: el.left, w: el.w, h: el.h });
  const chartFamily = (cls: string) => /recharts|chart-no-outline/.test(cls);
  const hasToken = (cls: string, token: string) => cls.split(/\s+/).includes(token);
  // the pending extras (pass 2 + pass 3 candidates, kept in order)
  const pending: CensusEvent[] = [];

  // -- pass 0: the settings row boxes from EVERY signature event --------
  // (the walk44 tablet decode: the DATA genus's tight-frame face — the
  // picklist rows pair as MATCHES at 768 (byte-equal 166x54 boxes),
  // invisible to the decoder, while the different LIVE-intraday label
  // texts drive different flex cascades inside them: the squeezed
  // buttons/svgs/labels fall out of every window. Registering the row
  // boxes from ALL events — matches included — restores the subtree
  // containment.)
  if (page === "settings") {
    for (const e of events) {
      if (e.el !== undefined && settingsRowSignature(e.el.cls)) rowBoxes.push(boxOf(e.el));
      if (e.ref !== undefined && settingsRowSignature(e.ref.cls)) rowBoxes.push(boxOf(e.ref));
    }
  }

  // -- pass 1: the direct genus rules -------------------------------------
  for (const e of events) {
    // the paired events record their chart boxes (the recharts DOM
    // face's containment — the wrapper divs + the tooltip divs)
    if (e.kind !== "ours-extra" && e.kind !== "ref-extra") {
      if (e.el !== undefined && chartFamily(e.el.cls)) chartBoxes.push(boxOf(e.el));
      if (e.ref !== undefined && chartFamily(e.ref.cls)) chartBoxes.push(boxOf(e.ref));
    }
    if (e.kind === "match") continue;
    if (e.kind === "tag-swap") {
      genusOf.set(e, "tag-swap");
      continue;
    }
    if (e.kind === "cls-only") {
      genusOf.set(e, "token-mirror");
      continue;
    }
    if (e.kind === "text-only") {
      // THE TEXT-NODE CARDINALITY face (the walk45 landing decode):
      // the census's leaf-text join(" ") between DIRECT text nodes
      // reads ours [TEXT("$8")] as "$8" where the reference's
      // [TEXT("$"), TEXT("8")] reads "$ 8" — textContent byte-equal
      // on both (live-verified), ours MERGES what the reference
      // SPLITS — the composition-split genus's TEXT face. At
      // byte-equal boxes a REAL rendered space would widen the box
      // and pair as geometry, so only the join artifact reaches this
      // face; page-agnostic.
      if (
        e.el !== undefined &&
        e.ref !== undefined &&
        e.el.text.replace(/\s+/g, "") === e.ref.text.replace(/\s+/g, "")
      ) {
        genusOf.set(e, "composition-split");
        continue;
      }
      // live-data — the reference's intraday WORKSPACE data — is a
      // WORKSPACE-SURFACE genus (the 9 CENSUS_DATA_PAGES): the scope
      // keys on the POSITIVE class (the 157-c form) — absorb
      // ONLY-on-members — so every static surface (the
      // static-marketing trio (landing, about, contact) + the login
      // wall, and any future surface) falls through RED BY DEFAULT
      // (a changed headline, a reprice, a changed 'Sign in' is REAL
      // content drift; the walk45 hazard closed at the invariant —
      // the s155/s156 negative keyings were each correct only until
      // the next static surface arrived, L-157c2).
      if (isCensusDataPage({ name: page })) {
        genusOf.set(e, "live-data");
        continue;
      }
    }
    if (e.kind === "shift") {
      const dt = Math.abs(e.dTop ?? 0);
      const dl = Math.abs(e.dLeft ?? 0);
      const dw = e.dW ?? 0;
      const dh = Math.abs(e.dH ?? 0);
      if (dt <= RECHARTS_TOL && dl <= RECHARTS_TOL && Math.abs(dw) <= RECHARTS_TOL && dh <= RECHARTS_TOL) {
        genusOf.set(e, "recharts-internal");
        continue;
      }
      // Session-176 (the recharts3-restructure genus): the 2.15 → 3.10
      // migration restructures the chart interiors' tick machinery —
      // the tick-label TEXTS moved out of the axis wrappers into
      // per-axis z-index layers (ours: recharts-cartesian-axis-tick-
      // label(s) / recharts-{x,y}Axis-tick-labels; the reference's 2.x:
      // the texts wrapped inside recharts-cartesian-axis-tick / -ticks),
      // the tick LINES ride their own containers (recharts-cartesian-
      // axis-tick-lines / recharts-{x,y}Axis-ticks), the chart parts
      // ride recharts-zIndex-layer_* wrappers the 2.x DOM does not
      // carry, and a 2.x tick wrapper whose label migrated collapses to
      // its tick-line box (the w6 h0 face). The genus is SIGNATURE-
      // matched — both sides g-elements carrying recharts classes with
      // one side carrying a 3.x structural token, or the collapsed
      // same-class tick — never a /recharts/ catch-all: the wrapper
      // DIVs (the LAYOUT face) and a same-class non-degenerate pair
      // with a real drift stay RED. The pixel gates (the six drift
      // sweeps, CLEAN at the migrated tree) carry the chart visual
      // parity.
      if (
        e.el !== undefined &&
        e.ref !== undefined &&
        e.el.tag === "g" &&
        e.ref.tag === "g" &&
        /recharts/.test(e.el.cls) &&
        /recharts/.test(e.ref.cls) &&
        (RECHARTS3_STRUCT.test(e.el.cls) ||
          RECHARTS3_STRUCT.test(e.ref.cls) ||
          containedIn(e.el, r3Boxes) ||
          containedIn(e.ref, r3Boxes) ||
          (e.el.cls === e.ref.cls &&
            hasToken(e.el.cls, "recharts-cartesian-axis-tick") &&
            (e.el.h === 0 || e.el.w === 0)))
      ) {
        genusOf.set(e, "recharts3-restructure");
        r3Boxes.push(boxOf(e.el), boxOf(e.ref));
        continue;
      }
      // the s95 poke-out: position-aligned, width-only, and the
      // REFERENCE wider than the axis's content floor (the L-153c2
      // seam: the floor travels with the frame — 358 at the phone
      // axis, 1120 at the desktop axis). Its bare flex-1 cards poke
      // past the container (its own standing defect, the walk41
      // decode: w=472 inside the 358 phone container). The FLOOR is
      // the discriminator: a real ours width regression (both sides
      // inside the container) shows ref.w ≤ floor and stays
      // UNEXPLAINED — only the poke-out absorbs.
      if (
        dw < -RECHARTS_TOL &&
        dt <= RECHARTS_TOL &&
        dl <= RECHARTS_TOL &&
        dh <= RECHARTS_TOL &&
        e.ref !== undefined &&
        e.ref.w > floor
      ) {
        genusOf.set(e, "s95-poke-out");
        pokeBoxes.push({ box: boxOf(e.ref), delta: Math.abs(dw) });
        continue;
      }
      // THE LG CONSTRUCTION FORM (the walk44 landscape decode): at lg
      // frames the ref's bare flex-1 does NOT poke past the content
      // floor (472 ≤ 704 at 1024) — its min-content eats the flex
      // row's fair share instead, SQUEEZING its own w-80 rail (the
      // sibling-squeeze face). The CONSTRUCTION signature carries the
      // attribution: ours clamped [flex-1 min-w-0] (the s95 fix we
      // shipped) vs the ref's bare [flex-1] (its standing defect),
      // position-aligned, ours narrower by the poke. A bare-vs-bare
      // width regression (no construction pair) never absorbs; the
      // poke direction is one-way (ours wider never absorbs).
      if (
        dw < -RECHARTS_TOL &&
        dt <= RECHARTS_TOL &&
        dl <= RECHARTS_TOL &&
        dh <= RECHARTS_TOL &&
        e.el !== undefined &&
        e.ref !== undefined &&
        hasToken(e.el.cls, "flex-1") &&
        hasToken(e.el.cls, "min-w-0") &&
        hasToken(e.ref.cls, "flex-1") &&
        !hasToken(e.ref.cls, "min-w-0")
      ) {
        genusOf.set(e, "s95-poke-out");
        pokeBoxes.push({ box: boxOf(e.ref), delta: Math.abs(dw) });
        continue;
      }
      if (page === "settings") {
        genusOf.set(e, "settings-data-cascade");
        continue;
      }
      pendingShifts.push(e); // the ordered emission decides unexplained
      continue;
    }
    // the extras (ours-extra / ref-extra)
    const el = e.kind === "ours-extra" ? e.el : e.ref;
    if (el === undefined) {
      continue; // the ordered emission decides unexplained
    }
    if (el.w === 0 && el.h === 0) {
      genusOf.set(e, "dead-stub");
      continue;
    }
    // the recharts DOM face: version drift renders extra wrapper divs —
    // the class carries the attribution (both sides)
    if (/recharts/.test(el.cls)) {
      genusOf.set(e, "recharts-interior");
      chartBoxes.push(boxOf(el));
      continue;
    }
    if (e.kind === "ours-extra" && el.cls.includes("chart-no-outline")) {
      genusOf.set(e, "chart-suppression");
      chartBoxes.push(boxOf(el));
      continue;
    }
    if (e.kind === "ours-extra" && (el.cls.includes("px-0") || el.cls.includes("relative w-full overflow-auto"))) {
      genusOf.set(e, "s95-wrapper");
      continue;
    }
    if (page === "settings" && settingsRowSignature(el.cls)) {
      genusOf.set(e, "settings-data");
      continue;
    }
    // the login brand mark (the walk47 decode): our CSS brand mark is
    // ours-extra — the reference's ring loads the WORKSPACE OWNER'S
    // UPLOADED LOGO instead (a Base44-prod storage img, live
    // branding data — the Base44-pill genus class, never mirrored;
    // the ring boxes pair byte-equal as cls-only token-mirrors, the
    // ref img absorbs as the ring's wrapper-twin; only OUR mark is
    // extra). The signature is exact-token — a restyled mark or a
    // planted ghost never rides the genus.
    if (page === "login" && e.kind === "ours-extra" && loginLogoMarkSignature(el.tag, el.cls)) {
      genusOf.set(e, "login-logo-mark");
      continue;
    }
    // no direct rule: defer to the containment + twin passes
    pending.push(e);
  }

  // -- pass 1.5: the s95 POKE CASCADE (the walk44 tablet/landscape
  // decode) -------------------------------------------------------------
  // The absorbed poke roots registered their REF-side boxes. The poke's
  // DESCENDANTS — the search row 440 + the input 335 inside the ref's
  // poked 472 card at tablet; the whole table chain (the bg card, the
  // p-4 border-b, the row, the overflow wrappers) at landscape — are
  // position-aligned width-only shifts whose REF element sits INSIDE
  // a registered poke box. Their widths are a function of the poked
  // parent, not of the content floor (the row at 440 ≤ the 448 floor
  // stays RED under the floor rule alone); the containment carries
  // the attribution. A shift with NO poke box present (a real ours
  // width regression inside the container) stays UNEXPLAINED.
  const stillShifts: CensusEvent[] = [];
  for (const e of pendingShifts) {
    const dt = Math.abs(e.dTop ?? 0);
    const dl = Math.abs(e.dLeft ?? 0);
    const dw = e.dW ?? 0;
    const dh = Math.abs(e.dH ?? 0);
    if (
      dw < -RECHARTS_TOL &&
      dt <= RECHARTS_TOL &&
      dl <= RECHARTS_TOL &&
      dh <= RECHARTS_TOL &&
      e.ref !== undefined &&
      pokeBoxes.some((p) => containedIn(e.ref as CensusEl, [p.box]))
    ) {
      genusOf.set(e, "s95-poke-out");
      continue;
    }
    stillShifts.push(e);
  }

  // -- pass 2: the containment faces ---------------------------------------
  // the recharts DOM face: extras inside a paired chart box (the
  // version-drift wrapper divs + the tooltip divs — both directions).
  // (The svg glyph interiors never enter the census — the exclusion
  // at the collector; the lucide genus is absorbed at the svg level
  // as token-mirror cls-only pairs.)
  const still: CensusEvent[] = [];
  // the composition-split lookup: the paired (non-match) events'
  // opposite-side elements
  const pairedEvents = events.filter(
    (p) => p.kind !== "ours-extra" && p.kind !== "ref-extra" && p.kind !== "match",
  );
  const pairedOpposite = (e: CensusEvent, extra: CensusEl): boolean => {
    const side: "el" | "ref" = e.kind === "ref-extra" ? "el" : "ref";
    for (const p of pairedEvents) {
      // never SELF-match (the walk45 decode): a paired event's own box
      // trivially contains its own element and its cls tokens are a
      // subset of themselves — the latent pass-2 defect, masked for
      // three sessions because pass 1 absorbed every paired kind; the
      // landing's workspace-scoped text-only fall-through was the first
      // paired event to ever reach this lookup
      if (p === e) continue;
      const el2 = p[side];
      if (el2 === undefined) continue;
      if (containedIn(extra, [boxOf(el2)]) && tokenSubset(extra.cls, el2.cls)) {
        return true;
      }
    }
    return false;
  };
  for (const e of pending) {
    const el = (e.kind === "ours-extra" ? e.el : e.ref) as CensusEl;
    if (containedIn(el, chartBoxes)) {
      genusOf.set(e, "recharts-interior");
      continue;
    }
    if (page === "settings" && containedIn(el, rowBoxes)) {
      genusOf.set(e, "settings-data");
      continue;
    }
    // THE COMPOSITION-SPLIT GENUS (the walk42 contacts decode): the
    // reference nests [p-4 border-b] > [flex gap-3] where ours MERGES
    // both onto one div — the extra (the ref's inner nesting div) is
    // contained in the box of the PAIRED event's opposite-side element
    // AND that element's class tokens are a SUPERSET of the extra's
    // (ours' merged "p-4 border-b flex gap-3" ⊇ its "flex gap-3").
    // The containment + the token superset together prove the merge —
    // a planted element inside the same box without the token
    // superset stays unexplained.
    if (pairedOpposite(e, el)) {
      genusOf.set(e, "composition-split");
      continue;
    }
    still.push(e);
  }

  // -- pass 2.5: the s95 RAIL-SQUEEZE (the walk44 landscape decode) ------
  // At lg frames the ref's poked table (its 472 min-content) eats the
  // flex row's fair share and SQUEEZES its own byte-equal-cls w-80
  // filters rail: the pair lands as DISPLACED TWINS (the aligner's
  // windows cannot pair a 112px horizontal shift) with the RIGHT
  // EDGES COINCIDENT (ref.left + ref.w === ours.left + ours.w — the
  // flex row's right boundary pins both rails' right edges) and the
  // displacement equal to the poke delta. The twins absorb and
  // register BOTH rail boxes; the squeezed subtree (shifts or extras
  // with either side contained in its side's rail box — the ref's
  // deformed rail content: wrapped labels, rescaled inputs, shifted
  // rows) absorbs as the cascade. Without a matching poke the twins
  // are a plain displacement — RED.
  const squeezeOurs: Array<{ top: number; left: number; w: number; h: number }> = [];
  const squeezeRef: Array<{ top: number; left: number; w: number; h: number }> = [];
  const matchedRail = new Set<number>();
  for (let i = 0; i < still.length; i++) {
    const e = still[i];
    if (e.kind !== "ours-extra" || e.el === undefined || genusOf.has(e)) continue;
    const a = e.el;
    const j = still.findIndex(
      (r, k) =>
        r.kind === "ref-extra" &&
        r.ref !== undefined &&
        !matchedRail.has(k) &&
        !genusOf.has(r) &&
        r.ref.cls === a.cls &&
        r.ref.top === a.top &&
        r.ref.h === a.h &&
        r.ref.left > a.left &&
        r.ref.left + r.ref.w === a.left + a.w &&
        pokeBoxes.some((p) => Math.abs(p.delta - (r.ref!.left - a.left)) <= RECHARTS_TOL),
    );
    if (j !== -1) {
      matchedRail.add(j);
      genusOf.set(e, "s95-poke-out");
      genusOf.set(still[j], "s95-poke-out");
      squeezeOurs.push(boxOf(a));
      squeezeRef.push(boxOf(still[j].ref as CensusEl));
    }
  }
  // the squeezed subtree: shifts + extras with either side inside
  // its side's rail box
  const squeezeSub = (e: CensusEvent): boolean => {
    if (e.el !== undefined && containedIn(e.el, squeezeOurs)) return true;
    if (e.ref !== undefined && containedIn(e.ref, squeezeRef)) return true;
    return false;
  };
  for (const e of stillShifts) {
    if (squeezeSub(e)) genusOf.set(e, "s95-poke-out");
  }
  for (const e of still) {
    if (!genusOf.has(e) && squeezeSub(e)) genusOf.set(e, "s95-poke-out");
  }

  // -- pass 3: the wrapper-twin + tag-swap faces ---------------------------
  // the paired boxes (every match/cls-only/text-only/shift event's
  // both sides): an extra whose box is BYTE-EQUAL to a paired box is
  // a nesting wrapper twin — the same box already renders on both
  // sides (the reference's space-y-3 tooltip wrapper around the
  // paired empty-state P; our stock shadcn Table container around a
  // paired bare table). Zero new ink by construction.
  const pairedBoxes: Array<{ top: number; left: number; w: number; h: number }> = [];
  for (const e of events) {
    if (e.kind === "ours-extra" || e.kind === "ref-extra") continue;
    if (e.el !== undefined) pairedBoxes.push(boxOf(e.el));
    if (e.ref !== undefined) pairedBoxes.push(boxOf(e.ref));
  }
  const twins: CensusEvent[] = [];
  for (const e of still) {
    if (genusOf.has(e)) continue; // absorbed at 2.5 (the rail squeeze)
    // never a wrapper TWIN for a PAIRED event (the walk45 decode): the
    // genus is an EXTRA byte-equal to a PAIRED box — a two-sided event
    // that fell through pass 1 (the landing's workspace-scoped
    // text-only face) would trivially self-match its own pairedBoxes
    // entry, exactly the masked latent shape pairedOpposite carried
    if (e.kind !== "ours-extra" && e.kind !== "ref-extra") {
      twins.push(e);
      continue;
    }
    const el = (e.kind === "ours-extra" ? e.el : e.ref) as CensusEl;
    if (
      pairedBoxes.some(
        (b) => el.top === b.top && el.left === b.left && el.w === b.w && el.h === b.h,
      )
    ) {
      genusOf.set(e, "wrapper-twin");
      continue;
    }
    twins.push(e);
  }
  // the tag-swap twins: ours-extra + ref-extra at BYTE-EQUAL geometry
  // (the same box drawn with a different DOM composition — the s76
  // calendar day cells: our BUTTON/SPAN clickable superset vs the
  // reference's DIV; the profile avatar wrappers). Geometry-equal =
  // pixel-equal, the walk39 doctrine; a NEAR-twin (any dimension off)
  // is real drift and stays unexplained.
  const matchedRef = new Set<number>();
  for (const e of twins) {
    if (e.kind !== "ours-extra" || e.el === undefined) continue;
    const idx = twins.findIndex(
      (r, k) =>
        r.kind === "ref-extra" &&
        r.ref !== undefined &&
        !matchedRef.has(k) &&
        byteEqualGeometry(e.el as CensusEl, r.ref),
    );
    if (idx !== -1) {
      matchedRef.add(idx);
      genusOf.set(e, "tag-swap");
      genusOf.set(twins[idx], "tag-swap");
    }
  }
  // THE DISPLACED TWIN (the walk44 tablet/landscape decode): the poke
  // cascade's horizontal displacement pushes byte-equal twins apart —
  // the Export CSV pair (ours @371 vs the ref @395 at tablet, the
  // dLeft 24; @283 vs @395 at landscape, the dLeft 112). The twins
  // share the TAG, the leaf-text, the w/h and the top; the cls carries
  // the standing token-mirror vocabulary (border-line vs border-input,
  // bg-surface vs bg-background, the hover pairs — absorbed identically
  // on aligned token-mirror pairs), so the TAG is the guard. The REF
  // twin sits INSIDE a registered poke box — the containment carries
  // the attribution. A twin pair with NO poke present, a different
  // leaf-text, or a different TAG never pairs — RED on both sides.
  for (const e of twins) {
    if (e.kind !== "ours-extra" || e.el === undefined || genusOf.has(e)) continue;
    const a = e.el;
    const idx = twins.findIndex(
      (r, k) =>
        r.kind === "ref-extra" &&
        r.ref !== undefined &&
        !matchedRef.has(k) &&
        !genusOf.has(r) &&
        r.ref.tag === a.tag &&
        r.ref.w === a.w &&
        r.ref.h === a.h &&
        r.ref.text === a.text &&
        r.ref.top === a.top &&
        pokeBoxes.some((p) => containedIn(r.ref as CensusEl, [p.box])),
    );
    if (idx !== -1) {
      matchedRef.add(idx);
      genusOf.set(e, "s95-poke-out");
      genusOf.set(twins[idx], "s95-poke-out");
    }
  }
  // THE SETTINGS VERTICAL DISPLACED TWIN (the walk44 tablet decode): the
  // DATA genus's row-count cascade displaces whole constructions
  // VERTICALLY past the aligner's windows — the add-row twins (ours
  // @1977 vs the ref's @1989, the dTop 12: the accumulated intraday
  // row-height delta) and the footer twins (riding the page's mainH
  // delta). Same tag + same leaf-text + same w/h + the same LEFT + the
  // dTop within the displaced-tail scale (≤ 96 — the standing intraday
  // deltas live inside it: 86 at phone, 24 at desktop, 12 at tablet;
  // a planted duplicate 300px below stays RED) absorbs as settings-data
  // on BOTH sides — the L-150c2 doctrine's extras face, restored at the
  // tight frames.
  if (page === "settings") {
    for (const e of twins) {
      if (e.kind !== "ours-extra" || e.el === undefined || genusOf.has(e)) continue;
      const a = e.el;
      const idx = twins.findIndex(
        (r, k) =>
          r.kind === "ref-extra" &&
          r.ref !== undefined &&
          !matchedRef.has(k) &&
          !genusOf.has(r) &&
          r.ref.tag === a.tag &&
          r.ref.text === a.text &&
          r.ref.w === a.w &&
          r.ref.h === a.h &&
          r.ref.left === a.left &&
          Math.abs(r.ref.top - a.top) <= 96,
      );
      if (idx !== -1) {
        matchedRef.add(idx);
        genusOf.set(e, "settings-data");
        genusOf.set(twins[idx], "settings-data");
      }
    }
  }
  // the TH-LABEL-STRETCH face (the walk43 desktop decode): ours'
  // sortable-header label containers are BUTTONs (the s29 th>button
  // accessible superset) where the reference's are DIVs. At the phone
  // axis the columns are content-width and the pair is byte-equal (the
  // tag-swap face above); at desktop the 1120px slack stretches the
  // reference's block-level DIV to the TH content box while our BUTTON
  // keeps the UA fit-content sizing. Same top/left/h + byte-equal cls
  // + the same leaf-text label, ours.w ≤ ref.w — the content pixels
  // identical, only the invisible box stretch differs. A width
  // OVERFLOW (ours wider than the container) or a different label
  // never pairs — real drift, both sides unexplained.
  for (const e of twins) {
    if (e.kind !== "ours-extra" || e.el === undefined || genusOf.has(e)) continue;
    const a = e.el;
    if (a.tag !== "BUTTON") continue;
    const idx = twins.findIndex(
      (r, k) =>
        r.kind === "ref-extra" &&
        r.ref !== undefined &&
        !matchedRef.has(k) &&
        !genusOf.has(r) &&
        r.ref.tag === "DIV" &&
        a.top === r.ref.top &&
        a.left === r.ref.left &&
        a.h === r.ref.h &&
        a.w <= r.ref.w &&
        a.cls === r.ref.cls &&
        a.text === r.ref.text,
    );
    if (idx !== -1) {
      matchedRef.add(idx);
      genusOf.set(e, "tag-swap");
      genusOf.set(twins[idx], "tag-swap");
    }
  }

  // -- the ordered emission (event order, the decode-report order) -------
  const explained: AttributedEvent[] = [];
  for (const e of events) {
    if (e.kind === "match") continue;
    const g = genusOf.get(e);
    if (g !== undefined) {
      explained.push({ event: e, genus: g });
    } else {
      unexplained.push(e);
    }
  }
  return { matches, explained, unexplained };
}

// -- the verdict ---------------------------------------------------------------

export interface CensusPageResult {
  page: string;
  /** The 153-c extension: the census leg this result walked (phone /
   *  desktop). Undefined = the axis-less standing form (the s152 pins
   * call the verdict seam directly without an axis). */
  axis?: string;
  mainHDelta: number | null;
  oursEls: number;
  refEls: number;
  matches: number;
  explained: AttributedEvent[];
  unexplained: CensusEvent[];
}

export interface CensusVerdict {
  ok: boolean;
  failures: string[];
}

/** Session-206 (R-4.3): the census drift margin — unexplained events
 *  above the standing allowance that still pass. Born at 2, cut to 0
 *  by the PROOF-A decode: an inline header ghost (+1 event, no
 *  displacement at 1440) slipped inside a 2-event margin — the
 *  mutation-proof doctrine demands BOTH ghost classes RED (the inline
 *  button AND the below-fold displacing construction, the latter via
 *  the mainH leg). The zero margin is licensed by the noise
 *  calibration: three independent measurements per axis (the
 *  double-run maidens + the 4-way-parallel gate run), every leg
 *  byte-identical — the quiescence settle holds the counts under
 *  load. A rare load-flake shows as 1-2 events over: re-run to
 *  confirm (a real drift persists; a flake does not). */
export const CENSUS_MARGIN = 0;

/** Session-206 (R-4.3): the standing allowance shape — the measured
 *  unexplained-event count + the measured mainH delta for one page at
 *  one axis. */
export interface StandingAllowance {
  unexplained: number;
  mainH: number;
}

/** Session-206 (R-4.3): the WealthOS standing census allowances — the
 *  R-4.2 class-table doctrine applied to the geometry census. The
 *  four-axis maidens (this session, double-run byte-identical)
 *  measured our empty-state pages against the reference's own: the
 *  construction genera (the section-shell wrapper stack, the
 *  page-header vocabulary, the auth-card family, the recharts
 *  interiors, the reference's no-main reset-password face) produce a
 *  standing unexplained count + mainH delta per page per axis —
 *  measured, baked in, and pinned in tests/interior-census-tool.test.ts.
 *  Drift ABOVE the allowance is the event (a new element, a removed
 *  construction, a layout regression); the values move only by a
 *  deliberate, pinned re-derivation (a parity round converging a genus
 *  re-derives DOWNWARD — the R-7 doctrine). Settings' mainH stays
 *  REPORT-ONLY (the L-150c2 skip in the verdict below). */
/**
 * Session-216 (R-13, F-216e): the dashboard allowances re-derived
 * (+6/+6/+6/+9 across the four axes — 254/270/259/254). The decode: the
 * QuickAction nested-interactive cure (an a11y fix — the reference ships
 * <a><button/></a>, axe-core structurally cannot see it, we render the
 * single-anchor form) deliberately diverges from the reference's DOM on
 * exactly the dashboard's four Quick Action tiles; the tag-swap genus
 * grew accordingly while EVERY other page's unexplained count matched
 * its standing value exactly (the proof the shell's loading gate + error
 * banner add nothing at the settled state) and all four pixel sweep
 * classes + the fullpage axis stayed CLEAN (the visual genus intact —
 * the same classes, now on the anchor). The R-7.5 re-derivation
 * doctrine: a legitimate cure that changes the DOM genus re-derives the
 * affected page's allowance in the same commit, decode documented.
 */
export const STANDING_CENSUS: Readonly<
  Record<string, Readonly<Record<string, StandingAllowance>>>
> = {
  desktop: {
    dashboard: { unexplained: 254, mainH: -167 },
    income: { unexplained: 40, mainH: 49 },
    expenses: { unexplained: 115, mainH: 49 },
    accounts: { unexplained: 22, mainH: 49 },
    investments: { unexplained: 129, mainH: -643 },
    import: { unexplained: 31, mainH: 49 },
    analytics: { unexplained: 76, mainH: 73 },
    goals: { unexplained: 23, mainH: 49 },
    settings: { unexplained: 53, mainH: 103 },
    login: { unexplained: 52, mainH: -40 },
    "reset-password": { unexplained: 19, mainH: 0 },
  },
  phone: {
    dashboard: { unexplained: 270, mainH: 217 },
    income: { unexplained: 38, mainH: -15 },
    expenses: { unexplained: 112, mainH: -261 },
    accounts: { unexplained: 20, mainH: -15 },
    investments: { unexplained: 131, mainH: -625 },
    import: { unexplained: 32, mainH: -15 },
    analytics: { unexplained: 78, mainH: 381 },
    goals: { unexplained: 21, mainH: -15 },
    settings: { unexplained: 68, mainH: 75 },
    login: { unexplained: 50, mainH: -22 },
    "reset-password": { unexplained: 19, mainH: 0 },
  },
  tablet: {
    dashboard: { unexplained: 259, mainH: -151 },
    income: { unexplained: 38, mainH: -15 },
    expenses: { unexplained: 111, mainH: -15 },
    accounts: { unexplained: 20, mainH: -15 },
    investments: { unexplained: 141, mainH: -487 },
    import: { unexplained: 32, mainH: -15 },
    analytics: { unexplained: 78, mainH: 245 },
    goals: { unexplained: 21, mainH: -15 },
    settings: { unexplained: 53, mainH: 19 },
    login: { unexplained: 55, mainH: 0 },
    "reset-password": { unexplained: 19, mainH: 0 },
  },
  landscape: {
    dashboard: { unexplained: 254, mainH: 35 },
    income: { unexplained: 40, mainH: 49 },
    expenses: { unexplained: 115, mainH: 103 },
    accounts: { unexplained: 22, mainH: 49 },
    investments: { unexplained: 142, mainH: -455 },
    import: { unexplained: 31, mainH: 49 },
    analytics: { unexplained: 90, mainH: 209 },
    goals: { unexplained: 23, mainH: 49 },
    settings: { unexplained: 55, mainH: 83 },
    login: { unexplained: 53, mainH: -58 },
    "reset-password": { unexplained: 19, mainH: 0 },
  },
};

/**
 * Session-206 (R-4.3): the ALLOWANCE verdict — the byte-parity doctrine
 * re-based on the standing tables (the L-152c2 zero-margin spirit kept:
 * every delta must ATTRIBUTE to a documented genus or the standing
 * allowance; drift above it is the event). RED when a page's
 * unexplained count exceeds its standing allowance + margin, or when
 * its mainH delta leaves the standing value — with the ONE exception:
 * the settings page's mainH stays SKIPPED (the L-150c2 doctrine,
 * carried forward: reported, never gated). A page with NO standing
 * entry (a future surface, a typo'd axis) judges at the FAIL-SAFE
 * ZERO: any unexplained event or mainH delta REDs — the L-157c2
 * default-form spirit, never a silent pass.
 */
export function censusVerdict(
  results: CensusPageResult[],
  standing: Readonly<Record<string, Readonly<Record<string, StandingAllowance>>>> = STANDING_CENSUS,
  margin: number = CENSUS_MARGIN,
): CensusVerdict {
  const failures: string[] = [];
  for (const r of results) {
    // the 153-c extension: the failure names its AXIS — a phone GREEN
    // never masks a desktop RED (and the axis-less form stays
    // unprefixed, back-compat with the s152-era pins)
    const where = r.axis !== undefined ? `[${r.axis}] ${r.page}` : r.page;
    const allow = r.axis !== undefined ? standing[r.axis]?.[r.page] : undefined;
    // the fail-safe zero: the margin rides ONLY on a standing allowance —
    // an unknown page (future surface, typo'd axis) judges at zero, so
    // ANY unexplained event REDs (never a silent pass)
    const unexplainedMax = allow !== undefined ? allow.unexplained + margin : 0;
    if (r.unexplained.length > unexplainedMax) {
      failures.push(
        `${where}: ${r.unexplained.length} unexplained event(s) > allowed ${unexplainedMax}` +
          `${allow ? ` (standing ${allow.unexplained} + margin ${margin})` : " (no standing allowance — the fail-safe zero)"}` +
          ` — first: ${r.unexplained[0].kind} ` +
          `${r.unexplained[0].el ? `ours ${r.unexplained[0].el.tag}@${r.unexplained[0].el.top} [${r.unexplained[0].el.cls}]` : ""}` +
          `${r.unexplained[0].ref ? `ref ${r.unexplained[0].ref.tag}@${r.unexplained[0].ref.top} [${r.unexplained[0].ref.cls}]` : ""}`,
      );
    }
    if (r.page !== "settings" && r.mainHDelta !== null) {
      const expected = allow?.mainH ?? 0;
      if (r.mainHDelta !== expected) {
        failures.push(
          `${where}: mainH delta ${r.mainHDelta} ≠ standing ${expected}` +
            `${allow ? "" : " (no standing allowance — the fail-safe zero)"}`,
        );
      }
    }
  }
  return { ok: failures.length === 0, failures };
}

// -- the browser twin (the census evaluate) ------------------------------------

/** Session-159: exported alongside censusPage (the settings-rhythm
 * instrument's pins name the capture shape; additive, zero behavior). */
export interface CensusCapture {
  mainH: number;
  els: CensusEl[];
}

// -- the QUIESCENCE extension (the 158-c PASS-1 decode) ----------------------
//
// The fixed 2500ms settle does not survive concurrent load on the 2-core
// standing box: the PASS-1 full parallel census read the [desktop]
// reports recharts tooltip MID-ENTRANCE (ours w55 h46 vs the settled
// w22 h22 — the tooltip's collapse still in flight at the read) and the
// reference's settings rows PRE-MOUNT at three axes (ref els 97/68 vs the
// settled 249 — the reference renders inside OUR slowed browser; its
// heavy pages mount late under our own CPU contention). The cure is the
// direct form of the settle's purpose: read only a SETTLED DOM — a
// geometry fingerprint (main.scrollHeight + the descendant count + a
// rounded geometry accumulation over every main descendant — catches
// mid-animation SIZE transitions, not just DOM mutations) sampled until
// QUIESCENCE_STABLE_SAMPLES consecutive samples agree, capped by
// QUIESCENCE_CEILING_MS. THE NEVER-WEAKER GUARANTEE: the standing
// 2500ms settle stays the FLOOR (never skipped); a page that never
// settles pays the ceiling and reads anyway — the exact standing
// behavior, only ever MORE settled. Under no load the first poll passes
// immediately (the read ~QUIESCENCE_INTERVAL_MS × samples later than
// standing, the same settled geometry — byte-identical values).

/** The consecutive stable samples required before the read (3 — the
 *  GATE-TAIL hardening: under the gate:full chain's load tail a starved
 *  recharts entrance stalled past the 2-sample window; the window is now
 *  3 consecutive ~400ms samples = a 1.2s no-change span). */
export const QUIESCENCE_STABLE_SAMPLES = 3;
/** The fingerprint sampling interval (ms). */
export const QUIESCENCE_INTERVAL_MS = 400;
/** The poll ceiling (ms): a never-settling page reads anyway here — the
 *  standing behavior as the fallback, the never-weaker guarantee (12s:
 *  a starved entrance must finish inside it, else the read falls back to
 *  the standing behavior exactly). */
export const QUIESCENCE_CEILING_MS = 12000;

export async function waitQuiescent(page: import("@playwright/test").Page): Promise<void> {
  await page.evaluate(
    ({ samples, interval, ceiling }) =>
      new Promise<void>((resolve) => {
        const main = document.querySelector("main");
        if (!main) return resolve();
        const fingerprint = () => {
          let acc = 0;
          let n = 0;
          for (const el of main.querySelectorAll("*")) {
            const r = el.getBoundingClientRect();
            acc =
              (acc + Math.round(r.top * 10) + Math.round(r.width * 10) + Math.round(r.height * 10)) %
              1000000007;
            n++;
          }
          return `${main.scrollHeight}:${n}:${acc}`;
        };
        let last = "";
        let stable = 0;
        const t0 = performance.now();
        const tick = () => {
          if (performance.now() - t0 > ceiling) return resolve();
          const now = fingerprint();
          if (now !== "" && now === last) stable++;
          else stable = 0;
          last = now;
          if (stable >= samples) return resolve();
          setTimeout(tick, interval);
        };
        setTimeout(tick, interval);
      }),
    {
      samples: QUIESCENCE_STABLE_SAMPLES,
      interval: QUIESCENCE_INTERVAL_MS,
      ceiling: QUIESCENCE_CEILING_MS,
    },
  );
}

export async function censusPage(
  page: import("@playwright/test").Page,
  base: string,
  route: string,
): Promise<CensusCapture> {
  await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
  await page
    .locator("main, div.min-h-screen.bg-gray-50.p-4")
    .first()
    .waitFor({ state: "visible", timeout: 15000 })
    .catch(() => undefined);
  await page.waitForTimeout(2500);
  await waitQuiescent(page);
  return page.evaluate(() => {
    // Session-206 (R-4.3): the ANCHOR FALLBACK — the reference's
    // /reset-password wraps its card family in a non-main container
    // (div.min-h-screen.bg-gray-50.p-4, measured live; every other
    // face on both apps carries a main — OUR reset-password does).
    // The fallback keeps that face censused (the dead-zone doctrine:
    // no uncensused surface) without touching the landmark pages.
    // waitQuiescent stays main-only: the fallback face is static
    // content (the invalid-link card — no async data), the 2500ms
    // settle above carries it.
    const main = document.querySelector("main") ?? document.querySelector("div.min-h-screen.bg-gray-50.p-4");
    if (!main) throw new Error(`no census anchor (main or the gray-50 card wrapper) on ${location.pathname}`);
    const mrect = main.getBoundingClientRect();
    // THE GLYPH-INTERIOR EXCLUSION (the walk42 settings decode): the
    // census is a LAYOUT-tree instrument — the svg element itself is
    // censused (its box guards the icon/chart), but its interior
    // shape vocabulary (path/polyline/line/circle/rect) is
    // version-borne rendering detail (our lucide-react 0.525
    // path-normalized sets vs the reference's mixed sets — the walk41
    // lucide genus; the recharts axis curves ditto) and NEVER enters
    // the alignment. The maiden decode caught the hazard: three
    // coincidentally-aligned icon paths can sustain a FALSE resync
    // offset and lose the walk's sync (the settings card cascade).
    const SVG_SHAPES = new Set(["path", "polyline", "line", "circle", "rect"]);
    const els: Array<{ top: number; left: number; w: number; h: number; tag: string; cls: string; text: string }> = [];
    const walk = (node: Element) => {
      for (const child of Array.from(node.children)) {
        if (SVG_SHAPES.has(child.tagName)) continue; // the glyph interior
        // Session-176 (the chart-interior exclusion — the walk42 glyph
        // doctrine extended to the chart svg): a recharts svg's interior
        // (the g layers, the tick texts, the zIndex wrappers) is
        // VERSION-BORNE rendering detail — the 2.15 → 3.10 migration
        // moved the tick labels into per-axis z-index layers and the
        // chart parts into recharts-zIndex-layer_* groups, and the
        // shifted interiors sustain FALSE resync offsets that lose the
        // walk's sync (the tablet-dashboard decode: the ref pointer
        // stalled inside the Pipeline chart's 2.x interiors while ours
        // advanced — the card-level tail then re-paired across cards at
        // a phantom +581). The svg BOX stays censused (the chart's
        // layout face, with the wrapper divs); the interior never
        // enters the alignment — same rule as the lucide glyphs. The
        // chart visual + DOM parity rides the pixel sweeps + the e2e
        // chart pins (the L-138c2 grid sentinel).
        if (child.tagName === "svg" && /recharts/.test(child.getAttribute("class") ?? "")) {
          const r = child.getBoundingClientRect();
          els.push({
            top: Math.round(r.top - mrect.top + (main as HTMLElement).scrollTop),
            left: Math.round(r.left - mrect.left),
            w: Math.round(r.width),
            h: Math.round(r.height),
            tag: child.tagName,
            cls: child.getAttribute("class") ?? "",
            text: "",
          });
          continue; // the version-borne chart interior never aligns
        }
        const r = child.getBoundingClientRect();
        const leafText = Array.from(child.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => n.textContent ?? "")
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 48);
        els.push({
          top: Math.round(r.top - mrect.top + (main as HTMLElement).scrollTop),
          left: Math.round(r.left - mrect.left),
          w: Math.round(r.width),
          h: Math.round(r.height),
          tag: child.tagName,
          cls: child.getAttribute("class") ?? "",
          text: leafText,
        });
        walk(child);
      }
    };
    walk(main);
    return { mainH: main.scrollHeight, els };
  });
}

// -- the PUBLIC leg's browser twin (the walk45 collector) ---------------------

/** The landing-root anchor selector: BOTH apps' landing container is
 *  div.min-h-screen.bg-white (ours carries id="top" at body level, the
 *  reference's is #root's first child — querySelector's first
 *  document-order match on both). The guest pill (the reference's
 *  body-level div#base44-edit-badge sibling, position:fixed) and the
 *  shadcn Toaster portal sit OUTSIDE this anchor on both apps and
 *  never enter the census. */
const LANDING_ANCHOR = "div.min-h-screen.bg-white";

async function censusPublicPage(
  page: import("@playwright/test").Page,
  base: string,
  route: string,
): Promise<CensusCapture> {
  await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
  await page
    .locator(LANDING_ANCHOR)
    .first()
    .waitFor({ state: "visible", timeout: 15000 })
    .catch(() => undefined);
  await page.waitForTimeout(2500);
  await waitQuiescent(page);
  return page.evaluate(() => {
    const anchor = document.querySelector("div.min-h-screen.bg-white");
    if (!anchor) throw new Error(`no landing anchor on ${location.pathname}`);
    const arect = anchor.getBoundingClientRect();
    // THE GLYPH-INTERIOR EXCLUSION (the walk42 doctrine, unchanged):
    // the svg BOX is censused, its version-borne interior never.
    const SVG_SHAPES = new Set(["path", "polyline", "line", "circle", "rect"]);
    const els: Array<{ top: number; left: number; w: number; h: number; tag: string; cls: string; text: string }> = [];
    const walk = (node: Element) => {
      for (const child of Array.from(node.children)) {
        if (SVG_SHAPES.has(child.tagName)) continue; // the glyph interior
        // Session-176: the chart-interior exclusion (the s176 main-leg
        // twin — the landing's mock chart rides the same version-borne
        // recharts interior).
        if (child.tagName === "svg" && /recharts/.test(child.getAttribute("class") ?? "")) {
          const r = child.getBoundingClientRect();
          els.push({
            top: Math.round(r.top - arect.top),
            left: Math.round(r.left - arect.left),
            w: Math.round(r.width),
            h: Math.round(r.height),
            tag: child.tagName,
            cls: child.getAttribute("class") ?? "",
            text: "",
          });
          continue; // the version-borne chart interior never aligns
        }
        const r = child.getBoundingClientRect();
        const leafText = Array.from(child.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => n.textContent ?? "")
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 48);
        els.push({
          // the landing scrolls the DOCUMENT (no main.overflow-auto):
          // anchor-relative top is scroll-independent (both rects are
          // viewport-relative and move together) — no scroll pass
          // needed (no lazy-render patterns on either landing)
          top: Math.round(r.top - arect.top),
          left: Math.round(r.left - arect.left),
          w: Math.round(r.width),
          h: Math.round(r.height),
          tag: child.tagName,
          cls: child.getAttribute("class") ?? "",
          text: leafText,
        });
        walk(child);
      }
    };
    walk(anchor);
    // the height seam: the DOCUMENT scroller — docH, byte-parity gated
    // (the landing's standing fullpage heights: 4990 desktop · 7259
    // phone, byte-equal both apps)
    return { mainH: document.documentElement.scrollHeight, els };
  });
}

// -- the CLI ----------------------------------------------------------------

const REPO = path.resolve(import.meta.dirname, "..");
const OUR_URL = process.env.OUR_URL ?? "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://wealth-os-d93bd04e.base44.app";

const log = (s: string) => console.log(`[census] ${s}`);

/** The combined per-app cookie state (the pre-flight pair's capture) —
 *  the playwright BrowserContext.storageState() return shape, derived
 *  from the context method so the version's own type rides (no bare
 *  any, no namespace member that moves between playwright versions). */
type AuthState = Awaited<ReturnType<import("@playwright/test").BrowserContext["storageState"]>>;

/** The pre-flight login pair (the 160-c consolidation — the L-160c1
 *  count doctrine): ONE context logs into the reference, then ours,
 *  then captures the COMBINED storageState (two origins, one cookie
 *  jar: the ref's Base44 cookie + our stateless `neo_session` — which
 *  survives context recreation and the zero-data phase [users stay],
 *  the L-160c2 license). Every axis worker's fresh context carries the
 *  state — the per-axis logins that exhausted the login budget three
 *  rounds running collapse to ONE pair per invocation, regardless of
 *  --parallel or the axes count. On failure the budget hint goes to
 *  STDERR (the s159 stdout/stderr contract) and the error RETHROWS
 *  (fail-fast, never a silent fall-back). */
async function preflightLoginPair(
  browser: import("@playwright/test").Browser,
): Promise<AuthState> {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  try {
    const refPage = await ctx.newPage();
    log(`the pre-flight login pair: the reference ${REF_URL}…`);
    await login(refPage, REF_URL);
    const ourPage = await ctx.newPage();
    log(`the pre-flight login pair: ours ${OUR_URL}…`);
    await login(ourPage, OUR_URL);
    const state = await ctx.storageState();
    log("the pre-flight pair captured (one ref-login + one our-login — the combined storageState)");
    return state;
  } catch (e) {
    console.error(
      `[census] the pre-flight login pair FAILED — if the dev log shows 429s, the\n` +
        `10-per-IP/15-min login window is exhausted (the L-158c3/L-160c1 budget\n` +
        `doctrine); the fix: a dev-server restart, then a single census re-run.\n` +
        `The app's own login limiter is a deliberate security contract — never\n` +
        `weakened; the census consolidates its logins instead (one pair per run).`,
    );
    throw e;
  } finally {
    await ctx.close();
  }
}

/** The per-axis worker (the s158 extraction — the standing per-axis body;
 *  the 160-c re-anchor: LOGIN-FREE): a fresh context carrying the
 *  combined pre-flight storageState (the one login pair per invocation
 *  — worker i of a concurrent batch delays its START by `staggerMs`,
 *  the no-burst LOAD form; a sequential batch's only worker is worker
 *  0: zero delay, the standing cadence) at the axis's viewport; the
 *  app leg + the public leg; the per-axis results returned (the
 *  batch's allSettled gathers them in INPUT order — the report + the
 *  --json shape stay byte-identical under concurrency). The dead zone
 *  is PER-AXIS; the census walks every leg. */
async function walkAxis(
  axis: CensusAxis,
  staggerMs: number,
  browser: import("@playwright/test").Browser,
  pages: ReadonlyArray<{ name: string; path: string }>,
  publicPages: ReadonlyArray<{ name: string; path: string }>,
  authState: AuthState | undefined,
): Promise<CensusPageResult[]> {
  await new Promise((r) => setTimeout(r, staggerMs));
  const out: CensusPageResult[] = [];
  // 4. the APP leg (the 9 shell pages): the state-reused logged-in
  //    context — the pre-flight pair's combined storageState (the
  //    160-c consolidation; the guard lives at the pre-flight call
  //    site — a public-only run never logs in, the s152/s149 doctrine
  //    held)
  if (pages.length > 0) {
    const ctx = await browser.newContext({
      viewport: { width: axis.width, height: axis.height },
      storageState: authState,
    });
    const refPage = await ctx.newPage();
    log(`walking ${axis.name} ${axis.width}x${axis.height} logged-in (the pre-flight pair's storageState — the 160-c consolidation)`);
    const ourPage = await ctx.newPage();

    // the census per page + the decode, at the axis's content
    // floor (the L-153c2 seam — the s95 poke-out discriminator
    // travels with the frame)
    const floor = contentFloor(axis.width);
    for (const p of pages) {
      const ref = await censusPage(refPage, REF_URL, p.path);
      const ours = await censusPage(ourPage, OUR_URL, p.path);
      // the settings page aligns through the card segmentation (the
      // LIVE-DATA page — the L-150c2 doctrine, the walk42 decode)
      const events =
        p.name === "settings" ? alignSettings(ours.els, ref.els) : alignCensus(ours.els, ref.els);
      const att = attributeGenera(events, p.name, floor);
      const mainHDelta = ours.mainH - ref.mainH;
      out.push({
        page: p.name,
        axis: axis.name,
        mainHDelta,
        oursEls: ours.els.length,
        refEls: ref.els.length,
        matches: att.matches,
        explained: att.explained,
        unexplained: att.unexplained,
      });
    }
    await ctx.close();
  }

  // 4b. the PUBLIC leg (the 155-c extension): GUEST contexts per
  //     axis — the landing renders to guests (the s149 fullpage
  //     doctrine); the pill + the Toaster sit outside the census
  //     anchor; the floor is the VIEWPORT column (the landing
  //     scrolls the document — the s95 discriminator travels with
  //     the frame)
  if (publicPages.length > 0) {
    const guestCtx = await browser.newContext({ viewport: { width: axis.width, height: axis.height } });
    const refGuest = await guestCtx.newPage();
    const ourGuest = await guestCtx.newPage();
    for (const p of publicPages) {
      const ref = await censusPublicPage(refGuest, REF_URL, p.path);
      const ours = await censusPublicPage(ourGuest, OUR_URL, p.path);
      const events = alignCensus(ours.els, ref.els);
      const att = attributeGenera(events, p.name, axis.width);
      // the public leg's height seam: docH (documentElement
      // .scrollHeight) rides mainHDelta — byte-parity gated, never
      // skipped (a static marketing surface has no DATA genus)
      const docHDelta = ours.mainH - ref.mainH;
      out.push({
        page: p.name,
        axis: axis.name,
        mainHDelta: docHDelta,
        oursEls: ours.els.length,
        refEls: ref.els.length,
        matches: att.matches,
        explained: att.explained,
        unexplained: att.unexplained,
      });
    }
    await guestCtx.close();
  }
  return out;
}

async function run() {
  const argv = process.argv.slice(2);
  const failOnDriftFlag = argv.includes("--fail-on-drift");
  const json = argv.includes("--json");
  // the --pages idiom composes across BOTH legs (the 155-c seam): the
  // combined list drives the selection; the app/public dispatch splits
  // it. Session-206 (R-4.3): the public leg is retired (an empty
  // PUBLIC_PAGES — no public surface exists on the WealthOS
  // reference), so every selection is an interior walk; no flag runs
  // all 11 — the 9 sections + the login/reset-password auth faces
  const selected = parsePagesArg(argv, CENSUS_ALL_PAGES);
  const pages = selected.filter((p) => !isPublicPage(p));
  const publicPages = selected.filter((p) => isPublicPage(p));
  const axes = parseAxisArg(argv);
  // the 158-c parallel option — parsed BEFORE any server boot so a typo
  // fails fast (the --axis idiom): default 1 = the standing sequential
  // protocol; N = the axes walked N-at-a-time (batches, logins staggered)
  const parallel = parseParallelArg(argv);

  // 1. the dev server: reuse :3000 or boot one (the s123 F-A guard —
  //    the platform shell exports a STALE absolute DATABASE_URL; an
  //    absolute URL matches neither bun-absolutization signature, so
  //    the db-path seam treats it as an intentional override and every
  //    db route 500s. DELETE the variable, never set it empty.)
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    log(`reusing the dev server on ${OUR_URL}`);
  } else {
    log("booting the dev server (bun run dev)…");
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL;
    spawned = spawn("bun", ["run", "dev"], {
      cwd: REPO,
      env: devEnv,
      stdio: "ignore",
      detached: true,
    });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) {
      console.error("[census] the dev server never came up on :3000");
      process.exit(1);
    }
    log("dev server up");
  }

  let drifted = false;
  let results: CensusPageResult[] = [];
  try {
    // 2. the ZERO-DATA state on OUR side (users + settings kept; the
    //    same F-A env guard — Prisma rejects an empty URL).
    log("zeroing our domain data (scripts/zero-data.ts)…");
    const zEnv = { ...process.env };
    delete zEnv.DATABASE_URL;
    const z = spawnSync("bun", ["scripts/zero-data.ts"], {
      cwd: REPO,
      env: zEnv,
      stdio: "inherit",
    });
    if (z.status !== 0) throw new Error("zero-data.ts failed");

    // 3. the AXES in BATCHES (the 158-c parallel option): one zero-data
    //    + one browser per invocation; a fresh state-reused context per
    //    axis (the 160-c consolidation: the ONE pre-flight login pair,
    //    its combined storageState handed to every worker — the
    //    worker starts staggered) at each axis's viewport — the
    //    dead zone is PER-AXIS, the census walks every leg (--axis
    //    subsets for the mutation-proof runs). --parallel 1 (the
    //    default) = one axis per batch, the standing sequential
    //    semantics, observable behavior byte-identical; --parallel N
    //    walks the axes N-at-a-time — each batch's axes CONCURRENTLY
    //    (the worker starts staggered WALK_STAGGER_MS per worker, the
    //    no-burst LOAD form), the batches themselves sequential.
    //    The batch gathers through Promise.allSettled — INPUT order,
    //    never completion order, so the report + the --json shape stay
    //    byte-identical under concurrency; a rejected worker DRAINS
    //    the batch (allSettled) then rethrows (the never-zeroed
    //    FINALLY rides the same try — the seed restore unchanged).
    const browser = await chromium.launch({
      headless: process.env.HEADLESS === "0" ? false : true,
    });
    // 3b. the PRE-FLIGHT LOGIN PAIR (the 160-c consolidation — the
    //     L-160c1 count doctrine): ONE ref-login + ONE our-login per
    //     invocation, the combined storageState shared by every axis
    //     worker; the GUARD transfers here (a public-only run — an
    //     app-empty selection — never logs in, the s152/s149 doctrine).
    const authState = pages.length > 0 ? await preflightLoginPair(browser) : undefined;
    results = [];
    const batches = planAxisBatches(axes, parallel);
    for (const batch of batches) {
      if (batch.length > 1) {
        log(
          `walking ${batch.length} axes concurrently (${batch.map((a) => a.name).join(" + ")}) — the worker starts staggered ${WALK_STAGGER_MS}ms (the no-burst LOAD form; the logins consolidated at 160-c)…`,
        );
      }
      const settled = await Promise.allSettled(
        batch.map((a, i) => walkAxis(a, i * WALK_STAGGER_MS, browser, pages, publicPages, authState)),
      );
      const firstReject = settled.find((s) => s.status === "rejected") as
        | PromiseRejectedResult
        | undefined;
      if (firstReject) throw firstReject.reason;
      for (const s of settled) {
        if (s.status === "fulfilled") results.push(...s.value);
      }
    }
    await browser.close();

    // 5. the report — a section per axis (the decode reads per leg)
    if (!json) {
      for (const axis of axes) {
        console.log(`\n[census] === the interior geometry census — ${axis.name} ${axis.width}x${axis.height} (the WealthOS pages logged in · ours at the matched zero-data state) ===`);
        for (const r of results.filter((x) => x.axis === axis.name)) {
          const genera: Record<string, number> = {};
          for (const a of r.explained) genera[a.genus] = (genera[a.genus] ?? 0) + 1;
          const generaLine =
            Object.entries(genera)
              .map(([g, n]) => `${g} ${n}`)
              .join(", ") || "none";
          // the public leg's height seam prints docH (the document
          // scroller); the app pages print mainH; settings stays the
          // one SKIPPED exception (the L-150c2 doctrine)
          const heightLine =
            r.page === "settings"
              ? `mainH Δ${r.mainHDelta} SKIPPED (the DATA genus)`
              : isPublicPage({ name: r.page })
                ? `docH Δ${r.mainHDelta}`
                : `mainH Δ${r.mainHDelta}`;
          console.log(
            `  ${r.page.padEnd(11)} ${heightLine} · els ${r.oursEls}/${r.refEls} · match ${r.matches} · genera: ${generaLine} · unexplained ${r.unexplained.length}`,
          );
          for (const u of r.unexplained.slice(0, 5)) {
            const side = u.el ? `ours ${u.el.tag}@${u.el.top} w${u.el.w} h${u.el.h} [${u.el.cls}]` : "";
            const sideRef = u.ref ? `ref ${u.ref.tag}@${u.ref.top} w${u.ref.w} h${u.ref.h} [${u.ref.cls}]` : "";
            console.log(`    UNEXPLAINED ${u.kind} ${side}${sideRef}`);
          }
        }
      }
    }
    const verdict = censusVerdict(results);
    drifted = !verdict.ok;
    if (json) {
      console.log(
        JSON.stringify({
          tool: "interior-census",
          results: results.map((r) => ({
            axis: r.axis,
            page: r.page,
            mainHDelta: r.mainHDelta,
            oursEls: r.oursEls,
            refEls: r.refEls,
            matches: r.matches,
            explained: r.explained.length,
            unexplained: r.unexplained.length,
          })),
          drifted,
        }),
      );
    } else if (!verdict.ok) {
      for (const f of verdict.failures) console.error(`[census] DRIFT: ${f}`);
    } else {
      log(`census gate clean (within the standing allowances — every page at its derived genus, ${CENSUS_MARGIN}-event margin)`);
    }
  } finally {
    // the never-zeroed doctrine: the seed restore rides the FINALLY —
    // the workspace is never left zeroed, even when the census throws
    // (sweep.ts restores inside the try; this gate closes that gap).
    const sEnv = { ...process.env };
    delete sEnv.DATABASE_URL;
    const s = spawnSync("bun", ["run", "db:seed"], { cwd: REPO, env: sEnv, stdio: "inherit" });
    if (s.status !== 0) {
      console.error("[census] db:seed failed — run it manually: bun run db:seed");
    } else {
      log("seed restored (verify: bun run db:census)");
    }
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }

  if (failOnDriftFlag && drifted) {
    console.error("[census] drift gate FAILED (unexplained geometry or a mainH delta — the dead zone sees it)");
    process.exit(1);
  }
}

// run only when executed directly (EXACT basename — the F-210c
// suffix-collision lesson, session 210; bun scripts/interior-census.ts / bun run
// census:interior), never on the vitest import (the unit pins)
if (process.argv[1] && path.basename(process.argv[1]) === "interior-census.ts") {
  run().catch((e) => {
    console.error("[census]", e);
    process.exit(1);
  });
}
