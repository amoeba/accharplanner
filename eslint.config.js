// eslint.config.js
import antfu from "@antfu/eslint-config"

export default await antfu({
  stylistic: {
    "quotes": "double",
    "eol-last": true,
  },
})
