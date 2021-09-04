module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: [
    'vue',
  ],
  rules: {
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 3,
        "allowFirstLine": true
      },
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }]
  },
};
