<template>
  <div class="earning-history-accordion">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading earning history...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>

    <div v-else-if="earnings.length === 0" class="alert alert-info text-center">
      No earning history found.
    </div>

    <div v-else class="accordion" id="earningHistoryAccordion">
      <div v-for="(earning, index) in earnings" :key="earning.id" class="accordion-item mb-3 rounded">
        <h2 class="accordion-header" :id="'heading' + earning.id">
          <button
            class="accordion-button collapsed bg-secondary text-white"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + earning.id"
            aria-expanded="false"
            :aria-controls="'collapse' + earning.id"
          >
            <div class="d-flex justify-content-between w-100 pe-3">
              <span>Amount: <span class="text-success fw-bold">{{ earning.amount }}</span></span>
              <span class="text-muted">{{ new Date(earning.date).toLocaleDateString() }}</span>
            </div>
          </button>
        </h2>
        <div
          :id="'collapse' + earning.id"
          class="accordion-collapse collapse"
          :aria-labelledby="'heading' + earning.id"
          :data-bs-parent="'#earningHistoryAccordion'"
        >
          <div class="accordion-body bg-dark text-white">
            <p><strong>Type:</strong> <span :class="['badge', earning.type === 'credit' ? 'bg-success' : 'bg-danger']">{{ earning.type }}</span></p>
            <p><strong>Description:</strong> {{ earning.description || 'N/A' }}</p>
            <p><strong>Transaction ID:</strong> {{ earning.transaction_id || 'N/A' }}</p>
            <!-- Add more details as per your earning object structure -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DRFapi from '@/utils/drf_api';
import { useRouter } from 'vue-router';

const router = useRouter();
const earnings = ref([]);
const loading = ref(true);
const error = ref(null);
const user = ref(null);

onMounted(async () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    router.push('/login');
  } else {
    user.value = JSON.parse(storedUser);
    await fetchEarningHistory();
  }
});

const fetchEarningHistory = async () => {
  loading.value = true;
  error.value = null;
  try {
    // This is the placeholder API endpoint. Confirm with backend.
    const response = await DRFapi.post('/earnings/history/', { user_id: user.value.id });
    // Assuming the API returns an array of earning objects with 'id', 'amount', 'date', 'type', 'description', 'transaction_id'
    earnings.value = response.data;
  } catch (err) {
    console.error('Failed to fetch earning history:', err);
    error.value = err.response?.data?.message || 'Failed to load earning history. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.accordion-item {
  border: 1px solid #475569;
  background-color: #1e293b;
}

.accordion-button {
  color: #e2e8f0 !important;
  background-color: #334155 !important;
}

.accordion-button:not(.collapsed) {
  color: #e2e8f0 !important;
  background-color: #475569 !important;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.125);
}

.accordion-body {
  background-color: #0f172a !important;
  color: #e2e8f0;
}

.accordion-button::after {
  filter: invert(1); /* Invert arrow color for dark theme */
}
</style>