#!/usr/bin/env python3
"""Session-279 cures — R-76.2 (the walker-unification, cell-count, and
indented-fence round).

Eight cure sites across five files, every one asserted exactly-once,
the script RESUMABLE (the F-242j doctrine: a half-cured shape refuses
loudly, an already-healed site skips):

  1. tests/parity-276.test.ts  the delimiter predicate unifies to the
                                colon-tolerant shared shape (F-279a)
                                + the hoisted isDelimiter/unescapedPipes
                                helpers + the cell-count comparison in
                                the walk (F-279b)
  2. tests/parity-276.test.ts  the fence stripper admits indented
                                list-item fences (F-279c)
  3. tests/parity-277.test.ts  the hoisted unescapedPipes helper + the
                                orphan census's cell-count else arm
                                (F-279b)
  4. tests/parity-277.test.ts  the fence stripper hardening (F-279c)
  5. tests/parity-278.test.ts  the orphan census's cell-count else arm
                                (F-279b)
  6. tests/parity-278.test.ts  the fence stripper hardening (F-279c)
  7. src/lib/finance.ts        the instant-vs-calendar comment rider
                                at the tiebreak (F-279d)
  8. src/lib/verification.ts   the instant-vs-calendar comment rider
                                at the pending check (F-279d)

ZERO application behavior changed: three test files' walkers and two
source comments (the comments name correct standing semantics; no
code path moves)."""

import sys


def heal(text: str, old: str, new: str, label: str, fname: str) -> str:
    """Replace exactly-once; resume if already healed; refuse ambiguity."""
    if new in text and old not in text:
        print(f"  [skip] {fname}: {label} already healed")
        return text
    n = text.count(old)
    if n != 1:
        sys.exit(f"[{label}] {fname}: expected exactly 1 old form, found {n}")
    if text.count(new) != 0:
        sys.exit(f"[{label}] {fname}: the new form already present alongside the old")
    print(f"  [cure] {fname}: {label}")
    return text.replace(old, new, 1)


# ---- 1. parity-276: the unified delimiter predicate + helpers -----------
with open("tests/parity-276.test.ts", encoding="utf-8") as f:
    t = f.read()

OLD_HELPERS_ANCHOR = r"""const isPipeRow = (l: string) => /^ {0,3}\|/.test(l);

// ---- F-276a: the §5 execution-history table renders as a table -----------"""
NEW_HELPERS = r"""const isPipeRow = (l: string) => /^ {0,3}\|/.test(l);

// The delimiter-row shape a GFM table's second line must carry — the
// colon-tolerant form (session 279, R-76, F-279a: alignment colons
// are legal GFM delimiters; the parity-277/278 sibling shape unified
// here — the colon-blind inline form walked the evaluation report's
// sixteen colon-aligned delimiter rows as DATA rows, green only
// because each carried its header's pipe count).
const isDelimiter = (l: string): boolean => /^\s*\|[\s:|-]+\|\s*$/.test(l);

// The unescaped-pipe count helper (session 279, R-76, F-279b): the
// delimiter row's cell count must be COMPARED against the header's,
// never merely skipped — GFM renders no table when the counts
// mismatch.
const unescapedPipes = (l: string): number =>
  l.replace(/\\\|/g, "").split("|").length - 1;

// ---- F-276a: the §5 execution-history table renders as a table -----------"""
if "const isDelimiter" in t:
    print("  [skip] tests/parity-276.test.ts: the unified helpers already healed")
else:
    t = heal(
        t,
        OLD_HELPERS_ANCHOR,
        NEW_HELPERS,
        "the unified delimiter predicate + the count helper",
        "tests/parity-276.test.ts",
    )

OLD_WALK = r"""        if (/^ {0,3}\|[-| ]+\|$/.test(line)) continue; // the delimiter row
        const unescaped = line.replace(/\\\|/g, "").split("|").length - 1;"""
NEW_WALK = r"""        if (isDelimiter(line)) {
          // Session-279 (R-76, F-279a/F-279b): the unified
          // colon-tolerant predicate skips the delimiter row — and
          // the skip COMPARES, never merely skips (GFM renders no
          // table when the delimiter's cell count mismatches the
          // header's — the render-killing genus).
          if (headerCount !== null && unescapedPipes(line) !== headerCount) {
            offenders.push(`${rel}:${i + 1} delim=${unescapedPipes(line)} header=${headerCount}`);
          }
          continue; // the delimiter row
        }
        const unescaped = unescapedPipes(line);"""
