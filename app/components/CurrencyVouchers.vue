<template>
  <div class="currency-vouchers-container">
    <div class="row">
      <div class="col-6">
        <h5 class="section-title">Currency</h5>
      </div>
      <div class="col-6">
        <h5 class="section-title">Vouchers</h5>
      </div>
    </div>
    <div class="currency-item">
      <div class="row align-items-center">
        <div class="col-2">
          <div class="currency-icon pix-icon">
            <span class="currency-symbol">P</span>
          </div>
        </div>
        <div class="col-4">
          <div class="currency-info">
            <h6 class="currency-name">PIX</h6>
            <small class="currency-desc">Pix Mint</small>
          </div>
        </div>
        <div class="col-3">
          <div class="voucher-count">1</div>
        </div>
        <div class="col-3">
          <div class="voucher-value">0.07 USDT</div>
        </div>
      </div>
    </div>

    <div class="currency-item">
      <div class="row align-items-center">
        <div class="col-2">
          <div class="currency-icon usdt-icon">
            <span class="currency-symbol">₮</span>
          </div>
        </div>
        <div class="col-4">
          <div class="currency-info">
            <h6 class="currency-name">USDT</h6>
            <small class="currency-desc">Tether US</small>
          </div>
        </div>
        <div class="col-3">
          <div class="voucher-count">1</div>
        </div>
        <div class="col-3">
          <div class="voucher-value">1 USD</div>
        </div>
      </div>
    </div>

    <div class="currency-item">
      <div class="row align-items-center">
        <div class="col-2">
          <div class="currency-icon usdc-icon">
            <span class="currency-symbol">$</span>
          </div>
        </div>
        <div class="col-4">
          <div class="currency-info">
            <h6 class="currency-name">USDC</h6>
            <small class="currency-desc">Tether UC</small>
          </div>
        </div>
        <div class="col-3">
          <div class="voucher-count">0</div>
        </div>
        <div class="col-3">
          <div class="voucher-value">0 USD</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currencies = ref([
  {
    name: 'USDT',
    description: 'Tether US',
    icon: '₮',
    iconClass: 'usdt-icon',
    vouchers: 0,
    value: '0 USD'
  },
  {
    name: 'USDC',
    description: 'Tether UC',
    icon: '$',
    iconClass: 'usdc-icon',
    vouchers: 0,
    value: '0 USD'
  }
])
</script>

<style scoped>
.currency-vouchers-container {
  background: #1e293b;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  color: #e2e8f0;
}

.section-title {
  color: #60a5fa;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.currency-item {
  background: #334155;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
}

.currency-item:hover {
  background: #475569;
  transform: translateY(-1px);
}

.currency-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
}
.pix-icon {
  background: linear-gradient(135deg, #3126d0, #594fde);
  color: white;
}
.usdt-icon {
  background: linear-gradient(135deg, #26d0ce, #1a9999);
  color: white;
}

.usdc-icon {
  background: linear-gradient(135deg, #2775ca, #1e5f99);
  color: white;
}

.currency-info {
  text-align: left;
}

.currency-name {
  color: #f1f5f9;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.currency-desc {
  color: #94a3b8;
  font-size: 0.75rem;
}

.voucher-count {
  color: #f1f5f9;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
}

.voucher-value {
  color: #94a3b8;
  font-size: 0.875rem;
  text-align: center;
}
</style>
