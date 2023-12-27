<script lang="ts" setup>
import TierList from './views/TierList.vue'
</script>

<template>
<div class="[&>*]:px-4 [&>*]:md:px-20 [&>*]:xl:px-40 [&>*]:2xl:px-60 min-h-screen flex flex-col">
  <nav class="flex items-center justify-between bg-white shadow-sm">
    <h1 class="my-6 text-4xl font-bold text-slate-800">
      <span class="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent"
        >Tierlist</span
      >
      Creator.
    </h1>
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
  </nav>
  <main class="flex-1">
    <TierList />
  </main>
  <footer class="my-2 text-center text-sm font-thin">v.0.0.3</footer>
</div>
</template>
