<script lang="ts" setup>
import TierList from './views/TierList.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen mx-4">
    <main class="flex-1">
      <h1 class="my-6 text-4xl font-bold text-slate-800">
        <span class="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent"
          >Tierlist</span
        >
        Creator.
      </h1>
      <TierList />
    </main>
    <footer class=" font-thin text-sm text-center">v.0.0.3</footer>
  </div>
</template>
