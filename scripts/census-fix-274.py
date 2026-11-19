#!/usr/bin/env python3
"""Session-274 census correction — the pass-B route-file census (29)
was wrong; the tree holds 30 route.ts files (verified by the driving
session's own directory count) and the F-263n pin caught it at final-
gate time. The F-215 od doctrine recurring on the audit pass's own
claim. This script trues every session-274 record site; the
historical F-226s row (session 226's own census) is untouched."""

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
    print(f"census-trued {path}")


rw("README.md", [
    (
        "(all thirteen house contracts, 45 handlers / 29 route files)",
        "(all thirteen house contracts, 45 handlers / 30 route files)",
        "the status row census",
    ),
])

rw("docs/remediation_plan_v2.md", [
    (
        "29 route files read line-by-line, the census corrected 30→29; every",
        "30 route files read line-by-line (the pass-B Glob census claimed 29 — the driving session's own directory count verified 30, the F-263n pin the catcher); every",
        "the head block census",
    ),
    (
        "(thirteen contracts, 45 handlers / 29 route files — the file census\ncorrected 30→29 this round)",
        "(thirteen contracts, 45 handlers / 30 route files — the pass-B 29 corrected by the driving session's own count, the F-263n pin the catcher)",
        "the §2.32 closing census",
    ),
    (
        "45 handlers / 29 route files read line-by-line — the file census corrected 30→29, every candidate dismissed into documented postures)",
        "45 handlers / 30 route files read line-by-line — the pass-B 29 corrected by the driving session's own count at final-gate time, the F-263n pin the catcher; every candidate dismissed into documented postures)",
        "the §5 history row census",
    ),
])

rw("docs/session_131.md", [
    (
        "read line-by-line across 29 route files — the file census corrected\n30→29 this round; every candidate dismissed into documented postures",
        "read line-by-line across 30 route files (the pass-B Glob census claimed 29 — the driving session's own directory count verified 30, the F-263n pin the catcher: the F-215 od doctrine recurring on the audit's own claim, caught before the ship); every candidate dismissed into documented postures",
        "the session record census",
    ),
])

rw("worklog.md", [
    (
        "45 handlers read line-by-line across 29 route files — the file census corrected 30→29; every candidate dismissed",
        "45 handlers read line-by-line across 30 route files — the pass-B 29 corrected by the driving session's own count, the F-263n pin the catcher (the F-215 od doctrine recurring on the audit's own claim); every candidate dismissed",
        "the worklog census",
    ),
])

rw("Project_Architecture_Document.md", [
    (
        "contracts, 45 handlers / 29 route files read line-by-line, the\n  file census corrected 30→29, every candidate dismissed into",
        "contracts, 45 handlers / 30 route files read line-by-line, every\n  candidate dismissed into",
        "the SR block census",
    ),
])

print("census-274 complete: 45 handlers / 30 route files everywhere the session records it")
