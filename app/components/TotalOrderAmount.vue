<script setup>
import { ref, onMounted, watch } from 'vue';
import DRFapi from '@/utils/drf_api';

const props = defineProps({ userId: { type: [String, Number], required: true } });
const totalAmount = ref(0);
const loading = ref(true);

const fetchTotalAmount = async () => {
  loading.value = true;
  try {
    const response = await DRFapi.post('/orders/totalamount/', { user_id: props.userId });
    const firstValue = Object.values(response.data)[0];
    totalAmount.value = Number(firstValue) || 0;
  } catch (e) {
    totalAmount.value = 0;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (props.userId) fetchTotalAmount();
});

watch(() => props.userId, (newId) => {
  if (newId) fetchTotalAmount();
});
</script>

<template>
  <span v-if="!loading">{{ totalAmount.toFixed(2) }}</span>
  <span v-else>Loading...</span>
</template>
