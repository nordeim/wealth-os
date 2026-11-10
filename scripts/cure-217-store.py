#!/usr/bin/env python3
"""Session-217 (R-14) store cures: F-217k (hydrate error hygiene) +
F-217l (entry-time write-token capture across every mutation action)."""
import re

P = "src/stores/wealthos-store.ts"
src = open(P, encoding="utf-8").read()
orig = src

# --- F-217k: hydrate clears the stale error at entry -----------------------
old_entry = """    hydrate: async () => {
      const token = ++sessionWriteToken;
      set({ loading: true });"""
new_entry = """    hydrate: async () => {
      const token = ++sessionWriteToken;
      // Session-217 (R-14, F-217k): clear the stale error at entry — the
      // error banner's Try-again re-entered here with the previous error
      // still set (the banner + the LoadingBlock rendered together
      // mid-retry), and a 401 landing left a stale non-auth error
      // standing after the failure mode changed.
      set({ loading: true, error: null });"""
assert src.count(old_entry) == 1, "hydrate entry not found"
src = src.replace(old_entry, new_entry)

old_401 = """      } else if (res.error.includes("authenticate") || res.error.includes("Sign in")) {
        set({ hydrated: true, loading: false, user: null });"""
new_401 = """      } else if (res.error.includes("authenticate") || res.error.includes("Sign in")) {
        set({ hydrated: true, loading: false, user: null, error: null });"""
assert src.count(old_401) == 1, "401 branch not found"
src = src.replace(old_401, new_401)

# --- F-217l: entry-time token capture --------------------------------------
old_refresh = """    refresh: async () => {
      return refreshAll(sessionWriteToken, set);
    },"""
new_refresh = """    refresh: async () => {
      // Session-217 (R-14, F-217l): capture the write token at ENTRY —
      // the pre-217 form read the LIVE token after the fetch resolved,
      // so a logout completing in between bumped the token first and the
      // post-fetch guard passed, writing the previous user's payload
      // into the cleared store.
      const token = sessionWriteToken;
      return refreshAll(token, set);
    },"""
assert src.count(old_refresh) == 1, "refresh not found"
src = src.replace(old_refresh, new_refresh)

# Every mutation action: insert the entry capture + swap the call site.
# Pattern: "X: async (...) => {\n      const res = await call..." — insert
# the capture line right after the opening brace.
action_re = re.compile(
    r"(    (?:create|update|delete|import|upsert)[A-Za-z]+: async \([^)]*\) => \{\n)"
)
matches = action_re.findall(src)
print(f"mutation actions found: {len(matches)}")
src = action_re.sub(
    r"\1      const token = sessionWriteToken; // F-217l: captured at entry\n",
    src,
)

# Swap the late-read call sites (only the mutation form; hydrate/logout
# use their own ++token variables and never matched this literal).
n = src.count("if (res.ok) await refreshAll(sessionWriteToken, set);")
print(f"late-read call sites: {n}")
src = src.replace(
    "if (res.ok) await refreshAll(sessionWriteToken, set);",
    "if (res.ok) await refreshAll(token, set);",
)

# No late-read form may survive.
assert "refreshAll(sessionWriteToken, set)" not in src, "a late-read call site survived"
# Every action body must carry the capture.
assert src.count("const token = sessionWriteToken;") >= 18

open(P, "w", encoding="utf-8").write(src)
print(f"written: {len(orig)} -> {len(src)} bytes")
