
<template>
  <span v-if="!loading" class="total-assets">{{ totalEarning.toFixed(2) }}</span>
  <span v-else>Loading...</span>
</template>

<script setup>

import { ref, onMounted, watch } from 'vue';
import DRFapi from '~/utils/drf_api';

const props = defineProps({ userId: { type: [String, Number], required: true } });
const totalEarning = ref(0);
const loading = ref(true);
const emit = defineEmits(['update:modelValue']);

const fetchTotalEarning = async () => {
  loading.value = true;
  if (props.userId) {
    try {
      const payload = { user_id: props.userId };
      const response = await DRFapi.post('/slab/total_earning_by_user/',{ user_id: props.userId });
      if (response.data.length > 0) {
        const earning = response.data[0].total_earning_amount;
        totalEarning.value = earning;
        emit('update:modelValue', earning);
      } else {
        totalEarning.value = 0;
        emit('update:modelValue', 0);
      }
    } catch (error) {
      totalEarning.value = 0;
      emit('update:modelValue', 0);
      console.error('Error fetching total earning:', error);
    }
  }
  loading.value = false;
};

onMounted(() => {
  if (props.userId) fetchTotalEarning();
});

watch(() => props.userId, (newId) => {
  if (newId) fetchTotalEarning();
});
</script>
