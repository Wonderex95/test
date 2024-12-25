<template>
  <div class="h-full  w-full flex flex-col p-4 relative lg:static ">
    <!-- Chat Header -->
    <div v-if="selectedUser" class="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 pb-4 border-b">
      <div class="flex items-center space-x-4">
        <button @click="goBack" class="text-primaryText">
          <SvgoArrowLeft />
        </button>
        <div>
          <h2 class="text-xl font-bold  ">{{ selectedUser.name }}</h2>
          <p class="text-sm text-secondaryText cursor-pointer" @click="toggleProfile">
            Open Candidate Info →
          </p>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row gap-y-2 gap-x-2">
        <button
          class="w-full lg:w-fit bg-primary text-white   px-5 py-1.5 rounded-lg  flex items-center gap-3 justify-center">
          <SvgoSort />
          <p>Add to Short List</p>
        </button>
        <button
          class="w-full lg:w-fit  text-danger bg-danger bg-opacity-10   px-5 py-1.5 rounded-lg  flex items-center gap-3 justify-center">
          <SvgoClose />
          <p>Reject</p>
        </button>
      </div>
    </div>

    <!-- Messages Section -->
    <div v-if="selectedUser" class="flex-grow overflow-y-auto mt-4" ref="messageContainer">
      <div v-for="(group, date) in groupedMessages" :key="date">
        <!-- Group Date -->
        <h3 class="text-center text-xs text-gray-400 font-medium mb-2">{{ date }}</h3>

        <!-- Messages -->
        <div v-for="message in group" :key="message.id" class="mb-4">
          <div :class="{
            'flex items-start space-x-3': message.senderId !== 'Me',
            'flex items-start space-x-3 justify-end': message.senderId === 'Me',
          }">
            <!-- User Avatar (for others only) -->
            <img v-if="message.senderId !== 'Me'" :src="selectedUser.photo" alt="User Photo"
              class="w-8 h-8 rounded-full" />
            <!-- Message Content -->
            <div :class="{
              'bg-gray-100 text-gray-700 p-3 rounded-lg max-w-xs': message.senderId !== 'Me',
              'bg-primary text-white p-3 rounded-lg max-w-xs': message.senderId === 'Me',
            }">
              <p class="text-sm">{{ message.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Section -->
    <form v-if="selectedUser" @submit.prevent="sendMessage" class="flex items-center space-x-2 pt-4 border-t">
      <button class="border rounded-lg p-2 text-gray-600 hover:bg-gray-200 flex items-center justify-center">
        <SvgoAttachment />
      </button>
      <div
        class="flex-grow flex items-center gap-2 border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-200">
        <textarea v-model="newMessage" type="text" placeholder="Write your message..." class="flex-grow outline-none"
          rows="1" />
        <button type="submit" class="text-gray-800 hover:text-gray-900">
          <SvgoSend />
        </button>
      </div>
    </form>

    <!-- No User Selected Message -->
    <div v-else class="flex items-center justify-center h-full text-secondaryText">
      Select a user to start chatting.
    </div>
    <div class="transition-all duration-500 absolute  h-full" :class="{
      'right-0 top-0': showProfile,
      '-right-[1000px]': !showProfile
    }" v-show="showProfile">
      <Profile :user="selectedUser" @close="toggleProfile" />
    </div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Profile from './Profile.vue';

// Props for selected user data
const props = defineProps({
  goBack: Function,
  selectedUser: Object, // Selected user object
});

// State for messages and input
const messages = ref([
  {
    id: 1,
    senderId: 'Alice',
    content: 'Hello there!',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  },
  {
    id: 2,
    senderId: 'Me',
    content: 'Hi Alice!',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  },
  {
    id: 3,
    senderId: 'Alice',
    content: 'How are you?',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: 4,
    senderId: 'Me',
    content: 'I am good, thanks!',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: 5,
    senderId: 'Alice',
    content: 'Great to hear!',
    timestamp: new Date().toISOString(),
  },
]);
const newMessage = ref('');
const showProfile = ref(false);
const messageContainer = ref(null);

// Toggle profile modal
const toggleProfile = () => {
  showProfile.value = !showProfile.value;
};

// Open candidate info (placeholder function)
const openCandidateInfo = () => {
  console.log('Open candidate info');
};

// Send a new message
const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  messages.value.push({
    id: messages.value.length + 1,
    senderId: 'Me',
    content: newMessage.value,
    timestamp: new Date().toISOString(),
  });
  newMessage.value = '';
  scrollToBottom();
};

// Group messages by date in ascending order
const groupedMessages = computed(() => {
  const groups = {};
  messages.value.forEach((message) => {
    const date = new Date(message.timestamp);
    const today = new Date();
    let dateKey;

    if (date.toDateString() === today.toDateString()) {
      dateKey = 'Today';
    } else if (date.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
      dateKey = 'Yesterday';
    } else {
      dateKey = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
  });

  return Object.keys(groups)
    .sort((a, b) => new Date(groups[a][0].timestamp) - new Date(groups[b][0].timestamp))
    .reduce((acc, key) => {
      acc[key] = groups[key];
      return acc;
    }, {});
});

// Scroll to the bottom of the message container
const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

// Automatically scroll to the bottom when the component is mounted or messages change
onMounted(() => {
  scrollToBottom();
});

watch(messages, () => {
  scrollToBottom();
});
</script>

<style scoped>
/* Add responsive and consistent styling */
</style>
