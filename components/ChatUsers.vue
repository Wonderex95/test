<template>
  <div class="w-full lg:w-[40%] border-x  lg:py-4   flex flex-col  gap-3">
    <!-- Header Section -->
    <div class="hidden lg:block px-4">
      <h2 class="text-xl font-bold ">Candidates</h2>
      <p class="text-secondaryText">Find the best fit quickly.</p>
    </div>
    <!-- Tabs Section -->
    <div class="grid grid-cols-3 gap-2  bg-primaryBackground p-1 rounded-2xl mx-4">
      <button v-for="tab in tabs" :key="tab" @click="selectTab(tab)" :class="[
        'text-center   text-sm py-1 rounded-full  whitespace-nowrap',
        selectedTab === tab
        && 'bg-white text-black border rounded-xl'
      ]">
        {{ tab }}
      </button>
    </div>

    <!-- Search and Filter Section -->
    <div class="flex items-center space-x-2 px-4">
      <div class="flex items-center gap-2 flex-grow border rounded-lg px-4 py-2 text-sm">
        <SvgoSearch />
        <input type="text" v-model="searchQuery" placeholder="Search Candidate" class="flex-grow outline-none" />
      </div>
      <button class="border rounded-lg p-2 text-gray-600 hover:bg-gray-200 flex items-center justify-center">
        <SvgoSort />
      </button>
      <button class="border rounded-lg p-2 text-gray-600 hover:bg-gray-200 flex items-center justify-center">
        <SvgoFilter />
      </button>
    </div>

    <!-- Candidate List -->
    <div class="flex-grow ">
      <ul class=" ">
        <li v-for="user in filteredUsers" :key="user.id" @click="goToUser(user)"
          class="flex items-center justify-between cursor-pointer hover:bg-gray-100   p-3 border-y">
          <!-- User Information -->
          <div class="flex items-center space-x-3">
            <img :src="user.photo" alt="User Photo" class="w-12 h-12 rounded-full object-cover" />
            <div>
              <div class="font-semibold text-gray-900">{{ user.name }}</div>
              <div class="text-sm text-secondaryText truncate">
                {{ getLastMessage(user.id) }}
              </div>
            </div>
          </div>

          <!-- Unread Badge -->
          <span v-if="hasUnreadMessages(user.id)"
            class="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            +{{ unreadMessagesCount(user.id) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Props for passing data and functionality from parent
import { ref, computed } from 'vue';

const props = defineProps({
  users: Array, // List of user objects
  goToUser: Function, // Function to handle navigation to a user
  getLastMessage: Function, // Function to fetch the last message for a user
  hasUnreadMessages: Function, // Function to check if a user has unread messages
  unreadMessagesCount: Function, // Function to get unread message count
});

// Tabs for filtering candidates
const tabs = ['Follow Up', 'Short List', 'Declined'];
const selectedTab = ref(tabs[1]); // Default selected tab

// Search query state
const searchQuery = ref('');

// Filtered users based on search query
const filteredUsers = computed(() =>
  props.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (selectedTab.value === 'Follow Up' ||
        selectedTab.value === 'Short List' ||
        selectedTab.value === 'Declined') // Extend logic if needed for tab filtering
  )
);

// Function to select a tab
const selectTab = (tab) => {
  selectedTab.value = tab;
};
</script>
