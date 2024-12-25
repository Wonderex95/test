<template>
  <div :class="messageClass" class="p-2 rounded mb-2">
    <p class="font-semibold">{{ message.senderId }}:</p>
    <p>{{ message.content }}</p>
    <p class="text-xs text-secondaryText">{{ formatTimestamp(message.timestamp) }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const messageClass = computed(() => {
  return props.message.senderId === 'Me' ? 'bg-blue-100' : 'bg-gray-100';
});

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
</style> 