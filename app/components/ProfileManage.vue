<template>
  <div class="settings-card">
    <div class="profile-header">
      <img src="https://picsum.photos/seed/{{profile.value.uid}}/50/50" class="avatar" alt="avatar" />
      <div>
        <h5>{{ profile.name }}</h5>
        <p class="text-white rounded">{{ profile.email }}</p>
      </div>
    </div>
    <div class="profile-info">
      <div><span>Name:</span> {{ profile.name }}</div>
      <div><span>User Code:</span> {{ profile.uid }} <button class="copy-btn" @click="copyUID">📋</button></div>
      <div><span>Registration Time:</span> {{ profile.registrationTime }}</div>
      <div><span>Subscription:</span> <span class="membership">{{ profile.membership }}</span> 
        <!-- <button class="upgrade-btn">Upgrade</button> -->
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const user = ref(null);

const profile = ref({
  avatar: '/assets/img/9.png',
  name: 'User Name',
  email: 'useremail.pixmintai.com',
  phone: '+1 9876543210',
  uid: 'NA',
  registrationTime: '2025-04-22 15:26:37',
  membership: 'na'
});

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  console.log('Stored User:', storedUser);
  if (!storedUser) {
    router.push('/login');
  } else {
    user.value = JSON.parse(storedUser);
    // Update profile with user data
    profile.value = {
      avatar: '/assets/img/9.png', 
      name: user.value?.name || 'User Name',
      email: user.value?.email || 'useremail@pixmintai.com',
      phone: user.value?.phone || '+1 9876543210',
      uid: user.value?.usercode || 'NA',
      registrationTime: user.value?.registrationTime || '2025-04-22 15:26:37',
      membership: user.value?.membership || 'na'
    };
  }
});
const copyUID = () => navigator.clipboard.writeText(profile.value.uid)
</script>

<style scoped>
.settings-card {
  background: #181c20;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2e3238;
}
.profile-info > div {
  margin-bottom: 0.75rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.membership {
  color: #baff5a;
  font-weight: 600;
}
.copy-btn, .upgrade-btn {
  background: none;
  border: none;
  color: #baff5a;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
}
.copy-btn:hover, .upgrade-btn:hover {
  text-decoration: underline;
}
</style>