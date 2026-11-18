import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-273 (R-70): the pins for the dynamic-viewport,
// config-loader, and register-promotion round. The cure legs were
// born RED over the pre-cure tree (the F-273 ledger rows in
// docs/remediation_plan_v2.md §2.31 carry the verified evidence —
// the round's flagship: the shell root's h-screen (100vh) is the
// dynamic-viewport trap the F-220p register carried since R-17 with
// "reference construction unknown"; this round decoded the
// reference (no fixed-height shell — the F-207e/F-210a
// document-scrolled original, our internal scroller the absorbed
// superset), making the h-dvh swap parity-neutral by construction
// and byte-identical in headless Chromium where 100dvh equals 100vh.
// The rider: the vitest config rode the deprecated config-loader
// path — the .mts rename cures the warning, empirically validated
// pre-plan, with the tsconfig include extended so the renamed file
// cannot escape the type gate).
//
// The genus leg walks the whole src/ tree: the bare h-screen token
// (lookbehind-guarded so min-h-screen and max-h-screen are not the
// target — min-height on document-scrolled surfaces never traps
// content, and the toast's max-height rides its own leg) may not
// reappear in code OR comments (a comment-carried h-screen emits
// dead CSS once the code site is cured — the F-229d net's own
// trigger; this leg is the round's forward form).

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

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

/** The bare h-screen token: not preceded by a word char or hyphen
 *  (excludes min-h-screen / max-h-screen) and not followed by one
 *  (excludes h-screen-ish coincidences). */
const BARE_H_SCREEN = /(?<![\w-])h-screen(?![\w-])/;

// ---- F-273a: the shell root swaps to the dynamic viewport unit -------

describe("F-273a — the shell root carries the dynamic viewport unit (the F-220p promotion)", () => {
  const layout = read("src/lib/page-layout.ts");

  it("SHELL_LAYOUT.root pins h-dvh, not the static h-screen (the iOS toolbar trap)", () => {
    // The F-220p register entry promoted with the reference decoded:
    // the reference has no fixed-height shell, so the height MECHANISM
    // is parity-unbound; 100dvh equals 100vh in headless Chromium
    // (every pixel gate byte-identical) while fixing the iOS Safari
    // bottom-truncation genus the F-219h drawer cure fixed in-sheet.
    const root = layout.match(/root: "([^"]+)"/);
    expect(root).not.toBeNull();
    expect(root![1]).toContain("h-dvh");
    expect(root![1]).not.toContain("h-screen");
    expect(root![1]).toContain("overflow-hidden");
  });

  it("both comment carriers describe the dynamic-viewport root (no dead h-screen emission)", () => {
    // page-layout.ts:30 and app-shell.tsx:15 carried the h-screen
    // token in prose — comment-carried class strings emit dead CSS
    // (the F-229d net's own trigger) once the code site is cured.
    const shell = read("src/components/layout/app-shell.tsx");
    expect(layout).toContain("h-dvh overflow-hidden");
    expect(shell).toContain("flex h-dvh");
    expect(layout).not.toMatch(BARE_H_SCREEN);
    expect(shell).not.toMatch(BARE_H_SCREEN);
  });

  it("the toast column caps at the dynamic viewport (the same-genus completion)", () => {
    // toast.tsx:94 — a fixed-position element capped at the STATIC
    // viewport on the mobile widths where the dynamic toolbar lives:
    // the bottom-most toast sat under the expanded chrome. Same genus,
    // same cure.
    const toast = read("src/components/ui/toast.tsx");
    expect(toast).toContain("max-h-dvh");
    expect(toast).not.toContain("max-h-screen");
  });

  it("the genus leg: no bare h-screen token anywhere in src (code or comments)", () => {
    // The whole-tree invariant (the F-228b doctrine: the carriers are
    // never only where the audit found them). min-h-screen forms are
    // classified SAFE by construction — min-height on
    // document-scrolled surfaces (the auth faces, the error pages,
    // the page shells) never traps content.
    const offenders: string[] = [];
    for (const f of SRC_FILES) {
      if (BARE_H_SCREEN.test(readFileSync(f, "utf8"))) offenders.push(path.relative(repo, f));
    }
    expect(offenders).toEqual([]);
  });
});

// ---- F-273b: the vitest config rides the native loader path -----------

describe("F-273b — the vitest config renames to .mts (the config-loader deprecation cure)", () => {
  it("vitest.config.mts exists and vitest.config.ts does not", () => {
    // The warning fired on every unit run: "ESM syntax in a file
    // loaded as CommonJS (vitest.config.ts:1:1)". The .mts extension
    // is ESM TypeScript natively — the native config loader (the
    // future Vite default) loads it without the transpile fallback.
    expect(existsSync(path.join(repo, "vitest.config.mts"))).toBe(true);
    expect(existsSync(path.join(repo, "vitest.config.ts"))).toBe(false);
  });

  it("tsconfig includes *.mts so the renamed config cannot escape the type gate", () => {
    // "**/*.ts" does not match ".mts" — without this include the
    // renamed file silently leaves the tsc program. The gate must
    // cover the config in its new form (never weaken a gate to ship
    // a cure).
    const tsconfig = read("tsconfig.json");
    expect(tsconfig).toContain('"**/*.mts"');
  });

  it("next.config's artifact exclusion carries the .mts form", () => {
    // outputFileTracingExcludes lists vitest.config.ts — the rename
    // without this edit leaves the .mts form traceable into the
    // standalone artifact (smoke leg 14's hygiene class).
    const next = read("next.config.ts");
    expect(next).toContain('"vitest.config.mts"');
    expect(next).not.toContain('"vitest.config.ts"');
  });

  it("the playwright config's unit-layer pointer carries the .mts form", () => {
    const pw = read("playwright.config.ts");
    expect(pw).toContain("vitest.config.mts");
  });

  it("the README tree row and the skill doc's file card carry the .mts form", () => {
    const readme = read("README.md");
    const skill = read("wealth-os_SKILL.md");
    expect(readme).toContain("vitest.config.mts");
    expect(readme).not.toContain("vitest.config.ts ");
    expect(skill).toContain("vitest.config.mts");
    expect(skill).not.toMatch(/\| `vitest\.config\.ts`/);
  });
});
