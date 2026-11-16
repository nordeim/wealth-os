import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// Session-252 (R-49): the list-focus-ring, resend-shape, and type-lag
// round's source pins. Every pin was born RED against the pre-round
// tree and carries its finding's citation. The round's verified
// defects: the Radix list-item families' keyboard focus rides a
// background wash computing 1.09:1 light / 1.31:1 dark (MENU_ITEM,
// SelectItem, DropdownItem — the only interactive families with the
// outline suppressed and no ring replacement); the resend miss arm's
// two-key envelope vs the known arm's three-key form is a
// never-verified-state enumeration signal that survives the
// production OTP knob; the DashboardData user wire type still
// declares the four-field Pick the F-251d route cure widened past
// (the store's two upcasts stay load-bearing); the palette census's
// comment strip leaves trailing line comments alive (its docblock
// "never invent it" claim falsifiable); the scrollbar utility ships
// the light thumb in both themes; the tabs underline variant and the
// badge carry the offset without its token (the F-251g genus's
// uncalled members); the shell root's local dark wash patch is
// byte-redundant since the F-220d token flip; the a11y register's
// meter note misses the red over-budget arm (3.0:1); two docblocks
// cite the e2e db pin in its relative form; three Zod fields surface
// raw library copy through the BAD_REQUEST envelope.

const read = (p: string) => readFileSync(p, "utf8");
const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

// ---- F-252a: the list-item keyboard ring -------------------------------------

describe("F-252a — the list-item families carry the keyboard ring", () => {
  it("MENU_ITEM joins the wash with the ring arm (the wash stays for pointer users)", () => {
    const src = read("src/lib/page-layout.ts");
    const start = src.indexOf("export const MENU_ITEM");
    const end = src.indexOf("as const", start);
    expect(start).toBeGreaterThan(-1);
    const item = src.slice(start, end);
    // The keyboard arm — the F-218i ink (17.49:1 light / 18.15:1 dark,
    // re-computed by code this session) on the only focus affordance
    // the wash (1.09:1 light / 1.31:1 dark) could not carry alone.
    expect(item).toContain("focus-visible:ring-2 focus-visible:ring-ring");
    // The wash arms stay (pointer users keep the Radix highlight).
    expect(item).toContain("focus:bg-stone-100");
    expect(item).toContain("dark:focus:bg-stone-800");
  });

  it("SelectItem joins the wash with the ring arm (the F-221b wash form intact)", () => {
    const src = read("src/components/ui/select.tsx");
    const start = src.indexOf("function SelectItem");
    const end = src.indexOf("function SelectSeparator", start);
    expect(start).toBeGreaterThan(-1);
    const item = src.slice(start, end);
    expect(item).toContain("focus-visible:ring-2 focus-visible:ring-ring");
    // The parity-221 watched form must survive the cure untouched.
    expect(src).toContain(
      "focus:bg-line-soft focus:text-neutral-900 dark:focus:bg-stone-800 dark:focus:text-stone-100",
    );
  });

  it("DropdownItem (the latent popover-close row family) carries the ring arm", () => {
    const src = read("src/components/ui/dropdown.tsx");
    const start = src.indexOf("function DropdownItem");
    const end = src.indexOf("function DropdownLabel", start);
    expect(start).toBeGreaterThan(-1);
    const item = src.slice(start, end);
    expect(item).toContain("focus-visible:ring-2 focus-visible:ring-ring");
  });
});

// ---- F-252b: the resend shape oracle ------------------------------------------

describe("F-252b — the resend miss arm carries the always-present key", () => {
  it("the miss arm's envelope is three-key (the forgot-password form)", () => {
    const src = read("src/app/api/auth/resend/route.ts");
    const start = src.indexOf("if (!user || !user.verificationCodeHash)");
    const end = src.indexOf("const code = generateVerifyCode();", start);
    expect(start).toBeGreaterThan(-1);
    const missArm = src.slice(start, end);
    // Key-set presence was the oracle: the known never-verified arm
    // always carries the third key (null under the production knob)
    // while the miss arm omitted it. Both arms are three-key now.
    expect(missArm).toContain("verificationCode: null");
  });
});

// ---- F-252c: the dashboard user wire type -------------------------------------

describe("F-252c — the wire type widens to User, the upcasts retire", () => {
  it("DashboardData.user is the full User shape (the F-251d route projection's type seam)", () => {
    const src = stripComments(read("src/types/index.ts"));
    expect(src).not.toContain("user: Pick<User,");
    expect(src).toMatch(/user: User;/);
  });

  it("the store commits the payload without the widening upcast", () => {
    const src = stripComments(read("src/stores/wealthos-store.ts"));
    expect(src).not.toContain("as User");
  });
});

// ---- F-252d: the palette census trailing-comment arm ---------------------------

