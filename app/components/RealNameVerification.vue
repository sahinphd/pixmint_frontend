<template>
  <div class="settings-card">
    <h5 class="mb-3">Real Name & NID Verification</h5>
    <form @submit.prevent="submitVerification">
      <div class="mb-3">
        <label class="form-label">Full Name</label>
        <input v-model="realName" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Phone(WhatsApp)</label>
        <input v-model="phone" type="text" placeholder="+1 1234567890" class="form-control" required />
        <button class="btn btn-sm btn-warning mt-2" type="button" @click="sendOTP('phone')">Send OTP</button>
        <input v-model="otpPhone" type="text" class="form-control mt-2" placeholder="Enter OTP" />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
        <button class="btn btn-sm btn-warning mt-2" type="button" @click="sendOTP('email')">Send OTP</button>
        <input v-model="otpEmail" type="text" class="form-control mt-2" placeholder="Enter OTP" />
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
const realName = ref('')
const phone = ref('')
const email = ref('')
const otpPhone = ref('')
const otpEmail = ref('')
const nidFile = ref(null)
const nidPreview = ref('')
const message = ref('')

const sendOTP = (type) => {
  message.value = `OTP sent to your ${type}!`
}
const handleFile = (e) => {
  const file = e.target.files[0]
  if (file) {
    nidFile.value = file
    const reader = new FileReader()
    reader.onload = (ev) => { nidPreview.value = ev.target.result }
    reader.readAsDataURL(file)
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
</style>