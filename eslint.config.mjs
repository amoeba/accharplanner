import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import tailwindcss from 'eslint-plugin-tailwindcss'

export default createConfigForNuxt(
  {},
  {
    plugins: {
      tailwindcss
    },
    rules: {
      ...tailwindcss.configs.recommended.rules
    },
    settings: {
      tailwindcss: {
        whitelist: [
          'my\\-.+'
        ]
      }
    }
  }
)
