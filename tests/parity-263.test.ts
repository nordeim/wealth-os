import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DIALOG_OVERLAY, LOGIN_LAYOUT } from "../src/lib/page-layout";

// Session-263 (R-60): the source-tier pins for the login-ladder,
// overlay-alpha, and census-truing round. Every cure leg was born RED
// over the pre-cure tree (the F-263 ledger rows in
// docs/remediation_plan_v2.md §2.21 carry the verified evidence — both
// adjudication surfaces live-probed on the reference at TRUE widths
// 390/639/640/767/768/1280, every challenged figure recomputed by code
// in a second engine against the LIVE palette and surfaces).
//
// The round's genus: two CLASS cures (the login-family height ladder
// the reference live-measures and the dialog-overlay alpha the
// reference live-measures) plus prose-truth cures (the select-trigger
// width mechanism, the tabs track genus, the import walk figure, the
// chip dark-arm span, the savings figure) plus a docs-census cure
// (the session-262 record's stale handler counts).
//
// Prose pins hard-wrap and ride comment-line prefixes: containment runs
// over the comment-stripped, whitespace-normalized form (the F-239f
// lesson — a comment-wrapped phrase needs comment-stripped matching, or
// the pin depends on where the wrap happens to fall).

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

const norm = (s: string): string =>
  s
    .replace(/^[ \t]*(?:\/\/|\*|\{\/\*)[ \t]?/gm, "")
    .replace(/\s+/g, " ");

// ---- F-263g: the login-family height ladder (the CLASS legs) -----------------

describe("F-263g — the login family regains the 48px height step at the small breakpoint", () => {
  it("LOGIN_LAYOUT.input carries the height ladder (44px below the break, 48px at it)", () => {
    // Live-probed on the reference: the sign-in email/password inputs
    // compute 44px at 390/639 and 48px at 640+ (the small-breakpoint
    // height step). Our constant rendered flat 44px since the WealthOS
    // rebase while four prose carriers described the ladder.
    expect(LOGIN_LAYOUT.input).toContain("h-11 sm:h-12");
  });

  it("LOGIN_LAYOUT.submit carries the same height ladder", () => {
    // Live-probed on the reference: the Sign in submit computes 44px at
    // 390 and 48px at 1280 — the step rides the submit with the inputs.
    expect(LOGIN_LAYOUT.submit).toContain("h-11 sm:h-12");
  });

  it("the input's font ladder was never lost (the green-by-design rider)", () => {
    // The reference's font steps 16px→14px at the MIDDLE breakpoint;
    // our font pair always matched — only the height step was missing.
    expect(LOGIN_LAYOUT.input).toContain("text-base md:text-sm");
  });

  it("the four prose carriers keep describing the ladder (the prose-truth rider)", () => {
    // The prose was right all along — the code was wrong. These riders
    // keep the prose and the constants in agreement: reverting either
    // side now trips a leg.
    expect(read("src/components/layout/login-card.tsx")).toContain("44px→48px");
    expect(read("src/components/layout/reset-password-screen.tsx")).toContain("44px→48px");
    expect(read("src/lib/login-reset.ts")).toContain("44px→48px");
  });

  it("the login-reset DOM record documents the reference's ladder (the record rider)", () => {
    // The session-79 DOM record — measured on the reference — always
    // carried the ladder form; it stays untouched by the cure.
    expect(read("tests/login-reset.test.ts")).toContain("the login's Sign in is h-11 sm:h-12");
  });
});

// ---- F-263i: the dialog-overlay alpha (the second CLASS leg) ------------------

describe("F-263i — the dialog overlay trues to the measured half-strength black", () => {
  it("DIALOG_OVERLAY carries the measured 50% black form (the 60% drift retired)", () => {
    // Live-probed on the reference's open Add Expense dialog: the
    // overlay is a full-viewport fixed layer computing rgba(0,0,0,0.5).
    // Our constant shipped 60% — the parity drift this cures.
    expect(DIALOG_OVERLAY).toContain("bg-black/50");
    expect(DIALOG_OVERLAY).not.toContain("bg-black/60");
  });

  it("dialog.tsx cites the measured form (the stock 80% claim retired)", () => {
    const src = read("src/components/ui/dialog.tsx");
    expect(src).not.toContain("black/80");
    expect(norm(src)).toContain("the MEASURED half-strength black wash");
    expect(norm(src)).toContain("live-probed on its open Add Expense dialog");
  });
});

// ---- F-263h: the select-trigger width mechanism -------------------------------

describe("F-263h — the select-trigger comment states the live width mechanism", () => {
  it("select.tsx no longer inverts the mechanism (no base-width denial, no CRM-era surfaces)", () => {
    const src = read("src/components/ui/select.tsx");
    expect(src).not.toContain("No base w-full");
    expect(src).not.toContain("270px");
    expect(norm(src)).toContain("the base carries the full-width form");
    expect(norm(src)).toContain("overrides it through its cn appendage");
  });
});

// ---- F-263j: the tabs track genus ----------------------------------------------

describe("F-263j — the tabs docblock describes the live track genus", () => {
  it("tabs.tsx retires the equal-width-grid claim for the natural-width row", () => {
    const src = read("src/components/ui/tabs.tsx");
    expect(src).not.toContain("equal-width grid");
    // The parity-229 bare-word net caught the first wording (a bare
    // display utility rode the prose) — the row is described without it.
    expect(norm(src)).toContain("natural-width row");
  });
});

// ---- F-263k: the import parse-walk figure --------------------------------------

describe("F-263k — the import parse-walk cites the 5000-row contract", () => {
  it("the pending-face comment walks 5000 rows (the exclusive bound no longer cited as a count)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).not.toContain("5001 rows");
    // The F-239f wrap harness: the cure text wraps mid-phrase — ride the
    // comment-stripped normalized form for the containment.
    expect(norm(src)).toContain("walks up to 5000 data rows");
  });
});

