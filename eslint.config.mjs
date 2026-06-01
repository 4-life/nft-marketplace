import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '**/*.d.ts',
      '**/*.test.{ts,tsx}',
      'service-worker.js',
      'eslint.config.mjs',
      'vite.config.ts',
    ],
  },

  ...compat.extends('airbnb'),

  ...tseslint.configs.recommended,

  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'no-relative-import-paths': noRelativeImportPaths,
      prettier: prettierPlugin,
    },
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
  },

  {
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },

  prettierConfig,

  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'prettier/prettier': ['warn', { singleQuote: true }],

      'import/no-unresolved': [1, { ignore: [''] }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: ['src/setupTests.ts'] }],
      'import/extensions': [
        'error',
        'ignorePackages',
        { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
      ],

      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, argsIgnorePattern: '^_', args: 'all' },
      ],
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],

      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
      'react-hooks/exhaustive-deps': 'error',
      'react/require-default-props': 'off',

      'jsx-a11y/anchor-is-valid': ['error'],

      indent: ['error', 2, { SwitchCase: 1, ObjectExpression: 1, ImportDeclaration: 1 }],
      'jsx-quotes': ['error', 'prefer-double'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'no-trailing-spaces': ['error'],
      curly: ['error'],
      'object-curly-spacing': ['error', 'always'],
      'space-before-blocks': ['error'],
      'arrow-spacing': ['error'],
      'spaced-comment': ['error', 'always'],
      semi: 'error',
      'max-len': ['error', { code: 200 }],
      'one-var': ['error', 'never'],

      eqeqeq: ['error'],
      'no-alert': ['error'],
      'no-eq-null': ['error'],
      'array-callback-return': 'error',
      'no-console': 'error',
      'no-mixed-operators': 'error',
      'no-unreachable': 'error',
      'no-case-declarations': 0,

      'default-param-last': 'off',

      // Allow for...of loops (airbnb restricts them, but react-app previously allowed them)
      'no-restricted-syntax': [
        'error',
        { selector: 'ForInStatement', message: 'for...in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.' },
        { selector: 'LabeledStatement', message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.' },
        { selector: 'WithStatement', message: '`with` is disallowed in strict mode because it makes the code impossible to predict and optimize.' },
      ],
    },
  },
);
