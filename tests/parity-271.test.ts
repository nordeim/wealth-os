import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-271 (R-68): the pins for the doc-truth, pin-depth, and
// register-note round. The 14 cure legs were born RED over the
// pre-cure tree (the F-271 ledger rows in
// docs/remediation_plan_v2.md §2.29 carry the verified evidence —
// the round's flagship: the skill doc — the document CLAUDE.md
// directs every session to read — claimed an a11y battery count,
// a viewport, a Radix label primitive, a five-file phantom UI
// inventory, a base-layer focus ring, and a three-step wizard,
// none of which exist in the tree; the README claimed an env-wired
// LLM provider and a contribution affordance it does not carry).
//
// The round's genus: distilled-doc truth (the skill doc's §8, stack
// table, component inventory, import paragraph, and design-genus
// delta line; the README's three feature rows and two API rows; one
// API rationale comment; one register note on the vendored link
// variant) plus two pin-depth hardenings over the R-67 guards (the
// stacked-order pointer pin anchors on the leg's behavioral BODY;
// the dialect probe gains its vacuity companion).
//
// Prose pins hard-wrap: containment runs over the
// whitespace-normalized form (the F-239f lesson, markdown edition —
// no comment prefixes to strip, only the wrapping). The hardening
// legs are mutation-verified (the F-244e authoring lesson's
// negative-control edition): the depth leg REDs under a hollowed
// spec body while the R-67 title pin stays green — the depth gap
// live-proven before the cure shipped.

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

const norm = (s: string): string => s.replace(/\s+/g, " ");

// ---- F-271c: the §8 a11y battery opener carries the real shape ----------

describe("F-271c/F-271d/F-271h/F-271i/F-271l — the skill doc's §8 and inventory carry the tree's truth", () => {
  const skill = norm(read("wealth-os_SKILL.md"));

  it("the a11y battery opener carries the real count and viewports (F-271c)", () => {
    // The pre-cure opener claimed 10 checks at the 1440×900 viewport —
    // the sweeps' axis, not the battery's. The real battery: 46 tests
    // (45 axe legs across light + dark × desktop and phone, the
    // anonymous faces, the 404, the open drawer/dialog states, plus
    // the devDep declaration leg) at 1280×800 and 390×844.
    expect(skill).toContain("46 tests (45 axe legs");
    expect(skill).toContain("1280×800 and 390×844 viewports");
    expect(skill).not.toContain("1440×900");
  });

  it("the stack table names slot, not the phantom label package (F-271d)", () => {
    // No react-label dependency rides package.json; the real five are
    // dialog, dropdown-menu, popover, select, and slot.
    expect(skill).toContain("`-popover`, `-slot`)");
    expect(skill).not.toContain("`-label`)");
  });

  it("the component inventory counts the real tree (F-271d)", () => {
    // The pre-cure row claimed 13 ui tsx (naming five phantom files)
    // under a 23-tsx heading; the tree holds 8 ui files (layout 8 +
    // shared 2 + ui 8 = 18).
    expect(skill).toContain("Component inventory (18 tsx files");
    expect(skill).toContain("| `src/components/ui/` | 8 tsx |");
    expect(skill).toContain(
      "avatar, badge, button, dialog, dropdown, select, tabs, toast",
    );
    expect(skill).not.toContain("13 tsx");
    expect(skill).not.toContain("23 tsx");
    expect(skill).not.toContain("icons, input, label, select, table");
  });

  it("the labels bullet describes the real association (F-271d)", () => {
    // The vendored Radix label stock retired at F-232a; inputs pair
    // plain label elements with htmlFor associations.
    expect(skill).not.toContain("Radix `Label` primitive");
    expect(skill).toContain("label htmlFor");
  });

  it("the focus bullet names the per-component ring (F-271h)", () => {
    // The base layer only tints the UA outline color; the house rings
    // ride per-component focus-visible utilities.
    expect(skill).not.toContain(
      "a global focus-visible ring (`--color-ring` ink) in @layer base",
    );
    expect(skill).toContain("per-component focus-visible utilities");
    expect(skill).toContain("only tints the UA outline");
  });

  it("the touch-target bullet carries the real floor (F-271i)", () => {
    expect(skill).toContain("WCAG 2.5.8 24px floor");
    expect(skill).not.toContain("44px-class targets");
    expect(skill).toContain("nav rows are 44px-class");
  });

  it("both mobile-battery count sites carry the real count (F-271i)", () => {
    expect(skill).not.toContain("(10 checks");
    expect(skill).toContain("19 checks");
  });

  it("the import paragraph carries the two-step wizard (F-271e)", () => {
    expect(skill).not.toContain("3-step wizard");
    expect(skill).toContain("2-step wizard");
  });

  it("the contrast figures carry the computed values (F-271l)", () => {
    // The inactive-tab figure trued to the computed 4.40:1 (the
    // session-256 truing); the KPI delta pair is the 600-light /
    // 400-dark arms at BOTH citation sites (§8 and the design-genus
    // line) — the red-700 citation matches neither the tree nor the
    // reference (whose own red sat at the lighter 500 step).
    expect(skill).toContain("computed 4.40:1");
    expect(skill).not.toContain("measured 4.0:1");
    expect(skill).not.toContain("red-700");
    expect(skill).toContain("`emerald-700`/`red-600` pair in light mode");
    expect(skill).toContain("F-218j AA re-pin");
  });
});

