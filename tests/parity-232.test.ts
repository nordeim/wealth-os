import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-232 (R-29): the source-tier pins for the dead-stock
// retirement, carrier-net repair, and dialog-focus round. Every pin was
// born RED over the pre-cure tree (the F-232 ledger rows in
// docs/remediation_plan_v2.md carry the verified evidence).
// Source-scanning contracts per the house convention: read the file,
// assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

/** Walk src (ts/tsx/css), skipping the generated prisma client. */
function walkSrc(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "generated") continue;
    const p = path.join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkSrc(p, files);
    else if (/\.(ts|tsx|css)$/.test(name)) files.push(p);
  }
  return files;
}

const SRC_ROOT = path.resolve(import.meta.dirname, "..", "src");
const SRC_FILES = walkSrc(SRC_ROOT);
const srcText = (rel: string): string =>
  readFileSync(path.join(SRC_ROOT, rel), "utf8");

// ---- F-232a: the vendored dead-stock retirement --------------------------

describe("F-232a — the four zero-consumer shadcn-stock files retire", () => {
  const retired = [
    "src/components/ui/card.tsx",
    "src/components/ui/table.tsx",
    "src/components/ui/label.tsx",
    "src/components/ui/input.tsx",
  ];

  it("the files are gone (the F-231h Avatar precedent, file edition)", () => {
    for (const rel of retired) {
      expect(
        existsSync(path.resolve(import.meta.dirname, "..", rel)),
        `${rel} should not exist`,
      ).toBe(false);
    }
  });

  it("no src file imports any of the retired modules", () => {
    for (const f of SRC_FILES) {
      const text = readFileSync(f, "utf8");
      for (const mod of ["ui/card", "ui/table", "ui/label", "ui/input"]) {
        expect(
          text,
          `${f} must not import @/components/${mod}`,
        ).not.toContain(`@/components/${mod}`);
      }
    }
  });

  it("the page-layout riders retire with them (INPUT_BASE, DIALOG_TEXTAREA, CHECKBOX)", () => {
    const layout = read("src/lib/page-layout.ts");
    expect(layout).not.toContain("INPUT_BASE");
    expect(layout).not.toContain("DIALOG_TEXTAREA");
    expect(layout).not.toMatch(/\bCHECKBOX\b/);
  });

  it("the Event/Activity citation is gone from the tree (the F-231h sweep's one miss)", () => {
    for (const f of SRC_FILES) {
      expect(
        readFileSync(f, "utf8"),
        `${f} must not cite the CRM-era Event/Activity dialogs`,
      ).not.toContain("Event/Activity");
    }
  });
});

// ---- F-232b: the carrier-net repair (the allowlist edition) --------------

describe("F-232b — the carrier net closes over its own allowlist", () => {
  it("no border-primary token survives anywhere in src (the dead utility retires)", () => {
    for (const f of SRC_FILES) {
      expect(
        readFileSync(f, "utf8"),
        `${f} must not carry the border-primary token (comments included)`,
      ).not.toContain("border-primary");
    }
  });

  it("the parity-229 PROSE_ALLOWLIST carries no compound with a dead part", () => {
    // The compound entry hid border-primary behind its live text-primary
    // sibling — the allowlist is not a carrier sanctuary. The whole-tree
    // invariant nets the genus once the entry is gone.
    const invariant = read("tests/parity-229.test.ts");
    expect(invariant).not.toContain('"border-primary/text-primary"');
  });

  it("the globals.css reserved-token comment names no hover-form (F-224v doctrine)", () => {
    const css = read("src/app/globals.css");
    expect(css).not.toContain("hover:bg-danger-soft");
  });
});

// ---- F-232c: the expenses dialog step-swap focus -------------------------

describe("F-232c — the quick→form step swap lands focus (the F-231b genus)", () => {
  it("the value-guarded step effect exists (StrictMode-safe, no boolean mount flag)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toMatch(/prevStepRef\.current !== step/);
    // the open-gate: a close-time reset never fires (open is false)
    expect(src).toMatch(/if \(!changed \|\| !open\) return;/);
    // quick→form focuses the description input; form→quick the heading
    expect(src).toMatch(/if \(step === "form"\) \{[\s\S]*?descriptionRef\.current\?\.focus\(\)/);
    expect(src).toMatch(/quickHeadingRef\.current\?\.focus\(\)/);
  });

  it("the Quick Select heading is focusable and the description input carries the ref", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toMatch(/<h3[^>]*ref=\{quickHeadingRef\}[^>]*tabIndex=\{-1\}/);
    expect(src).toMatch(/ref=\{descriptionRef\}/);
  });
});

// ---- F-232d: the hamburger aria-controls ---------------------------------

describe("F-232d — the hamburger carries aria-controls (the expenses-filters precedent)", () => {
  it("the trigger references the drawer; the sheet carries the id", () => {
    const header = read("src/components/layout/mobile-header.tsx");
    const nav = read("src/components/layout/mobile-nav.tsx");
    expect(header).toContain('aria-controls="mobile-nav-drawer"');
    expect(header).toMatch(/aria-expanded=\{drawerOpen\}/);
    expect(nav).toMatch(/<div[^>]*id="mobile-nav-drawer"[^>]*role="dialog"/);
  });
});

