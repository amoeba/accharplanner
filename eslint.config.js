import antfu from "@antfu/eslint-config"

export default antfu({
  stylistic: {
    "indent": 2,
    "quotes": "double",
    "brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "vue/brace-style": ["error", "1tbs", { allowSingleLine: false }],
  },
}, {
  rules: {
    "curly": ["error", "all"],
    "brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "vue/brace-style": ["error", "1tbs", { allowSingleLine: false }],
  },
})
