<template>
  <button 
    :class="[
      'copy-referral-btn', 
      buttonClass,
      customClass,
      { 
        'loading': loading, 
        'copied': copied,
        'disabled': loading 
      }
    ]" 
    :style="customStyle"
    @click="copyReferralLink"
    :disabled="loading"
  >
    <i v-if="!loading && !copied" :class="['btn-icon', iconClass]">{{ defaultIcon }}</i>
    <i v-if="loading" :class="['btn-icon spinner', loadingIconClass]">{{ loadingIcon }}</i>
    <i v-if="copied && !loading" :class="['btn-icon', successIconClass]">{{ successIcon }}</i>
    <span :class="['btn-text', textClass]">{{ buttonText }}</span>
  </button>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
const props = defineProps({
  buttonText: {
    type: String,
    default: 'Copy Referral'
  },
  buttonClass: {
    type: String,
    default: 'btn-primary'
  },
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: [Object, String],
    default: () => ({})
  },
  textClass: {
    type: String,
    default: ''
  },
  iconClass: {
    type: String,
    default: ''
  },
  loadingIconClass: {
    type: String,
    default: ''
  },
  successIconClass: {
    type: String,
    default: ''
  },
  defaultIcon: {
    type: String,
    default: '🔗'
  },
  loadingIcon: {
    type: String,
    default: '⟳'
  },
  successIcon: {
    type: String,
    default: '✓'
  },
  showToast: {
    type: Boolean,
    default: true
  },
  customMessage: {
    type: String,
    default: ''
  },
  loadingText: {
    type: String,
    default: 'Copying...'
  },
  successText: {
    type: String,
    default: 'Copied!'
  }
})

// Reactive state
const user = ref(null)
const loading = ref(false)
const copied = ref(false)

// Computed button text based on state
const displayText = computed(() => {
  if (loading.value) return props.loadingText
  if (copied.value) return props.successText
  return props.buttonText
})

const buttonText = computed(() => displayText.value)

// Load user data on mount
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})

// Copy referral link function
const copyReferralLink = async () => {
  if (!user.value || !user.value.usercode) {
    if (props.showToast) {
      alert('User not found or no referral code available')
    }
    return
  }

  loading.value = true
  
  try {
    console.log('Copying referral for user:', user.value.usercode)
    
    const encryptedCode = user.value.usercode
    const baseUrl = window.location.origin
    const fullUrl = `${baseUrl}/register/${encodeURIComponent(encryptedCode)}`

    await navigator.clipboard.writeText(fullUrl)
    
    // Show success state
    copied.value = true
    
    if (props.showToast) {
      const message = props.customMessage || `Referral link copied: ${fullUrl}`
      alert(message)
    }
    
    // Reset copied state after 3 seconds
    setTimeout(() => {
      copied.value = false
    }, 3000)
    
  } catch (err) {
    console.error('Failed to copy referral link:', err)
    if (props.showToast) {
      alert('Copy failed. Please try again.')
    }
  } finally {
    loading.value = false
  }
}

// Expose function for parent components
defineExpose({
  copyReferralLink
})
</script>

<style scoped>
/* Base button styles - easily overridable */
.copy-referral-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  min-width: 140px;
  justify-content: center;
  font-family: inherit;
  line-height: 1.5;
}

.copy-referral-btn:disabled,
.copy-referral-btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

/* State classes for additional styling */
.copy-referral-btn.loading {
  opacity: 0.8;
}

