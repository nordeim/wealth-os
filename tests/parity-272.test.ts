import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-272 (R-69): the pins for the census-reanchor,
// phantom-primitive, and layer-map round. The cure legs were born RED
// over the pre-cure tree (the F-272 ledger rows in
// docs/remediation_plan_v2.md §2.30 carry the verified evidence —
// the round's flagship: the security ledger's advisory census moved
// 2 → 1 when npm's audit endpoint stopped returning the picomatch
// HIGH against the same picomatch@4.0.7 the lockfile still resolves
// (verified at the registry's bulk endpoint; the GitHub advisory
// still publishes it); the phantom-primitive family — the skill
// doc's stack table still naming -tabs after the F-271d cure trued
// label→slot in the same row, the README architecture row, the PAD
// §1.2/§3.2/§5.3 twins; and the layer-map/token-mirror pair — the
// §18 z-index ladder drifted four rows deep against the tree and its
// own §17, the §4/§19 mirrors carrying #ffffff for the
// primary-foreground the F-219a cure set to #1c1917 plus retired
// tokens and stale ramp ranges).
//
// The line-count legs are SELF-VERIFYING (the F-245c structural
// doctrine's doc edition): the battery parses the doc's claimed
// number and compares it against the live file at test time, so the
// claim can never silently drift again — a future edit that grows a
// file REDs the leg until the doc is trued in the same commit.
//
// Prose pins hard-wrap: containment runs over the
// whitespace-normalized form (the F-239f lesson, markdown edition).

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

const norm = (s: string): string => s.replace(/\s+/g, " ");

// ---- F-272b: the stack table's phantom -tabs ----------------------------

describe("F-272b — the skill doc's stack table carries the real five Radix primitives", () => {
  const skill = norm(read("wealth-os_SKILL.md"));

  it("the UI-primitives row names the five real packages, not the phantom tabs twin (F-272b)", () => {
    // package.json declares exactly five @radix-ui deps (dialog,
    // dropdown-menu, popover, select, slot); tabs.tsx is a hand-rolled
    // native-ARIA strip importing no Radix. The F-271d cure trued
    // label→slot in this row but left the tabs twin; this leg closes
    // the pin-coverage gap parity-271's containment left open.
    expect(skill).toContain("`-popover`, `-slot`)");
    expect(skill).not.toContain("`-tabs`");
    expect(skill).not.toContain("`-label`)");
  });
});

// ---- F-272c/F-272d: the README + PAD stack rows --------------------------

describe("F-272c/F-272d — the README and PAD stack rows carry the real primitives", () => {
  const readme = norm(read("README.md"));
  const pad = norm(read("Project_Architecture_Document.md"));

  it("the README architecture row names Slot, not the phantom Label and Tabs (F-272c)", () => {
    expect(readme).toContain("Dialog, Select, Dropdown, Popover, Slot");
    expect(readme).not.toContain("Dialog, Select, Tabs, Dropdown, Popover, Label");
  });

  it("the PAD §1.2 stack row carries the five real packages, not the phantom label 2.1.17 (F-272d)", () => {
    // Scoped to §1.2 (the stack table): the v2.69.0 revision block
    // legitimately quotes the phantom as the finding's subject.
    const head = pad.indexOf("### 1.2");
    const tail = pad.indexOf("### 1.3");
    const sec12 = norm(pad.slice(head, tail));
    expect(sec12).toContain("popover 1.3.1 · slot 1.5.0");
    expect(sec12).not.toContain("label 2.1.17");
  });
});

// ---- F-272e: the PAD §3.2/§5.3 ui inventories ----------------------------

describe("F-272e — the PAD ui inventories carry the real eight files", () => {
  const pad = norm(read("Project_Architecture_Document.md"));

  it("the §3.2 tree row lists the real eight, not input/label/textarea (F-272e)", () => {
    expect(pad).toContain("8 primitives: avatar, badge, button, dialog");
    expect(pad).not.toContain("primitives: button, input, select");
    expect(pad).not.toContain("label, popover, textarea");
  });

  it("the §5.3 paragraph lists the real eight with the honest wrapping gloss (F-272e)", () => {
    expect(pad).toContain("(avatar, badge, button, dialog, dropdown, select, tabs, toast");
    expect(pad).not.toContain("button/input/select/tabs/dialog/dropdown/popover/label/textarea");
  });
});

// ---- F-272f: the §18 z-index layer map ------------------------------------

