#!/usr/bin/env python3
"""Session-277 cures (R-74.2) — the blank-row-split, census-scope, and
audit-census round's tree cures.

Every site asserted exactly-once (or the stated count) and scoped to
the row/site it cures (the F-242j doctrine). Resumable by design:
already-healed sites skip; a half-cured shape refuses loudly.

Cures:
  F-277a  the three §2 blank-line table splits (the blank between
          F-224bb→F-225a, F-230h→F-231a, F-240n→F-241a drops)
  F-277b  the §10 advisories row re-anchors to the live 2-advisory
          census with the effect decode + the security-ledger pin
          pair flips same-commit
  F-277c  the api.ts hand-rolled-guards comment rewords to the honest
          twenty-route-file census (the CRM-era URL surfaces retire)
  F-277d  the parity-276 census hardens (fence-aware walker; worklog.md
          joins the DOCS list)

Rider: the SKILL doc's api.ts file-card line count recalibrates to the
reworded file (the F-272n dynamic pin's same-commit ride, the F-247d
precedent)."""

import sys


def fail(msg: str) -> None:
    sys.exit(f"[cures-277] {msg}")


def replace_once(text: str, old: str, new: str, label: str) -> str:
    n = text.count(old)
    if n == 0:
        fail(f"[{label}] site not found — is another cure already landed? {old[:70]!r}")
    if n > 1:
        fail(f"[{label}] expected exactly 1 site, found {n}: {old[:70]!r}")
    return text.replace(old, new, 1)


# ---- F-277a: the three §2 blank-line table splits ------------------------
with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    plan = f.read()

lines = plan.split("\n")


def drop_blank_between(row_a: str, row_b: str) -> None:
    """Remove the single blank line between row_a's line and row_b's."""
    global lines
    idx_a = [i for i, l in enumerate(lines) if l.startswith(row_a)]
    idx_b = [i for i, l in enumerate(lines) if l.startswith(row_b)]
    if len(idx_a) != 1 or len(idx_b) != 1:
        fail(f"[F-277a] row anchors not unique: {row_a!r} x{len(idx_a)}, {row_b!r} x{len(idx_b)}")
    a, b = idx_a[0], idx_b[0]
    if b == a + 1:
        print(f"[F-277a] {row_a.strip()} -> {row_b.strip()} already adjacent (skip)")
        return
    if b != a + 2 or lines[a + 1].strip() != "":
        fail(
            f"[F-277a] unexpected shape between {row_a!r} and {row_b!r}: "
            f"b={b} a={a} mid={lines[a + 1][:60]!r}"
        )
    del lines[a + 1]
    print(f"[F-277a] blank dropped between {row_a.strip()} and {row_b.strip()}")


drop_blank_between("| F-224bb |", "| F-225a |")
drop_blank_between("| F-230h |", "| F-231a |")
drop_blank_between("| F-240n |", "| F-241a |")
plan = "\n".join(lines)

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(plan)

# ---- F-277b: the §10 advisories row re-anchor -----------------------------
with open("Project_Architecture_Document.md", encoding="utf-8") as f:
    pad = f.read()

OLD_CENSUS = "Dev-toolchain advisories census (`bun audit`, re-triaged session 272): 1 advisory: 1 moderate — all dev-toolchain, zero runtime chains | RE-ANCHORED at session 272 (R-69, F-272a):"
NEW_CENSUS = (
    "Dev-toolchain advisories census (`bun audit`, re-triaged session 277): "
    "2 advisories: 1 high / 1 moderate — all dev-toolchain, zero runtime "
    "chains | RE-ANCHORED at session 277 (R-74, F-277b): a NEW dev-chain "
    "HIGH — effect GHSA-7589-6fvf-x4pw (ReDoS in Schema.TemplateLiteral, "
    "affected ≤ 3.22.0) entered npm's audit data against the effect@3.20.0 "
    "the lockfile resolves through @prisma/config@7.10.1's exact pin (the "
    "prisma CLI chain — a devDependency; the RUNTIME @prisma/client chain "
    "is clean, nothing in the shipped standalone artifact); the fix "
    "(> 3.22.0) is unreachable without a prisma/@prisma/config bump while "
    "prisma 7.10.1 is the latest stable (the 8.x line is RC-only), so the "
    "dedicated-dependency-round posture holds — the re-triage duty watches "
    "the parent's releases. RE-ANCHORED at session 272 (R-69, F-272a):"
)
if OLD_CENSUS in pad:
    pad = replace_once(pad, OLD_CENSUS, NEW_CENSUS, "F-277b-census")
    print("[F-277b] the §10 row's census re-anchored to the live 2-advisory form")
elif NEW_CENSUS in pad:
    print("[F-277b] the §10 row already carries the new census (skip)")
