<template>
  <div class="history-page">
    <div class="container-md py-3">
      <!-- Page Header -->
      <div class="page-header mb-4">
        <div class="d-flex align-items-center justify-content-between">
          <h1 class="page-title">Transaction History</h1>
          <button @click="$router.back()" class="btn btn-outline-light btn-sm back-btn">
            <i class="bi bi-arrow-left"></i>
            Back
          </button>
        </div>
        <p class="page-subtitle">View your complete order and withdrawal history</p>
      </div>

      <!-- History Accordion Component -->
      <HistoryAccordion />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HistoryAccordion from '@/components/HistoryAccordion.vue'

const router = useRouter()

onMounted(() => {
  // Check if user is logged in
  const user = localStorage.getItem('user')
  if (!user) {
    router.push('/login')
  }
})
</script>

<style scoped>
.history-page {
  min-height: 100vh;
  background: #0f172a;
  color: #e2e8f0;
  padding-top: 80px; /* Account for fixed header */
}

.page-header {
  background: linear-gradient(135deg, #1e293b, #334155);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #475569;
}

.page-title {
  color: #f1f5f9;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  color: #94a3b8;
  font-size: 1.125rem;
  margin: 0.5rem 0 0 0;
}

.back-btn {
  background: transparent;
  border: 1px solid #475569;
  color: #94a3b8;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.back-btn:hover {
  background: #334155;
  border-color: #60a5fa;
  color: #60a5fa;
  transform: translateY(-1px);
}

.back-btn i {
  font-size: 1rem;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .history-page {
    padding-top: 70px;
  }

  .page-header {
    padding: 1.5rem;
    margin-bottom: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .back-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
}

/* Large screens */
@media (min-width: 1024px) {
  .history-page {
    padding-top: 90px;
  }

  .page-header {
    padding: 2.5rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .page-subtitle {
    font-size: 1.25rem;
  }
}

/* Smooth page transitions */
.history-page {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
