<template>
  <div class="settings-card">
    <h5 class="mb-3">Change Password</h5>
    <form @submit.prevent="changePassword">
      <div class="mb-3">
        <label class="form-label">Current Password</label>
        <input v-model="old_password" type="password" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">New Password</label>
        <input v-model="new_password" type="password" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Confirm New Password</label>
        <input v-model="confirm_password" type="password" class="form-control" required />
      </div>
      <button class="btn btn-success w-100" type="submit">Update Password</button>
      <div v-if="message" class="alert alert-success mt-3 text-center">{{ message }}</div>
      <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DRFapi from '~/utils/drf_api.js'

const old_password = ref('')
const new_password = ref('')
const confirm_password = ref('')
const message = ref('')
const error = ref('')

const changePassword = async () => {
  message.value = ''
  error.value = ''

  if (new_password.value !== confirm_password.value) {
    error.value = 'New passwords do not match.'
    return
  }

  try {
    const response = await DRFapi.post('users/change_password/', {
      old_password: old_password.value,
      new_password: new_password.value,
      confirm_password: confirm_password.value
    });

    if (response.status === 200) {
      message.value = 'Password updated successfully!'
      old_password.value = ''
      new_password.value = ''
      confirm_password.value = ''
    } else {
      error.value = response.data.detail || 'An error occurred.'
    }
  } catch (err) {
    error.value = err.response?.data?.detail || 'An error occurred while changing the password.'
  }
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