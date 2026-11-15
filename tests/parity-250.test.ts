import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Session-250 (R-47): the source battery for the settings-sequence,
// superseded-error, and select-completion round. Every pin slices its
// target region from a unique construction-site anchor and sizes its
// windows past the documentation the same commit writes (the
// F-247e/F-248e slice window doctrine — a window that cannot admit
// the cure's own comment shape was never a pin on the cure).

const ROOT = join(__dirname, "..");

function read(p: string): string {
  return readFileSync(join(ROOT, p), "utf8");
}

const STORE = read("src/stores/wealthos-store.ts");

function region(start: string, end: string): string {
  const s = STORE.indexOf(start);
  expect(s).toBeGreaterThan(-1);
  const e = STORE.indexOf(end, s);
  expect(e).toBeGreaterThan(s);
  return STORE.slice(s, e);
}

// A comment arm between regex anchors: the cure's own explanatory
// comments may sit between an anchor and its assertion target (the
// F-248e regex window doctrine).
const C = String.raw`(?:\/\/[^\n]*\n\s*)*`;

// ---- F-250a: the duplicate failure else retires --------------------------

describe("F-250a — the superseded failure landing is owned by the guarded arm alone", () => {
  it("the guarded failure arm stands (the legitimate landing's owner)", () => {
    const body = region("hydrate: async () => {", "logout: async");
    expect(body).toContain("if (!superseded && !res.ok) {");
  });

  it("the trailing unguarded error commit is retired (the pre-R-46 leftover)", () => {
    const body = region("hydrate: async () => {", "logout: async");
    // Pre-cure a trailing else re-committed the error for EVERY failed
    // landing — superseded included — so a slow failing GET painted the
    // could-not-load banner over a fully loaded workspace. The
    // retirement: no else arm on the failure path may commit the error
    // state outside the superseded conjunction.
    expect(body).not.toMatch(
      /\} else \{\s*\n\s*set\(\{ hydrated: true, loading: false, error: res\.error \}\);/,
    );
  });
});

// ---- F-250b: the settings sequence (the F-249h cure) ---------------------

describe("F-250b — the settings sequence joins the tail's read and the PUT", () => {
  it("the module-level sequence is declared beside the refresh sequence", () => {
    expect(STORE).toMatch(/let settingsSeq = 0;/);
  });

  it("the tail's GET mints the sequence at issue (not the landing)", () => {
    const body = region("hydrate: async () => {", "logout: async");
    const mintAt = body.indexOf("const sseq = ++settingsSeq;");
    expect(mintAt).toBeGreaterThan(-1);
    const fetchAt = body.indexOf('call<Settings>("/api/settings")');
    expect(fetchAt).toBeGreaterThan(-1);
    // The mint must precede the fetch — the sequence orders ISSUES, so
    // a mint after the await would order landings instead.
    expect(mintAt).toBeLessThan(fetchAt);
  });

  it("the tail's settle and commit guard is era + sequence (the token key retired)", () => {
    const body = region("hydrate: async () => {", "logout: async");
    const tailAt = body.indexOf('call<Settings>("/api/settings")');
    expect(tailAt).toBeGreaterThan(-1);
    const tail = body.slice(tailAt);
    expect(tail).toContain(
      "if (sessionClearSeq === entryClearSeq && sseq === settingsSeq) {",
    );
    expect(tail).toContain("settingsSettled: true");
    // The retired form: the token key let a pre-PUT read landing after
    // the PUT's commit overwrite the fresh settings (a GET never bumps
    // the token).
    expect(tail).not.toContain("if (token === sessionWriteToken) {");
  });

  it("updateSettings bumps the sequence at entry and commits on the era", () => {
    const m = STORE.match(/updateSettings: async \(body\) => \{[\s\S]*?\n    \},/);
    const src = m?.[0] ?? "";
    expect(src).not.toBe("");
    const bumpAt = src.indexOf("++settingsSeq;");
    expect(bumpAt).toBeGreaterThan(-1);
    const putAt = src.indexOf('call<Settings>("/api/settings"');
    expect(putAt).toBeGreaterThan(-1);
    // The bump rides the entry (before the PUT await) so every
    // in-flight older read is staled the moment the write is declared.
    expect(bumpAt).toBeLessThan(putAt);
    expect(src).toMatch(
      new RegExp(
        `if \\(sessionClearSeq === entryClearSeq\\) \\{[\\s\\S]*?set\\(\\{[\\s\\S]*?settings: res\\.data,[\\s\\S]*?settingsSettled: true,[\\s\\S]*?\\}\\);`,
      ),
    );
    // The retired forms: the token capture and its guarded commit — a
    // remount hydrate's entry bump staled them and dropped the fresh
    // PUT commit under the success toast.
    expect(src).not.toContain("const token = sessionWriteToken;");
    expect(src).not.toContain("if (token === sessionWriteToken)");
  });
});

