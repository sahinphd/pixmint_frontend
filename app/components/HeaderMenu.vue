<template>
    <header :class="['bg-gray-100 px-4 pt-0 pb-1 shadow-md text-white header-nav', { 'header-hidden': isHeaderHidden }]">
        <nav class="navbar   text-white">
            <div class="container-fluid text-white text-align-center p-0 m-0 d-flex justify-content-center align-items-center">
                
                <GlowingBrand class="subtle" /> <!-- Gentler bang effect -->
                <!-- <div>
                    <i class="bi bi-bell-fill"></i>
                    <span class="visually-hidden">New alerts</span>                  
                    <span class="">
                        <button v-if="isLoggedIn" @click="logout" class="btn btn-outline-danger btn-sm logout-btn">
                            <i class="bi bi-box-arrow-right"></i>
                            <span class="d-none d-md-inline logout-text">Logout</span>
                        </button>
                    </span>
                </div> -->

            </div>
        </nav>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import GlowingBrand from './GlowingBrand.vue'

const router = useRouter()
const isLoggedIn = ref(false)
const isHeaderHidden = ref(false)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Hide header when scrolling up 100px or more
  if (currentScrollY >= 100) {
    isHeaderHidden.value = true
  } else {
    isHeaderHidden.value = false
  }
  
  lastScrollY = currentScrollY
}

onMounted(() => {
    const user = localStorage.getItem('user')
    isLoggedIn.value = !!user
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    // Clean up scroll event listener
    window.removeEventListener('scroll', handleScroll)
})

function logout() {
    localStorage.removeItem('user')
    router.push('/login')
}
</script>

<style scoped>
* {
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
    /* background: linear-gradient(to bottom, #172b3a, #343a40, #000); */
    border-radius: 0px 0px 15px 15px;
    transition: transform 0.3s ease-in-out;
    /* background: linear-gradient(180deg, #172b3a, #0000008a); 
     background: linear-gradient(to bottom, #212529, #343a40 , #212529 );
     */
}

.header-nav.header-hidden {
    transform: translateY(-100%);
}

nav {
    font-weight: bold;
}
</style>
