<template>
<footer class="footer-nav bg-dark py-3">
    <div class="d-flex justify-content-around align-items-center">
        <nuxt-link to="/" class="nav-icon" :class="{ active: route.path === '/' }">
            <i class="bi bi-compass-fill"></i>
        </nuxt-link>
        <nuxt-link to="/about" class="nav-icon" 
        :class="{ active: route.path === '/about' }">
            <i class="bi bi-graph-up"></i>
        </nuxt-link>
        <nuxt-link to="/chat" class="nav-icon" :class="{ active: route.path === '/chat' }">
            <i class="bi bi-chat-dots"></i>
        </nuxt-link>
        <nuxt-link to="/profile" class="nav-icon" :class="{ active: route.path === '/profile' }">
            <i class="bi bi-person"></i>
        </nuxt-link>
    </div>
</footer>
</template>

<script setup lang="ts">
// import {
//     useRoute
// } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.footer-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.nav-icon {
    font-size: 1.5rem;
    color: #fff;
    transition: color 0.3s ease;
    border-radius: 50%;
    padding: 7px 14px;
    width: 50px;
    height: 50px;
    color: #fff;
}
.nav-icon.active{
    color: #fff;
}
.nav-icon.active,
.nav-icon:hover {
    color: white;
    background-color: white;
    color: #1d2a4d;
    border-radius: 50%;
    padding: 7px 12px;
    width: 50px;
    height: 50px;
}
</style>
