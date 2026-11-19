import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-274 (R-71): the pins for the predicate-outlier,
// mechanism-truth, and phantom-pin round. The cure legs were born
// RED over the pre-cure tree (the F-274 ledger rows in
// docs/remediation_plan_v2.md §2.32 carry the verified evidence).
//
// The round's flagship: the signup unique-violation arm's P2002
// predicate — the lone duck-typed outlier of the Prisma-code family
// (its own comment cites the settings route's pattern while the code
// carries the structural shape; every Prisma-code sibling — settings
// twice, budgets, forgot-password, and the three db.ts seams — rides
// the instanceof form). The uploads family's structural checks are a
// DIFFERENT genus (Node fs error codes carry no Prisma class) and
// stay as they are; the genus leg below exempts them by construction
// (it keys on the P-coded literal comparisons only).
//
// The riders: the drawer sign-out docblock's re-arm claim reworded to
// the remount truth (the navigate-on-activation unmounts the drawer
// before the POST resolves — the honest re-arm is the fresh initial
// state a reopen remounts with; the sidebar twin, whose rail stays
// mounted, is where an in-place re-arm actually runs); the skill
// doc's Validation row reworded from the phantom dompurify pin (the
// override retired at F-238e when the package left the tree) to the
// retirement truth; the README remediation row's lead-in deduplicated
// (the phrase rode twice since the R-69 lockstep); the globals
// register comment extended with the reserved softs' dark-flip
// asymmetry (only the danger soft flips in dark mode — the F-224q
// doctrine binds a future dark consumer).

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

// Whitespace-normalized containment: the cure comments and doc rows
// hard-wrap at ~78 cols, so the prose pins must hold the CONTENT,
// never the wrap (the s198/F-239f lesson — a pin that depends on
// line breaks fails on the next innocent rewrap).
const norm = (s: string): string => s.replace(/\s+/g, " ");

// Comment-marker-stripped containment: a phrase spanning hard-wrapped
// `//` docblock lines carries the markers mid-phrase after plain
// normalization — strip the line-leading markers first, then normalize
// (the F-239f comment-wrapped-phrase doctrine).
const normComment = (s: string): string =>
  norm(s.replace(/^[ \t]*(?:\/\/|\*)[ \t]?/gm, " "));

const repo = path.resolve(import.meta.dirname, "..");

function walkSrc(dir: string, files: string[] = []): string[] {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "generated") continue; // the regenerated prisma client
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkSrc(full, files);
    } else if (/\.(ts|tsx|jsx)$/.test(ent.name)) {
      files.push(full);
    }
  }
  return files;
}

const SRC_FILES = walkSrc(path.join(repo, "src"));

// ---- F-274a: the signup P2002 arm rides the family's instanceof form ----

