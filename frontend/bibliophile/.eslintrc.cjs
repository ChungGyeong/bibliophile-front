module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-var": "error",
    "no-multiple-empty-lines": "warn",
    "no-console": ["warn", { allow: ["dir", "warn", "error", "info"] }],
    "eqeqeq": "error",
    "no-unused-vars": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
  settings: {
    react: {
      version: "detect", // React 버전 자동 감지
    },
  },
};