// ---- F-232e: the always-mounted loading live region ----------------------

describe("F-232e — the loading live region pre-exists (the F-218h genus)", () => {
  it("app-shell renders the region unconditionally, OUTSIDE main (the census-safe placement)", () => {
    const shell = read("src/components/layout/app-shell.tsx");
    expect(shell).toMatch(/role="status"/);
    expect(shell).toMatch(/aria-live="polite"/);
    // placement: the region precedes <main> in the shell's source order
    const regionAt = shell.search(/role="status"/);
    const mainAt = shell.search(/<main /);
    expect(regionAt).toBeGreaterThan(-1);
    expect(mainAt).toBeGreaterThan(regionAt);
  });

  it("LoadingBlock is the visual only (the region owns the announcement)", () => {
    const parts = read("src/components/shared/page-parts.tsx");
    const block = parts.match(/export function LoadingBlock[\s\S]*?\n\}/);
    expect(block).not.toBeNull();
    expect(block![0]).not.toContain('role="status"');
    expect(block![0]).not.toContain("aria-live");
  });
});

// ---- F-232f: the stale amber arm retires ---------------------------------

describe("F-232f — the bg-amber-500 axe sanction arm retires (the F-220p genus)", () => {
  it("the register carries no amber-fill arm (every live fill carries stone-900 ink since F-219a)", () => {
    const spec = read("tests/e2e/a11y.spec.ts");
    expect(spec).not.toContain('"bg-amber-500"');
  });
});

// ---- F-232g: the upload capacity post-write re-check ---------------------

describe("F-232g — the upload capacity guard re-checks after the write (the TOCTOU cure)", () => {
  it("the write is unlinked and refused when the post-write re-read breaches", () => {
    const src = read("src/app/api/upload/route.ts");
    expect(src).toMatch(/unlink/);
    // the re-read happens AFTER the writeFile (search() takes no start
    // index — indexOf does; the first check precedes the write)
    const firstCheckAt = src.indexOf("uploadsCapacity(uploadsDir())");
    const writeAt = src.indexOf("await writeFile");
    const recheckAt = src.indexOf("uploadsCapacity(uploadsDir())", firstCheckAt + 1);
    expect(firstCheckAt).toBeGreaterThan(-1);
    expect(writeAt).toBeGreaterThan(firstCheckAt);
    expect(recheckAt).toBeGreaterThan(writeAt);
    expect(src.slice(recheckAt)).toMatch(/STORAGE_FULL/);
  });
});

// ---- F-232h: the low tail -------------------------------------------------

describe("F-232h — the low-tail hygiene cures", () => {
  it("accounts no longer imports the unused CURRENCIES map", () => {
    const src = read("src/app/(app)/accounts/page.tsx");
    expect(src).not.toMatch(/import \{[^}]*CURRENCIES/);
  });

  it("BrandMark carries no dead compact arm; the sidebar consumes SHELL_LAYOUT.sidebar", () => {
    const src = read("src/components/layout/sidebar.tsx");
    expect(src).not.toContain("compact");
    expect(src).toMatch(/SHELL_LAYOUT\.sidebar/);
    const layout = read("src/lib/page-layout.ts");
    expect(layout).toMatch(/sidebar: "hidden lg:flex lg:w-64 lg:flex-col"/);
  });

  it("the dead page-layout members retire (MOBILE_NAV_SHEET.icon, PAGE_ROOT.bare)", () => {
    const layout = read("src/lib/page-layout.ts");
    expect(layout).not.toMatch(/MOBILE_NAV_SHEET[\s\S]{0,200}\bicon:/);
    expect(layout).not.toMatch(/\bbare: ""/);
  });

  it("the analytics CSV export defers the object-URL revoke", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    expect(src).toMatch(/setTimeout\(\(\) => URL\.revokeObjectURL\(url\)/);
  });
});

// ---- F-232i: the line-strong registration --------------------------------

describe("F-232i — --color-line-strong joins the reserved-token register", () => {
  it("the F-224t reserved-family comment carries the line-strong citation", () => {
    const css = read("src/app/globals.css");
    // the register block names the token alongside the reserved family
    expect(css).toMatch(/reserved[\s\S]{0,600}line-strong/);
    // the token itself stays pinned and dark-flipped
    expect(css).toMatch(/--color-line-strong:\s*#d6d3d1/);
    expect(css).toMatch(/\.dark\s*\{[^}]*--color-line-strong:\s*#404040/);
  });
});

// ---- the genus guard (green by design) -----------------------------------

describe("F-232a — the retirement keeps the live ui family standing", () => {
  it("the consumed primitives stay (the N-56e/F-231m register doctrine)", () => {
    for (const kept of [
      "src/components/ui/button.tsx",
      "src/components/ui/dialog.tsx",
      "src/components/ui/select.tsx",
      "src/components/ui/dropdown.tsx",
      "src/components/ui/toast.tsx",
      "src/components/ui/tabs.tsx",
      "src/components/ui/avatar.tsx",
      "src/components/ui/badge.tsx",
    ]) {
      expect(existsSync(path.resolve(import.meta.dirname, "..", kept)), kept).toBe(true);
    }
  });
});
