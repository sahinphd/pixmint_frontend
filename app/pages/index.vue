<template>
  <div v-if="user">
    <div class="container-lg text-white">
      <div class="row">
        <div class="col-4" @click="openChat">
          <div class="card border shadow-sm p-1 mb-2 bg-body-tertiary rounded chatroom">
            <h6>Chat Room</h6>
            <img src="../assets/img/2.png" alt="Chat Room" class="img-fluid mb-2 rounded float-right card-image">
          </div>
        </div>
        <div class="col-8 ps-0 m-0" @click="openChat">
          <div class="card border shadow-sm p-3 mb-0 bg-body-tertiary rounded scaceCard">
            <h4>Space Battle Royale</h4>
            <img src="../assets/img/4.png" alt="Chat Room" class="img-fluid mb-2 rounded space-battle-img">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12" >
          <div class="card border shadow-sm p-3 mb-2 bg-body-tertiary rounded ecomservice d-flex flex-row">
            <div class="flex-fill flex-grow-1">
            <h4>PIX MINT AI</h4>
            <p>Image Generation Ai Chat Service Platform</p>

            <CopyReferral 
              button-text="Copy Referral" 
              button-class="btn-warning" 
              custom-message="Referral link copied successfully!" 
            />
            </div>
              
            <img src="../assets/img/5.png" alt="Chat Room" class="img-fluid mb-2 rounded card-image pix-card-img">
          </div>
        </div>
      </div>
      <!-- 3rdsection -->
      <div class="row">
        <div class="col-12" @click="openChat">
          <div class="card border shadow-sm mb-2 bg-body-tertiary rounded earningdiv">
            <div class="m-2">
              <h4>Team Earnings</h4>
              <div>
                <p class="lh-sm">Daily income</p>
                <p class="lh-sm">~12% ~3%</p>
                <p class="lh-sm">Investment amount</p>
                <p class="lh-sm">30 - 1000 USDT</p>
              </div>
              
            </div>
            
          </div>
        </div>
        <div class="col-12" @click="openChat">
          <div class="row">
            <div class="col-12" @click="openChat">
              <div
                class="card border shadow-sm p-3 mb-2 bg-body-tertiary rounded aipainting"
              >
                <h4>AI Painting</h4>
                <p>Wensheng Picture</p>
              </div>
            </div>
            <div class="col-12"><div
                class="card border shadow-sm p-3 mb-2 bg-body-tertiary rounded airobot"
              >
                <h4>AI Chat robot</h4>
                <p>Have an open chat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- MARQUEE -->
      <div class="row">
        <div class="col-12 mb-2" @click="openChat">
          <div class="row">
            
            <div class="col-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 6.5v11H1v-11zm2 11.71l8 4.5V1.29l-8 4.5zM21.581 7.78l-.602-.799l-1.596 1.206l.602.798a5 5 0 0 1-.002 6.03l-.603.797l1.595 1.206l.603-.797a7 7 0 0 0 .003-8.442"/><path fill="currentColor" d="m18.789 9.889l-.603-.798l-1.596 1.205l.603.798a1.5 1.5 0 0 1 0 1.809l-.604.797l1.595 1.207l.603-.798a3.5 3.5 0 0 0 .002-4.22"/></svg>
            </div>
            <div class="col-11">
              <MarqueeText />
            </div>
          </div>
        </div>
      </div>
    
    </div>
    <AppAlert> </AppAlert>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MarqueeText from '@/components/MarqueeText.vue'
import CopyReferral from '@/components/CopyReferral.vue'
import { useRouter } from 'vue-router'
// import AES from 'crypto-js/aes'
// import Utf8 from 'crypto-js/enc-utf8'

const user = ref(null)
const router = useRouter()


// const secretKey = 'a#T2@Lk!7r^9z*Xq' 

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    router.push('/login') // 🔐 redirect if not logged in
  } else {
    user.value = JSON.parse(storedUser)
    console.log('User Store Values:', user.value)
  }  
})

function openChat() {
  // router.push('/chat')
  router.push('/comingsoon')
  // alert('Coming Soon')
}
// function logout() {
//   localStorage.removeItem('user')
//   router.push('/login')
// }
</script>


<style>
*{
  color: #fff;
}
.pix-card-img{
  max-width: 40% !important;
}
.refBtn{
  background: #ed9a31 !important;
}
.card-image{
  max-width: 150px;
  max-height: auto;
}
.chatroom{
  background-color: #068882 !important;
  color: #fff !important;
}
.scaceCard{
  background-image: url('../assets/img/explore3.png');
    background-size: cover;
    background-position: center;
    color: #fff;
  position: relative;
  min-height: 95%;
}
.scaceCard > h4{
  position: absolute;
  bottom: 12px;
}
.space-battle-img{
 position: absolute; 
  max-width: 150px;
 top:-50px;
 left: 15%;
}
.ecomservice{
  background-image: url('../assets/img/store_bg.png'); 
  background-size: cover; 
  background-position: center;
  color: #fff;
  }
  .earningdiv{
  background-image: url('../assets/img/Investment.png');
  background-size: cover; 
  background-position: center;
  color: #fff;
  }
  .aipainting{
    background-image: url('../assets/img/explore10.png');
    background-size: cover;
    background-position: center;
    color: #fff;
  }
  .airobot{
    background-image: url('../assets/img/explore9.png');
    background-size: cover;
    background-position: center;
    color: #fff;
  }
</style>

