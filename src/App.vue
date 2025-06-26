<template>
  <div class="flex flex-col">
    <Header />
    <main class="flex-grow">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>