describe("F-274a — the signup unique-violation arm carries the family's instanceof form", () => {
  const signup = read("src/app/api/auth/signup/route.ts");

  it("imports the generated Prisma namespace (the settings route's own import form)", () => {
    // The instanceof form needs the namespace: settings/route.ts:5 is
    // the model. Without the import the arm cannot carry the family
    // idiom at all.
    expect(signup).toContain('import { Prisma } from "@/generated/prisma/client";');
  });

  it("the P2002 arm tests instanceof, not the structural shape", () => {
    // The F-274a convergence: the arm shipped with the duck-typed
    // predicate while its own comment cited the settings route's
    // pattern — every Prisma-code sibling rides the instanceof form
    // (settings twice, budgets, forgot-password, the three db.ts
    // seams). The uploads family's structural checks are a different
    // genus (Node fs codes — ENOENT and its kin have no Prisma
    // class) and stay as they are.
    expect(signup).toMatch(
      /e instanceof Prisma\.PrismaClientKnownRequestError && e\.code === "P2002"/,
    );
    expect(signup).not.toMatch(/\(e as \{ code\?: string \}\)\.code === "P2002"/);
  });

  it("the genus leg: every P-coded literal comparison in src rides the instanceof form", () => {
    // The whole-tree form (the F-228b doctrine: the carriers are
    // never only where the audit found them). Every `.code === "P20xx"`
    // literal comparison must sit inside an instanceof-guarded arm;
    // the fs-code sites (ENOENT/ENOSPC/EDQUOT) never match a P-code
    // literal and are exempt by construction.
    const offenders: string[] = [];
    for (const f of SRC_FILES) {
      const src = readFileSync(f, "utf8");
      for (const m of src.matchAll(/\.code === "P\d{4}"/g)) {
        const before = src.slice(Math.max(0, m.index - 140), m.index);
        if (!before.includes("instanceof Prisma.PrismaClientKnownRequestError")) {
          offenders.push(`${path.relative(repo, f)}: …${before.slice(-60)}${m[0]}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});

// ---- F-274b: the drawer's sign-out rider describes its true mechanism ----

describe("F-274b — the drawer's sign-out rider describes the remount re-arm", () => {
  it("the docblock names the remount as the honest re-arm", () => {
    // The F-274b mechanism truth: onNavigate closes the drawer and
    // UNMOUNTS DrawerNav before the POST resolves, so the state
    // reset below the await lands on an unmounted tree — the honest
    // re-arm is the fresh initial state a reopen remounts with, and
    // the failure surfaces through the store-error banner. The
    // sidebar twin (whose rail stays mounted) is the arm where an
    // in-place re-arm actually runs.
    const nav = normComment(read("src/components/layout/mobile-nav.tsx"));
    expect(nav).toContain("the honest re-arm is the fresh initial state a reopen");
    expect(nav).toContain("unmounts this component before the POST resolves");
  });

  it("the false in-place re-arm claim is retired from the drawer file", () => {
    // Scoped to the DRAWER file: the sidebar twin's docblock carries
    // the same sentence where it is TRUE (its rail stays mounted, the
    // setBusy reset lands on a live component) — the claim was only
    // wrong for the unmounting arm.
    expect(normComment(read("src/components/layout/mobile-nav.tsx"))).not.toContain(
      "a failed POST re-arms for a retry",
    );
  });
});

// ---- F-274c: the skill doc's validation row carries the retirement truth --

describe("F-274c — the skill doc's Validation row carries the retirement truth", () => {
  it("no live-tense defensive-pin claim for the retired override", () => {
    // The F-272 phantom-primitive genus: the row said the npm
    // override "stays as a defensive pin" in live tense while the
    // override retired at F-238e when the package left the tree
    // (parity-238 pins the absence from the manifest and lockfile).
    expect(norm(read("wealth-os_SKILL.md"))).not.toContain("stays as a defensive pin");
  });

  it("the row records the retirement and its pin", () => {
    const skill = norm(read("wealth-os_SKILL.md"));
    expect(skill).toContain("retired at F-238e");
    expect(skill).toContain("its absence from the manifest is pinned");
  });
});

// ---- F-274d: the README remediation row's lead-in rides exactly once ------

describe("F-274d — the README's remediation row carries its lead-in exactly once", () => {
  it("the plan-file phrase and its gloss are not duplicated", () => {
    // The R-69 lockstep's replacement range started after the
    // lead-in's first copy while its new cell began with the phrase
    // again — the duplication rode two sessions invisible to every
    // pin (docs-counts watches the counts and the R-item citation,
    // never the row's prose shape).
    const readme = read("README.md");
    const phrase = "`docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program";
    expect(readme.split(phrase).length - 1).toBe(1);
  });
});

// ---- F-274e: the reserved-soft register names the dark-flip asymmetry -----

describe("F-274e — the reserved-soft register names the dark-flip asymmetry", () => {
  it("the F-224t register documents that only the danger soft flips in dark mode", () => {
    // The register documented the family as reserved-unwired without
    // naming the asymmetry: the dark block flips ONLY the danger soft
    // (the F-224q cure — its DropdownItem hover consumer); the other
    // three softs carry light values in both modes, so a future dark
    // consumer must flip its own token in the same commit or it
    // paints a light chip on a dark surface.
    const css = norm(read("src/app/globals.css"));
    expect(css).toContain("the dark block flips the danger soft ONLY");
    expect(css).toContain("a future dark consumer must flip its own token in the same commit");
  });
});
