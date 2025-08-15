<template>
  <div class="settings-card">
    <h5 class="mb-4">Change Password</h5>
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
      <button class="btn btn-success w-100" type="submit" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {{ loading ? 'Updating...' : 'Update Password' }}
      </button>
      <div v-if="message" class="alert alert-success mt-3 text-center" role="alert" aria-live="polite">{{ message }}</div>
      <div v-if="error" class="alert alert-danger mt-3 text-center" role="alert" aria-live="polite">{{ error }}</div>
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
const loading = ref(false)

const changePassword = async () => {
  message.value = ''
  error.value = ''

  if (new_password.value !== confirm_password.value) {
    error.value = 'New passwords do not match.'
    return
  }

  loading.value = true;
  try {
    const response = await DRFapi.post('users/change_password/', {
      old_password: old_password.value,
      new_password: new_password.value,
      confirm_password: confirm_password.value
    });

    if (response.status === 200) {
      message.value = response.data.detail || 'Password updated successfully!';
      old_password.value = ''
      new_password.value = ''
      confirm_password.value = ''
      // Clear the success message after a few seconds for better UX
      setTimeout(() => { message.value = '' }, 4000);
    } else {
      // This block is less likely to be hit with Axios, as non-2xx statuses throw errors.
      // Kept for safety.
      error.value = response.data.detail || 'An error occurred.'
    }
  } catch (err) {
    if (err.response?.data) {
      const errorData = err.response.data;
      // Handle DRF's standard validation errors (e.g., {"new_password": ["..."]})
      if (typeof errorData === 'object' && !errorData.detail) {
        error.value = Object.entries(errorData)
          .map(([field, messages]) => `${field.replace('_', ' ')}: ${messages.join(' ')}`)
          .join('\n');
      }
      // Handle DRF's detail message (e.g., {"detail": "..."})
      else if (errorData.detail) {
        error.value = errorData.detail;
      } else {
        error.value = 'An unexpected error occurred.';
      }
    } else {
      // Handle network errors or other issues
      error.value = 'An error occurred while changing the password.';
    }
  } finally {
    loading.value = false;
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