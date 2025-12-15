import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,

  // Node 环境
  {
    files: ["*.js", "src/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // React 前端（未来用）
  {
    files: ["frontend/**/*.{js,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
