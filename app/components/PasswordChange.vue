<template>
  <div class="settings-card">
    <h5 class="mb-3">Change Password</h5>
    <form @submit.prevent="changePassword">
      <div class="mb-3">
        <label class="form-label">Current Password</label>
        <input v-model="current" type="password" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">New Password</label>
        <input v-model="newPass" type="password" class="form-control" required />
      </div>
      <button class="btn btn-success w-100" type="submit">Update Password</button>
      <div v-if="message" class="alert alert-success mt-3 text-center">{{ message }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const current = ref('')
const newPass = ref('')
const message = ref('')
const changePassword = () => {
  // Simulate password change
  message.value = 'Password updated successfully!'
  current.value = ''
  newPass.value = ''
}
</script>

<style scoped>
.settings-card {
  background: #181c20;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.form-label { color: #baff5a; }
.form-control {
  background: #23272b;
  color: #fff;
  border: 1px solid #2e3238;
}
.btn-success {
  background: linear-gradient(90deg, #43EA7F 0%, #1D976C 100%);
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
}
</style>