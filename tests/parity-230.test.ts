import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-230 (R-27): the source-tier pins for the register-and-hygiene
// round. Every pin was born RED over the pre-cure tree (the F-230 ledger
// rows in docs/remediation_plan_v2.md carry the verified evidence, the
// two adjudications included). Source-scanning contracts per the house
// convention: read the file, assert the contract.

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

// ---- F-230a: the StatCard register entry -------------------------------

describe("F-230a — the analytics StatCard joins the WCAG exemption register", () => {
  it("the StatCard docblock carries the register note with the measured arms", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    expect(src).toMatch(/WCAG exemption register/);
    expect(src).toContain("2.24:1");
    expect(src).toContain("3.08:1");
    expect(src).toContain("3.01:1");
    // the large-text value note (the emerald arm's only sub-3:1 side)
    expect(src).toMatch(/2\.54:1 at the emerald-500 side/);
    // the genus citation: the probe that confirmed the reference's own tiles
    expect(src).toContain("probe-230c");
  });

  it("the register is a record, never a recolor — the genus classes stand", () => {
    // The tiles keep the parity genus byte-for-byte (a recolor would
    // deviate from the reference — the F-226i lesson).
    const src = read("src/app/(app)/analytics/page.tsx");
    expect(src).toContain('labelClass="text-emerald-100"');
    expect(src).toContain('labelClass="text-red-100"');
    expect(src).toContain('labelClass="text-blue-100"');
    const layout = read("src/lib/page-layout.ts");
    expect(layout).toContain(
      'emerald: "bg-gradient-to-r from-emerald-500 to-emerald-600"',
    );
  });
});

// ---- F-230c: the lastSyncedAt toDate tidy --------------------------------

describe("F-230c — the accounts lastSyncedAt seam routes through toDate", () => {
  it("the display parse rides toDate (the F-227m doctrine-uniform form)", () => {
    const src = read("src/app/(app)/accounts/page.tsx");
    expect(src).toContain("toDate(account.lastSyncedAt)");
    expect(src).not.toContain("new Date(account.lastSyncedAt)");
    // the import carries the seam
    expect(src).toMatch(/import \{[^}]*\btoDate\b[^}]*\} from "@\/lib\/finance"/);
  });
});

// ---- F-230d: the phantom-breakpoint comment quotes retire ----------------

describe("F-230d — no source quotes the retired phantom-xs construction", () => {
  it("xs:inline-flex appears nowhere under src (comments included)", () => {
    const offenders: string[] = [];
    for (const f of walkSrc(SRC_ROOT)) {
      if (readFileSync(f, "utf8").includes("xs:inline-flex")) {
        offenders.push(path.relative(SRC_ROOT, f));
      }
    }
    expect(
      offenders,
      `files still quoting the retired phantom-breakpoint construction:\n  ${offenders.join("\n  ")}`,
    ).toEqual([]);
  });
});

// ---- F-230e: the ai-coach message-id keys ---------------------------------

describe("F-230e — the ai-coach message list keys by a minted id", () => {
  it("the CoachMessage model carries an id", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    expect(src).toMatch(/interface CoachMessage \{\s*\n\s*id: number;/);
  });

  it("a counter mints ids and the list keys by message.id (the index key is gone)", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    expect(src).toMatch(/nextId\(\)/);
    expect(src).toContain("key={message.id}");
    expect(src).not.toContain("key={i}");
    // the map no longer consumes an index for the key
    expect(src).not.toMatch(/messages\.map\(\(message, i\)/);
  });
});

// ---- F-230f: the card.tsx docblock truth ----------------------------------

describe("F-230f — the card.tsx title docblock names the real mechanism", () => {
  it("no phantom CARD_TITLE_OVERRIDE citation; the className override is named", () => {
    const src = read("src/components/ui/card.tsx");
    expect(src).not.toContain("CARD_TITLE_OVERRIDE");
    expect(src).toMatch(/className override/i);
  });
});
