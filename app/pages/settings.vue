<!-- <template>
  <div class="container py-4">
    <h2 class="mb-4">Settings</h2>
    <div class="card p-4 mb-4">
      <h5 class="mb-3">Profile</h5>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="profile.name" type="text" class="form-control" placeholder="Your name" />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="profile.email" type="email" class="form-control" placeholder="Your email" />
      </div>
      <button class="btn btn-success" @click="saveProfile">Save Profile</button>
    </div>
    <div class="card p-4">
      <h5 class="mb-3">Preferences</h5>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" v-model="preferences.darkMode" id="darkModeCheck" />
        <label class="form-check-label" for="darkModeCheck">
          Enable Dark Mode
        </label>
      </div>
      <button class="btn btn-primary" @click="savePreferences">Save Preferences</button>
    </div>
    <div v-if="message" class="alert alert-success mt-4 text-center">{{ message }}</div>
  </div>
</template> -->


<template>
  <div class="container py-4">
    <ProfileManage />
    <PasswordChange />
    <RealNameVerification />
  </div>
</template>

<script setup>
import ProfileManage from '@/components/ProfileManage.vue'
import PasswordChange from '@/components/PasswordChange.vue'
import RealNameVerification from '@/components/RealNameVerification.vue'
</script>



<!-- <script setup>
import { ref } from 'vue'

const profile = ref({
  name: '',
  email: ''
})

const preferences = ref({
  darkMode: false
})

const message = ref('')

const saveProfile = () => {
  // Simulate save
  message.value = 'Profile saved successfully!'
}

const savePreferences = () => {
  // Simulate save
  message.value = 'Preferences saved successfully!'
}
</script>

<style scoped>
.card {
  background: #017cf6;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 2rem;
}
.btn {
  min-width: 120px;
}
</style> -->