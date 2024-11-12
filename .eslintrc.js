module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    // '@nuxtjs/eslint-config',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
}
