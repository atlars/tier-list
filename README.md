<h1 align="center">Tier list creator</h1>
Web application to create, manage and export custom tier lists.

## Setup

```bash
# Install dependencies
pnpm install

# Start nuxt dev server
pnpm dev
```
## Architecture
### Tech stack
* [Vue3](https://vuejs.org/) with `<script setup>` syntax and [Typescript](https://www.typescriptlang.org/)
* [Nuxt3](https://nuxt.com/)
* [ESLint](https://eslint.org/) for code validation and formatting
  * Flat file config using [@antfu/eslint-config](https://github.com/antfu/eslint-config) as a preset
* [TailwindCSS](https://tailwindcss.com/)
* [VueUse](https://vueuse.org/) composables
