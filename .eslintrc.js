module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 14,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: 'paystack-sdk',
            importNames: ['Paystack'],
            message:
              "Named export `Paystack` is deprecated. Use: import Paystack from 'paystack-sdk'",
          },
        ],
      },
    ],
  },
};