t = heal(
    t,
    OLD_WALK,
    NEW_WALK,
    "the walk's delimiter unification + cell-count comparison",
    "tests/parity-276.test.ts",
)

# ---- 2. parity-276: the fence stripper hardening -------------------------
OLD_FENCE_276 = """    // Fence-awareness (F-277d): fence lines toggle the state; lines
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
    };"""
NEW_FENCE_276 = """    // Fence-awareness (F-277d, hardened session 279, R-76, F-279c):
    // a fence line at up to three leading spaces (GFM's list-item
    // fences) toggles the state — an indented fence line inside an
    // outer fence stays content unless its indent does not exceed
    // the opener's; lines inside a fence read as blanks to the walk.
    const stripFences = (text: string): string[] => {
      const out: string[] = [];
      let fence = false;
      let opener = 0;
      for (const raw of text.split("\\n")) {
        const m = /^( {0,3})```/.exec(raw);
        if (m) {
          if (!fence) {
            fence = true;
            opener = (m[1] ?? "").length;
            out.push("");
            continue;
          }
          if ((m[1] ?? "").length <= opener) fence = false;
          out.push("");
          continue;
        }
        out.push(fence ? "" : raw);
      }
      return out;
    };"""
t = heal(
    t,
    OLD_FENCE_276,
    NEW_FENCE_276,
    "the fence stripper's indented-fence hardening",
    "tests/parity-276.test.ts",
)

with open("tests/parity-276.test.ts", "w", encoding="utf8") as f:
    f.write(t)

# ---- 3. parity-277: the count helper + the orphan census's else arm ------
with open("tests/parity-277.test.ts", encoding="utf8") as f:
    t = f.read()

OLD_277_HELPER_ANCHOR = r"""const isPipeRow = (l: string) => /^ {0,3}\|/.test(l);

// ---- F-277a: the §2 ledger's tables render as tables --------------------"""
NEW_277_HELPER = r"""const isPipeRow = (l: string) => /^ {0,3}\|/.test(l);

// The unescaped-pipe count helper (session 279, R-76, F-279b): the
// orphan census's shape check gains the cell-count comparison — a
// delimiter-shaped second row alone does not make a table when its
// cell count mismatches the header's.
const unescapedPipes = (l: string): number =>
  l.replace(/\\\|/g, "").split("|").length - 1;

// ---- F-277a: the §2 ledger's tables render as tables --------------------"""
if "const unescapedPipes" in t:
    print("  [skip] tests/parity-277.test.ts: the count helper already healed")
else:
    t = heal(
        t,
        OLD_277_HELPER_ANCHOR,
        NEW_277_HELPER,
        "the unescapedPipes helper",
        "tests/parity-277.test.ts",
    )

OLD_ORPHAN_277 = """          if (block.length < 2 || !isDelimiter(block[1] as string)) {
            offenders.push(`${rel}:${i + 1}..${j} (${block.length} lines)`);
          }"""
NEW_ORPHAN_277 = """          if (block.length < 2 || !isDelimiter(block[1] as string)) {
            offenders.push(`${rel}:${i + 1}..${j} (${block.length} lines)`);
          } else if (unescapedPipes(block[0] as string) !== unescapedPipes(block[1] as string)) {
            // Session-279 (R-76, F-279b): GFM renders no table when
            // the delimiter's cell count mismatches the header's —
            // the shape check alone cannot catch the render-killing
            // genus.
            offenders.push(
              `${rel}:${i + 1} header=${unescapedPipes(block[0] as string)} delim=${unescapedPipes(block[1] as string)}`,
            );
          }"""
if "else if (unescapedPipes(block[0] as string)" in t:
    print("  [skip] tests/parity-277.test.ts: the orphan census's cell-count else arm already healed")
else:
    t = heal(
        t,
        OLD_ORPHAN_277,
        NEW_ORPHAN_277,
        "the orphan census's cell-count else arm",
        "tests/parity-277.test.ts",
    )

