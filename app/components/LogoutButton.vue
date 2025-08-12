<template>
  <div class="logout-container">
    <!-- Logout Button -->
    <div class="col-12 text-center">
      <button type="button" class="btn btn-danger logout-btn" @click="showLogoutModal = true">
        <i class="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.6);">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content logout-modal">
          <div class="modal-header border-0 text-center">
            <div class="w-100">
              <div class="logout-icon mb-2">
                <i class="bi bi-exclamation-triangle text-warning"></i>
              </div>
              <h5 class="modal-title text-white">Confirm Logout</h5>
            </div>
          </div>
          <div class="modal-body text-center">
            <p class="text-light mb-4">Are you sure you want to logout from your account?</p>
            <div class="d-flex gap-3 justify-content-center">
              <button type="button" class="btn btn-secondary cancel-btn" @click="showLogoutModal = false">
                <i class="bi bi-x-circle me-1"></i>
                Cancel
              </button>
              <button type="button" class="btn btn-danger confirm-btn" @click="confirmLogout">
                <i class="bi bi-check-circle me-1"></i>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showLogoutModal = ref(false)

const confirmLogout = () => {
  // Clear user data from localStorage
  localStorage.removeItem('user')
  localStorage.removeItem('access_token')
  
  // Close modal
  showLogoutModal.value = false
  
  // Redirect to login page
  router.push('/login')
}
</script>

<style scoped>
.logout-container {
  padding: 1rem 0;
}

/* Logout Button Styles */
.logout-btn {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  border: none;
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.logout-btn:hover {
  background: linear-gradient(135deg, #b91c1c, #991b1b);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
}

.logout-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.logout-btn:hover::before {
  left: 100%;
}

/* Logout Modal Styles */
.logout-modal {
  background: linear-gradient(135deg, #1e293b, #334155);
  border: 1px solid #475569;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.logout-icon {
  font-size: 3rem;
  color: #fbbf24;
}

.cancel-btn {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  border: none;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: linear-gradient(135deg, #4b5563, #374151);
  transform: translateY(-1px);
}

.confirm-btn {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  border: none;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.confirm-btn:hover {
  background: linear-gradient(135deg, #b91c1c, #991b1b);
  transform: translateY(-1px);
}
</style>
