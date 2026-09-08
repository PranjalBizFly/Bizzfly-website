import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    /*
     * Generated output is not ours to lint. The glob covers alternate build
     * directories as well as .next itself — a QA run using its own distDir
     * writes .next-qa, and Next's generated route validators there trip
     * ban-ts-comment and no-unused-vars by the hundred.
     */
    ignores: [
      ".next/**",
      ".next-*/**",
      "node_modules/**",
      "out/**",
      "docs/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
