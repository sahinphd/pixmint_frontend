<template>
<header class="bg-gray-100 p-4 shadow-md bg-dark text-white header-nav">
    <nav class="navbar  bg-dark text-white">
        <div class="container-fluid bg-dark text-white">
            <a class="navbar-brand bg-dark text-white">Home</a>
            <div>
                <i class="bi bi-bell-fill"></i>
                <span class="visually-hidden">New alerts</span>
                <!-- Optional notification badge -->
                <span class="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle">
                </span>
                <span class="badge ">
                    <button v-if="isLoggedIn" @click="logout" class="btn btn-outline-danger btn-sm " >Logout</button>
                </span>
            </div>

        </div>
    </nav>
</header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const isLoggedIn = ref(false)

onMounted(() => {
  const user = localStorage.getItem('user')
  isLoggedIn.value = !!user
})

function logout() {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.header-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}
nav {
    font-weight: bold;
}
</style>
