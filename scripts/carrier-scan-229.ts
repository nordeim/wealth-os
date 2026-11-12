// Session-229 (R-26, F-229d): the whole-tree comment-carrier scan —
// the genus cure for the F-224v/F-228b dead-CSS family. A comment
// carrying a class-shaped string that is NOT live anywhere in src
// emits a dead utility rule (empirically verified against
// tailwindcss@4.3.5). This script computes the full dead set:
//   live  = utility-shaped tokens found in comment-STRIPPED src
//   dead  = utility-shaped tokens found ONLY in comments
import { readFileSync, readdirSync, statSync } from "node:fs";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "carrier-scan-229.ts") process.exit(0);

const SRC = path.resolve(import.meta.dirname, "..", "src");

const UTILITY_PREFIXES = new Set([
  "bg", "text", "border", "ring", "from", "via", "to", "rounded", "shadow", "w", "h",
  "min", "max", "p", "px", "py", "pt", "pb", "pl", "pr", "m", "mx", "my", "mt", "mb", "ml", "mr",
  "gap", "grid", "col", "flex", "items", "justify", "font", "tracking", "leading", "list",
  "transition", "duration", "animate", "slide", "fade", "zoom", "spin", "inset", "z",
  "opacity", "underline", "decoration", "sr", "size", "space", "divide", "place", "self",
  "overflow", "whitespace", "break", "uppercase", "lowercase", "capitalize", "accent",
  "cursor", "select", "pointer", "order", "basis", "shrink", "grow", "table", "object",
  "aspect", "outline", "scroll", "isolate", "mix", "filter", "blur", "brightness",
  "contrast", "grayscale", "invert", "sepia", "drop", "transform", "origin", "scale",
  "rotate", "translate", "skew", "will", "backface", "container", "appearance", "resize",
  "columns", "content", "backdrop", "peer", "group", "data", "aria", "hover", "focus",
  "active", "disabled", "sm", "md", "lg", "xl", "2xl", "dark", "light", "placeholder",
  "selection", "marker", "file", "first", "last", "odd", "even", "only", "open",
  "checked", "inert", "motion", "starting", "supports", "rtl", "ltr", "not", "antialiased",
]);

/** True when the token looks like a utility/variant class candidate. */
function isClassShaped(token: string): boolean {
  // Variant-prefixed form: `sm:text-left`, `data-[state=open]:animate-in`,
  // `dark:from-stone-900/90`, `focus:bg-accent`.
  const colon = token.indexOf(":");
  if (colon > 0) {
    const head = token.slice(0, colon);
    if (UTILITY_PREFIXES.has(head) || /^\[[^\]]+\]$/.test(head)) return true;
  }
  // Utility form: `bg-blue-50`, `from-stone-900`, `rounded-xl`, `text-sm`.
  const hyphen = token.indexOf("-");
  if (hyphen > 0) {
    const head = token.slice(0, hyphen);
    if (UTILITY_PREFIXES.has(head)) return true;
  }
  return false;
}

/** Extract candidate tokens from a source fragment. */
function candidates(src: string): string[] {
  const out = new Set<string>();
  // Utility-shaped words: letters/digits with hyphens, slashes, brackets,
  // colons, dots (z-[60], bg-slate-50/50, data-[state=open]:animate-in).
  const re = /[a-zA-Z0-9_[\]/.:-]*[a-zA-Z][a-zA-Z0-9_[\]/.:-]*/g;
  for (const m of src.matchAll(re)) {
    const tok = m[0];
    if (tok.length >= 4 && isClassShaped(tok)) out.add(tok);
  }
  return [...out];
}

/** Strip line + block comments (strings kept: className literals are live). */
function stripComments(src: string): string {
  let out = "";
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === "/" && src[i + 1] === "/") {
      while (i < n && src[i] !== "\n") i++;
    } else if (c === "/" && src[i + 1] === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) i++;
      i += 2;
    } else if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      out += c;
      i++;
      while (i < n && src[i] !== quote) {
        if (src[i] === "\\") {
          out += src[i];
          i++;
        }
        out += src[i];
        i++;
      }
      out += quote ?? "";
      i++;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

/** Extract ONLY the comment fragments (line + block). */
function extractComments(src: string): string {
  let out = "";
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === "/" && src[i + 1] === "/") {
      while (i < n && src[i] !== "\n") {
        out += src[i];
        i++;
      }
      out += "\n";
    } else if (c === "/" && src[i + 1] === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) {
        out += src[i];
        i++;
      }
      i += 2;
      out += "\n";
    } else if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      i++;
      while (i < n && src[i] !== quote) {
        if (src[i] === "\\") i++;
        i++;
      }
      i++;
    } else {
      i++;
    }
  }
  return out;
}

function walk(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (/\.(ts|tsx)$/.test(name)) files.push(p);
  }
  return files;
}

const files = walk(SRC);
const live = new Set<string>();
const commentTokens = new Map<string, string[]>(); // token -> [file:line]
for (const f of files) {
  const src = readFileSync(f, "utf8");
  for (const tok of candidates(stripComments(src))) live.add(tok);
}
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const comments = extractComments(src);
  const lines = comments.split("\n");
  const lineOffsetBase = 0;
  for (let li = 0; li < lines.length; li++) {
    for (const tok of candidates(lines[li])) {
      if (live.has(tok)) continue;
      const key = tok;
      if (!commentTokens.has(key)) commentTokens.set(key, []);
      const rel = path.relative(path.resolve(import.meta.dirname, ".."), f);
      commentTokens.get(key)!.push(`${rel} (comment line ${li + 1})`);
    }
  }
}

console.log(`scanned ${files.length} files; live tokens: ${live.size}`);
console.log(`\nDEAD CARRIERS (${commentTokens.size} tokens):\n`);
for (const [tok, sites] of [...commentTokens.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`  ${tok}`);
  for (const s of sites) console.log(`      ${s}`);
}
