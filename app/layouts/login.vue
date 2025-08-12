<!-- pages/login.vue -->


<template>
    <div class="login-layout">
    <slot />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'login'  // ⬅️ Use layout without header/footer
})
</script>
<style>
.login-layout{
  background-color: #000;;
}
</style>