describe("F-272f — the §18 z-index layer map matches the tree's ladder", () => {
  const skill = read("wealth-os_SKILL.md");
  const head = skill.indexOf("## 18. Z-Index Layer Map");
  const tail = skill.indexOf("## 19. Color Reference");
  const sec = norm(skill.slice(head, tail));

  it("the map carries the real ladder — no phantom z-20, the header at z-50, the drawer at z-40, z-[60] on the skip link (F-272f)", () => {
    // Tree census: z-10 ×3 (NAV_LAYOUT sidebar interior) · z-40 the
    // drawer (page-layout.ts:70) · z-50 the mobile header (:100), the
    // dialog overlay+content (:310/:316), select/dropdown content
    // (:406) · z-[60] the skip link's focused reveal (app-shell.tsx:92,
    // the F-225d cure) · z-[100] toasts.
    expect(sec).toContain("skip link");
    expect(sec).toContain("z-[60]");
    expect(sec).not.toContain("z-20");
    expect(sec).not.toContain("expenses table sticky header");
  });
});

// ---- F-272g: the §4/§19 token mirrors -------------------------------------

describe("F-272g — the token mirrors carry the real @theme values", () => {
  const skill = read("wealth-os_SKILL.md");
  const head4 = skill.indexOf("## 4. The Design System");
  const tail4 = skill.indexOf("## 5. Component Architecture");
  const sec4 = norm(skill.slice(head4, tail4));
  const head19 = skill.indexOf("## 19. Color Reference");
  const tail19 = skill.indexOf("## 20. The Complete TypeScript");
  const sec19 = norm(skill.slice(head19, tail19));
  const whole = norm(skill);

  it("the §4 mirror's primary-foreground is the F-219a stone-900 ink, not #ffffff (F-272g)", () => {
    expect(sec4).toContain("--color-primary-foreground: #1c1917");
    expect(sec4).not.toContain("--color-primary-foreground: #ffffff");
  });

  it("the §19 table's primary-foreground row carries #1c1917 (F-272g)", () => {
    expect(sec19).toContain("`#1c1917` | | text on primary");
    expect(sec19).not.toContain("`#ffffff` | | text on primary");
  });

  it("the retired tokens are gone from both mirrors — no --color-subtle, no radius trio (F-272g)", () => {
    // --color-subtle retired at F-228b; the radius scale retired at
    // F-227n (globals.css:157-160 documents the retirement).
    expect(whole).not.toContain("--color-subtle");
    expect(whole).not.toContain("--radius-card");
    expect(whole).not.toContain("--radius-button");
    expect(whole).not.toContain("--radius-pill");
  });

  it("the dark-mode mechanism is the .dark token flip, not the retired .dark body rule (F-272g)", () => {
    // The .dark body rule was deleted as inert at F-220d; the working
    // seam is the .dark block's token flips, and the custom utilities
    // are v4-native @utility forms. The pin scopes to the two mechanism
    // surfaces — §4's structure list and §19's dark-theme paragraph;
    // §4's F-217c contract paragraph legitimately quotes the retired
    // rule shape as the anti-pattern (flip the TOKEN, not the rule).
    const structure = norm(
      skill.slice(skill.indexOf("Structure:"), skill.indexOf("**Session-217 (R-14, F-217c)")),
    );
    expect(structure).toContain("5. `@utility` declarations");
    expect(structure).not.toContain(".dark body");
    expect(sec19).not.toContain(".dark body");
    expect(sec19).toContain("the `.dark` block flips the semantic set AND the seven app-native tokens");
  });

  it("the §19 ramp ranges match the real @theme steps (F-272g)", () => {
    // The real @theme (142 tokens): amber/blue/emerald/red/stone
    // 50–950, rose non-contiguous (no 100, no 700), teal 500–700,
    // cyan 500 only.
    expect(sec19).toContain("amber 50–950");
    expect(sec19).toContain("teal 500–700");
    expect(sec19).toContain("cyan 500 (");
    expect(sec19).not.toContain("amber 50–900");
    expect(sec19).not.toContain("teal 50–700");
    expect(sec19).not.toContain("cyan 400/500");
  });
});

// ---- F-272h/F-272i: the families count and the phantom api family --------

