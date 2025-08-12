<template>
    <header class="bg-gray-100 p-4 shadow-md text-white header-nav">
        <nav class="navbar   text-white">
            <div class="container-fluid  text-white">
                <a class="navbar-brand  text-white">Home</a>
                <div>
                    <i class="bi bi-bell-fill"></i>
                    <span class="visually-hidden">New alerts</span>
                    <!-- Optional notification badge -->
                    <span class="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle">
                    </span>
                    <span class="badge ">
                        <button v-if="isLoggedIn" @click="logout" class="btn btn-outline-danger btn-sm ">Logout</button>
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
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
}
.header-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: linear-gradient(to bottom, #172b3a, #343a40 , #212529 );
    border-radius: 0px 0px 15px 15px;
    /* background: linear-gradient(180deg, #172b3a, #0000008a); 
     background: linear-gradient(to bottom, #212529, #343a40 , #212529 );
     */
}

nav {
    font-weight: bold;
}
</style>
