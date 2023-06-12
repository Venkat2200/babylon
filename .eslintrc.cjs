/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
    'plugin:compat/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': [2, { code: 150 }],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': ['error', 'always'],
    'vue/no-v-html': 'off',
  },
};
