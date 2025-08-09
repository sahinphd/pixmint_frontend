<template>
  <div class="register-container">
    <div class="card border shadow-sm p-4 mb-4 bg-body-tertiary rounded">
      <h3>Register</h3>
      <form @submit.prevent="handleSubmit">
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
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="form-control"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="form-group">
          <label for="userid">User id</label>
          <input
            type="text"
            id="userid"
            v-model="userid"
            class="form-control"
            placeholder="Enter your userid"
            required
          />
        </div>
        <div class="form-group">
          <label for="useremail">email</label>
          <input
            type="text"
            id="useremail"
            v-model="useremail"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
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
        <button type="submit" class="btn btn-primary mt-3">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'

const route = useRoute()
const router = useRouter()

const secretKey = 'a#T2@Lk!7r^9z*Xq' 

// Decrypt referral code from URL
let decryptedCode = ''
try {
  const bytes = CryptoJS.AES.decrypt(decodeURIComponent(route.params.referralCode), secretKey)
  decryptedCode = bytes.toString(CryptoJS.enc.Utf8)
} catch (e) {
  decryptedCode = ''
}

// Get the referralCode from the route parameters
// const referralCode = ref(route.params.referralCode)
const referralCode = ref(decryptedCode)

// Data for registration form
const username = ref('')
const userid = ref('')
const useremail = ref('')
const password = ref('')
const confirmPassword = ref('')

// Handle the form submission
const handleSubmit = async () => {
  // Basic validation
  if (!username.value || !password.value) {
    alert('Please fill in all fields.')
    return
  }
  if (confirmPassword.value != password.value) {
    alert('Password not match.')
    return
  }

  const registrationData = {
    userid: userid.value,
    name: username.value,
    email: useremail.value,
    password: password.value,
    refarcode: referralCode.value,
  }

  try {
    const response = await fetch('http://127.0.0.1:7000/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })

    const result = await response.json()

    if (response.ok) {
      alert('Registration successful!')
      router.push('/') // Redirect to login page after registration
    } else {
      alert(result.message || 'Registration failed')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Registration failed. Please try again later.')
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
