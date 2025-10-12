// eslint.config.js (Flat/ESM)
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';

// helper ESM para dirname do arquivo atual (p/ type-check TS)
const tsconfigRootDir = new URL('.', import.meta.url);

export default [
  { ignores: ['dist', 'build', 'node_modules'] },

  // Base para JS/TS em browser
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
  },

  // Recomendadas JS
  js.configs.recommended,

  // TypeScript com type-check apenas dentro de src/
  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    ...cfg,
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ...cfg.languageOptions,
      parserOptions: {
        ...cfg.languageOptions?.parserOptions,
        project: true,          // autodetecta tsconfig.json
        tsconfigRootDir,        // raiz do tsconfig (ESM-safe)
      },
    },
  })),

  // Plugins React/Imports + regras gerais
  {
    plugins: { react, 'react-hooks': reactHooks, import: importPlugin, prettier: prettierPlugin },
    settings: { react: { version: 'detect' } },
    rules: {
      // React (espelha RN)
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/no-children-prop': 'off',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Console & imports
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'no-console': 1,
      'import/no-duplicates': 'warn',
      'import/order': ['warn', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],

      // Espaços/estilo (equivalentes aos seus)
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'error',
      'no-irregular-whitespace': 'error',
      'space-in-parens': ['warn', 'never'],
      'array-bracket-spacing': ['warn', 'never'],
      'object-curly-spacing': ['warn', 'always'],
      'block-spacing': ['warn', 'always'],
      'space-before-function-paren': ['warn', 'never'],
      'space-infix-ops': 'warn',
      'keyword-spacing': ['warn', { before: true, after: true }],
      'padded-blocks': ['warn', 'never'],
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0 }],

      // JSX spacing/indent (mantidos)
      'react/jsx-tag-spacing': ['warn', { closingSlash: 'never', beforeSelfClosing: 'always', afterOpening: 'never', beforeClosing: 'never' }],
      'react/jsx-curly-spacing': ['warn', { when: 'never', children: true }],
      'react/jsx-equals-spacing': ['warn', 'never'],
      'react/jsx-first-prop-new-line': ['warn', 'multiline'],
      'react/jsx-indent': ['warn', 2],
      'react/jsx-indent-props': ['warn', 2],
      'react/jsx-props-no-multi-spaces': 'warn',
      'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],
      'react/jsx-one-expression-per-line': ['warn', { allow: 'single-child' }],
      'react/jsx-wrap-multilines': ['warn', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'ignore',
      }],

      // Integração Prettier como erro (como no RN)
      'prettier/prettier': 'error',

      // Detectar literais só de espaços (opcional, útil p/ seu caso)
      'no-restricted-syntax': [
        'error',
        { selector: 'Literal[value=/^\\s+$/u]', message: 'String literal contém apenas espaços. Use "" e trate com .trim().' },
        { selector: 'JSXText[value=/^\\s+$/u]', message: 'JSX contém apenas espaços. Remova ou use {"\\u00A0"} se intencional.' },
      ],
    },
  },

  // BLOCO TS: espelha “offs” comuns do RN
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },

  // Arquivos Node (configs) — globals de Node
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: { globals: { ...globals.node } },
  },

  // Arquivos de teste — Jest plugin + env (espelha RN)
  {
    files: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: { ...globals.jest },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },

  // Desliga conflitos de formatação (deixa Prettier cuidar disso)
  prettier,
];