else:
    fail("[F-277b] the §10 row's census site not found in either form")

OLD_ACCEPTED = "Accepted (re-triaged session 272; cured floors pinned:"
NEW_ACCEPTED = "Accepted (re-triaged session 277; cured floors pinned:"
if OLD_ACCEPTED in pad:
    pad = replace_once(pad, OLD_ACCEPTED, NEW_ACCEPTED, "F-277b-accepted")
    print("[F-277b] the Accepted cell's re-triage date advanced to session 277")
elif NEW_ACCEPTED in pad:
    print("[F-277b] the Accepted cell already at session 277 (skip)")
else:
    fail("[F-277b] the Accepted cell not found in either form")

with open("Project_Architecture_Document.md", "w", encoding="utf-8") as f:
    f.write(pad)

# ---- F-277b (pin): the security-ledger pin pair flips ---------------------
with open("tests/security-ledger.test.ts", encoding="utf-8") as f:
    sl = f.read()

OLD_COMMENT_TAIL = """// the re-triage duty watches the advisory's return. The minimatch
    // moderate (range-unreachable until typescript-estree moves)
    // stands unchanged.
"""
NEW_COMMENT_TAIL = """// the re-triage duty watches the advisory's return. The minimatch
    // moderate (range-unreachable until typescript-estree moves)
    // stands unchanged. Session-277 (R-74, F-277b): the census
    // re-anchored 1 → 2 — a NEW dev-chain HIGH (effect
    // GHSA-7589-6fvf-x4pw, ReDoS in Schema.TemplateLiteral, affected
    // ≤ 3.22.0) entered npm's audit data against the effect@3.20.0
    // the lockfile resolves through @prisma/config@7.10.1's exact
    // pin (the prisma CLI chain — a devDependency; the RUNTIME
    // @prisma/client chain is clean); the fix is unreachable without
    // a prisma bump and 7.10.1 is the latest stable, so the
    // dedicated-dependency-round posture holds and the re-triage duty
    // watches the parent's releases.
"""
if OLD_COMMENT_TAIL in sl:
    sl = replace_once(sl, OLD_COMMENT_TAIL, NEW_COMMENT_TAIL, "F-277b-comment")
    print("[F-277b] the ledger pin's comment trail carries the session-277 decode")
elif NEW_COMMENT_TAIL in sl:
    print("[F-277b] the comment decode already landed (skip)")
else:
    fail("[F-277b] the comment trail site not found in either form")

OLD_PINS = """expect(pad).toContain("1 advisory: 1 moderate — all dev-toolchain, zero runtime chains");
    expect(pad).not.toContain("2 advisories: 1 high / 1 moderate");
"""
NEW_PINS = """expect(pad).toContain(
      "2 advisories: 1 high / 1 moderate — all dev-toolchain, zero runtime chains",
    );
    expect(pad).not.toContain("1 advisory: 1 moderate — all dev-toolchain, zero runtime chains");
    expect(pad).toContain("GHSA-7589-6fvf-x4pw");
"""
if OLD_PINS in sl:
    sl = replace_once(sl, OLD_PINS, NEW_PINS, "F-277b-pins")
    print("[F-277b] the pin pair flipped to the two-advisory census (the effect GHSA named)")
elif NEW_PINS in sl:
    print("[F-277b] the pin pair already flipped (skip)")
else:
    fail("[F-277b] the pin pair site not found in either form")

with open("tests/security-ledger.test.ts", "w", encoding="utf-8") as f:
    f.write(sl)

# ---- F-277c: the api.ts guards comment's honest census --------------------
with open("src/lib/api.ts", encoding="utf-8") as f:
    api = f.read()

OLD_COMMENT = """// ---- hand-rolled validation helpers (the query-param GET family + the -----
// behavior battery — the CRUD body-guard forms RETIRED at session-166:
// the twelve body routes ride parseBody/safeParse against
// src/lib/schemas.ts now; asString/asDate survive on the URL-param
// surfaces — events' from/to windows, the reports/export/search
// period+q parses — and the isBad*/asFKId/asNumber/asInt predicates
// stay exported for their pure-function battery,
// tests/coercion-guards.test.ts, the living record of the semantics
// the schema field-builders recast)
"""
NEW_COMMENT = """// ---- hand-rolled validation helpers (the query-param GET family + the -----
// behavior battery — the CRUD body-guard forms RETIRED at session-166
// (twelve body routes then). Session-277 (R-74, F-277c) re-counted
// the family: TWENTY route files ride parseBody/safeParse against
// src/lib/schemas.ts now — the six auth-family POSTs, the twelve
// sessioned CRUD files, and import + the AI coach with their own
// ceilings; reset and users ride readBoundedJson directly at the
// same gate. asString survives on exactly ONE URL-param surface —
// search's q parse — while asDate has zero live route consumers
// (tests/coercion-guards.test.ts keeps its semantics pinned); the
// isBad*/asFKId/asNumber/asInt predicates stay exported for that
// pure-function battery, the living record of the semantics the
// schema field-builders recast)
"""
if OLD_COMMENT in api:
    api = replace_once(api, OLD_COMMENT, NEW_COMMENT, "F-277c")
    print("[F-277c] the guards comment reworded to the twenty-route-file truth")