.copy-referral-btn.copied {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Default primary style - can be overridden */
.copy-referral-btn.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.copy-referral-btn.btn-primary:hover:not(:disabled):not(.disabled) {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

/* Orange/Warning style */
.copy-referral-btn.btn-warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.copy-referral-btn.btn-warning:hover:not(:disabled):not(.disabled) {
  background: linear-gradient(135deg, #d97706, #b45309);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
}

/* Success style */
.copy-referral-btn.btn-success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.copy-referral-btn.btn-success:hover:not(:disabled):not(.disabled) {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

/* Light style */
.copy-referral-btn.btn-light {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  color: #1e293b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.copy-referral-btn.btn-light:hover:not(:disabled):not(.disabled) {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

/* Dark style */
.copy-referral-btn.btn-dark {
  background: linear-gradient(135deg, #374151, #1f2937);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.copy-referral-btn.btn-dark:hover:not(:disabled):not(.disabled) {
  background: linear-gradient(135deg, #1f2937, #111827);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

/* Icon styles - easily customizable */
.btn-icon {
  font-size: 1.125rem;
  transition: transform 0.3s ease;
  display: inline-block;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Text styles - easily customizable */
.btn-text {
  font-weight: 600;
  letter-spacing: 0.025em;
  display: inline-block;
}

/* Size variants - easily extensible */
.copy-referral-btn.btn-compact {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  min-width: 100px;
}

.copy-referral-btn.btn-compact .btn-icon {
  font-size: 1rem;
}

.copy-referral-btn.btn-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  min-width: 160px;
}

.copy-referral-btn.btn-large .btn-icon {
  font-size: 1.25rem;
}

.copy-referral-btn.btn-xl {
  padding: 1.25rem 2.5rem;
  font-size: 1.25rem;
  min-width: 180px;
}

.copy-referral-btn.btn-xl .btn-icon {
  font-size: 1.5rem;
}

/* Outline variants */
.copy-referral-btn.btn-outline {
  background: transparent !important;
  border: 2px solid currentColor;
  box-shadow: none !important;
}

.copy-referral-btn.btn-outline.btn-primary {
  color: #3b82f6;
  border-color: #3b82f6;
}

.copy-referral-btn.btn-outline.btn-primary:hover:not(:disabled):not(.disabled) {
  background: #3b82f6 !important;
  color: white;
}

.copy-referral-btn.btn-outline.btn-warning {
  color: #f59e0b;
  border-color: #f59e0b;
}

.copy-referral-btn.btn-outline.btn-warning:hover:not(:disabled):not(.disabled) {
  background: #f59e0b !important;
  color: white;
}

.copy-referral-btn.btn-outline.btn-success {
  color: #10b981;
  border-color: #10b981;
}

.copy-referral-btn.btn-outline.btn-success:hover:not(:disabled):not(.disabled) {
  background: #10b981 !important;
  color: white;
}

/* Rounded variants */
.copy-referral-btn.btn-rounded {
  border-radius: 50px;
}

.copy-referral-btn.btn-square {
  border-radius: 4px;
}

.copy-referral-btn.btn-no-radius {
  border-radius: 0;
}

/* Shadow variants */
.copy-referral-btn.btn-no-shadow {
  box-shadow: none !important;
}

.copy-referral-btn.btn-heavy-shadow {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
}

/* Custom width variants */
.copy-referral-btn.btn-full-width {
  width: 100%;
  min-width: auto;
}

.copy-referral-btn.btn-auto-width {
  min-width: auto;
  width: auto;
}

/* Responsive design */
@media (max-width: 768px) {
  .copy-referral-btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    min-width: 120px;
  }
  
  .btn-icon {
    font-size: 1rem;
  }
  
  .copy-referral-btn.btn-responsive-compact {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
    min-width: 90px;
  }
}

/* Animation variants */
.copy-referral-btn.btn-no-animation {
  transition: none !important;
}

.copy-referral-btn.btn-slow-animation {
  transition: all 0.6s ease !important;
}

.copy-referral-btn.btn-fast-animation {
  transition: all 0.15s ease !important;
}

/* Hover effect variants */
.copy-referral-btn.btn-no-hover:hover {
  transform: none !important;
  box-shadow: inherit !important;
}

.copy-referral-btn.btn-scale-hover:hover:not(:disabled):not(.disabled) {
  transform: scale(1.05) !important;
}

.copy-referral-btn.btn-rotate-hover:hover:not(:disabled):not(.disabled) {
  transform: rotate(2deg) !important;
}

/* Text alignment variants */
.copy-referral-btn.btn-text-left {
  justify-content: flex-start;
}

.copy-referral-btn.btn-text-right {
  justify-content: flex-end;
}

/* Icon position variants */
.copy-referral-btn.btn-icon-right {
  flex-direction: row-reverse;
}

.copy-referral-btn.btn-icon-only {
  min-width: auto;
  width: auto;
  aspect-ratio: 1;
}

.copy-referral-btn.btn-icon-only .btn-text {
  display: none;
}
</style>
