<template>
  <component :is="iconName" v-bind="iconProps" :class="className" />
</template>

<script setup>
import { defineProps } from 'vue';

// Define the props for the Icons component
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  iconProps: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped>
</style>