import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    // TypeScript rules
    // Session-238 (R-35, F-238m): the explicit-any net re-enabled as
    // warn — the F-214k precedent (a clean-but-off rule switched on
    // so the guardrail is live). The tree carries zero explicit any
    // (the generated prisma client is eslint-ignored); under
    // --max-warnings 0 this is the hard net AGENTS.md already claims.
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/prefer-as-const": "off",
    "@typescript-eslint/no-unused-disable-directive": "off",
    
    // React rules
    // Session-214 (F-214k): the four rules below were scaffold-era "off"
    // though the tree is clean under them (verified live, 0 issues) —
    // re-enabled so the effect-dependency and dead-branch nets are live.
    "react-hooks/exhaustive-deps": "warn",
    "no-unreachable": "warn",
    "no-fallthrough": "warn",
    "no-useless-escape": "warn",
    "react-hooks/purity": "off",
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-compiler/react-compiler": "off",
    
    // Next.js rules
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
    
    // General JavaScript rules
    "prefer-const": "off",
    "no-unused-vars": "off",
    "no-console": "off",
    "no-debugger": "off",
    "no-empty": "off",
    "no-irregular-whitespace": "off",
    "no-case-declarations": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-redeclare": "off",
    "no-undef": "off",
  },
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "examples/**", "skills", "delivery/**", "research/**", "tool-results/**", "mini-services/**", ".zscripts/**", "src/generated/**"]
}];

export default eslintConfig;
