<template>
  <div class="chat-page d-flex flex-column justify-content-between vh-100">
    <!-- Header -->
    <div class="chat-header bg-primary text-white p-3 shadow-sm">
      <h5 class="mb-0">🤖 ChatBot Assistant</h5>
    </div>

    <!-- Chat Messages -->
    <div ref="chatBody" class="chat-body flex-grow-1 overflow-auto p-3">
      <div v-for="(msg, index) in messages" :key="index" class="mb-3">
        <div :class="['message', msg.sender === 'user' ? 'user-msg' : 'bot-msg']">
          <span>{{ msg.text }}</span>
        </div>
      </div>
    </div>

   <div class="align-items-center text-align-center container-md">
     <!-- Input -->
    <form class="chat-input d-flex p-3 bg-dark border-top ai_chat_form" @submit.prevent="sendMessage">
      <input
        v-model="input"
        type="text"
        class="form-control me-2"
        placeholder="Type your message..."
        autocomplete="off"
      />
      <button class="btn btn-primary" type="submit">Send</button>
    </form>
   </div>


  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const messages = ref([
  { sender: 'bot', text: 'Hi! How can I help you today?' }
])
const input = ref('')
const chatBody = ref(null)

const sendMessage = () => {
  if (!input.value.trim()) return

  // Add user message
  messages.value.push({ sender: 'user', text: input.value })

  // Simulate bot response after delay
  setTimeout(() => {
    messages.value.push({
      sender: 'bot',
      text: "I'm just a sample bot response."
    })
    scrollToBottom()
  }, 500)

  input.value = ''
  scrollToBottom()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight
    }
  })
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>

.ai_chat_form{
  position: fixed;
 bottom: 66px;
 width: 100%;
 left: 0;
}
.chat-page {
  max-width: 600px;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: #000; /* black background */
  color: #fff;
}

.chat-header {
  height: 60px;
  flex-shrink: 0;
  background-color: #0d6efd; /* Bootstrap primary blue */
  color: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
}

.chat-body {
  flex-grow: 1;
  overflow-y: auto;
  background-color: #000;
  border-top: 1px solid #444;
  border-bottom: 1px solid #444;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message {
  max-width: 75%;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 0.95rem;
  word-wrap: break-word;
  color: inherit;
  align-self: flex-start;
}

.user-msg {
  background-color: #0d6efd; /* user message in blue */
  color: #fff;
  align-self: flex-end;
  margin-left: auto;
}

.bot-msg {
  background-color: #333; /* dark gray bot message */
  color: #fff;
  align-self: flex-start;
  margin-right: auto;
}

.chat-input {
  background-color: #121212;
  padding: 1rem;
  border-top: 1px solid #444;
  display: flex;
  gap: 0.5rem;
}

.chat-input input {
  color: #fff;
  background-color: #222;
  border: 1px solid #555;
  flex-grow: 1;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
}

.chat-input input::placeholder {
  color: #bbb;
}

.chat-input button {
  background-color: #0d6efd;
  border: none;
  color: #fff;
  padding: 0.375rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.chat-input button:hover {
  background-color: #0b5ed7;
}

.chat-footer {
  height: 40px;
  flex-shrink: 0;
  font-size: 0.85rem;
  user-select: none;
}
</style>
