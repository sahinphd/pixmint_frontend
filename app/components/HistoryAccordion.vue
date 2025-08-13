<template>
  <div class="history-accordion">
    <div class="accordion-header">
      <div class="row">
        <div class="col-6">
          <h5 class="section-title">Orders</h5>
        </div>
        <div class="col-6">
          <h5 class="section-title">Withdrawals</h5>
        </div>
      </div>
    </div>
    
    <div class="accordion-tabs">
      <button 
        @click="activeTab = 'orders'" 
        :class="['tab-btn', { 'active': activeTab === 'orders' }]"
      >
        <i class="tab-icon">📦</i>
        Orders
      </button>
      <button 
        @click="activeTab = 'withdrawals'" 
        :class="['tab-btn', { 'active': activeTab === 'withdrawals' }]"
      >
        <i class="tab-icon">💸</i>
        Withdrawals
      </button>
    </div>

    <div class="accordion-content">
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'orders'" key="orders" class="tab-content">
          <OrderList2 />
        </div>
        <div v-else-if="activeTab === 'withdrawals'" key="withdrawals" class="tab-content">
          <WithdrawalHistory />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OrderList2 from './OrderList2.vue'
import WithdrawalHistory from './WithdrawalHistory.vue'

const activeTab = ref('orders')
</script>

<style scoped>
.history-accordion {
  background: #000;
  border-radius: 12px;
  /* padding: 1.5rem; */
  margin: 1rem 0;
  color: #e2e8f0;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.accordion-header {
  position: relative;
  margin-bottom: 1rem;
}

.section-title {
  color: #60a5fa;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.accordion-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.tab-btn {
  flex: 1;
  background: #334155;
  border: none;
  color: #94a3b8;
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.tab-btn:hover {
  background: #475569;
  color: #cbd5e1;
  transform: translateY(-1px);
}

.tab-btn.active {
  background: #60a5fa;
  color: #ffffff;
  font-weight: 600;
}

.tab-icon {
  font-size: 1rem;
}

.accordion-content {
  background: #334155;
  border-radius: 8px;
  min-height: 200px;
  position: relative;
}

.tab-content {
  padding: 0;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .accordion-tabs {
    gap: 0.5rem;
  }

  .tab-btn {
    padding: 0.875rem 0.5rem;
    font-size: 0.75rem;
  }

  .tab-icon {
    font-size: 0.875rem;
  }

  .close-btn {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }

  .section-title {
    font-size: 1rem;
  }
}

/* Large screens */
@media (min-width: 1024px) {
  .history-accordion {
    padding: 2rem;
  }

  .tab-btn {
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
  }
}
</style>
