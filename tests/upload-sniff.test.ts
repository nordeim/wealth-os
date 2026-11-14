import { describe, expect, it } from "vitest";
import { sniffImageMagic } from "@/lib/uploads";

// Session-244 (R-41, F-244b): the pure behavioral battery for the upload
// magic-byte seam. The route's family-match gate consumes exactly this
// function's verdict, so every form it accepts or rejects is pinned
// here FIRST (the TDD contract: these legs were born RED — the seam did
// not exist on the pre-cure tree).
//
// The design space (why sniff at all): the POST route's only content
// gate on the STORED bytes was the multipart part's client-declared
// Content-Type — a sessioned caller could store arbitrary non-image
// bytes (polyglots, HTML, binaries) under pinned image extensions,
// and the GET then served them with the extension's image content-type
// on immutable 1-year caching. The sniff closes the declaration gap:
// the bytes themselves must carry a known image family's magic.

describe("sniffImageMagic (the pure seam)", () => {
  // ---- the four accepted families -------------------------------------

  it("sniffs a JPEG (the FF D8 FF SOI marker)", () => {
    const bytes = new Uint8Array([
      0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
    ]);
    expect(sniffImageMagic(bytes)).toBe("jpg");
  });

  it("sniffs a PNG (the 89 50 4E 47 0D 0A 1A 0A signature)", () => {
    const bytes = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
    ]);
    expect(sniffImageMagic(bytes)).toBe("png");
  });

  it("sniffs a GIF87a and a GIF89a (the GIF8 prefix)", () => {
    // A real GIF header is never bare: the signature rides the screen
    // descriptor, so both dialects are probed as full 12-plus-byte
    // buffers (the seam's length floor) — a 6-byte "GIF" is a truncated
    // buffer, not a family.
    const gif87 = new Uint8Array([
      ...new TextEncoder().encode("GIF87a"), 0x0a, 0x00, 0x0a, 0x00, 0x80, 0x00,
    ]);
    const gif89 = new Uint8Array([
      ...new TextEncoder().encode("GIF89a"), 0x0a, 0x00, 0x0a, 0x00, 0x80, 0x00,
    ]);
    expect(sniffImageMagic(gif87)).toBe("gif");
    expect(sniffImageMagic(gif89)).toBe("gif");
  });

  it("sniffs a WEBP (the RIFF....WEBP container)", () => {
    const bytes = new Uint8Array([
      0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50,
    ]);
    expect(sniffImageMagic(bytes)).toBe("webp");
  });

  // ---- the rejected forms ----------------------------------------------

  it("nulls on HTML bytes (the arbitrary-content polyglot host)", () => {
    const bytes = new TextEncoder().encode(
      "<html><body><script>alert(1)</script></body></html>",
    );
    expect(sniffImageMagic(new Uint8Array(bytes))).toBeNull();
  });

  it("nulls on SVG bytes (the family the MIME map already excludes)", () => {
    const bytes = new TextEncoder().encode(
      '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>',
    );
    expect(sniffImageMagic(new Uint8Array(bytes))).toBeNull();
  });

  it("nulls on an empty buffer", () => {
    expect(sniffImageMagic(new Uint8Array(0))).toBeNull();
  });

  it("nulls on a truncated buffer (below every family's header length)", () => {
    expect(sniffImageMagic(new Uint8Array([0xff, 0xd8]))).toBeNull();
  });

  it("nulls on a RIFF container that is not a WEBP (the AVI/WAV cousin)", () => {
    const bytes = new Uint8Array([
      0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x41, 0x56, 0x49, 0x20,
    ]);
    expect(sniffImageMagic(bytes)).toBeNull();
  });

  // ---- the cross-family discriminator (the route's family-match gate) ----

  it("a PNG-declared polyglot carrying JPEG bytes reads as the wrong family", () => {
    // The route compares the sniffed family against the declared MIME's
    // extension — the exact comparison this battery pins from the
    // consumer's side (jpg !== png → the 400 arm).
    const jpegBytes = new Uint8Array([
      0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
    ]);
    expect(sniffImageMagic(jpegBytes)).not.toBe("png");
  });

  it("a GZIP stream (the 1F 8B magic) never reads as an image family", () => {
    const bytes = new Uint8Array([
      0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00,
    ]);
    expect(sniffImageMagic(bytes)).toBeNull();
  });
});
