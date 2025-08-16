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
      <div
        v-for="(earning, index) in earnings"
        :key="index"
        class="accordion-item mb-3 rounded"
      >
        <h2 class="accordion-header" :id="'heading' + index">
          <button
            class="accordion-button collapsed bg-secondary text-white"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + index"
            aria-expanded="false"
            :aria-controls="'collapse' + index"
          >
            <div class="d-flex justify-content-between w-100 pe-3">
              <span>
                Amount:
                <span class="text-success fw-bold">
                  {{ earning.earning_amount }} {{ earning.currency }}
                </span>
              </span>
              <span class="text-white">
                {{ new Date(earning.datetime).toLocaleDateString() }}
              </span>
            </div>
          </button>
        </h2>
        <div
          :id="'collapse' + index"
          class="accordion-collapse collapse"
          :aria-labelledby="'heading' + index"
          :data-bs-parent="'#earningHistoryAccordion'"
        >
          <div class="accordion-body bg-dark text-white">
            <p>
              <strong>Type:</strong>
              <span class="badge bg-success">{{ earning.earning_type }}</span>
            </p>
            <p><strong>Reason:</strong> {{ earning.reason || 'N/A' }}</p>
            <p><strong>Earning From:</strong> {{ earning.earning_from }}</p>
            <p><strong>Date & Time:</strong> {{ new Date(earning.datetime).toLocaleString() }}</p>
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
    const response = await DRFapi.post('/slab/earning_list_by_user/', {
      user_id: user.value.id,
    });

    // ✅ Directly assign since API already returns array
    earnings.value = response.data;

    console.log('Earning history fetched successfully:', earnings.value);
  } catch (err) {
    console.error('Failed to fetch earning history:', err);
    error.value =
      err.response?.data?.message ||
      'Failed to load earning history. Please try again.';
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