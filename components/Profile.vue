<template>
  <div v-if="user" class="w-80 h-full overflow-y-auto bg-white shadow-lg p-3 z-50 rounded-lg relative">
    <div class="space-y-4">
      <button @click="$emit('close')"
        class="absolute top-3 right-3  border rounded-lg p-2 text-gray-600 hover:bg-gray-200 flex items-center justify-center">
        <SvgoClose />
      </button>
      <div>
        <h2 class="font-medium text-gray-800 text-lg">Full Name</h2>
        <p class="text-secondaryText ">{{ user.name }}</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-800 text-lg">Job Title</h3>
        <p class="text-secondaryText">{{ user.jobTitle }}</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-800 text-lg">Skills</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="skill in user.skills" :key="skill"
            class="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
            {{ skill }}
          </span>
        </div>
      </div>
      <div>
        <h3 class="font-medium text-gray-800 text-lg">Country</h3>
        <p class="text-secondaryText">{{ user.country }}</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-800 text-lg">Graduation Status</h3>
        <p class="text-secondaryText">{{ user.graduationStatus }}</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-800 text-lg">Education</h3>
        <p class="text-secondaryText">{{ user.education }}</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-800 text-lg">Experience</h3>
        <ul class="text-secondaryText space-y-2">
          <li v-for="experience in user.experience" :key="experience">
            {{ experience }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>