# ---- 4. parity-277: the fence stripper hardening --------------------------
OLD_FENCE_277 = """// Strip fenced code blocks (the F-277d fence-awareness): a line that
// starts a ``` fence toggles the fence state; lines inside a fence
// are CODE, never table rows.
function stripFences(text: string): string[] {
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
}"""
NEW_FENCE_277 = """// Strip fenced code blocks (the F-277d fence-awareness, hardened
// session 279, R-76, F-279c): a fence line at up to three leading
// spaces (GFM's list-item fences) toggles the fence state — an
// indented fence line inside an outer fence stays content unless its
// indent does not exceed the opener's; lines inside a fence are
// CODE, never table rows.
function stripFences(text: string): string[] {
  const out: string[] = [];
  let fence = false;
  let opener = 0;
  for (const raw of text.split("\\n")) {
    const m = /^( {0,3})```/.exec(raw);
    if (m) {
      if (!fence) {
        fence = true;
        opener = (m[1] ?? "").length;
        out.push("");
        continue;
      }
      if ((m[1] ?? "").length <= opener) fence = false;
      out.push("");
      continue;
    }
    out.push(fence ? "" : raw);
  }
  return out;
}"""
t = heal(
    t,
    OLD_FENCE_277,
    NEW_FENCE_277,
    "the fence stripper's indented-fence hardening",
    "tests/parity-277.test.ts",
)

with open("tests/parity-277.test.ts", "w", encoding="utf8") as f:
    f.write(t)

# ---- 5. parity-278: the orphan census's cell-count else arm --------------
with open("tests/parity-278.test.ts", encoding="utf8") as f:
    t = f.read()

OLD_ORPHAN_278 = """          if (block.length < 2 || !isDelimiter(block[1] as string)) {
            offenders.push(`${rel}:${i + 1}..${j} (${block.length} lines)`);
          }"""
NEW_ORPHAN_278 = """          if (block.length < 2 || !isDelimiter(block[1] as string)) {
            offenders.push(`${rel}:${i + 1}..${j} (${block.length} lines)`);
          } else if (unescapedPipes(block[0] as string) !== unescapedPipes(block[1] as string)) {
            // Session-279 (R-76, F-279b): GFM renders no table when
            // the delimiter's cell count mismatches the header's —
            // the shape check alone cannot catch the render-killing
            // genus.
            offenders.push(
              `${rel}:${i + 1} header=${unescapedPipes(block[0] as string)} delim=${unescapedPipes(block[1] as string)}`,
            );
          }"""
if "else if (unescapedPipes(block[0] as string)" in t:
    print("  [skip] tests/parity-278.test.ts: the orphan census's cell-count else arm already healed")
else:
    t = heal(
        t,
        OLD_ORPHAN_278,
        NEW_ORPHAN_278,
        "the orphan census's cell-count else arm",
        "tests/parity-278.test.ts",
    )

# ---- 6. parity-278: the fence stripper hardening --------------------------
OLD_FENCE_278 = """// Fence-awareness (the F-277d form): a line that starts a ```
// fence toggles the fence state; lines inside a fence are CODE,
// never table rows.
function stripFences(text: string): string[] {
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
}"""
NEW_FENCE_278 = """// Fence-awareness (the F-277d form, hardened session 279, R-76,
// F-279c): a fence line at up to three leading spaces (GFM's
// list-item fences) toggles the fence state — an indented fence line
// inside an outer fence stays content unless its indent does not
// exceed the opener's; lines inside a fence are CODE, never table
// rows.
function stripFences(text: string): string[] {
  const out: string[] = [];
  let fence = false;
  let opener = 0;
  for (const raw of text.split("\\n")) {
    const m = /^( {0,3})```/.exec(raw);
    if (m) {
      if (!fence) {
        fence = true;
        opener = (m[1] ?? "").length;
        out.push("");
        continue;
      }
      if ((m[1] ?? "").length <= opener) fence = false;
      out.push("");
      continue;
    }
    out.push(fence ? "" : raw);
  }
  return out;
}"""
t = heal(
    t,
    OLD_FENCE_278,
    NEW_FENCE_278,
    "the fence stripper's indented-fence hardening",
    "tests/parity-278.test.ts",
)

with open("tests/parity-278.test.ts", "w", encoding="utf8") as f:
    f.write(t)

