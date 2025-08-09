<script setup>
// Nuxt 4 uses `useRouter` from '#app' for navigation control
import { useRouter } from '#app'

const router = useRouter()

// Redirect immediately on mount
router.replace('/register/0726252')
</script>

<template>
  <!-- Optional: Loading UI during redirect -->
  <div class="redirecting">
    Redirecting to default referral code...
  </div>
</template>

<style scoped>
.redirecting {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
</style>
