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
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}
.defaultLayout {
  background-color: black;
}
.defaultSlot{
  padding: 40px 0;
  margin: 40px 0;
}
</style>




