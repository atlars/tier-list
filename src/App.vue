<script lang="ts" setup>
const config = useRuntimeConfig()
</script>

<template>
  <div class="flex min-h-screen flex-col [&>*]:px-4 [&>*]:md:px-20 [&>*]:xl:px-40 [&>*]:2xl:px-60">
    <nav class="flex items-center justify-between bg-white shadow-sm">
      <h1 class="my-6 text-4xl font-bold text-slate-800">
        <span class="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">Tierlist</span>
        <span> Creator.</span>
      </h1>
      <button type="button" class="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Login
      </button>
    </nav>
    <main class="flex-1">
      <NuxtPage />
    </main>
    <footer class="my-2 text-center text-sm font-thin">
      v {{ config.public.vesion }}
    </footer>
  </div>
</template>
