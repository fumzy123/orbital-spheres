import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];
