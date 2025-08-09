<template>
    <div>
        <div class="container-md">
            <div class="d-flex align-items-start bg-dark text-white rounded p-3  userdiv">
                <img src="../assets/img/head.png" class="rounded-circle me-3" alt="avatar" width="40" height="40">

                <div class="flex-grow-1">
                    <div class="d-flex align-items-center mb-1">
                        <div class="profile">
                            <h6 class="mb-0 me-2">{{ user?.name || 'User' }}</h6>
                            <!-- <span class="badge bg-success text-white me-2">ruma@gmail.com</span> -->
                            <span class="badge bg-success text-white me-2">{{ user?.email || 'user@example.com' }}</span>
                        </div>
                        <span class="badge bg-warning text-dark me-2 d-flex align-items-center fw-semibold">💎 S0</span>
                        <span class="text-success fw-semibold">⬆ +0%</span>
                    </div>
                    <small class="text-muted">{{ user?.email || 'user@example.com' }}</small>

                    <!-- <button class="btn btn-primary me-2" @click="fetchMinAmount">
                    Fetch Min Amount
                </button> -->

                    <!-- Pament section -->
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="assets">
                                <p>Total assist</p>
                            </div>
                        </div>
                        <div class="col-8">
                            <h2>{{ totalAmount.toFixed(2) }}</h2>

                            <!-- <h2>83.7233</h2> -->
                        </div>
                        <div class="col-4">
                            <div class="history">
                                <h5>Historical Record</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <i class="bi bi-gear-fill fs-5 text-secondary" />
            </div>
            <div class="d-flex align-items-start bg-dark text-white rounded p-3 my-2 paymentdiv">
                <div class="row">
                    <div class="col-6" />
                    <div class="col-6">
                        <button class="btn btn-warning" @click="showModal = true">
                            Recharge wallet
                        </button>
                    </div>
                </div>
            </div>

            <div class="d-flex align-items-start bg-dark text-white rounded p-3 my-2 paymentdiv">
                <div class="row">
                    <div class="col-6" />
                    <div class="col-6">
                        <button class="btn btn-warning" @click="showModal = true" >
                           Recharge History
                        </button>
                    </div>
                </div>
            </div>

            <div class="d-flex align-items-start bg-dark text-white rounded p-3 my-2 paymentdiv">
                <div class="row">
                    <div class="col-6" />
                    <div class="col-6">
                        <button class="btn btn-warning" @click="showModal = true" disabled>
                            Withdraw History
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- QR Code Modal -->
        <div v-if="showQRModal" class="modal fade show d-block" tabindex="-1"
            style="background-color: rgba(0,0,0,0.5);">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content text-center p-4">
                    <h5 class="mb-3">Scan to Pay</h5>
                    <h5 class="mt-1 mb-3">Via: ({{ paymentPriceCurrency.toUpperCase() }})</h5>
                    <div class="row qrdetailsection">
                        <div class="col-6">
                            <QRCode :value="paymentUrl" />
                        </div>
                        <div class="col-6">
                            <h4>Payment ID: {{ paymentOrderID }}</h4>
                            <!-- <h4>Pay through: {{ paymentCurrency  }}</h4> -->
                            <h4>Price: {{ paymentPrice }} {{ paymentCurrency }}</h4>
                        </div>
                    </div>

                    <p class="mt-3 text-break">Payment Address ({{ paymentPriceCurrency }}): {{ paymentAddress }}</p>

                    <!-- <p class="mt-3 text-break">{{ paymentUrl }}</p> -->
                    <button class="btn btn-secondary mt-3" @click="showQRModal = false">Close</button>
                </div>
            </div>
        </div>
        <!-- Payment Modal -->
        <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form @submit.prevent="createPayment">
                        <div class="modal-header">
                            <h5 class="modal-title">Create Payment</h5>
                            <button type="button" class="btn-close" @click="showModal = false" />
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Amount (USD)</label>
                                <input v-model="form.price_amount" type="number" min="0" step="any" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Pay Currency</label>
                                <select v-model="form.pay_currency" class="form-select" required>
                                    <option value="usd">USD</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                            <button type="submit" class="btn btn-success" :disabled="loading">
                                {{ loading ? 'Creating...' : 'Create Payment' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Payment Response -->
        <!-- <div v-if="paymentUrl" class="alert alert-success mt-3 text-center">
        Payment Created: <a :href="paymentUrl" target="_blank">{{ paymentUrl }}</a>
    </div> -->

        <div v-if="error" class="alert alert-danger mt-3 text-center">
            {{ error }}
        </div>
        <OrderList />
    </div>
</template>

<script setup>
import { ref, onMounted  } from 'vue'
import QRCode from '@/components/QRCode.vue';
import OrderList from '@/components/OrderList.vue';
// import QRCode from 'vue-qrcode' // Make sure this component is correctly imported or registered
import DRFapi from '@/utils/drf_api'  // Adjust this import to match your DRF Axios instance setup

const user = ref(null);
const router = useRouter();

const form = ref({
  price_amount: '',
  pay_currency: 'btc',
  // order_id: '',
  // order_description: ''
})


const loading = ref(false)
const error = ref('')
const showModal = ref(false)
const showQRModal = ref(false)
const paymentUrl = ref('')
const paymentAddress = ref('')
const paymentOrderID = ref('')
const paymentCurrency = ref('')
const paymentPrice = ref('')
const paymentPriceCurrency = ref('')
const totalAmount = ref(0);


onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    router.push('/login') // 🔐 redirect if not logged in
  } else {
    user.value = JSON.parse(storedUser);
    console.log('User Store Values:', user.value);
    fetchTotalAmount();
  }

})

