/**
 * Session-231 (R-28, F-231h): the dead CRM-era initials-avatar family
 * retired — the bubble + the initials helper had zero WealthOS consumers
 * (grep-verified; the reference's own avatars are image assets). Only
 * the live seam stays:
 * avatarTextColor, the F-218n luminance pair for the sidebar's
 * user-chip fill (the ink derives from the background color).
 *
 * Pick a readable ink color for a given avatar background. Light greys
 * (like the reference app's default avatar) get dark text; saturated
 * colors keep white. Uses relative luminance with the WCAG-ish 0.55
 * threshold.
 */
export function avatarTextColor(bg: string): string {
  const hex = bg.replace("#", "");
  if (hex.length !== 6) return "#ffffff";
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.55 ? "#374151" : "#ffffff";
}
