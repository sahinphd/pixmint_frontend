<template>
  <VueQrcode :value="value" :width="200" :height="200" />
</template>

<script setup>
import VueQrcode from '@chenfengyuan/vue-qrcode';

defineProps({
  value: {
    type: String,
    default: ''
  }
});
</script>