# ---- 7. finance.ts: the instant-vs-calendar comment rider ---------------
with open("src/lib/finance.ts", encoding="utf8") as f:
    t = f.read()

OLD_FIN = """    // The stable tiebreak chain: createdAt desc (the API's own), then
    // the description — deterministic across equal-key rows whatever
    // the field and direction."""
NEW_FIN = """    // The stable tiebreak chain: createdAt desc (the API's own), then
    // the description — deterministic across equal-key rows whatever
    // the field and direction. (createdAt is a timestamp instant —
    // the raw parse is the CORRECT semantics here; routing it
    // through toDate would re-anchor a midnight-exact instant to
    // local midnight and mis-sort — the F-228c identity lesson.)"""
if "is a timestamp instant" in t:
    print("  [skip] src/lib/finance.ts: the tiebreak's comment already healed")
else:
    t = heal(
        t,
        OLD_FIN,
        NEW_FIN,
        "the tiebreak's instant-vs-calendar comment",
        "src/lib/finance.ts",
    )

with open("src/lib/finance.ts", "w", encoding="utf8") as f:
    f.write(t)

# ---- 8. verification.ts: the instant-vs-calendar comment rider -----------
with open("src/lib/verification.ts", encoding="utf8") as f:
    t = f.read()

OLD_VER = """/**
 * True when a stored expiry timestamp (epoch ms) is still in the future.
 * A null expiry (pre-session-21 rows, the seeded demo users) means
 * "no verification required" — the account predates the flow.
 */"""
NEW_VER = """/**
 * True when a stored expiry timestamp (epoch ms) is still in the future.
 * A null expiry (pre-session-21 rows, the seeded demo users) means
 * "no verification required" — the account predates the flow.
 * (expiresAt is a timestamp instant — the raw parse is the CORRECT
 * form here; routing it through toDate would re-anchor a
 * midnight-exact instant to local midnight — the F-228c identity
 * lesson.)
 */"""
if "is a timestamp instant" in t:
    print("  [skip] src/lib/verification.ts: the pending check's comment already healed")
else:
    t = heal(
        t,
        OLD_VER,
        NEW_VER,
        "the pending check's instant-vs-calendar comment",
        "src/lib/verification.ts",
    )

with open("src/lib/verification.ts", "w", encoding="utf8") as f:
    f.write(t)

# ---- 9. parity-277: the F-277d leg's same-commit recalibration -----------
# The standing F-277d leg pins the OLD toggle fragment in parity-276's
# stripper; the hardening graduated the toggle to the opener-indent
# tracker — the contract-change doctrine (F-243b) requires the pin's
# recalibration in the SAME commit, with the rationale recorded at the
# pin.
with open("tests/parity-277.test.ts", encoding="utf8") as f:
    t = f.read()

OLD_277D_PIN = """    // pseudo-header or mask a deviation. The hardened census toggles
    // a fence state at every ``` line and skips fenced lines; the
    // source pin holds the cure's own code shape (a future revert
    // drops the toggle and fails here).
    expect(census).toContain("fence = !fence");
    expect(census).toContain("stripFences");"""
NEW_277D_PIN = """    // pseudo-header or mask a deviation. The hardened census toggles
    // a fence state at every ``` line and skips fenced lines; the
    // source pin holds the cure's own code shape (a future revert
    // drops the toggle and fails here).
    // Session-279 (R-76, F-279c) recalibration: the toggle's form
    // graduated from the bare alternation to the opener-indent tracker
    // (the indented list-item fences admitted) — the pin holds the
    // hardened form's own fragment, the same-commit recalibration
    // the contract-change doctrine requires.
    expect(census).toContain("let opener = 0;");
    expect(census).toContain("stripFences");"""
if 'let opener = 0;");' in t and 'fence = !fence");' not in t:
    print("  [skip] tests/parity-277.test.ts: the F-277d leg's recalibration already healed")
else:
    t = heal(
        t,
        OLD_277D_PIN,
        NEW_277D_PIN,
        "the F-277d leg's same-commit recalibration",
        "tests/parity-277.test.ts",
    )

with open("tests/parity-277.test.ts", "w", encoding="utf8") as f:
    f.write(t)

print("[cures-279] all nine sites cured (or verified healed) — zero application behavior changed.")
