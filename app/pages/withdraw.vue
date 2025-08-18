<template>
  <div class="container-md py-3 text-white min-vh-100">
    <h2 class="text-white mb-4">Withdraw Funds</h2>

    <div class="card bg-dark text-white p-4">
      <div v-if="totalAmount <= 0" class="alert alert-info text-center">
        No available amount to withdraw.
      </div>
      <div v-else>
        <p class="lead">Available Balance: <span class="fw-bold">{{ totalAmount.toFixed(2) }}</span></p>

        <form @submit.prevent="handleWithdrawal">
          <div class="mb-3">
            <label for="withdrawAmount" class="form-label">Amount to Withdraw</label>
            <input
              type="number"
              class="form-control bg-secondary text-white border-0"
              id="withdrawAmount"
              v-model.number="withdrawAmount"
              :min="15"
              :max="totalAmount"
              step="0.01"
              required
            >
          </div>

          <div class="mb-3">
            <label for="walletAddress" class="form-label">Wallet Address (USDT BSC) only</label>
            <input
              type="text"
              class="form-control bg-secondary text-white border-0"
              id="walletAddress"
              v-model="walletAddress"
              required
            >
          </div>

          <button type="submit" class="btn btn-warning glossy-btn w-100" :disabled="loading || withdrawAmount <= 0 || withdrawAmount > totalAmount">
            {{ loading ? 'Processing...' : 'Withdraw' }}
          </button>
        </form>

        <div v-if="message" :class="['alert mt-3', messageType === 'success' ? 'alert-success' : 'alert-danger']">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DRFapi from '@/utils/drf_api'; // Assuming DRFapi is used for API calls
import { useRouter } from 'vue-router';

const router = useRouter();
const totalAmount = ref(0);
const withdrawAmount = ref(0);
const walletAddress = ref('');
const loading = ref(false);
const message = ref('');
const messageType = ref('');
const user = ref(null);

onMounted(async () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    router.push('/login');
  } else {
    user.value = JSON.parse(storedUser);
    await fetchTotalAmount();
  }
});

const fetchTotalAmount = async () => {
  if (!user.value?.id) return;
  try {
    // const response = await DRFapi.post('/orders/totalamount/', { user_id: user.value.id });
    const response = await DRFapi.post('/slab/total_earning_by_user/', { user_id: user.value.id });
    if (response.data.length > 0) {
      totalAmount.value = response.data[0].total_earning_amount;
    }
  } catch (e) {
    console.error('Failed to fetch total amount:', e);
    totalAmount.value = 0;
    message.value = 'Failed to load balance. Please try again later.';
    messageType.value = 'danger';
  }
};

const handleWithdrawal = async () => {
  loading.value = true;
  message.value = '';
  messageType.value = '';

  if (withdrawAmount.value <= 0 || withdrawAmount.value > totalAmount.value) {
    message.value = 'Invalid withdrawal amount.';
    messageType.value = 'danger';
    loading.value = false;
    return;
  }

  // Simulate API call for withdrawal
  try {
    // Replace with actual API call to your backend for withdrawal
    // Example: await DRFapi.post('/withdraw/', { user_id: user.value.id, amount: withdrawAmount.value, address: walletAddress.value });
    console.log(`Attempting to withdraw ${withdrawAmount.value} to ${walletAddress.value}`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

    message.value = 'Withdrawal request submitted successfully!';
    messageType.value = 'success';
    // Optionally, refresh total amount after successful withdrawal
    await fetchTotalAmount();
    withdrawAmount.value = 0; // Clear amount field
    walletAddress.value = ''; // Clear address field

  } catch (error) {
    console.error('Withdrawal failed:', error);
    message.value = error.response?.data?.message || 'Withdrawal failed. Please try again.';
    messageType.value = 'danger';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add any specific styles for the withdraw page here */
.card {
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.form-control {
  background-color: #495057 !important; /* Darker input background */
  color: #fff !important;
}

.form-control::placeholder {
  color: #bbb !important;
}

.glossy-btn {
  position: relative;
  overflow: hidden;
}

.glossy-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 100%);
  pointer-events: none;
}

.btn-warning {
  background: linear-gradient(90deg, #FFB300 0%, #FFEA00 100%);
  color: #222;
}
</style>