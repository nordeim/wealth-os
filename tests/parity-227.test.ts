import { existsSync, lstatSync, readFileSync, readlinkSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-227 (R-24): the source-tier pins for the build-gate repair
// and wrong-row identity round. Every pin was born RED over the
// pre-cure tree (the F-227 ledger rows in docs/remediation_plan_v2.md
// carry the evidence: F-227a's build exit 1 at HEAD, F-227b's
// live-reproduced wrong-row Edit prefill). Source-scanning contracts
// per the house convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

const ROOT = path.resolve(import.meta.dirname, "..");

// The five [id] resource families — the F-227c conditional-mutation
// round's full site list (PUT + DELETE on each).
const ID_ROUTES = [
  { file: "src/app/api/transactions/[id]/route.ts", model: "transaction" },
  { file: "src/app/api/accounts/[id]/route.ts", model: "bankAccount" },
  { file: "src/app/api/income-sources/[id]/route.ts", model: "incomeSource" },
  { file: "src/app/api/investments/[id]/route.ts", model: "investment" },
  { file: "src/app/api/goals/[id]/route.ts", model: "goal" },
] as const;

// ---- F-227a: the docs/worklog.md alias resolves (no symlink loop) ----------

describe("F-227a — the docs/worklog.md alias resolves to the canonical root log", () => {
  it("reading the alias succeeds and serves the root worklog's content", () => {
    const alias = path.join(ROOT, "docs/worklog.md");
    expect(existsSync(alias)).toBe(true);
    // The loop guard IS the read: a self-referential symlink throws
    // ELOOP here (the build-break the cold baseline caught at HEAD
    // 3bd0255 — Turbopack's DirAssetReference walked the loop).
    const viaAlias = readFileSync(alias, "utf8");
    const canonical = readFileSync(path.join(ROOT, "worklog.md"), "utf8");
    expect(viaAlias).toBe(canonical);
  });

  it("the alias points OUT of docs/ (a target inside docs/ is the loop shape)", () => {
    const alias = path.join(ROOT, "docs/worklog.md");
    const stat = lstatSync(alias);
    if (stat.isSymbolicLink()) {
      // A relative target resolves from the link's OWN directory —
      // "worklog.md" from docs/ resolves to docs/worklog.md itself
      // (the F-227a loop). The honest target escapes docs/ first.
      const target = readlinkSync(alias);
      expect(target.startsWith("../")).toBe(true);
    }
  });
});

// ---- F-227b: the holdings identity cure -------------------------------------

describe("F-227b — the investments holdings table resolves rows by id", () => {
  it("the portfolioStats seam carries the id onto each holdings row", () => {
    const src = read("src/lib/finance.ts");
    expect(src).toMatch(/id: i\.id \?\? ""/);
  });

  it("the holdings table keys rows by row.id (never by symbol)", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    expect(src).toMatch(/<tr key=\{row\.id\}/);
    expect(src).not.toMatch(/<tr key=\{row\.symbol\}/);
  });

  it("the row actions resolve the target by id (never by symbol)", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    expect(src).toMatch(/investments\.find\(\(i\) => i\.id === row\.id\)/);
    expect(src).not.toMatch(/investments\.find\(\(i\) => i\.symbol === row\.symbol\)/);
  });
});

// ---- F-227c: the [id] mutations are atomic conditional writes ---------------

describe("F-227c — every [id] PUT/DELETE carries ownerId in the mutation's WHERE", () => {
  it.each(ID_ROUTES)(
    "$model PUT: updateMany with ownerId in the WHERE, count===0 answers NOT_FOUND",
    ({ file, model }) => {
      const src = read(file);
      expect(src, file).toMatch(
        new RegExp(`db\\.${model}\\.updateMany\\(\\{[\\s\\S]*?where: \\{ id, ownerId: guard\\.user\\.id \\}`),
      );
      expect(src, file).toMatch(/count === 0/);
      expect(src, file).toMatch(/ERR\.NOT_FOUND\(\)/);
      // The bare-id update (the TOCTOU shape) is gone.
      expect(src, file).not.toMatch(new RegExp(`db\\.${model}\\.update\\(\\{`));
    },
  );

  it.each(ID_ROUTES)("$model DELETE: deleteMany with ownerId in the WHERE", ({ file, model }) => {
    const src = read(file);
    expect(src, file).toMatch(
      new RegExp(`db\\.${model}\\.deleteMany\\(\\{[\\s\\S]*?where: \\{ id, ownerId: guard\\.user\\.id \\}`),
    );
    expect(src, file).toMatch(/count === 0/);
    expect(src, file).not.toMatch(new RegExp(`db\\.${model}\\.delete\\(\\{`));
  });
});

