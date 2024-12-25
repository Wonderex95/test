<template>
  <DefaultLayout>
    <div class="h-full   flex flex-col ">
      <!-- Breadcrumb Header Section -->
      <div class=" px-[3vw] lg:px-[8vw] py-4 lg:py-8 space-y-4" :class="{
        'border-b border-primaryBorder px-[8vw] py-8': !isSmallScreen,
        'hidden ': isSmallScreen && selectedUser
      }">
        <!-- Page Title -->
        <div class="flex items-center gap-4">
          <div @click="goBack" class="text-secondaryText hover:text-primaryText flex items-center">
            <SvgoArrowLeft />
          </div>
          <h1 class="text-2xl font-semibold">Campaign Inbox</h1>
        </div>

        <!-- Breadcrumbs -->
        <div class="flex items-center space-x-2 text-sm text-secondaryText" :class="{ 'truncate': isSmallScreen }">
          <template v-if="isSmallScreen">
            <span>...</span>
            <NuxtLink to="/marketing" class="hover:text-primaryText flex items-center gap-2">
              <SvgoMarketing />
              <p>Marketing</p>
            </NuxtLink>
            <span>›</span>
            <NuxtLink to="/casey" class="hover:text-primaryText flex items-center gap-2">
              <SvgoUser />
              <p>Casey</p>
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/" class="hover:text-primaryText ">Campaigns</NuxtLink>
            <span>›</span>
            <NuxtLink to="/project-manager" class="hover:text-primaryText flex items-center gap-2">
              <SvgoPm />
              <p>Project Manager</p>
            </NuxtLink>
            <span>›</span>
            <NuxtLink to="/marketing" class="hover:text-primaryText flex items-center gap-2">
              <SvgoMarketing />
              <p>Marketing</p>
            </NuxtLink>
            <span>›</span>
            <NuxtLink to="/casey" class="hover:text-primaryText flex items-center gap-2">
              <SvgoUser />
              <p>Casey</p>
            </NuxtLink>
          </template>
        </div>
      </div>

      <!-- Chat Layout -->
      <div class="  flex-grow flex flex-col overflow-hidden">
        <template v-if="isSmallScreen">
          <div class=" flex-grow  overflow-hidden ">
            <!-- Chat Users or Chat -->
            <div v-if="!selectedUser" key="chat-users" class="w-full h-full">
              <ChatUsers :users="users" :goToUser="selectUser" :getLastMessage="getLastMessage"
                :hasUnreadMessages="hasUnreadMessages" />
            </div>
            <div v-else key="chat" class="w-full h-full ">
              <Chat :selectedUser="selectedUser" :goBack="goBack" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class=" flex flex-grow px-[8vw]   overflow-hidden  ">
            <ChatUsers :users="users" :goToUser="selectUser" :getLastMessage="getLastMessage"
              :hasUnreadMessages="hasUnreadMessages" />
            <Chat :selectedUser="selectedUser" :goBack="goBack" />
          </div>
        </template>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>


// Importing necessary modules and components
import { ref, computed, onMounted } from 'vue';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import ChatUsers from '~/components/ChatUsers.vue';
import Chat from '~/components/Chat.vue';
useHead({
  title: 'Campaign Inbox',
  meta: [
    { name: 'description', content: 'Manage your campaign communications in the Campaign Inbox.' },
  ],
})


// Sample user data
const users = ref([
  {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    phone: '123-456-7890',
    dob: '1990-01-01',
    sex: 'Female',
    photo: 'https://s3-alpha-sig.figma.com/img/378f/f1f9/37956ff50de6f73db5b473d63adb0ddf?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZKZkZ2XQ7diDiWqDvyhw3cxy45rnDCvG5f6OJ5rA5UasggNUDtsSCWjq~6JEmjnQhGoVfP-szOBD~8GYlA6Tp3g-FZ65bEjRnr2unBOY2X7VaShe6IA~Xsr1thDJH19ywldI8YeGA-sSKDbWNmphYQ76BEH6~zoQrjSYHeiGIk5p0IWWUDKvNlxog0FOtY0WrGljKHyX4a8fbzD92mj4Dj8heJzhDbvnhvjLdphLJCgTYDS8B80Nf5KwiAd458BhIbm~WL0xB70iy5V5dJkJWa5Vk0SwAIhvPMUnrb78PQdd5e0AtDeNJAm6QRn6Q08YmwGJqiD-RdPD3JvaMrOl8g__',
    jobTitle: 'Frontend Developer',
    skills: ['JavaScript', 'Vue', 'React', 'HTML', 'CSS'],
    country: 'United States',
    graduationStatus: "Completed Bachelor's Degree",
    education: "BSc in Computer Science, MIT (2008-2012)",
    experience: [
      'Frontend Developer, TechCorp (2015-2021)',
      'Junior Developer, WebSolutions (2012-2015)',
    ],
  },
  {
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    phone: '987-654-3210',
    dob: '1985-05-05',
    sex: 'Male',
    photo: 'https://s3-alpha-sig.figma.com/img/54c3/a4ac/156def2a6ca9958e3b8501238df81ac1?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e5e0WHfJ9BGpbZQKNtuvRXZQI2KzYWysV9~Yau5sgRXX~n28Q~BJ72xggQ9kZ7cGniRCp4UFo7UHKt1JYhgWxzsTwWNckhvqYiDYcqo4C5Zg0NMzLOGLRTTsMrwQwQNpDRW8fn4ePMLJSh3YpNMDNjYwRY1aBCP4DpiPqBZhV4rJgJ1kuEbptpVp~zWGMbqhDCj6FiU8G-XmwxhSqzQik2JCqmFN5m90Mm8qX1D1grCOjyBM0xhl6EkNDAVQ2f3G~Gehut7NSTwDzDkULcRJRXgizAxen3Vgzjbe264E-1qjI8HNYnuuyY9B~-9NZuSfZznoGLXHe9omVFa3Qt0CVA__',
    jobTitle: 'Backend Developer',
    skills: ['Node.js', 'Express', 'MongoDB', 'Docker', 'AWS'],
    country: 'United Kingdom',
    graduationStatus: "Completed Master's Degree",
    education: "MSc in Software Engineering, Oxford University (2006-2008)",
    experience: [
      'Backend Developer, Cloudify (2010-2020)',
      'Software Engineer, DevHub (2008-2010)',
    ],
  },
]);



// State for the selected user in the chat
const selectedUser = ref(null);

// Responsive state for small screens
const isSmallScreen = ref(false);

// Function to handle selecting a user
const selectUser = (user) => {
  selectedUser.value = user;
};

// Function to fetch the last message for a specific user
const getLastMessage = (userId) => {
  return 'Last message here...'; // Placeholder
};

// Function to determine if a user has unread messages
const hasUnreadMessages = (userId) => {
  return false; // Placeholder
};

// Function to navigate back (also deselects the user on small screens)
const goBack = () => {
  selectedUser.value = null;
};

// Watch for screen size changes
const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 1024;
};

// Initialize the screen size detection
onMounted(() => {
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
});
</script>

<style scoped>
/* Fade animation for the transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Breadcrumb hover styles */
.breadcrumbs a {
  transition: color 0.2s ease-in-out;
}

/* Truncate breadcrumb text for small screens */
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
