<template>
  <transition name="slide">
    <div v-if="user" class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50">
      <button @click="$emit('close')" class="text-red-500">Close</button>
      <h2 class="text-xl font-bold mb-4">Profile</h2>
      <img :src="user.photo" alt="User Photo" class="w-24 h-24 rounded-full mb-4" />
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>DOB:</strong> {{ user.dob }}</p>
      <p><strong>Sex:</strong> {{ user.sex }}</p>
    </div>
  </transition>
</template>

<script setup>
defineProps(['user']);
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
</style> 