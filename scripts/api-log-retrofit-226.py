#!/usr/bin/env python3
"""Session-226 (R-23, F-226c): retrofit every API catch site with the
logApiError seam. Mechanical, idempotent, scope-named. The bare `catch {`
sites bind the error; the existing `catch (e)`/`catch (error)` sites gain
the log call before their specific arms (their P2025/P2024 handling stays).
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
API = ROOT / "src" / "app" / "api"

# file -> [(line_no, verb)] derived from export names per file; we infer the
# scope from the enclosing `export async function VERB(` declaration.


def find_enclosing_verb(lines: list[str], idx: int) -> str:
    """Walk upward from the catch line to the nearest export function."""
    for j in range(idx, -1, -1):
        m = re.match(r"export async function (GET|POST|PUT|PATCH|DELETE)", lines[j])
        if m:
            return m.group(1)
    return "handler"


def route_scope(rel: Path) -> str:
    parts = list(rel.parts)
    # strip leading src/app/api
    parts = parts[parts.index("api") + 1:]
    # drop route.ts / drop [id] -> /:id
    out = []
    for p in parts:
        if p == "route.ts":
            continue
        if p.startswith("[") and p.endswith("]"):
            name = p[1:-1]
            out.append(":" + name)
        else:
            out.append(p)
    return "/".join(out)


changed_files = 0
for f in sorted(API.rglob("route.ts")):
    rel = f.relative_to(ROOT)
    text = f.read_text()
    lines = text.split("\n")
    changed = False

    # 1. bare `catch {` -> bind + log
    for i, line in enumerate(lines):
        if re.search(r"\} catch \{\s*$", line):
            verb = find_enclosing_verb(lines, i)
            scope = f"{route_scope(rel)} {verb}"
            indent = line[: len(line) - len(line.lstrip())]
            lines[i] = line.replace("} catch {", "} catch (error) {")
            # insert the log line right after, matching indentation + 2
            inner = indent + "  "
            lines.insert(i + 1, f'{inner}logApiError("{scope}", error);')
            changed = True
            lines = lines  # noqa

    text = "\n".join(lines)

    # 2. existing `catch (e)` / `catch (error)` — add the log before the first body line
    lines = text.split("\n")
    out_lines = []
    for i, line in enumerate(lines):
        out_lines.append(line)
        m = re.search(r"\} catch \((e|error)\) \{\s*$", line)
        if m:
            # already logged? skip (idempotence)
            window = "\n".join(lines[i + 1 : i + 4])
            if "logApiError(" in window:
                continue
            verb = find_enclosing_verb(lines, i)
            scope = f"{route_scope(rel)} {verb}"
            indent = line[: len(line) - len(line.lstrip())]
            inner = indent + "  "
            out_lines.append(f'{inner}logApiError("{scope}", {m.group(1)});')
            changed = True
    text = "\n".join(out_lines)

    # 3. ensure the import carries logApiError
    if changed and "logApiError" in text:
        m = re.search(r'import \{([^}]+)\} from "@/lib/api";', text)
        if m and "logApiError" not in m.group(1):
            names = [n.strip() for n in m.group(1).split(",")]
            names.append("logApiError")
            new_import = "import { " + ", ".join(sorted(set(names))) + ' } from "@/lib/api";'
            text = text[: m.start()] + new_import + text[m.end() :]
        elif not m:
            # no api import at all (health route) — add one
            if 'from "@/lib/api"' not in text:
                first_import = re.search(r'^import .*$', text, re.M)
                if first_import:
                    text = (
                        text[: first_import.start()]
                        + 'import { logApiError } from "@/lib/api";\n'
                        + text[first_import.start() :]
                    )

    if changed:
        f.write_text(text)
        changed_files += 1
        print(f"retrofit: {rel}")

print(f"{changed_files} files retrofitted")
