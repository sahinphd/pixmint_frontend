<template>
  <NuxtLayout name="register">
    <div class="register-container">
      <div class="card border shadow-sm p-3 bg-body-tertiary rounded" style="max-width: 500px; margin: 0 auto;">
        <h3 class="text-center mb-3">Register</h3>
        <form @submit.prevent="handleSubmit" class="row g-2">
          <!-- Referral Code -->
          <div class="col-12 d-flex align-items-center mb-2">
            <label for="referralCode" class="col-2 form-label me-2 mb-0">Ref. Code:</label>
            <input type="text" id="referralCode" v-model="referralCode" class="form-control form-control-sm"
              disabled>
          </div>
          <!-- <div class="col-12">
            <label for="referralCode" class="form-label">Referral Code</label>
            <input type="text" id="referralCode" v-model="referralCode" class="form-control form-control-sm" disabled>
          </div> -->

          <!-- Username -->
          <div class="col-12 d-flex align-items-center mb-2">
            <label for="username" class="col-2 form-label me-2 mb-0">Name:</label>
            <input type="text" id="username" v-model="username" class="form-control form-control-sm"
              placeholder="Your name" required>
          </div>

          <!-- User ID -->
          <div class="col-12 d-flex align-items-center mb-2">
            <label for="userid" class="col-2 form-label me-2 mb-0">Mobile:</label>
            <input type="text" id="userid" v-model="userid" class="form-control form-control-sm" placeholder="(Your Mobile Number without country code)"
              required>
          </div>

          <!-- Email -->
          <div class="col-12 d-flex align-items-center mb-2">
            <label for="useremail" class="col-2 form-label me-2 mb-0">Email</label>
            <input type="email" id="useremail" v-model="useremail" class="form-control form-control-sm"
              placeholder="Your email" required>
          </div>

          <!-- Password -->
          <div class="col-12 d-flex align-items-center mb-2">
            <label for="password" class="col-2 form-label me-2 mb-0">Password</label>
            <input type="password" id="password" v-model="password" class="form-control form-control-sm"
              placeholder="Password" required>
              &nbsp;
              <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control form-control-sm"
              placeholder="Confirm password" required>
          </div>

         

          <!-- Submit -->
          <div class="col-12 mt-2">
            <button type="submit" class="btn btn-warning w-100">Register</button>
          </div>

          <div class="col-12 text-center mt-2">
            <small>Already have an account? <a href="#" @click.prevent="$router.push('/login')"
                class="text-danger">Login</a>
            </small>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'
import DRFapi from '@/utils/drf_api'

definePageMeta({
  layout: "register" // layout without header/footer
});


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
    if (error.response?.data) {
      const errorData = error.response.data
      if (typeof errorData === 'object') {
        message = Object.keys(errorData).map(key => {
          const fieldName = key.charAt(0).toUpperCase() + key.slice(1)
          return `${fieldName}: ${errorData[key].join(', ')}`
        }).join('\n')
      } else if (error.response.data.message) {
        message = error.response.data.message
      }
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
  color: #f8f9fa;
  background-color: #f8f9fa;
  background-image: url('../../assets/img/login.png');
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0;
}

.form-group {
  margin-bottom: 0px;
}
</style>
