<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <main class="flex-grow overflow-hidden">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
</script>

<style scoped>
</style> 