<template>
  <div class="orders-container">
    <h2 class="Your_Orders">Your Orders</h2>
    <div v-if="pending">Loading orders...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-if="orders.length === 0" class="no-orders">
        No orders found
      </div>
      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.order_id" class="order-item">
          <h3>Order ID: {{ order.order_id }}</h3>
          <div class="row">
            <div class="col-6"><p><strong>Order Currency:</strong>  {{ order.order_currency		 || 'N/A' }}</p></div>
            <div class="col-6"><p><strong>Date:</strong>  {{ formatDate(order.order_time) }}</p></div>
          </div>
          <div class="row">
            <div class="col-6"><p> <strong>Order Amount:</strong>  ${{ order.order_amount	 || 'N/A' }}</p></div>
            <div class="col-6"> <p> <strong>Status:</strong>  {{ order.order_status	 || 'N/A' }}</p></div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DRFapi from '@/utils/drf_api'  // Your axios instance

const user = ref(null)
const orders = ref([])
const pending = ref(true)
const error = ref(null)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const fetchOrders = async (userId) => {
  try {
    // Use POST if your API expects it (adjust accordingly)
    const drfRes = await DRFapi.get('/orders/list/', { user_id: userId })

    if (!drfRes.data) {
      throw new Error('No data returned from API')
    }

    // Convert response object with numeric keys to an array:
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
.Your_Orders{
  color:#fff;
}
.orders-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.orders-list {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}

.order-item {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #000;
}

.error {
  color: red;
  padding: 10px;
  border: 1px solid red;
  border-radius: 4px;
  margin: 10px 0;
}

.no-orders {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>
