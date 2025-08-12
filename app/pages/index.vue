<template>
  <div v-if="user">
    <div class="container-lg bg-dark text-white">
      <div class="row">
        <div class="col-4" @click="openChat">
          <div class="card border shadow-sm p-1 mb-2 bg-body-tertiary rounded chatroom">
            <h6>Chat Room</h6>
            <img src="../assets/img/2.png" alt="Chat Room" class="img-fluid mb-2 rounded float-right card-image">
          </div>
        </div>
        <div class="col-8" @click="openChat">
          <div class="card border shadow-sm p-3 mb-2 bg-body-tertiary rounded scaceCard">
            <h4>Space Battle Royale</h4>
            <img src="../assets/img/4.png" alt="Chat Room" class="img-fluid mb-2 rounded space-battle-img">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12" >
          <div class="card border shadow-sm p-3 mb-2 bg-body-tertiary rounded ecomservice d-flex flex-row">
            <div class="flex-fill flex-grow-1">
            <h4>PIX MINt AI</h4>
            <p>Image Generation Ai Chat Service Platform</p>

            <button class="btn btn-light me-2 px-5 refBtn" @click="copyReferralLink">
                Copy Referral
              </button>
            </div>
              
            <img src="../assets/img/5.png" alt="Chat Room" class="img-fluid mb-2 rounded card-image pix-card-img">
          </div>
        </div>
      </div>
      <!-- 3rdsection -->
      <div class="row">
        <div class="col-6" @click="openChat">
          <div class="card border shadow-sm mb-2 bg-body-tertiary rounded earningdiv">
            <div class="m-2">
              <h4>Cooperative Earnings</h4>
              <div>
                <p class="lh-sm">Daily income</p>
                <p class="lh-sm">~2% ~3%</p>
                <p class="lh-sm">Investment amount</p>
                <p class="lh-sm">100 - 1000000 USD</p>
              </div>
              
            </div>
            
          </div>
        </div>
        <div class="col-6" @click="openChat">
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
              <marquee>
                <p>
                  UID 717***535 Purchased 113 SAT LV1 Investment package UID 486***910 Purchased 381 SAT LV1 Investment package UID 638***648 Purchased 103 SAT LV1 Investment package  UID 217***460 Purchased 187 SAT LV1 Investment package  UID 216***409 Purchased 19960 SAT LV3 Investment package  UID 783***442 Purchased 99 SAT LV1 Investment package  UID 349***446 Purchased 1688 SAT LV1 Investment package  UID 834***231 Purchased 199 SAT LV1 Investment package  UID 181***813 Purchased 1000 SUSD LV2 Investment package  UID 655***939 Purchased 107 SAT LV1 Investment package  UID 888***138 Purchased 2955 SAT LV2 Investment package  UID 517***540 Purchased 159 SAT LV1 Investment package UID 281***400 Purchased 141 SAT LV1 Investment package  UID 376***324 Purchased 319 SAT LV1 Investment package  UID 481***846 Purchased 147 SAT LV1 Investment package   UID 344***244 Purchased 145 SAT LV1 Investment package   UID 843***038 Purchased 113 SAT LV1 Investment package  
                </p>
              </marquee>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h1>...</h1>
        </div>
      </div>
    </div>
    <AppAlert> ...</AppAlert>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
  router.push('/chat')
}

// Function to copy referral link

const copyReferralLink = async () => {
  console.log("Clcked" + user.value.id);
  
  // if (!user.value) return
  // const encryptedCode = AES.encrypt(user.value.usercode, secretKey).toString()
  // console.log("encryptedCode"+encryptedCode);
  // const baseUrl = window.location.origin
  // console.log(baseUrl);
  
  // const fullUrl = `${baseUrl}/register/${encodeURIComponent(encryptedCode)}`

  // try {
  //   await navigator.clipboard.writeText(fullUrl)
  //   alert('Referral link copied: ' + fullUrl)
  // } catch (err) {
  //   console.error('Failed to copy:', err)
  //   alert('Copy failed. Please try again.')
  // }
  if (!user.value || !user.value.usercode) return

  console.log('Clicked', user.value.usercode)

  // const encryptedCode = AES.encrypt(user.value.usercode, secretKey).toString()
  const encryptedCode =user.value.usercode
  console.log('Encrypted Code:', encryptedCode)

  const baseUrl = window.location.origin
  const fullUrl = `${baseUrl}/register/${encodeURIComponent(encryptedCode)}`

  try {
    await navigator.clipboard.writeText(fullUrl)
    alert('Referral link copied: ' + fullUrl)
  } catch (err) {
    console.error('Failed to copy:', err)
    alert('Copy failed. Please try again.')
  }
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