describe("F-272h/F-272i — the API-family counts and enumeration carry the real census", () => {
  const readme = norm(read("README.md"));
  const pad = read("Project_Architecture_Document.md");
  const head = pad.indexOf("### 3.2");
  const tail = pad.indexOf("### 3.3");
  const sec32 = norm(pad.slice(head, tail));
  const padN = norm(pad);

  it("no carrier claims 20 families — the real census is 18 families / 30 route files / 45 handlers (F-272h)", () => {
    expect(readme).toContain("18 resource families");
    expect(readme).toContain("18 route-handler families");
    expect(readme).toContain("18 API families");
    expect(readme).not.toContain("20 resource families");
    expect(readme).not.toContain("20 route-handler families");
    expect(readme).not.toContain("20 API families");
    // The PAD's phantom forms, pinned by their exact pre-cure shapes (the
    // v2.69.0 revision block legitimately quotes the finding's subject —
    // the bare phrase — so the pins anchor on the cured carriers' forms).
    expect(padN).toContain("<br/>18 families]");
    expect(padN).not.toContain("20 families]");
    expect(padN).not.toContain("# 20 families:");
  });

  it("the §3.2 api enumeration carries the real families — no phantom analytics (F-272i)", () => {
    // The Analytics PAGE is real (client-side aggregation); the phantom
    // was the /api/analytics FAMILY in the api/ tree enumeration — the
    // pin scopes to the enumeration's own lines.
    expect(sec32).toContain("18 families:");
    expect(sec32).not.toContain("# analytics, auth/*");
    expect(sec32).toContain("# auth/*, export, reset, search, settings, users,");
  });
});

// ---- F-272j: the phantom component/type names -----------------------------

describe("F-272j — the doc names real exports, not phantoms", () => {
  const pad = norm(read("Project_Architecture_Document.md"));
  const skill = norm(read("wealth-os_SKILL.md"));

  it("PageHeader not PageCard; BankAccount not AccountView; KpiCard not StatCard (F-272j)", () => {
    // Scoped to §3.2's tree glosses: the v2.69.0 revision block
    // legitimately quotes the phantom names as the finding's subject.
    const head32 = pad.indexOf("### 3.2");
    const tail32 = pad.indexOf("### 3.3");
    const sec32j = norm(pad.slice(head32, tail32));
    expect(sec32j).toContain("(PageHeader, KpiCard, EmptyState");
    expect(sec32j).not.toContain("PageCard");
    expect(sec32j).toContain("Transaction, BankAccount");
    expect(sec32j).not.toContain("AccountView");
    expect(skill).toContain("PageHeader, KpiCard, EmptyState");
    expect(skill).not.toContain("StatCard");
  });
});

// ---- F-272k/F-272l: the smoke-ladder counts --------------------------------

describe("F-272k/F-272l — the smoke ladder is 15 assertions everywhere", () => {
  const pad = norm(read("Project_Architecture_Document.md"));
  const skill = norm(read("wealth-os_SKILL.md"));

  it("the PAD §11 row and the skill doc's Appendix D both carry 15 (F-272k/F-272l)", () => {
    expect(pad).toContain("15-assertion");
    expect(pad).not.toContain("14-assertion");
    expect(skill).toContain(", 15 checks)");
    expect(skill).not.toContain(", 14 checks)");
  });
});

// ---- F-272m: the §19 stone-500 arithmetic ----------------------------------

describe("F-272m — the §19 body-text floor carries the computed arithmetic", () => {
  const skill = read("wealth-os_SKILL.md");
  const head = skill.indexOf("## 19. Color Reference");
  const tail = skill.indexOf("## 20. The Complete TypeScript");
  const sec19 = norm(skill.slice(head, tail));

  it("the body floor is stone-600 with the 4.40:1 computation named (F-272m)", () => {
    // stone-500 #78716c on stone-100 #f5f5f4 computes 4.40:1 — the
    // same figure §8 trued at R-68; stone-600 computes 6.99:1.
    expect(sec19).toContain("stone-600");
    expect(sec19).toContain("4.40:1");
    expect(sec19).not.toContain("never below 4.5:1");
  });
});

// ---- F-272p: the PAD §5.2 contrast figures ---------------------------------

describe("F-272p — the PAD §5.2 contrast figures match the computed ratios", () => {
  const pad = norm(read("Project_Architecture_Document.md"));

  it("muted 4.80:1, emerald-700 5.48:1, red-600 4.83:1 (F-272p)", () => {
    expect(pad).toContain("4.80:1 on white");
    expect(pad).toContain("5.48:1");
    expect(pad).toContain("4.83:1");
    expect(pad).not.toContain("4.7:1 on white");
    expect(pad).not.toContain("5.2:1");
    expect(pad).not.toContain("4.5:1 (AA)");
  });
});

// ---- F-272n: the skill doc's line counts (self-verifying) ------------------

