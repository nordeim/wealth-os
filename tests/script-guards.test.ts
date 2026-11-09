import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-215 (R-12, F-215l — the script-guard doctrine's fifth
// member): the F-210c lesson ("a guard a sibling's filename can
// satisfy is not a guard") cured the four capture tools to the EXACT
// basename form — but scripts/prisma-env.ts kept the suffix form
// (`endsWith("prisma-env.ts")`). No sibling collides today; the pin
// keeps it that way by freezing the exact form.

const ROOT = path.resolve(import.meta.dirname, "..");
const GUARDED_TOOLS = [
  "sweep.ts",
  "fullpage-sweep.ts",
  "interior-census.ts",
  "drift-probe.ts",
  "prisma-env.ts",
] as const;

describe("R-12: every direct-execution guard is the exact-basename form (F-210c)", () => {
  for (const tool of GUARDED_TOOLS) {
    it(`${tool}: path.basename match, never the suffix form`, () => {
      const src = readFileSync(path.join(ROOT, "scripts", tool), "utf-8");
      // The house form (the four capture tools' own cure): optionally
      // guarded by argv[1] truthiness, then the EXACT basename compare.
      expect(src).toMatch(
        new RegExp(
          `(?:process\\.argv\\[1\\]\\s*&&\\s*)?path\\.basename\\(process\\.argv\\[1\\](?:\\s*\\?\\?\\s*"")?\\)\\s*===\\s*"${tool.replace(/\./g, "\\.")}"`,
        ),
      );
      expect(src).not.toMatch(/argv\[1\]\?\.endsWith\(/);
    });
  }
});
