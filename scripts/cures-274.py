#!/usr/bin/env python3
"""Session-274 cures (R-71.2) — the predicate-outlier, mechanism-truth,
and phantom-pin round.

Every site asserted exactly-once before writing (the F-242j/F-247e
lessons); the script exits before any write on failure. The README
row's dedup rides the R-71 lockstep's status-row replacement (the
row is written whole there, with the single lead-in)."""

import sys


def sub1(text: str, old: str, new: str, label: str) -> str:
    n = text.count(old)
    if n != 1:
        sys.exit(f"[{label}] expected 1 occurrence, found {n}: {old[:70]!r}")
    return text.replace(old, new, 1)


def rw(path: str, pairs: list[tuple[str, str, str]]) -> None:
    with open(path, encoding="utf-8") as f:
        s = f.read()
    for old, new, label in pairs:
        s = sub1(s, old, new, label)
    with open(path, "w", encoding="utf-8") as f:
        f.write(s)
    print(f"cured {path}")


# ---- F-274a: the signup arm converges on the family's instanceof form ----

rw("src/app/api/auth/signup/route.ts", [
    (
        'import { db, isTransientDbError } from "@/lib/db";\n',
        'import { db, isTransientDbError } from "@/lib/db";\n'
        'import { Prisma } from "@/generated/prisma/client";\n',
        "the generated-client Prisma import",
    ),
    (
        """      // Session-218 (R-15, F-218r): the findUnique→create race — two
      // concurrent first-signups for one email slip past the explicit
      // duplicate check above and the unique constraint answers a raw
      // 500 "Something went wrong". The P2002 arm answers the same
      // duplicate 400 the explicit check does (the settings route's
      // pattern).
      if (typeof e === "object" && e !== null && "code" in e && (e as { code?: string }).code === "P2002") {
        return ERR.BAD_REQUEST("A user with this email already exists");
      }""",
        """      // Session-218 (R-15, F-218r): the findUnique→create race — two
      // concurrent first-signups for one email slip past the explicit
      // duplicate check above and the unique constraint answers a raw
      // 500 "Something went wrong". The P2002 arm answers the same
      // duplicate 400 the explicit check does (the settings route's
      // pattern). Session-274 (R-71, F-274a): the arm NOW carries the
      // instanceof form itself — the structural type check it shipped
      // with was the lone Prisma-code outlier of the family
      // (behaviorally equivalent, but the one drift).
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        return ERR.BAD_REQUEST("A user with this email already exists");
      }""",
        "the P2002 arm's instanceof convergence",
    ),
])

# ---- F-274b: the drawer docblock rewords to the remount truth -------------

rw("src/components/layout/mobile-nav.tsx", [
    (
        """  // Session-250 (R-47, F-250e): the busy rider — the pending-face
  // family's tenth member (the sidebar MenuItem's twin). The drawer
  // closes on activation, but a keyboard repeat or rapid refire could
  // issue a second POST inside the first's window; the entry guard +
  // the disabled arm close it (a failed POST re-arms for a retry).""",
        """  // Session-250 (R-47, F-250e): the busy rider — the pending-face
  // family's tenth member (the sidebar MenuItem's twin). The drawer
  // closes on activation, but a keyboard repeat or rapid refire could
  // issue a second POST inside the first's window; the entry guard +
  // the disabled arm close it. Session-274 (R-71, F-274b): the re-arm
  // truth — the navigate on activation unmounts this component before
  // the POST resolves, so the state reset below lands on an unmounted
  // tree; the honest re-arm is the fresh initial state a reopen
  // remounts with, and a failed POST surfaces through the store-error
  // banner (the sidebar twin — whose rail stays mounted — is the arm
  // where an in-place re-arm actually runs).""",
        "the drawer sign-out docblock's remount truth",
    ),
])

# ---- F-274c: the skill doc's Validation row rewords to the retirement -----

rw("wealth-os_SKILL.md", [
    (
        "| Validation | `zod` | 4.6.7 | 24 exported schemas in `src/lib/schemas.ts`; every API boundary parses. The `dompurify` npm override (3.4.17 — session 198's critical cure) stays as a defensive pin |",
        "| Validation | `zod` | 4.6.7 | 24 exported schemas in `src/lib/schemas.ts`; every API boundary parses. The sanitizer override retired at F-238e when the package left the tree — its absence from the manifest is pinned (`tests/parity-238.test.ts`) |",
        "the Validation row's retirement truth",
    ),
])

# ---- F-274e: the reserved-soft register names the dark-flip asymmetry -----

rw("src/app/globals.css", [
    (
        """     danger (no -soft) IS live (the destructive buttons). */""",
        """     danger (no -soft) IS live (the destructive buttons).
     Session-274 (R-71, F-274e): the dark block flips the danger soft
     ONLY (the F-224q cure — its DropdownItem hover consumer); the
     success/warning/info softs carry light values in both modes — a
     future dark consumer must flip its own token in the same commit
     or it paints a light chip on a dark surface. */""",
        "the reserved-soft register's dark-flip asymmetry note",
    ),
])

print("cures-274 complete: the signup instanceof convergence · the drawer docblock remount truth · the skill row retirement truth · the register asymmetry note")
