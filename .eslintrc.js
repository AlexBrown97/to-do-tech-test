module.exports = {
  env: {
    node: true,
    browser: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "prettier",
  ],
  settings: {
    jest: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      version: require("jest/package.json").version,
    },
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
};
