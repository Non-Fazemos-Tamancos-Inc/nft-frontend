/** @type {import("eslint").Linter.Config} */

module.exports = {
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'react-refresh'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],

  rules: {
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'spaced-comment': 'error',

    'prettier/prettier': 'error',

    'react-refresh/only-export-components': 'warn',

    'import/no-default-export': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json', 'tsconfig.node.json'],
  },
}
