import { defineConfig } from "vitest/config";
import path from "node:path";

// Unit-test layer for the pure domain seams of WealthOS (SQLite path
// normalization, scrypt/HMAC auth helpers, finance math, Zod schemas,
// CSV-import codec, login rate limiter). Browser/E2E coverage lives in
// tests/e2e/*.spec.ts (Playwright — never picked up by this config, which
// matches *.test.ts only).
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
});