// ---- F-271e/F-271f/F-271g: the README's feature rows --------------------

describe("F-271e/F-271f/F-271g — the README's feature and API rows carry the tree's truth", () => {
  const readme = norm(read("README.md"));

  it("the import rows carry the two-step wizard (F-271e)", () => {
    expect(readme).not.toContain("3-step wizard");
    expect(readme).toContain("2-step wizard");
  });

  it("the AI-coach row carries the unwired-seam truth (F-271f)", () => {
    expect(readme).not.toContain("optional LLM provider via env");
    expect(readme).toContain("reserved but unwired");
  });

  it("the goals rows carry the editable saved-amount form (F-271g)", () => {
    expect(readme).not.toContain("contribution round-trips");
    expect(readme).toContain("editable saved-amount round-trip");
  });
});

// ---- F-271j/F-271k: the rationale comment and the register note ---------

describe("F-271j/F-271k — the API rationale and the vendored register note", () => {
  it("the forgot-password rationale cites the real status code (F-271j)", () => {
    const src = read("src/app/api/auth/forgot-password/route.ts");
    expect(src).not.toContain("signup's 409");
    expect(src).toContain("signup's 400");
  });

  it("the vendored link variant carries its contrast register note (F-271k)", () => {
    // The destructive sibling has carried the never-inherit-silently
    // warning since F-227f; the link arm (amber primary as text
    // color, roughly 2.1 to 1 on the light surface) now carries its
    // own — anchored within the half-kilobyte window above the arm's
    // construction site (the F-244e construction-site lesson).
    const src = read("src/components/ui/button.tsx");
    const linkIdx = src.indexOf('link: "text-primary');
    expect(linkIdx).toBeGreaterThan(-1);
    const window = src.slice(Math.max(0, linkIdx - 600), linkIdx);
    expect(window).toContain("link arm rides the amber primary");
    expect(window).toContain("never inherit");
  });
});

// ---- F-271a/F-271b: the pin-depth hardenings over the R-67 guards -------

describe("F-271a/F-271b — the R-67 guards gain depth teeth", () => {
  it("the R-67 title pin keeps its place (the depth leg adds, it never moves)", () => {
    // The parity-270 pointer pin stays exactly where R-67 left it;
    // the depth leg below ADDS behavioral anchors. If a future round
    // "cleans up" the title pin because the depth leg supersedes it,
    // this leg REDs — both pins are load-bearing.
    const pin = read("tests/parity-270.test.ts");
    expect(pin).toContain('toContain("stacked surfaces")');
    expect(pin).toContain('toContain("Expense filters")');
  });

  it("the stacked-order e2e leg's BODY carries the behavioral anchors (F-271a)", () => {
    // The R-67 pointer pin matched two title strings — a gutted leg
    // body would survive it (the F-271a depth gap, mutation-proven:
    // a hollowed body REDs this leg while the title pin stays
    // green). This leg anchors on the leg's behavioral sequence: the
    // TRUE-390 viewport, the filters card open, the drawer opened
    // over it, two Escape presses with the one-surface-per-press
    // assertions, and the trigger's aria restoration.
    const spec = read("tests/e2e/mobile-navigation.spec.ts");
    const start = spec.indexOf("stacked surfaces: Escape closes the drawer");
    expect(start).toBeGreaterThan(-1);
    const end = spec.indexOf("opening the drawer moves focus into it", start);
    expect(end).toBeGreaterThan(start);
    const body = spec.slice(start, end);
    expect(body).toContain("width: 390, height: 844");
    expect(body).toContain('getByRole("group", { name: "Expense filters" })');
    expect(body).toContain('getByRole("button", { name: "Open navigation menu" })');
    const escapes = body.match(/press\("Escape"\)/g) ?? [];
    expect(escapes.length).toBeGreaterThanOrEqual(2);
    expect(body).toContain('getByRole("dialog")).toBeHidden()');
    expect(body).toContain("card).toBeVisible()");
    expect(body).toContain("card).toBeHidden()");
    expect(body).toContain('toHaveAttribute("aria-expanded", "false")');
  });

  it("the dialect probe token still rides the env example's hash-marked prose (F-271b)", () => {
    // The parity-229 zero-config leg's only assertion passes
    // vacuously if the env example's prose rewords away the probe
    // token (the re-pick instruction is comment-only — the
    // convention-lives-in-comments genus). This companion REDs on
    // that reword: the probe must be re-picked in the same commit.
    const env = read(".env.example");
    const hashLines = env.split("\n").filter((l) => /^\s*#/.test(l));
    expect(
      hashLines.some((l) => l.includes("zero-config")),
      "the dialect probe token vanished from the env example's hash-marked prose — re-pick the probe in tests/parity-229.test.ts the same commit",
    ).toBe(true);
  });
});