// ---- F-250c: the read loop's rejection stays inside the envelope ---------

describe("F-250c — the stream loop carries its own catch", () => {
  it("the loop's catch cancels the producer and answers the unparseable contract", () => {
    const src = read("src/lib/api.ts");
    const loopAt = src.indexOf("const reader = body.getReader();");
    expect(loopAt).toBeGreaterThan(-1);
    const mergedAt = src.indexOf("const merged = new Uint8Array(total);", loopAt);
    expect(mergedAt).toBeGreaterThan(loopAt);
    const loop = src.slice(loopAt, mergedAt);
    expect(loop).toContain("} catch {");
    expect(loop).toContain("reader.cancel().catch(() => {})");
    expect(loop).toContain("return { tooLarge: false, value: null };");
  });
});

// ---- F-250d: the select completions ---------------------------------------

describe("F-250d — the settings family carries the consumed-fields select", () => {
  it("the shared select constant is declared with the seven consumed fields", () => {
    const src = read("src/app/api/settings/route.ts");
    const at = src.indexOf("const SETTINGS_SELECT");
    expect(at).toBeGreaterThan(-1);
    // The declaration's own end form is the as-const assertion —
    // anchor on it, not a generic brace terminator.
    const end = src.indexOf("as const;", at);
    expect(end).toBeGreaterThan(at);
    const block = src.slice(at, end);
    for (const field of [
      "defaultCurrency",
      "dateFormat",
      "pushNotifications",
      "emailAlerts",
      "budgetWarnings",
      "monthlyReports",
      "theme",
    ]) {
      expect(block).toContain(`${field}: true`);
    }
  });

  it("every query site on the route consumes the select (five sites)", () => {
    const src = read("src/app/api/settings/route.ts");
    const uses = src.match(/select: SETTINGS_SELECT/g) ?? [];
    // readSettings' findUnique + its P2002 race create + the
    // findUniqueOrThrow re-read, plus the PUT's upsert and its P2002
    // retry upsert.
    expect(uses.length).toBe(5);
  });
});

describe("F-250d — the transactions existence checks narrow to the id", () => {
  for (const p of [
    "src/app/api/transactions/route.ts",
    "src/app/api/transactions/[id]/route.ts",
  ]) {
    it(`${p}: the FK existence findFirst selects id only`, () => {
      const src = read(p);
      expect(src).toMatch(
        new RegExp(
          `findFirst\\(\\{\\s*${C}where: \\{ id: body\\.accountId, ownerId: guard\\.user\\.id \\},\\s*${C}select: \\{ id: true \\},`,
        ),
      );
    });
  }
});

// ---- F-250e: the sign-out busy riders -------------------------------------

describe("F-250e — the two Sign Out surfaces carry the busy rider", () => {
  it("the sidebar's MenuItem is disabled through the busy flag", () => {
    const src = read("src/components/layout/sidebar.tsx");
    // The navigating helper form is pinned by parity-223 — the rider
    // must not change it.
    expect(src).toContain("onSelect={() => void signOut()}");
    const signOutAt = src.indexOf("const signOut = async () => {");
    expect(signOutAt).toBeGreaterThan(-1);
    // The window rides through the helper's own docblock to the entry
    // guard (the F-248e comment admission doctrine).
    const helper = src.slice(signOutAt, signOutAt + 900);
    expect(helper).toContain("if (busy) return;");
    expect(src).toMatch(/disabled=\{busy\}/);
  });

  it("the drawer's Sign Out button carries the same rider", () => {
    const src = read("src/components/layout/mobile-nav.tsx");
    expect(src).toContain('onClick={() => void signOut()}');
    const signOutAt = src.indexOf("const signOut = async () => {");
    expect(signOutAt).toBeGreaterThan(-1);
    const helper = src.slice(signOutAt, signOutAt + 900);
    expect(helper).toContain("if (busy) return;");
    expect(src).toMatch(/disabled=\{busy\}/);
  });
});

// ---- F-250f: the expense row's bucket is not color-only -------------------

describe("F-250f — the expense row carries a non-color bucket signal", () => {
  it("the tile holds a screen reader bucket label beside the glyph", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    const tileAt = src.indexOf('className="flex h-9 w-9 shrink-0');
    expect(tileAt).toBeGreaterThan(-1);
    const tile = src.slice(tileAt, src.indexOf("</span>", tileAt) + 7);
    expect(tile).toContain("Receipt");
    expect(tile).toContain('<span className="sr-only">{meta.label}</span>');
  });

  it("the savings arm defines the light mode icon ink (the contrast step)", () => {
    const src = read("src/lib/constants.ts");
    expect(src).toContain('iconLight: "#059669"');
  });

  it("the row's icon ink applies the light mode step", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toContain(
      "color: !isDark && meta.iconLight ? meta.iconLight : meta.color",
    );
  });
});