elif NEW_COMMENT in api:
    print("[F-277c] the guards comment already reworded (skip)")
else:
    fail("[F-277c] the guards comment not found in either form")

with open("src/lib/api.ts", "w", encoding="utf-8") as f:
    f.write(api)

api_lines = api.split("\n")
api_count = len(api_lines) - (1 if api.endswith("\n") else 0)

# ---- F-277c rider: the SKILL file-card recalibration ---------------------
with open("wealth-os_SKILL.md", encoding="utf-8") as f:
    skill = f.read()

old_card = "(`src/lib/api.ts`, 451 lines)."
new_card = f"(`src/lib/api.ts`, {api_count} lines)."
if old_card in skill:
    skill = replace_once(skill, old_card, new_card, "F-277c-card")
    print(f"[F-277c] the SKILL file-card recalibrated 451 → {api_count} (the F-272n ride)")
elif new_card in skill:
    print(f"[F-277c] the SKILL file-card already at {api_count} (skip)")
else:
    fail(f"[F-277c] the SKILL file-card not found at 451 or {api_count}")

with open("wealth-os_SKILL.md", "w", encoding="utf-8") as f:
    f.write(skill)

# ---- F-277d: the parity-276 census hardens -------------------------------
with open("tests/parity-276.test.ts", encoding="utf-8") as f:
    p276 = f.read()

OLD_CENSUS_BLOCK = """    // The structural cure (the F-245c/F-249b tradition — pin the
    // invariant, not the enumeration): a data row whose unescaped
    // pipe count deviates from its table header's count splits cells
    // in GFM. The census walks every table in the six-file doc set and
    // fails on any offender — future rows must escape their in-cell
    // pipes or update this pin with a stated reason.
    const DOCS = [
      "docs/remediation_plan_v2.md",
      "README.md",
      "AGENTS.md",
      "CLAUDE.md",
      "wealth-os_SKILL.md",
      "Project_Architecture_Document.md",
    ] as const;
    const offenders: string[] = [];
    for (const rel of DOCS) {
      const lines = read(rel).split("\\n");
"""
NEW_CENSUS_BLOCK = """    // The structural cure (the F-245c/F-249b tradition — pin the
    // invariant, not the enumeration): a data row whose unescaped
    // pipe count deviates from its table header's count splits cells
    // in GFM. The census walks every table in the seven-file doc set
    // and fails on any offender — future rows must escape their
    // in-cell pipes or update this pin with a stated reason.
    // Session-277 (R-74, F-277d) hardened the census on two gaps:
    // pipe-prefixed lines inside fenced code blocks are CODE, never
    // table rows (stripFences toggles the fence state at every fence
    // line and blanks the fenced lines before the walk), and
    // worklog.md — the seventh living doc — joins the DOCS list.
    const DOCS = [
      "docs/remediation_plan_v2.md",
      "README.md",
      "AGENTS.md",
      "CLAUDE.md",
      "wealth-os_SKILL.md",
      "Project_Architecture_Document.md",
      "worklog.md",
    ] as const;
    // Fence-awareness (F-277d): fence lines toggle the state; lines
    // inside a fence read as blanks to the walk.
    const stripFences = (text: string): string[] => {
      const out: string[] = [];
      let fence = false;
      for (const raw of text.split("\\n")) {
        if (raw.startsWith("```")) {
          fence = !fence;
          out.push("");
          continue;
        }
        out.push(fence ? "" : raw);
      }
      return out;
    };
    const offenders: string[] = [];
    for (const rel of DOCS) {
      const lines = stripFences(read(rel));
"""
if OLD_CENSUS_BLOCK in p276:
    p276 = replace_once(p276, OLD_CENSUS_BLOCK, NEW_CENSUS_BLOCK, "F-277d-docs")
    print("[F-277d] the parity-276 census hardened (fence-aware; worklog.md joined)")
elif NEW_CENSUS_BLOCK in p276:
    print("[F-277d] the census already hardened (skip)")
else:
    fail("[F-277d] the census block not found in either form")

with open("tests/parity-276.test.ts", "w", encoding="utf-8") as f:
    f.write(p276)

print("[cures-277] all cures landed; api.ts now", api_count, "lines")