describe("F-272n — the skill doc's file-card line counts match the live files", () => {
  const skill = norm(read("wealth-os_SKILL.md"));
  const countLines = (rel: string): number => {
    const content = readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
    // wc -l semantics: trailing newline does not add a line.
    return content.split("\n").length - (content.endsWith("\n") ? 1 : 0);
  };

  const CLAIMS: Array<{ re: RegExp; file: string; label: string }> = [
    { re: /`src\/app\/globals\.css` \((\d+) lines\)/, file: "src/app/globals.css", label: "globals.css" },
    { re: /`src\/lib\/api\.ts`, (\d+) lines\)/, file: "src/lib/api.ts", label: "api.ts" },
    { re: /store \((\d+) lines\)/, file: "src/stores/wealthos-store.ts", label: "the store" },
    { re: /`src\/lib\/finance\.ts` \((\d+) lines/, file: "src/lib/finance.ts", label: "finance.ts" },
    { re: /`prisma\/seed\.ts`, (\d+) lines/, file: "prisma/seed.ts", label: "seed.ts" },
    { re: /`src\/lib\/ai\.ts`, (\d+) lines\)/, file: "src/lib/ai.ts", label: "ai.ts" },
    { re: /`src\/lib\/page-layout\.ts`, (\d+) lines\)/, file: "src/lib/page-layout.ts", label: "page-layout.ts" },
    { re: /`src\/lib\/schemas\.ts`, (\d+) lines,/, file: "src/lib/schemas.ts", label: "schemas.ts" },
  ];

  it("every claimed line count equals the live file's count (F-272n)", () => {
    for (const { re, file, label } of CLAIMS) {
      const m = skill.match(re);
      expect(m, `the ${label} line-count claim was not found in the documented form`).not.toBeNull();
      const claimed = Number(m![1]);
      const actual = countLines(file);
      expect(
        claimed,
        `the ${label} claim says ${claimed} lines; the file holds ${actual}`,
      ).toBe(actual);
    }
  });

  it("the useTheme/useIsDark/useWealthOs anchors point at the real export lines (F-272n)", () => {
    const anchor = (re: RegExp, label: string): number => {
      const m = skill.match(re);
      expect(m, `the ${label} anchor claim was not found`).not.toBeNull();
      return Number(m![1]);
    };
    const realLine = (file: string, needle: string): number => {
      const lines = readFileSync(path.resolve(import.meta.dirname, "..", file), "utf8").split("\n");
      const idx = lines.findIndex((l) => l.includes(needle));
      expect(idx, `${needle} not found in ${file}`).toBeGreaterThan(-1);
      return idx + 1;
    };
    expect(anchor(/`src\/components\/layout\/theme\.tsx:(\d+)`/, "useTheme")).toBe(
      realLine("src/components/layout/theme.tsx", "export function useTheme"),
    );
    expect(anchor(/`src\/components\/layout\/theme\.tsx:(\d+)`\. The/, "useIsDark")).toBe(
      realLine("src/components/layout/theme.tsx", "export function useIsDark"),
    );
    expect(anchor(/`src\/stores\/wealthos-store\.ts:(\d+)`/, "useWealthOs")).toBe(
      realLine("src/stores/wealthos-store.ts", "export const useWealthOs"),
    );
  });
});

// ---- F-272t: the Bun floor -------------------------------------------------

describe("F-272t — the Bun floor rides one family form", () => {
  const pad = norm(read("Project_Architecture_Document.md"));

  it("the PAD toolchain row carries the ≥ 1.3 family form (F-272t)", () => {
    expect(pad).not.toContain("≥1.3.14");
  });
});

// ---- F-272q: the ui glosses ------------------------------------------------

describe("F-272q — the ui-directory glosses tell the wrapping truth", () => {
  const readme = norm(read("README.md"));
  const skill = norm(read("wealth-os_SKILL.md"));

  it("the README tree row names real files, not the phantom input (F-272q)", () => {
    expect(readme).not.toContain("(button, input, tabs");
  });

  it("the skill doc's inventory row carries the honest gloss (F-272q)", () => {
    expect(skill).not.toContain("Radix-wrapped primitives: avatar");
  });
});

// ---- F-272r: the boxText wiring ---------------------------------------------

describe("F-272r — the settings box-text sites ride the SETTINGS_CARD constant", () => {
  const page = read("src/app/(app)/settings/page.tsx");
  const layout = read("src/lib/page-layout.ts");

  it("the constant exists and all three settings sites reference it — no pasted literal (F-272r)", () => {
    // The F-240d divergence-point form: the member is the single
    // source; the three settings sites reference it (the class string
    // is byte-identical, so the DOM is unchanged).
    expect(layout).toContain('boxText: "text-sm text-stone-600 dark:text-stone-400"');
    const refs = page.split("SETTINGS_CARD.boxText").length - 1;
    expect(refs, "the settings page must ride the constant at all three box-text sites").toBe(3);
    expect(page).not.toContain('"text-sm text-stone-600 dark:text-stone-400"');
  });
});
