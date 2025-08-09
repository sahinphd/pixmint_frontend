<template>
  <div class="defaultLayout">
    <HeaderMenu />
    <div class="defaultSlot">
      <slot />
    </div>
    
    <FooterNav/>
  </div>
</template>




<style scoped>
.defaultLayout {
  background-color: black;
}
.defaultSlot{
  padding: 60px 0;
  margin: 60px 0;
}
</style>




