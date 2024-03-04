import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

// Default antfu configs: https://github.com/antfu/eslint-config/tree/main/src/configs
export default antfu({
  stylistic: true,
  rules: {
    'antfu/if-newline': ['off'],
    'curly': ['error', 'multi-line'],
    'unused-imports/no-unused-vars': ['off'],
    'no-new': ['off'],
    'brace-style': ['error', '1tbs'],
    'style/brace-style': ['error', '1tbs'],
    'nonblock-statement-body-position': ['error', 'beside'],
    'object-shorthand': ['off'],
    'object-curly-spacing': ['error', 'always'],
  },
  typescript: {
    overrides: {
      'ts/ban-ts-comment': ['off'],
    },
  },
  vue: {
    vueVersion: 3,
    overrides: {
      'vue/object-curly-newline': ['error', {
        minProperties: 2,
        consistent: true,
      }],
      'vue/object-curly-spacing': ['error', 'always'],
      'vue/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: false,
        allowMultiplePropertiesPerLine: false,
      }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'below',
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 4,
        },
        multiline: {
          max: 1,
        },
      }],
    },
  },
}, ...compat.config({
  extends: ['plugin:tailwindcss/recommended'],
}), {
  rules: {
    'tailwindcss/no-custom-classname': ['off'],
    'tailwindcss/migration-from-tailwind-2': ['off'],
  },
})
