import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-131 pins (the 131-c toast family walk — walk22). THE HEADLINE
// the walk settled live: F-131c1 THE REFERENCE'S TOAST SYSTEM IS DOM-DEAD —
// the bundle (md5 a70a637f…, stable across 103 probes) carries exactly four
// Ix.* toast calls (all on the profile page: "Photo uploaded successfully" /
// "Failed to upload photo" / "Profile updated successfully" / "Failed to
// update profile"), but NO toast element ever renders — the document-wide
// hunt (querySelectorAll("*") for sonner/toast/live/status/notification
// markers) found ZERO on every trigger path (the 402 quota-exhausted upload,
// the successful save-with-reload, the empty create, the Google click), and
// a MutationObserver across the save window logged ZERO added nodes. Our
// toast system is therefore a DELIBERATE SUPERSET construction (the
// mobile-nav doctrine: the reference's own absence covered by our working
// surface) — these pins freeze OUR family contract as censused live at
// 1440×900 + 390×844 (walk22's ours phases + the PASS-2 battery).
//
// The two RED-first pins carry the session's fixes:
//   * D-131a0 THE CLOSE-X HOVER TEXT — hover:text-foreground → the
//     neutral-900 literal: the F-128c1 genus's FOURTH arm (s128 menu-item ·
//     s129 outline · s130 ghost — the reference's stock interactive-hover ink
//     #171717, expressed in our literal family as neutral-900 since the s80
//     badge). With the reference surface DOM-dead (F-131c1) the fix is
//     justified by the trio precedent + internal consistency: the toast X is
//     the LAST live hover:text-foreground ride in src/ (the tabs.tsx
//     underline arm is dead code no surface mounts; the mobile-nav.tsx arm
//     is the deliberate fix-over-defect drawer).
//   * D-131a1 THE DEAD-ANIMATION RETIREMENT — the scaffold-era
//     data-[state=open]:animate-in family never applied (the ToastCard never
//     sets data-state — live-censused tc.animName=none), the shadcn template
//     leftover; retired per the D-124a7 dead-code doctrine (no reference
//     surface to contract an animation against — F-131c1).

const root = path.resolve(import.meta.dirname, "..");
const srcRaw = readFileSync(path.join(root, "src/components/ui/toast.tsx"), "utf8");

// comment-stripped source for the NEGATIVE pins — the fix comments
// themselves name the retired strings (the D-131a0/D-131a1 records), so
// negatives must read code-only (the mutation-feedback stripComments idiom)
function stripComments(s: string): string {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}
const src = stripComments(srcRaw);

/** A bounded region around an anchor (a failed anchor fails the pin). */
function regionAt(anchor: string, before: number, after: number): string {
  const i = src.indexOf(anchor);
  expect(i, `anchor not found: ${anchor}`).toBeGreaterThanOrEqual(0);
  return src.slice(Math.max(0, i - before), i + after);
}

describe("session-131 parity pins (the toast family walk — F-131c1: the reference's toast system is DOM-DEAD; ours the deliberate superset)", () => {
  it("the close X rides the neutral-900 hover literal — the F-128c1 genus's fourth arm (D-131a0)", () => {
    // the button block (the className rides the line above the aria-label)
    const x = regionAt('aria-label="Dismiss notification"', 400, 60);
    expect(x).toContain("hover:text-neutral-900");
    expect(x).not.toContain("hover:text-foreground");
  });

  it("the card carries NO data-[state] animation arms — the inert scaffold string retired (D-131a1)", () => {
    expect(src).not.toContain("data-[state=open]:animate-in");
    expect(src).not.toContain("data-[state=closed]:animate-out");
    expect(src).not.toContain("slide-in-from-bottom-4");
  });

  it("the viewport geometry family (the walk-censused contract: bottom-right from sm, top-full-width below, max-w-[420px] at md, p-4, gap-2)", () => {
    expect(src).toContain("fixed top-0 z-[100]");
    expect(src).toContain("sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]");
    expect(src).toContain("gap-2 p-4");
    expect(src).toContain('aria-label="Notifications"');
    expect(src).toContain('role="region"');
  });

  // Session-218 (R-15, F-218h — the announcement contract): the viewport
  // was role="region" (NOT a live region) and each card INSERTED with
  // role="status" at push time — a live region that arrives with its
  // content is not announced (the region must pre-exist in the a11y
  // tree), so toasts (the sole feedback channel for every mutation
  // outcome) were silent for screen-reader users. The cure: the
  // always-mounted viewport becomes the polite live region; the per-card
  // role retires (a nested live role double-announces).
  it("the always-mounted viewport is the polite live region (F-218h)", () => {
    expect(src).toContain('aria-live="polite"');
  });

  it("no per-card live role rides the insertion (the double-announcement cure)", () => {
    expect(src).not.toContain('role="status"');
  });

  it("the card chrome family (rounded-xl + p-3.5 + shadow-lg — live-censused 12px radius, 14px padding, the two-layer lg shadow)", () => {
    expect(src).toContain("rounded-xl border p-3.5 shadow-lg");
  });

  it("the three variant borders (the walk-censused success/error/info pair)", () => {
    // Session-217 (R-14, F-217c): the panel moved bg-white → bg-surface (the
    // token flips dark — light text on a white chip post-flip was unreadable)
    // and the success/error borders gained dark arms. The toast is OUR
    // deliberate superset (F-131c1: the reference's toast system is
    // DOM-DEAD, no live face to parity) — the light-mode computed values
    // are unchanged (bg-surface = #ffffff in light).
    expect(src).toContain('item.variant === "success" && "border-emerald-200 bg-surface dark:border-emerald-800"');
    expect(src).toContain('item.variant === "error" && "border-rose-200 bg-surface dark:border-rose-800"');
    expect(src).toContain('item.variant === "info" && "border-line bg-surface"');
  });

  it("the 4000ms auto-dismiss + the max-4 cap (live-measured 4126/4118ms; 4 cards after 5 pushes)", () => {
    expect(src).toContain("setTimeout(() => dismiss(item.id), 4000)");
    expect(src).toContain(".slice(-4)");
  });

  it("the title/description classes (the walk-censused 14px/500 title + the 12px muted description)", () => {
    // Session-217 (R-14, F-217c): the description gained its dark arm
    // (stone-500 on the #0a0a0a dark panel computed 2.4:1).
    expect(src).toContain('"text-sm font-medium text-foreground"');
    expect(src).toContain('"mt-0.5 text-xs text-muted dark:text-stone-400"');
  });

  it("the icon family (h-4.5 w-4.5 + the three token rides — live-censused 18px rgb(16,185,129) success)", () => {
    // Session-221 (R-18, F-221m) — in-commit refinement: the success/info
    // icons darkened one step on light with dark arms (emerald-600 3.66:1,
    // amber-700 4.83:1 — the old emerald-500/amber-500 computed
    // 2.54:1/2.15:1 on the white card); error keeps text-danger (3.76:1).
    expect(src).toContain("h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400");
    expect(src).toContain("h-4.5 w-4.5 text-danger");
    expect(src).toContain("h-4.5 w-4.5 text-amber-700 dark:text-amber-400");
  });

  it("the hover-pause seam (the onMouseEnter/Leave pair — live-proven: holds at 6.5s, dismisses ~4.1s after the unpause)", () => {
    expect(src).toContain("onMouseEnter={() => setPaused(true)}");
    expect(src).toContain("onMouseLeave={() => setPaused(false)}");
  });
});
