<template>
  <div class="dark-page">
    <div class="container-sm text-white">
      <div class="row my-0 py-0">
        <div class="col-12 text-center content-container">
          <a href="https://pixmintai.com/#telegram">
          <div class="p-3">


          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-9z"/></svg>
                     </div></a>
           <h2 class="mt-4">Coming Soon</h2>
          <p>This page is under construction. We're working hard to bring you something amazing!</p>
       
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// This page is static, no script needed.
</script>

<style scoped>
.dark-page {
  position: relative;
  color: #fff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
}

.dark-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.content-container {
  position: relative;
  z-index: 2;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
