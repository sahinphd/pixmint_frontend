<template>
  <div class="settings-card">
    <h5 class="mb-3">Real Name & NID Verification</h5>
    <form @submit.prevent="submitVerification">
      <div class="mb-3">
        <label class="form-label">Full Name</label>
        <input v-model="realName" type="text" class="form-control" required />
      </div>
      <!-- <div class="mb-3">
        <label class="form-label">Phone(WhatsApp)</label>
        <input v-model="phone" type="text" placeholder="+1 1234567890" class="form-control" required />
        <button class="btn btn-sm btn-warning mt-2" type="button" @click="sendOTP('phone')">Send OTP</button>
      </div> -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
        <button class="btn btn-sm btn-warning mt-2" type="button" @click="sendOTP('email')">Send OTP</button>
      </div>
      <div class="mb-3">
        <label class="form-label">National ID Card</label>
        <input type="file" class="form-control" @change="handleFile" accept="image/*" required />
        <div v-if="nidPreview" class="nid-preview mt-2">
          <img :src="nidPreview" alt="NID Preview" />
        </div>
      </div>
      <button class="btn btn-success w-100" type="submit">Verify</button>
      <div v-if="message" class="alert alert-success mt-3 text-center">{{ message }}</div>
    </form>

    <!-- OTP Modal -->
    <div v-if="showOtpPopup" class="otp-modal">
      <div class="otp-modal-content">
        <button class="close-button" @click="showOtpPopup = false">&times;</button>
        <h5>Enter OTP</h5>
        <p>An OTP has been sent to your {{ otpType }}.</p>
        <input v-model="otp" type="text" class="form-control" placeholder="Enter OTP" />
        <button class="btn btn-success w-100 mt-3" @click="verifyOTP">Verify OTP</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const realName = ref('')
const phone = ref('')
const email = ref('')
const otp = ref('')
const nidFile = ref(null)
const nidPreview = ref('')
const message = ref('')
const showOtpPopup = ref(false)
const otpType = ref('')


const storedUser = ref(null)

onMounted(() => {
  const storedUserRaw = localStorage.getItem('user');
  if (storedUserRaw) {
    const storedUser = JSON.parse(storedUserRaw);
    realName.value = storedUser.name || '';
    email.value = storedUser.email || '';
    phone.value = storedUser.phone || '';
  }
});

const sendOTP = async (type) => {
  message.value = `Sending OTP to your ${type}...`
  otpType.value = type

  try {
    const { data, error } = await useFetch('https://api.pixmintai.com/users/email_verify/', {
      method: 'POST',
      body: JSON.stringify({ email: email.value }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (error.value) {
      throw new Error(error.value.data?.detail || 'Failed to send OTP')
    }

    message.value = `OTP sent to your ${type}!`
    showOtpPopup.value = true
  } catch (err) {
    message.value = err.message
  }
}

const verifyOTP = async () => {
  if (otp.value) {
    message.value = `Verifying ${otpType.value} OTP...`
    showOtpPopup.value = false

    try {
      const { data, error } = await useFetch('https://api.pixmintai.com/users/verify_otp/', {
        method: 'POST',
        body: JSON.stringify({ email: email.value, otp: otp.value }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (error.value) {
        throw new Error(error.value.data?.detail || 'Invalid OTP')
      }

      message.value = `${otpType.value.charAt(0).toUpperCase() + otpType.value.slice(1)} OTP verified successfully!`
    } catch (err) {
      message.value = err.message
    }
  } else {
    message.value = 'Please enter OTP.'
  }
}

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/<your_cloud_name>/image/upload';
const CLOUDINARY_UPLOAD_PRESET = '<your_upload_preset>';

const handleFile = async (e) => {
  const file = e.target.files[0]
  if (file) {
    nidFile.value = file
    // Local preview
    const reader = new FileReader()
    reader.onload = (ev) => { nidPreview.value = ev.target.result }
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (data.secure_url) {
        nidPreview.value = data.secure_url // Use Cloudinary URL for preview/storage
        message.value = 'NID uploaded successfully!'
      } else {
        message.value = 'Failed to upload NID to Cloudinary.'
      }
    } catch (err) {
      message.value = 'Cloudinary upload error: ' + err.message
    }
  }
}
const submitVerification = () => {
  // Simulate verification
  message.value = 'Verification submitted!'
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
.btn-warning {
  background: linear-gradient(90deg, #FFB300 0%, #FFEA00 100%);
  color: #222;
  border-radius: 8px;
  font-weight: 600;
}
.nid-preview img {
  max-width: 120px;
  border-radius: 8px;
  margin-top: 0.5rem;
  border: 2px solid #baff5a;
}
.otp-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.otp-modal-content {
  background: #181c20;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  position: relative;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
}
</style>