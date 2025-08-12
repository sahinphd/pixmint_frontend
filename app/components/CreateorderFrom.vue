<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const orderAmount = ref('')
const orderCurrency = ref('')
const payCurrency = ref('')
const orderStatus = ref('waiting')
const orderLog = ref('')
const paymentAddress = ref('')
const apiLog = ref('')


async function submitOrder() {
  try {
    const payload = {
      order_amount: parseFloat(orderAmount.value),
      order_currency: orderCurrency.value,
      pay_currency: payCurrency.value,
      order_status: orderStatus.value,
      order_log: orderLog.value,
      payment_address: paymentAddress.value,
      api_log: apiLog.value,
    }

    interface OrderResponse {
      order_id: string
      id: string
      order_amount?: number
      order_currency?: string
      pay_currency?: string
      order_status?: string
      order_log?: string
      payment_address?: string
      api_log?: string
    }

    const response = await $fetch<OrderResponse>('http://127.0.0.1:7000/orders/create/', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    alert('Order created! Order ID: ' + response.order_id)
    router.push('/orders/' + response.id)
  } catch (error) {
    console.error('Error creating order:', error)
    alert('Failed to create order')
  }
}
</script>

<template>
  <form @submit.prevent="submitOrder">
    <!-- Your form inputs same as before -->
  </form>
</template>
