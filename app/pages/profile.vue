<template>
  <div>
    <div class="container-md py-0 px-0">
      <div class="d-flex align-items-start bg-dark text-white rounded p-3 userdiv position-relative">
        <div class="d-flex flex-column flex-grow-1">
          <!-- User Info Section -->
          <div class="d-flex align-items-center mb-3">
            <img src="../assets/img/head.png" class="rounded-circle me-3" alt="avatar" width="40" height="40">
            <div class="flex-grow-1">
              <div class="d-flex align-items-center flex-wrap mb-1">
                <h6 class="mb-0 me-2">{{ user?.name || 'User Name Error' }}</h6>
                <span class="badge bg-success text-white me-2">{{ user?.email || 'Email Error' }}</span>
              </div>
              <div class="d-flex align-items-center flex-wrap">
                <span class="badge bg-warning text-dark me-2 d-flex align-items-center fw-semibold">💎 {{
                  user?.slab_name || 'P0' }}</span>
                <span class="text-success fw-semibold">⬆+0%</span>
              </div>
            </div>
          </div>

          <!-- Stats Section -->
          <div class="row g-2 mt-2">
            
            <div class="col-6 col-md-4">
              <div class="p-2 bg-dark rounded h-100">
                <p class="small mb-1">Total Asset:
                  <i class="bi bi-eye-fill" style="cursor: pointer;" @click="showDetails = !showDetails"></i>
                </p>
                <h4 class="mb-0">{{ totalAsset.toFixed(2) }}</h4>

                <div v-show="showDetails" class="flex-column gap-1">
                  <span class="ms-2 small">Order:
                    <TotalOrderAmount :userId="user?.id" v-model="totalAmount" />
                  </span>
                  <span class="ms-2 small">Earning:
                    <TotalEarningByUser :userId="user?.id" v-model="totalEarning" />
                  </span>
                </div>
              
              </div>
            </div>
            <div class="col-6 col-md-4 d-none">
              <div class="p-2 bg-dark rounded h-100">
                <p class="small mb-1">Today's earnings: <span class="text-success">{{ new Date().toLocaleDateString()
                    }}</span></p>
                <p class="mb-0">
                  <span class="text-success">-</span> / <span class="text-danger">-</span> %
                </p>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="p-2 bg-dark rounded h-100">
                <div class="history" @click="$router.push('/earning-history')" style="cursor: pointer;">
                  <h6 class="mb-0">Historical Record &nbsp;<i class="bi bi-eye-fill" style="cursor: pointer;" ></i></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <i class="bi bi-gear-fill fs-5 text-white position-absolute top-0 end-0 m-3" @click="$router.push('/settings')"
          style="cursor: pointer;" />
      </div>




      <div class="d-flex align-items-start text-white rounded p-3 my-2 paymentdiv">
        <div class="row">
          <div class="col-12">
            <div class="d-flex flex-wrap gap-2">
              <button class="btn btn-warning btn-sm flex-fill glossy-btn" @click="showModal = true">
                Recharge
              </button>
              <button class="btn btn-warning btn-sm flex-fill glossy-btn" @click="$router.push('/withdraw')">
                Withdraw
              </button>
              <button class="btn btn-warning btn-sm flex-fill glossy-btn" @click="$router.push('/history')">
                History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- QR Code Modal -->
    <div v-if="showQRModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center p-4 bg-info">
          <h5 class="mb-3">Scan to Pay</h5>
          <h5 class="mt-1 mb-3">Via: ({{ paymentPriceCurrency.toUpperCase() }})</h5>
          <div class="row qrdetailsection">
            <div class="col-6">
              <QRCode :value="paymentUrl" />
            </div>
            <div class="col-6">
              <h5>Order ID: {{ paymentOrderID }}</h5>
              <h4>Price: {{ paymentPrice }} {{ paymentCurrency }}</h4>
            </div>
          </div>
          <p class="mt-3 text-break">Payment Address ({{ paymentPriceCurrency }}): {{ paymentAddress }}</p>
          <button class="btn btn-secondary bg-warning mt-3" @click="showQRModal = false">Close</button>
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
                <label class="form-label text-dark">Amount (USD)</label>
                <input v-model="form.price_amount" type="number" min="30" step="any" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-dark">Pay Currency</label>
                <select v-model="form.pay_currency" class="form-select text-dark bg-success" required>
                  <option value="usdtbsc">USDT BSC</option>
                  <!-- <option value="btc">BTC</option> -->
                  <!-- <option value="eth">ETH</option> -->
                  <option value="trx">TRX</option>
                  <!-- <option value="ltc">LTC</option> -->
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

    <div v-if="error" class="alert alert-danger mt-3 text-center">
      {{ error }}
    </div>
    <div class="container-md d-flex align-items-end text-white rounded p-3 mt-0 paymentdiv">
      <CopyReferral button-text="Share Referral" button-class="btn-outline btn-success btn-rounded"
        custom-class="btn-full-width" text-class="fw-bold" custom-message="Referral copied successfully!"
        success-text="Link Copied! ✨" loading-text="Generating link..." default-icon="🚀" success-icon="🎉"
        loading-icon="🔄" />
    </div>


    <!-- Currency Vouchers Component -->
    <div class="container-md p-0 mt-0">
      <CurrencyVouchers />
    </div>

    <!-- Logout Component -->
    <LogoutButton />

  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import DRFapi from '@/utils/drf_api';
