<!-- pages/login.vue -->
<template>
    <div class="login-layout">
    <slot />
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  // Simulate a loading process
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>
<style>
.login-layout{
  background-color: #0000003b;  
   background-image: url('../assets/img/register-dark.png');
   min-height: 100vh; /* Ensure layout covers full viewport */
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it's on top of everything */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1); /* Light grey border */
  border-top: 4px solid #3498db; /* Blue spinner */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>