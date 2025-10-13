// eslint.config.ts
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier'          // flat config do prettier
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// export default defineConfig([
//   { ignores: ['dist', 'build', 'node_modules'] },
//   js.configs.recommended,
//   ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
//     ...cfg,
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ...cfg.languageOptions,
//       parserOptions: {
//         projectService: true,
//       },
//     },
//   })),
//   {
//     files: ['**/*.{ts,tsx,js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       globals: { ...globals.browser, ...globals.node },
//     },
//     plugins: {
//       react,
//       'react-hooks': reactHooks,
//       '@typescript-eslint': tseslint.plugin,
//       prettier: prettierPlugin,
//     },
//     settings: { react: { version: 'detect' } },
//     rules: {
//       semi: 'error',
//       'no-console': 'warn',
//       'react/react-in-jsx-scope': 'off',
//       'react/display-name': 'off',
//       'react/prop-types': 'off',
//       'react/no-children-prop': 'off',
//       'react-hooks/rules-of-hooks': 'error',
//       'react-hooks/exhaustive-deps': 'warn',
//       'prettier/prettier': 'error',
//       'no-trailing-spaces': 'error',
//       'no-multi-spaces': 'error',
//       'no-irregular-whitespace': 'error',
//       'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
//       '@typescript-eslint/no-empty-function': 'off',
//       '@typescript-eslint/no-unsafe-return': 'off',
//       '@typescript-eslint/no-unsafe-call': 'off',
//       '@typescript-eslint/no-unsafe-member-access': 'off',
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-unsafe-assignment': 'off',
//       '@typescript-eslint/no-unsafe-argument': 'off',
//       '@typescript-eslint/no-unused-vars': 'off',
//       '@typescript-eslint/no-misused-promises': 'off',
//       '@typescript-eslint/ban-types': 'off',
//       '@typescript-eslint/unbound-method': 'off',
//     },
//   },
//   prettier,
// ])

// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	// matches all files ending with .js
	{
		files: ["**/*.tsx"],
		rules: {
			semi: "error",
		},
	},

	// matches all files ending with .js except those in __tests
	{
		files: ["**/*.tsx"],
		ignores: ["__tests/**"],
		rules: {
			semi: 'error',
       'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/no-children-prop': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'error',
      'no-irregular-whitespace': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/unbound-method': 'off',
		},
	},
]);
