#!/usr/bin/env python3
# The docs-262 lockstep tail: the guard trio's THIRTEENTH advance (the
# script's first pass consumed every earlier edit; the trio's OLD anchor
# is the CURRENT v2.56.0/v2.57.0/v2.58.0 form).
def edit(path, old, new, count=1):
    src = open(path, encoding="utf-8").read()
    assert src.count(old) == count, f"{path}: anchor x{src.count(old)} (expected {count}): {old[:70]!r}"
    open(path, "w", encoding="utf-8").write(src.replace(old, new, count))
    print(f"  ok {path}: {old[:52]!r}")

edit("tests/docs-counts.test.ts",
     "    expect(p).toMatch(/\\[SR\\] v2\\.56\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1779 unit \\(111 files, \\+17\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.57\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1789 unit \\(112 files, \\+10\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.58\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1800 unit \\(113 files, \\+11\\)/);",
     "    expect(p).toMatch(/\\[SR\\] v2\\.57\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1789 unit \\(112 files, \\+10\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.58\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1800 unit \\(113 files, \\+11\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.59\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1814 unit \\(114 files, \\+14\\)/);")

edit("tests/docs-counts.test.ts",
     "    // Session-261 (R-58): the TWELFTH gate-enforced ride — the\n    // v2.58.0 block lands together with the trio's advance to\n    // v2.56.0/v2.57.0/v2.58.0 (the v2.55.0 pin ages out).",
     "    // Session-261 (R-58): the TWELFTH gate-enforced ride — the\n    // v2.58.0 block lands together with the trio's advance to\n    // v2.56.0/v2.57.0/v2.58.0 (the v2.55.0 pin ages out).\n    // Session-262 (R-59): the THIRTEENTH gate-enforced ride — the\n    // v2.59.0 block lands together with the trio's advance to\n    // v2.57.0/v2.58.0/v2.59.0 (the v2.56.0 pin ages out).")

print("docs-262 lockstep tail complete (the guard trio's thirteenth advance)")
