/* eslint-env node */
import "@rushstack/eslint-patch/modern-module-resolution";

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  overrides: [
    {
      files: [
        "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
        "cypress/support/**/*.{js,ts,jsx,tsx}",
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
  },
};
