import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import next from "@next/eslint-plugin-next";

// Use the framework plugin directly: the umbrella config currently brings React
// plugins that restrict ESLint to its retired v9 line. Browser a11y uses axe.
export default defineConfig([
  globalIgnores([
    ".next/**",
    "artifacts/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
  js.configs.recommended,
  ...ts.configs.recommended,
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  {
    files: ["src/**/*.tsx", "src/**/*.ts"],
    plugins: { "react-hooks": reactHooks, "@next/next": next },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
]);
