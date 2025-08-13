<!-- pages/login.vue -->


<template>
    <div class="register-layout pt-5">
    <slot />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'register'  // ⬅️ Use layout without header/footer
})
</script>
<style>
.register-layout{
  background-color: #0000003b;  
   background-image: url('../assets/img/register-dark.png');
   min-height: 100vh;
}
</style>