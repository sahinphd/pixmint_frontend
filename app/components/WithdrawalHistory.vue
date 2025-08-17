<template>
  <div class="withdrawals-container">
    <h2 class="withdrawals-title">Withdrawal History</h2>
    
    <div v-if="pending" class="loading-state">
      <div class="spinner"></div>
      <span>Loading withdrawals...</span>
    </div>
    
    <div v-else-if="error" class="error-state">
      <i class="error-icon">⚠️</i>
      {{ error }}
    </div>

    <div v-else-if="withdrawals.length === 0" class="no-withdrawals">
      <i class="empty-icon">💸</i>
      <h3>No withdrawals found</h3>
      <p>You haven't made any withdrawals yet.</p>
    </div>

    <div v-else class="withdrawals-list">
      <div v-for="(w, idx) in withdrawals" :key="idx" class="withdrawal-row">
        <div class="withdrawal-main">
          <div>
            <span class="withdrawal-amount">{{ w.amount }}</span>
            <span class="currency">Balance: {{ w.balance }}</span>
          </div>
          <span class="status-badge" :class="getStatusClass(w.status)">
            {{ w.status }}
          </span>
        </div>
        <div class="withdrawal-details">
          <span class="withdrawal-date">{{ formatDate(w.date) }}</span>
          <span v-if="w.note" class="withdrawal-note">{{ w.note }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DRFapi from '@/utils/drf_api'

const user = ref(null)
const withdrawals = ref([])
const pending = ref(true)
const error = ref(null)

// Sorting and filtering state
const sortBy = ref('date')
const sortOrder = ref('desc')
const filterStatus = ref('')

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  const statusLower = status?.toLowerCase()
  if (statusLower === 'completed' || statusLower === 'success') return 'status-success'
  if (statusLower === 'pending' || statusLower === 'processing') return 'status-pending'
  if (statusLower === 'failed' || statusLower === 'error') return 'status-error'
  return 'status-default'
}

const filteredSortedWithdrawals = computed(() => {
  let filtered = withdrawals.value
  // Filter by status
  if (filterStatus.value) {
    filtered = filtered.filter(w => w.withdrawal_status?.toLowerCase() === filterStatus.value)
  }
  // Sort
  if (sortBy.value === 'amount') {
    filtered = filtered.slice().sort((a, b) => {
      const aAmt = Number(a.withdrawal_amount)
      const bAmt = Number(b.withdrawal_amount)
      return sortOrder.value === 'asc' ? aAmt - bAmt : bAmt - aAmt
    })
  } else if (sortBy.value === 'date') {
    filtered = filtered.slice().sort((a, b) => {
      const aDate = new Date(a.withdrawal_time)
      const bDate = new Date(b.withdrawal_time)
      return sortOrder.value === 'asc' ? aDate - bDate : bDate - aDate
    })
  }
  return filtered
})

const fetchWithdrawals = async (userId) => {
  try {
    const res = await DRFapi.post('/withdraw/history/', { user_id: userId });
    // Map array data to objects
    const withdrawalsArray = res.data.map(item => ({
      amount: item[0],
      balance: item[1],
      date: item[2],
      status: item[3],
      note: item[4] || ''
    }));
    withdrawals.value = withdrawalsArray;
    pending.value = false;
  } catch (err) {
    error.value = err.message || 'Failed to fetch withdrawals';
    pending.value = false;
  }
}

onMounted(async () => {
  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      withdrawals.value = await fetchWithdrawals(user.value.id)
    } else {
      error.value = 'User not logged in'
    }
  } catch (err) {
    error.value = 'Error initializing withdrawals: ' + (err.message || 'Unknown error')
  } finally {
    pending.value = false
  }
})
</script>

<style scoped>
.withdrawals-container {
  max-width: 100%;
  margin: 0;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f172a;
  min-height: 100vh;
  color: #e2e8f0;
}

.withdrawals-title {
  color: #f1f5f9;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 1rem;
  color: #94a3b8;
  font-size: 1rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #1e293b;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  background: #1e1b4b;
  border: 1px solid #3730a3;
  border-radius: 8px;
  padding: 1rem;
  color: #f87171;
  text-align: center;
  font-weight: 500;
}

.no-withdrawals {
  text-align: center;
  padding: 3rem 1rem;
  color: #94a3b8;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.no-withdrawals h3 {
  margin: 1rem 0 0.5rem;
  color: #cbd5e1;
}

.withdrawals-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.withdrawal-row {
  background: linear-gradient(135deg, #1e293b, #334155);
  border: 1px solid #475569;
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.withdrawal-row:hover {
  background: linear-gradient(135deg, #334155, #475569);
  border-color: #64748b;
  transform: translateY(-1px);
}

.withdrawal-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.withdrawal-id {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.id-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e2e8f0;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  align-self: flex-start;
}

.status-success {
  background: #1e40af;
  color: #dbeafe;
}

.status-pending {
  background: #1e3a8a;
  color: #ddd6fe;
}

.status-error {
  background: #991b1b;
  color: #fecaca;
}

.status-default {
  background: #374151;
  color: #d1d5db;
}

.withdrawal-amount {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  flex-direction: column;
  text-align: right;
}

.currency {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.amount {
  font-size: 1.125rem;
  font-weight: 700;
  color: #f59e0b;
}

.withdrawal-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid #475569;
  padding-top: 0.75rem;
}

.withdrawal-date {
  color: #94a3b8;
  font-size: 0.875rem;
}

.withdrawal-address {
  background: #1e293b;
  padding: 0.75rem;
  border-radius: 6px;
  color: #cbd5e1;
  font-size: 0.875rem;
  border-left: 3px solid #3b82f6;
  word-break: break-all;
}

.withdrawal-fee {
  background: #1e293b;
  padding: 0.5rem;
  border-radius: 6px;
  color: #f59e0b;
  font-size: 0.875rem;
  border-left: 3px solid #f59e0b;
}

.withdrawal-error {
  background: #1e1b4b;
  padding: 0.75rem;
  border-radius: 6px;
  color: #f87171;
  font-weight: 500;
  border-left: 3px solid #ef4444;
  font-size: 0.875rem;
}

.error-icon {
  margin-right: 0.5rem;
}

/* Desktop styles */
@media (min-width: 768px) {
  .withdrawals-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .withdrawals-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .withdrawal-row {
    padding: 1.5rem;
  }

  .withdrawal-main {
    margin-bottom: 1rem;
  }

  .withdrawal-id {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .id-text {
    font-size: 1rem;
  }

  .status-badge {
    font-size: 0.875rem;
    padding: 0.375rem 1rem;
  }

  .amount {
    font-size: 1.25rem;
  }

  .withdrawal-details {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .withdrawal-date {
    font-size: 1rem;
  }
}
</style>
