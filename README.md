<h1 align="center">Tier list creator</h1>
Web application to create, manage and export custom tier lists.

## Setup

```bash
# Install dependencies
pnpm install

# Start nuxt dev server
pnpm dev
```

Environment variables
```bash
NUXT_BROWSER_URL="http://localhost:9222"
```

The application uses a headless browser instance to render the tier lists on the server-side enabling high-quality image exports. The headless browser can be deployed using the following Docker image:\
https://hub.docker.com/r/zenika/alpine-chrome
```bash
# Run headless browser
docker run -d -p 9222:9222 zenika/alpine-chrome:latest chromium-browser --headless --disable-gpu --no-sandbox --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222
```
## Architecture
### Tech stack
* [Vue3](https://vuejs.org/) with `<script setup>` syntax and [Typescript](https://www.typescriptlang.org/)
* [Nuxt3](https://nuxt.com/)
* [ESLint](https://eslint.org/) for code validation and formatting
  * Flat file config using [@antfu/eslint-config](https://github.com/antfu/eslint-config) as a preset
* [TailwindCSS](https://tailwindcss.com/)
* [VueUse](https://vueuse.org/) composables