import QRCode from 'qrcode.vue';
import OrderList2 from '@/components/OrderList2.vue';
import CurrencyVouchers from '@/components/CurrencyVouchers.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import CopyReferral from '@/components/CopyReferral.vue';
import TotalOrderAmount from '@/components/TotalOrderAmount.vue';
import TotalEarningByUser from '~/components/TotalEarningByUser.vue';

const user = ref(null);
const router = useRouter();
const totalAmount = ref(0);
const totalEarning = ref(0);
const showDetails = ref(false);
const showModal = ref(false);
const loading = ref(false);
const error = ref('');

const form = ref({
  price_amount: '',
  pay_currency: 'usdtbsc'
});

const showQRModal = ref(false);
const paymentUrl = ref('');
const paymentOrderID = ref('');
const paymentPrice = ref('');
const paymentCurrency = ref('');
const paymentPriceCurrency = ref('');
const paymentAddress = ref('');

const totalAsset = computed(() => {
  return (Number(totalEarning.value) || 0) + (Number(totalAmount.value) || 0);
});

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    router.push('/login');
  } else {
    user.value = JSON.parse(storedUser);
    fetchTotalAmount();
  }
});

watch(
  () => user.value?.id,
  (newId) => {
    if (newId) fetchTotalAmount();
  },
  { immediate: true }
);

const fetchTotalAmount = async () => {
  if (!user.value?.id) return;
  try {
    const response = await DRFapi.post('/orders/totalamount/', { user_id: user.value.id });
    // Extract the first value from the object (works for {"2": 123.0} etc.)
    const firstValue = Object.values(response.data)[0];
    totalAmount.value = Number(firstValue) || 0;
  } catch (e) {
    console.error('Failed to fetch total amount:', e);
    totalAmount.value = 0;
  }
};

const createPayment = async () => {
  loading.value = true;
  error.value = '';
  showQRModal.value = false;

  try {
    const drfPayload = {
      user_id: user.value.id,
      order_currency: form.value.pay_currency,
      order_amount: form.value.price_amount
    };

    const drfRes = await DRFapi.post('/orders/create/', drfPayload);

    // Accept response if payment_id exists
    if (drfRes.data && drfRes.data.payment_id) {
      //   paymentUrl.value = drfRes.data.pay_address && drfRes.data.price_amount
      //     ? drfRes.data.pay_address + '?amount=' + drfRes.data.price_amount
      //     : '';
      paymentUrl.value = drfRes.data.pay_address && drfRes.data.price_amount
        ? drfRes.data.pay_address
        : '';
      paymentAddress.value = drfRes.data.pay_address || '';
      paymentOrderID.value = drfRes.data.order_id || '';
      paymentCurrency.value = drfRes.data.price_currency || '';
      paymentPrice.value = drfRes.data.price_amount || '';
      paymentPriceCurrency.value = drfRes.data.pay_currency || '';
      showModal.value = false;
      showQRModal.value = true;
    } else {
      error.value = 'Payment creation failed';
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Payment creation failed.';
    console.error('Error creating payment or order:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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

.btn {
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border: none;
  position: relative;
  overflow: hidden;
}

.btn:hover:not(:disabled),
.btn:focus {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px) scale(1.03);
  opacity: 0.95;
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

.btn-success {
  background: linear-gradient(90deg, #43EA7F 0%, #1D976C 100%);
  color: #fff;
}

.btn-secondary {
  background: linear-gradient(90deg, #BDBDBD 0%, #757575 100%);
  color: #fff;
}


.abled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>