// ---- F-227l: the transactions account-link FK violation answers 400 ---------

describe("F-227l — the account-link FK race answers BAD_REQUEST, never INTERNAL", () => {
  it("db.ts exports the P2003 seam", () => {
    const src = read("src/lib/db.ts");
    expect(src).toMatch(/export function isForeignKeyViolation/);
    expect(src).toMatch(/P2003/);
  });

  it("the transactions POST and PUT catch arms carry the FK arm", () => {
    for (const f of [
      "src/app/api/transactions/route.ts",
      "src/app/api/transactions/[id]/route.ts",
    ]) {
      const src = read(f);
      expect(src, f).toMatch(/isForeignKeyViolation\(/);
      expect(src, f).toMatch(/ERR\.BAD_REQUEST\("Selected account does not exist"\)/);
    }
  });
});

// ---- F-227d: the artifact excludes the repo's own skill doc -----------------

describe("F-227d — wealth-os_SKILL.md joins the artifact-hygiene excludes", () => {
  it("next.config.ts excludes wealth-os_SKILL.md from the standalone artifact", () => {
    const src = read("next.config.ts");
    expect(src).toMatch(/"wealth-os_SKILL\.md"/);
  });
});

// ---- F-227e: the investments Edit row-context sr-only tail ------------------

describe("F-227e — the investments Edit button carries the row context", () => {
  it("the Edit button's sr-only tail names the row (mirroring its tailed Delete)", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    expect(src).toMatch(/Edit\s*\n\s*<span className="sr-only">\{row\.symbol\}<\/span>/);
  });
});

// ---- F-227f: the destructive variants' measured-value citations -------------

describe("F-227f — the latent destructive variants cite their measured contrast", () => {
  it("Button's destructive variant carries the citation", () => {
    const src = read("src/components/ui/button.tsx");
    expect(src).toMatch(/destructive: "bg-danger text-white/);
    expect(src).toMatch(/3\.76:1/);
  });

  it("Badge's destructive variant carries the citation", () => {
    const src = read("src/components/ui/badge.tsx");
    expect(src).toMatch(/destructive: "border-transparent bg-danger text-neutral-50/);
    expect(src).toMatch(/3\.7[0-9]:1|3\.76:1/);
  });
});

// ---- F-227m: the analytics range filter routes through toDate ---------------

describe("F-227m — the analytics range filter never parses stored dates raw", () => {
  it("the inRange seam routes all three parses through toDate", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    // Scope to the inRange seam: the export table's ISO formatter
    // (new Date(t.date).toISOString().slice(0, 10)) is the deliberate
    // UTC-space exception — toDate would shift it a day in eastern
    // zones; the doctrine's raw-parse ban is about LOCAL-accessor
    // reads, and this seam's comparisons are the F-219e family.
    const seamStart = src.indexOf("const inRange");
    const depsStart = src.indexOf("[txs, from, to]", seamStart);
    const seam = src.slice(seamStart, depsStart);
    expect(seamStart).toBeGreaterThan(0);
    expect(depsStart).toBeGreaterThan(seamStart);
    expect(seam).toContain("toDate(t.date)");
    expect(seam).toContain("toDate(from)");
    expect(seam).toContain("toDate(to)");
    expect(seam).not.toMatch(/new Date\(/);
  });
});

// ---- F-227n: the dead radius tokens retire ----------------------------------

describe("F-227n — the dead radius tokens are retired from @theme", () => {
  it("globals.css defines none of --radius-card/--radius-button/--radius-pill", () => {
    const src = read("src/app/globals.css");
    expect(src).not.toMatch(/--radius-card/);
    expect(src).not.toMatch(/--radius-button/);
    expect(src).not.toMatch(/--radius-pill/);
  });
});