const fetchTotalAmount = async () => {
  if (!user.value?.id) return;

  try {
    const response = await DRFapi.post('/orders/totalamount/', { user_id: user.value.id });
    totalAmount.value = response.data.total_amount ?? 0;
    console.log('Total Amount:', totalAmount.value);
  } catch (e) {
    console.error('Failed to fetch total amount:', e);
    totalAmount.value = 0;
  }
};

const createPayment = async () => {
  loading.value = true
  error.value = ''
  showQRModal.value = false

  try {
    // const token = localStorage.getItem('access_token') || ''
    // const userId = await getUserIdFromToken(token)

    // Only send pay_currency and price_amount
    const drfPayload = {
      user_id: user.value.id, // Use user ID from local storage or JWT
      order_currency: form.value.pay_currency,
      order_amount: form.value.price_amount
      
    }

    const drfRes = await DRFapi.post('/orders/create/', drfPayload)

    paymentUrl.value = drfRes.data.pay_address && drfRes.data.price_amount
            ? drfRes.data.pay_address + '?amount=' + drfRes.data.price_amount
            : 'No payment URL returned.';
        paymentAddress.value = drfRes.data.pay_address || 'No payment address returned.';
        paymentOrderID.value = drfRes.data.order_id || 'No order ID returned.';
        paymentCurrency.value = drfRes.data.price_currency || 'No price currency returned.';
        paymentPrice.value = drfRes.data.price_amount || 'No price amount returned.';
        paymentPriceCurrency.value = drfRes.data.pay_currency || 'No pay currency returned.';
        showModal.value = false;
        showQRModal.value = true;

    // Show QR code modal (optional, update as needed)
    showModal.value = false
    showQRModal.value = true
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Payment creation failed.'
    console.error('Error creating payment or order:', err)
  } finally {
    loading.value = false
  }
}
</script>


<style>
.userdiv {
    background-image: url('../assets/img/blanceBg.png');
    background-size: cover;
    background-position: center;
    color: #fff;
}

.paymentdiv {
    background-image: url('../assets/img/inviteFriend.png');
    background-size: cover;
    background-position: center;
    color: #fff;
}

.paymentdiv>.row {
    width: 100%;
}
</style>
