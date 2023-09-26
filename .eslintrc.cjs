// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": ["airbnb-base", "prettier", "plugin:@typescript-eslint/recommended"],
  "plugins": ["react", "prettier", "@typescript-eslint", "unused-imports"],
  "env": { "browser": true, "es2021": true },
  "overrides": [],
  "parserOptions": {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["tsconfig.json"]
  },
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "react": { "version": "detect" },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    },
  },
  "rules": {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports-ts": "error",
    "unused-imports/no-unused-vars-ts": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],
    "no-restricted-exports": "off",
    "import/extensions": ["error", "ignorePackages", {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
      '.d.ts': 'never',
    }],
    "import/order": [
      "error",
      {
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "newlines-between": "always",
        "pathGroupsExcludedImportTypes": ["builtin"],
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "pathGroups": [
          {
            "pattern": "{.,..}/**/*.+(css|sass|less|scss|graphql)",
            "patternOptions": { "dot": true, "nocomment": true },
            "group": "unknown",
            "position": "after"
          }
        ]
      }
    ],
    "import/prefer-default-export": ["off"],
    "prefer-destructuring": [
      "error",
      {
        "VariableDeclarator": { "array": false, "object": true },
        "AssignmentExpression": { "array": false, "object": false }
      },
      { "enforceForRenamedProperties": false }
    ],
    "no-nested-ternary": "off",
    "prettier/prettier": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "react/no-unescaped-entities": "off",
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-console": "off"
  }
}
