module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // override/add rules settings here, such as:
    'max-len': [
      'warn',
      {
        code: 100,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignorePattern: '^\\s*import',
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'vue/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': [
      'off',
      {
        allowedNames: ['ignoredFunctionName', 'ignoredMethodName'],
      },
    ],
    'vue/valid-v-model': 'off',
    'vue/no-v-html': 'off',
    quotes: ['warn', 'single'],
    semi: ['warn', 'never'],
    'vue/multi-word-component-names': 0,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
  },
}
