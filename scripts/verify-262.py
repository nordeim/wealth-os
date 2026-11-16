#!/usr/bin/env python3
"""Session-262 driving-session verification of the audit's material claims.

Recomputes every cited contrast figure with the WCAG relative-luminance
formula against the actual palette values, and checks each prose claim at
file:line. Independent implementation (Python) of the same math the audit
ran — a second engine for the same numbers.
"""
import re, sys

def srgb_to_lin(c):
    c /= 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def lum(hexstr):
    h = hexstr.lstrip('#')
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return 0.2126 * srgb_to_lin(r) + 0.7152 * srgb_to_lin(g) + 0.0722 * srgb_to_lin(b)

def ratio(fg, bg):
    l1, l2 = lum(fg), lum(bg)
    if l1 < l2: l1, l2 = l2, l1
    return (l1 + 0.05) / (l2 + 0.05)

def blend(fg_hex, alpha, over_hex):
    f = fg_hex.lstrip('#'); o = over_hex.lstrip('#')
    out = ''.join(f"{round(int(f[i:i+2],16)*alpha + int(o[i:i+2],16)*(1-alpha)):02x}" for i in (0,2,4))
    return '#' + out

print("=== Finding 1: the 405-char description citations ===")
sys.path.insert(0, '.')
import subprocess
r = subprocess.run(['node', '-e', '''
const m = require("fs").readFileSync("src/lib/site.ts","utf8");
const match = m.match(/SITE_DESCRIPTION[^=]*=\\s*"((?:[^"\\\\]|\\\\.)*)"/s);
const s = JSON.parse('"' + match[1] + '"');
console.log("SITE_DESCRIPTION length:", s.length);
'''], capture_output=True, text=True)
print(r.stdout.strip() or r.stderr[:300])
for f, pat in [("src/lib/site.ts", "405"), ("src/app/layout.tsx", "405"), ("src/app/login/page.tsx", "405")]:
    txt = open(f).read()
    n = txt.count(pat)
    lines = [i+1 for i, l in enumerate(txt.splitlines()) if pat in l]
    print(f"  {f}: {n} '405' carriers at lines {lines}")

print()
print("=== Finding 2: globals.css muted-token figure (claimed 2.9:1) ===")
print(f"  muted #78716c on dark surface #0a0a0a = {ratio('#78716c', '#0a0a0a'):.3f}:1")
print(f"  muted #78716c on dark background #0e1310 = {ratio('#78716c', '#0e1310'):.3f}:1")
print(f"  muted #78716c on stone-900 #1c1917 = {ratio('#78716c', '#1c1917'):.3f}:1")
print(f"  muted #78716c on stone-800 #292524 = {ratio('#78716c', '#292524'):.3f}:1")

print()
print("=== Finding 3: page-layout.ts DIALOG_CLOSE figure (claimed 2.47:1) ===")
print(f"  stone-600 #57534e on surface #0a0a0a = {ratio('#57534e', '#0a0a0a'):.3f}:1")
print(f"  stone-600 #57534e on background #0e1310 = {ratio('#57534e', '#0e1310'):.3f}:1")

print()
print("=== Finding 4: badge.tsx danger figure (claimed 3.76:1 for neutral-50) ===")
print(f"  neutral-50 #fafafa on danger #ef4444 = {ratio('#fafafa', '#ef4444'):.3f}:1")
print(f"  white #ffffff on danger #ef4444 = {ratio('#ffffff', '#ef4444'):.3f}:1")

print()
print("=== Finding 5: constants.ts INVESTMENT_TYPES chip range (claimed 2.1-3.7:1) ===")
types = [
    ("stock", "#3b82f6"), ("etf", "#8b5cf6"), ("bond", "#f59e0b"),
    ("crypto", "#10b981"), ("realestate", "#f97316"), ("other", "#78716c"),
]
for name, color in types:
    tint = blend(color, 0.10, '#ffffff')
    print(f"  {name} {color} on own 10% tint {tint} = {ratio(color, tint):.3f}:1")

print()
print("=== Finding 6: site.ts header paths ===")
txt = open('src/lib/site.ts').read()
print("  'app/sitemap.ts' in site.ts:", 'app/sitemap.ts' in txt)
print("  'app/robots.ts' in site.ts:", 'app/robots.ts' in txt)
import os
print("  src/app/sitemap.ts exists:", os.path.exists('src/app/sitemap.ts'))
print("  src/app/robots.ts exists:", os.path.exists('src/app/robots.ts'))
print("  src/app/sitemap.xml/route.ts exists:", os.path.exists('src/app/sitemap.xml/route.ts'))
print("  src/app/robots.txt/route.ts exists:", os.path.exists('src/app/robots.txt/route.ts'))
print("  src/app/manifest.json/route.ts exists:", os.path.exists('src/app/manifest.json/route.ts'))

print()
print("=== Finding 8: soft figures ===")
print(f"  green-400 #4ade80 on sidebar #1c1917 = {ratio('#4ade80', '#1c1917'):.3f}:1")
print(f"  green-600 #16a34a on sidebar #1c1917 = {ratio('#16a34a', '#1c1917'):.3f}:1")
w60 = blend('#ffffff', 0.60, '#10b981')
print(f"  white/60 blend on emerald-500 = {w60} -> {ratio(w60, '#10b981'):.3f}:1")
w70 = blend('#ffffff', 0.70, '#10b981')
print(f"  white/70 blend on emerald-500 = {w70} -> {ratio(w70, '#10b981'):.3f}:1")
