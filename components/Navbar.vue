<template>
  <div class="border-b border-primaryBorder">
    <!-- Desktop Navbar -->
    <div class="flex items-center justify-between px-[8vw] py-3 lg:py-1">
      <div class="flex items-center gap-5">
        <img src="@/assets/images/logo.png" alt="Logo" class="w-10 h-10" />
        <div class="hidden lg:flex space-x-4 relative">
          <NuxtLink to="/" class="relative  hover:text-primaryText pb-4 pt-3" :class="{
            'text-primaryText': isActiveRoute('/'),
            'text-secondaryText': !isActiveRoute('/')
          }" exact>
            Campaign
            <div v-if="isActiveRoute('/')"
              class="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-[40%] bg-primary rounded-full"></div>
          </NuxtLink>

          <NuxtLink to="/candidates" class="relative   hover:text-primaryText pb-4 pt-3" :class="{
            'text-primaryText': isActiveRoute('/candidates'),
            'text-secondaryText': !isActiveRoute('/candidates')
          }" exact>
            Candidates
            <div v-if="isActiveRoute('/candidates')"
              class="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-[40%] bg-primary rounded-full"></div>
          </NuxtLink>
          <NuxtLink to="/teams" class="relative   hover:text-primaryText pb-4 pt-3" :class="{
            'text-primaryText': isActiveRoute('/teams'),
            'text-secondaryText': !isActiveRoute('/teams')
          }" exact>
            Teams
            <div v-if="isActiveRoute('/teams')"
              class="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-[40%] bg-primary rounded-full"></div>
          </NuxtLink>
        </div>
      </div>
      <div class="hidden lg:flex items-center gap-4">
        <MailIcon class="text-primaryText" />
        <NotificationsIcon class="text-primaryText" />

        <img src="@/assets/images/user.png" alt="Account" class="w-10 h-10 rounded-full" />
      </div>

      <!-- Mobile Menu Icon -->
      <div class="lg:hidden flex items-center">
        <button @click="toggleMenu">
          <Icon name="heroicons-outline:menu" class="w-8 h-8 text-gray-600" />
        </button>
      </div>
    </div>

    <!-- Mobile Popover -->
    <div v-if="isMenuOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 flex justify-end">
      <div class="w-3/4 max-w-sm bg-white h-full shadow-lg transform transition-transform duration-300"
        :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }">
        <div class="flex items-center justify-between px-6 py-4 border-b">
          <img src="@/assets/images/logo.png" alt="Logo" class="w-10 h-10" />
          <button @click="closeMenu">
            <Icon name="heroicons-outline:x" class="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <NuxtLink to="/" class="block text-secondaryText hover:text-primaryText"
            :class="{ 'text-primaryText': isActiveRoute('/') }" exact @click="closeMenu">
            Campaign
          </NuxtLink>
          <NuxtLink to="/candidates" class="block text-secondaryText hover:text-primaryText"
            :class="{ 'text-primaryText': isActiveRoute('/candidates') }" exact @click="closeMenu">
            Candidates
          </NuxtLink>
          <NuxtLink to="/teams" class="block text-secondaryText hover:text-primaryText"
            :class="{ 'text-primaryText': isActiveRoute('/teams') }" exact @click="closeMenu">
            Teams
          </NuxtLink>
        </div>
        <div class="p-6 border-t flex items-center justify-between">
          <MailIcon class="text-primaryText" />
          <NotificationsIcon class="text-primaryText" />
          <MailIcon class="text-primaryText" />
          <img src="@/assets/images/user.png" alt="Account" class="w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import MailIcon from "@/assets/icons/mail.svg"
import NotificationsIcon from "@/assets/icons/notifications.svg"

// State for mobile menu
const isMenuOpen = ref(false);

// Toggles the mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Closes the mobile menu
const closeMenu = () => {
  isMenuOpen.value = false;
};

// Checks if the current route matches the link
const isActiveRoute = (path) => {
  const route = useRoute();
  return route.path === path;
};
</script>

<style scoped>
/* Optional: Add transitions for smoother animations */
nav a {
  transition: color 0.2s ease-in-out;
}

.popover-enter-active,
.popover-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.popover-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.popover-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
