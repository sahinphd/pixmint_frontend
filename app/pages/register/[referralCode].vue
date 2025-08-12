<template>
  <div class="register-container">
    <div class="card border shadow-sm p-4 mb-4 bg-body-tertiary rounded">
      <h3>Register</h3>
      <form @submit.prevent="handleSubmit">

        <!-- Referral Code -->
        <div class="form-group">
          <label for="referralCode">Referral Code</label>
          <input
            type="text"
            id="referralCode"
            v-model="referralCode"
            class="form-control"
            disabled
          />
        </div>

        <!-- Username -->
        <div class="form-group">
          <label for="username">Name</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="form-control"
            placeholder="Enter your name"
            required
          />
        </div>

        <!-- User ID -->
        <div class="form-group">
          <label for="userid">Login ID</label>
          <input
            type="text"
            id="userid"
            v-model="userid"
            class="form-control"
            placeholder="Enter your user ID"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            id="useremail"
            v-model="useremail"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="form-control"
            placeholder="Confirm your password"
            required
          />
        </div>

        <!-- Submit -->
        <button type="submit" class="btn btn-primary mt-3">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'
import DRFapi from '@/utils/drf_api'

const route = useRoute()
const router = useRouter()

// Secret key (must match backend encryption key)
const secretKey = 'a#T2@Lk!7r^9z*Xq'

// Default referral code if not provided
const DEFAULT_REFERRAL_CODE = '0726252'

// Determine referral code from URL or fallback
let decryptedCode = DEFAULT_REFERRAL_CODE

onMounted(() => {
  // If no referral param, redirect to /register/0726252
  if (!route.params.referralCode) {
    router.replace(`/register/${DEFAULT_REFERRAL_CODE}`)
  }
})

try {
  if (route.params.referralCode) {
    const decoded = decodeURIComponent(route.params.referralCode)
    const bytes = CryptoJS.AES.decrypt(decoded, secretKey)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)

    // If decryption works, use it; if not, use the raw value
    decryptedCode = decrypted || decoded
  }
} catch (e) {
  console.warn('Failed to decrypt referral code:', e)
  // Keep default
}

const referralCode = ref(decryptedCode)

const username = ref('')
const userid = ref('')
const useremail = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleSubmit = async () => {
  // Validation
  if (!username.value || !userid.value || !useremail.value || !password.value || !confirmPassword.value) {
    alert('Please fill in all fields.')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  const registrationData = {
    userid: userid.value,
    name: username.value,
    email: useremail.value,
    password: password.value,
    refarcode: referralCode.value
  }

  try {
    await DRFapi.post('/users/register/', registrationData)
    alert('Registration successful!')
    router.push('/')
  } catch (error) {
    let message = 'Registration failed. Please try again.'
    if (error.response?.data?.message) {
      message = error.response.data.message
    } else if (error.message) {
      message = error.message
    }
    alert(message)
    console.error('Registration Error:', error)
  }
}
</script>


<style scoped>
.register-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}
.card {
  background-color: #f8f9fa;
}
.form-group {
  margin-bottom: 15px;
}
</style>
