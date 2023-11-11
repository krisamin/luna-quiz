/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    // "linebreak-style": ["error", "unix"],
    "import/order": [
      "error",
      {
        "newlines-between": "always-and-inside-groups",
        distinctGroup: true,
        warnOnUnassignedImports: true,
        groups: [
          "type",
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "~/styles/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "~/**",
            group: "external",
            position: "after",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