describe("F-252d — the census strip covers trailing line comments", () => {
  it("stripComments strips the trailing form (URL-colon exempt)", () => {
    const src = read("tests/palette-pins.test.ts");
    // The third arm: a line comment whose preceding char is neither a
    // colon (an https literal) nor a quote (a protocol-relative URL)
    // strips to end-of-line — a trailing citation can no longer
    // register as live usage and mask a dead pin on the reverse leg.
    expect(src).toContain(String.raw`([^:"'])\/\/.*$/gm`);
  });
});

// ---- F-252e: the theme-blind scrollbar -----------------------------------------

describe("F-252e — the scrollbar utility carries its dark arm", () => {
  it("the dark thumb is the stone-500 family (3.91:1 on the dark wash)", () => {
    const src = read("src/app/globals.css");
    expect(src).toMatch(/\.dark \.scrollbar-thin\s*\{[\s\S]*?#78716c[\s\S]*?\}/);
  });
});

// ---- F-252f: the latent offset arms --------------------------------------------

describe("F-252f — the uncalled focus surfaces gain the offset token", () => {
  it("the tabs underline variant's trigger pairs the offset with its token", () => {
    const src = read("src/components/ui/tabs.tsx");
    const start = src.indexOf("underline &&");
    const end = src.indexOf("// Session-221", start);
    expect(start).toBeGreaterThan(-1);
    const arm = src.slice(start, end);
    expect(arm).toContain("focus-visible:ring-offset-2 focus-visible:ring-offset-background");
  });

  it("the badge's focus frame pairs the offset with its token", () => {
    const src = read("src/components/ui/badge.tsx");
    // Session-257 (R-54, F-257q): the five focus arms carry the house
    // focus visible form — the offset token pair rides it unchanged.
    expect(src).toContain(
      "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    );
  });
});

// ---- F-252g: the vestigial dark-wash literal ------------------------------------

describe("F-252g — the shell root's local dark wash patch retires", () => {
  it("the literal is gone from the layout constants (the token flip carries the wash)", () => {
    const src = stripComments(read("src/lib/page-layout.ts"));
    expect(src).not.toContain("dark:bg-[#0e1310]");
  });

  it("the citing comments describe, never cite (the F-238d discipline)", () => {
    const globals = stripComments(read("src/app/globals.css"));
    expect(globals).not.toContain("dark:bg-[#0e1310]");
    // The e2e dark-wash leg's rationale names the token mechanism.
    const e2e = read("tests/e2e/wealthos.spec.ts");
    expect(e2e).not.toContain("dark:bg-[#0e1310]");
    expect(e2e).toContain("the background token's dark flip");
  });
});

// ---- F-252h: the red over-budget meter register note ------------------------------

describe("F-252h — the register covers the red over-budget arm", () => {
  it("the a11y register's meter note cites the red arm at the bar", () => {
    const src = read("tests/e2e/a11y.spec.ts");
    expect(src).toContain("over-budget");
    expect(src).toMatch(/3\.0:1/);
  });
});

// ---- F-252i: the e2e-pin prose truths ----------------------------------------------

describe("F-252i — the docblocks describe the absolute e2e pin", () => {
  it("prisma.config cites the pin's absolute form", () => {
    const src = read("prisma.config.ts");
    expect(src).toContain("the e2e suite's absolute db/e2e.db pin");
  });

  it("db-path cites the pin's absolute form", () => {
    const src = read("src/lib/db-path.ts");
    expect(src).toContain("the e2e suite's absolute db/e2e.db pin");
  });
});

// ---- F-252j: the un-messaged Zod fields ---------------------------------------------

describe("F-252j — the three bare fields carry the house copy", () => {
  it("budgetDeleteSchema's category messages both bounds", () => {
    const src = read("src/lib/schemas.ts");
    const start = src.indexOf("export const budgetDeleteSchema");
    const end = src.indexOf("});", start);
    const schema = src.slice(start, end);
    expect(schema).toContain('min(1, "Category is required")');
    expect(schema).toContain('max(80, "Category must be reasonably sized")');
  });

  it("the csv row's category cap carries the message", () => {
    const src = read("src/lib/schemas.ts");
    const start = src.indexOf("export const csvImportSchema");
    const end = src.indexOf("});", src.indexOf("rows", start));
    const schema = src.slice(start, end);
    expect(schema).toContain('max(80, "Category must be reasonably sized")');
  });

  it("the coach history content cap carries the message", () => {
    const src = read("src/lib/schemas.ts");
    const start = src.indexOf("export const aiCoachSchema");
    const end = src.indexOf("});", src.indexOf("history", start));
    const schema = src.slice(start, end);
    expect(schema).toContain('max(4000, "Message must be reasonably sized")');
  });
});