// ---- F-263l: the investment-chip dark-arm span ----------------------------------

describe("F-263l — the chip dark-arm span trues to the live-surface computation", () => {
  it("constants.ts cites the computed gradient span (the hedged single figure retired)", () => {
    const src = read("src/lib/constants.ts");
    expect(src).not.toContain("≈2:1");
    expect(norm(src)).toContain("compute 2.10–3.42:1 across the card gradient");
  });

  it("the investments page's twin comment carries the same trued span", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    expect(src).not.toContain("≈2:1");
    expect(norm(src)).toContain("compute 2.10–3.42:1");
  });
});

// ---- F-263m: the savings tile figure ---------------------------------------------

describe("F-263m — the savings tile cites its computed 2.41:1", () => {
  it("constants.ts trues the savings figure (the sibling step figure untouched)", () => {
    const src = read("src/lib/constants.ts");
    expect(src).not.toContain("2.42:1");
    // The wrap harness: the figure sits past a comment-line break.
    expect(norm(src)).toContain("savings at 2.41:1");
    expect(src).toContain("3.58:1");
  });
});

// ---- F-263n: the handler-census genus ---------------------------------------------

describe("F-263n — the handler census trues to the tree's 45 handlers / 30 route files", () => {
  const STALE = "40 handlers / 24 route files";
  const TRUED = "45 handlers / 30 route files";

  it("the session record, the worklog, the README row, and the PAD line carry the trued census", () => {
    for (const rel of [
      "docs/session_107.md",
      "worklog.md",
      "README.md",
      "Project_Architecture_Document.md",
    ]) {
      const src = read(rel);
      expect(src, `${rel} still carries the stale census`).not.toContain(STALE);
      expect(src, `${rel} misses the trued census`).toContain(TRUED);
    }
  });

  it("the plan's own three historical carriers stay trued (the plan-writer rider)", () => {
    const src = read("docs/remediation_plan_v2.md");
    expect(src).not.toContain(STALE);
    expect(src).toContain(TRUED);
  });

  it("the derived census matches the recorded counts (the derived-truth rider)", () => {
    // F-255b's lesson: pin the DERIVED truth, not the prose — walk the
    // tree's route files and count the exported handlers, so a future
    // route addition that drifts the docs' census fails here.
    const apiDir = path.resolve(import.meta.dirname, "..", "src", "app", "api");
    const routeFiles: string[] = [];
    const walk = (dir: string): void => {
      for (const entry of readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (statSync(full).isDirectory()) walk(full);
        else if (entry === "route.ts") routeFiles.push(full);
      }
    };
    walk(apiDir);
    let handlers = 0;
    for (const file of routeFiles) {
      const src = readFileSync(file, "utf8");
      handlers += (src.match(/export (?:async )?function (?:GET|POST|PUT|PATCH|DELETE)/g) ?? []).length;
    }
    expect(routeFiles.length, "route-file census drifted from the recorded 30").toBe(30);
    expect(handlers, "handler census drifted from the recorded 45").toBe(45);
  });
});
