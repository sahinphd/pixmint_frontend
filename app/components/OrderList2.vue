<template>
  <div class="orders-container">
    <h2 class="orders-title">Your Orders</h2>

    <!-- Sorting and Filtering Controls -->
    <div class="orders-controls">
      <label>
        Sort by:
        <select v-model="sortBy">
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
      </label>
      <label>
        Order:
        <select v-model="sortOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <label>
        Status:
        <select v-model="filterStatus">
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="waiting">Waiting</option>
          <option value="confirmed">Confirmed</option>
        </select>
      </label>
    </div>

    <div v-if="pending" class="loading-state">
      <div class="spinner"></div>
      <span>Loading orders...</span>
    </div>

    <div v-else-if="error" class="error-state">
      <i class="error-icon">⚠️</i>
      {{ error }}
    </div>

    <div v-else-if="filteredSortedOrders.length === 0" class="no-orders">
      <i class="empty-icon">📦</i>
      <h3>No orders found</h3>
      <p>You haven't placed any orders yet.</p>
    </div>

    <div v-else class="orders-list">
      <div v-for="order in filteredSortedOrders" :key="order.order_id" class="order-row">
        <div class="order-main">
          <div class="order-id">
            <span class="id-text">#{{ order.order_id }}</span>
            <span class="status-badge" :class="getStatusClass(order.order_status)">
              {{ order.order_status }}
            </span>
          </div>

          <div class="order-amount">
            <span class="currency">{{ order.order_currency }}</span>
            <span class="amount">{{ order.order_amount }}</span>
          </div>
        </div>

        <div class="order-details">
          <div class="order-date">
            {{ formatDate(order.order_time) }}
          </div>

          <div v-if="order.order_description" class="order-description">
            {{ order.order_description }}
          </div>

          <div v-if="order.order_error" class="order-error">
            <i class="error-icon">⚠️</i>
            {{ order.order_error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DRFapi from '@/utils/drf_api'

const user = ref(null)
const orders = ref([])
const pending = ref(true)
const error = ref(null)

// Sorting and filtering state
const sortBy = ref('date')
const sortOrder = ref('desc')
const filterStatus = ref('')

const filteredSortedOrders = computed(() => {
  let filtered = orders.value
  // Filter by status
  if (filterStatus.value) {
    filtered = filtered.filter(o => o.order_status?.toLowerCase() === filterStatus.value)
  }
  // Sort
  if (sortBy.value === 'amount') {
    filtered = filtered.slice().sort((a, b) => {
      const aAmt = Number(a.order_amount)
      const bAmt = Number(b.order_amount)
      return sortOrder.value === 'asc' ? aAmt - bAmt : bAmt - aAmt
    })
  } else if (sortBy.value === 'date') {
    filtered = filtered.slice().sort((a, b) => {
      const aDate = new Date(a.order_time)
      const bDate = new Date(b.order_time)
      return sortOrder.value === 'asc' ? aDate - bDate : bDate - aDate
    })
  }
  return filtered
})

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

const fetchOrders = async (userId) => {
  try {
    const drfRes = await DRFapi.get('/orders/list/', { user_id: userId })

    if (!drfRes.data) {
      throw new Error('No data returned from API')
    }

    const ordersArray = Object.values(drfRes.data)
    return ordersArray
  } catch (err) {
    console.error('Error fetching orders:', err)
    error.value = err.message || 'Failed to fetch orders'
    return []
  }
}

onMounted(async () => {
  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      orders.value = await fetchOrders(user.value.id)
    } else {
      error.value = 'User not logged in'
    }
  } catch (err) {
    error.value = 'Error initializing orders: ' + (err.message || 'Unknown error')
  } finally {
    pending.value = false
  }
})
</script>

<style scoped>
.orders-container {
  max-width: 100%;
  margin: 0;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f172a;
  min-height: 100vh;
  color: #e2e8f0;
}

.orders-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  background: #1e293b;
  padding: 1rem;
  border-radius: 8px;
}
.orders-controls label {
  color: #cbd5e1;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.orders-controls select, .orders-controls input {
  background: #334155;
  color: #e2e8f0;
  border: 1px solid #475569;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
}

.orders-title {
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

.no-orders {
  text-align: center;
  padding: 3rem 1rem;
  color: #94a3b8;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.no-orders h3 {
  margin: 1rem 0 0.5rem;
  color: #cbd5e1;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.order-row {
  background: linear-gradient(135deg, #1e293b, #334155);
  border: 1px solid #475569;
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.order-row:hover {
  background: linear-gradient(135deg, #334155, #475569);
  border-color: #64748b;
  transform: translateY(-1px);
}

.order-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.order-id {
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

.order-amount {
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
  color: #60a5fa;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid #475569;
  padding-top: 0.75rem;
}

.order-date {
  color: #94a3b8;
  font-size: 0.875rem;
}

.order-description {
  background: #1e293b;
  padding: 0.75rem;
  border-radius: 6px;
  color: #cbd5e1;
  font-style: italic;
  border-left: 3px solid #3b82f6;
  font-size: 0.875rem;
}

.order-error {
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
  .orders-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .orders-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .order-row {
    padding: 1.5rem;
  }

  .order-main {
    margin-bottom: 1rem;
  }

  .order-id {
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

  .order-details {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .order-date {
    font-size: 1rem;
  }
}
</style>
