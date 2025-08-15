<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="row w-100 d-flex justify-content-center align-items-center card-parent">
      <div class="col-md-6 ">
        <div class="card border shadow-sm p-3 mb-2 bg-body-tertiary rounded">
          <h2>Login</h2>
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <input v-model="userid" placeholder="Mobile Number without country code (Login ID)" class="form-control mb-2">
              <input v-model="password" type="password" placeholder="Password" class="form-control mb-2">
              <button type="submit" class="btn btn-warning mb-2">Login</button>
              <p v-if="error" class="text-danger">{{ error }}</p>
            </div>
          </form>
          <div class="col-12 text-center mt-2">
            <small>Forgot Password? &nbsp;<a href="#" @click.prevent="$router.push('/login')" class="text-danger">Reset
                Password</a>
            </small>
          </div>

        </div>
        <div class="container d-flex justify-content-center col-12 align-items-center text-center mt-3">
          <div class="col-12">
            <GooglePlayButton />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
// import { loginUser } from "~/utils/auth"; // talks to DRF backend
// import { useAuth } from "~/utils/stores/auth";
import { loginUser } from "~/utils/auth"; // talks to DRF backend
import { useAuth } from "~/utils/stores";

definePageMeta({
  layout: "login" // layout without header/footer
});

const userid = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const auth = useAuth();


const handleLogin = async () => {
  error.value = "";
  try {
    const tokens = await loginUser(userid.value, password.value);
    // Save tokens in auth composable
    auth.setTokens(tokens);
    // Save user info (if any) separately, or just a flag
    // localStorage.setItem("user", JSON.stringify({ userid: userid.value }));
    localStorage.setItem("user", JSON.stringify({
      id: tokens.id,
      userid: tokens.userid,
      name: tokens.name,
      usercode: tokens.usercode,
      refarcode: tokens.refarcode
    }));
    // Redirect to index
    await router.push("/");
  } catch {
    error.value = "Invalid login credentials";
  }
};
</script>
<style>
.card-parent {
  /* background-color: #000; */
  padding: 0;
}

.card {
  background-color: #000;
  background-image: url('../assets/img/login.png');
  background-size: cover;
  background-position: center;
  color: #fff;
}
</style>
