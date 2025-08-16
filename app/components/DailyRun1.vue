<template>
  <div class="daily-run-card">
    <div class="card border shadow-sm px-3 mb-2 bg-body-tertiary rounded daily-run-container">
      <div class="row align-items-center daily-run-row">
        <div class="col-7 col-md-8">
          <h4 class="daily-run-title">Daily Task</h4>
          <div class="daily-run-subtitle">
            <span v-if="isAlreadyCompletedToday">Task already completed today</span>
            <span v-else-if="!isRunning && !isCompleted">Ready to start your daily earnings</span>
            <span v-else-if="isRunning">Task in progress...</span>
            <span v-else-if="isCompleted">Task completed!</span>
          </div>
          
          <!-- Timer display -->
          <div v-if="isRunning" class="timer-display">
            <div class="timer-circle">
              <svg class="timer-svg" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.2)" 
                  stroke-width="8"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#fbbf24" 
                  stroke-width="8"
                  stroke-linecap="round"
                  :stroke-dasharray="`${circumference} ${circumference}`"
                  :stroke-dashoffset="strokeDashOffset"
                  transform="rotate(-90 50 50)"
                  class="timer-progress"
                />
              </svg>
              <div class="timer-text">
                {{ formatTime(remainingTime) }}
              </div>
            </div>
          </div>
          
          <!-- Completion message -->
          <div v-if="isCompleted && !isAlreadyCompletedToday" class="completion-message">
            <i class="completion-icon">🎉</i>
            <span>Task completed!</span>
          </div>
          
          <!-- Already completed message -->
          <div v-if="isAlreadyCompletedToday" class="already-completed-message">
            <i class="completion-icon">✅</i>
            <span>Task already completed today!</span>
            <div class="next-reset-info">
              <small>Next available: Tomorrow at midnight</small>
            </div>
          </div>
        </div>
        
        <div class="col-5 col-md-4 text-end">
          <button 
            :class="['daily-run-btn', buttonClass]"
            @click="startDailyRun"
            :disabled="!canStartTask"
          >
            <i v-if="isAlreadyCompletedToday" class="btn-icon">🔒</i>
            <i v-else-if="!isRunning && !isCompleted" class="btn-icon">▶️</i>
            <i v-else-if="isRunning" class="btn-icon spinning">⏳</i>
            <i v-else-if="isCompleted" class="btn-icon">✅</i>
            <span class="btn-text">{{ buttonText }}</span>
          </button>
        </div>
      </div>
      
      <!-- Progress bar for mobile -->
      <div v-if="isRunning" class="mobile-progress mt-3 d-md-none">
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <div class="progress-text">{{ formatTime(remainingTime) }} remaining</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import DRFapi from '@/utils/drf_api'

// Props
const props = defineProps({
  duration: {
    type: Number,
    default: 3600 // 1 hour (3600 seconds)
  },
  reward: {
    type: Number,
    default: 0.0
  },
  autoReset: {
    type: Boolean,
    default: true
  }
})

// Reactive state
const isRunning = ref(false)
const isCompleted = ref(false)
const remainingTime = ref(props.duration)
const user = ref(null)
const error = ref('')
const loading = ref(false)
const isAlreadyCompletedToday = ref(false)
const lastCompletionDate = ref(null)
const taskStartTime = ref(null)

// Timer variables
let timer = null
const totalTime = props.duration
const circumference = 2 * Math.PI * 45

// Computed properties
const buttonClass = computed(() => {
  if (isAlreadyCompletedToday.value) return 'btn-already-completed'
  if (isCompleted.value) return 'btn-completed'
  if (isRunning.value) return 'btn-running'
  return 'btn-ready'
})

const buttonText = computed(() => {
  if (isAlreadyCompletedToday.value) return 'Completed Today'
  if (isCompleted.value) return 'Completed'
  if (isRunning.value) return 'Running...'
  return 'Start Task'
})

const canStartTask = computed(() => {
  return !isRunning.value && !isCompleted.value && !isAlreadyCompletedToday.value
})

const progressPercentage = computed(() => {
  return ((totalTime - remainingTime.value) / totalTime) * 100
})

const strokeDashOffset = computed(() => {
  const progress = (totalTime - remainingTime.value) / totalTime
  return circumference - (progress * circumference)
})

const reward = computed(() => props.reward)

// Methods
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const getStorageKey = () => {
  return `dailyRun_${user.value?.id || 'guest'}`
}

const getRunningTaskStorageKey = () => {
  return `dailyRunning_${user.value?.id || 'guest'}`
}

const getTodayDateString = () => {
  return new Date().toISOString().split('T')[0] // YYYY-MM-DD format
}

const checkDailyTaskStatus = () => {
  if (!user.value?.id) return
  
  const storageKey = getStorageKey()
  const runningStorageKey = getRunningTaskStorageKey()
  const storedData = localStorage.getItem(storageKey)
  const runningData = localStorage.getItem(runningStorageKey)
  
  // Check if task is currently running
  if (runningData) {
    try {
      const running = JSON.parse(runningData)
      const today = getTodayDateString()
      
      if (running.date === today && running.startTime) {
        // Calculate elapsed time since start
        const startTime = new Date(running.startTime)
        const now = new Date()
        const elapsedSeconds = Math.floor((now - startTime) / 1000)
        const remaining = (running.duration || props.duration) - elapsedSeconds
        
        if (remaining > 0) {
          // Task is still running, restore timer
          console.log(`Restoring running task from localStorage. ${remaining} seconds remaining.`)
          isRunning.value = true
          remainingTime.value = remaining
          taskStartTime.value = startTime
          
          // Continue the timer
          timer = setInterval(() => {
            remainingTime.value--
            
            if (remainingTime.value <= 0) {
              completeTask()
            }
          }, 1000)
          
          return // Don't check completion status if task is running
        } else {
          // Task should have completed, clean up running data
          localStorage.removeItem(runningStorageKey)
        }
      }
    } catch (error) {
      console.error('Error parsing running task data:', error)
      localStorage.removeItem(runningStorageKey)
    }
  }
  
  // Check if task was completed today
  if (storedData) {
    try {
      const data = JSON.parse(storedData)
      const today = getTodayDateString()
      
      if (data.lastCompletionDate === today) {
        isAlreadyCompletedToday.value = true
        lastCompletionDate.value = data.lastCompletionDate
        isCompleted.value = true
        console.log('Daily task already completed today')
      } else {
        // New day, reset the status
        resetDailyTask()
      }
    } catch (error) {
      console.error('Error parsing daily task data:', error)
      resetDailyTask()
    }
  }
}

const saveRunningTaskState = () => {
  if (!user.value?.id || !isRunning.value) return
  
  const runningStorageKey = getRunningTaskStorageKey()
  const today = getTodayDateString()
  
  const runningData = {
    date: today,
    startTime: taskStartTime.value?.toISOString() || new Date().toISOString(),
    duration: props.duration,
    userId: user.value.id
  }
  
  localStorage.setItem(runningStorageKey, JSON.stringify(runningData))
}

const clearRunningTaskState = () => {
  if (!user.value?.id) return
  
  const runningStorageKey = getRunningTaskStorageKey()
  localStorage.removeItem(runningStorageKey)
}

const saveDailyTaskCompletion = () => {
  if (!user.value?.id) return
  
  const storageKey = getStorageKey()
  const today = getTodayDateString()
  
  const taskData = {
    lastCompletionDate: today,
    completedAt: new Date().toISOString(),
    reward: props.reward,
    userId: user.value.id
  }
  
  localStorage.setItem(storageKey, JSON.stringify(taskData))
  isAlreadyCompletedToday.value = true
  lastCompletionDate.value = today
}

const resetDailyTask = () => {
  isAlreadyCompletedToday.value = false
  lastCompletionDate.value = null
  isCompleted.value = false
  isRunning.value = false
  remainingTime.value = props.duration
  taskStartTime.value = null
  
  // Clear running state from localStorage
  clearRunningTaskState()
}

const getTimeUntilNextReset = () => {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  
  const diff = tomorrow.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  return { hours, minutes }
}

const startDailyRun = async () => {
  if (!canStartTask.value) return
  
  console.log('Starting daily task...')
  
  // Start the timer
  isRunning.value = true
  remainingTime.value = props.duration
  taskStartTime.value = new Date()
  
  // Save running state to localStorage
  saveRunningTaskState()
  
  // Emit start event
  emit('taskStarted', {
    userId: user.value.id,
    startTime: taskStartTime.value.toISOString()
  })
  
  timer = setInterval(() => {
    remainingTime.value--
    
    if (remainingTime.value <= 0) {
      completeTask()
    }
  }, 1000)
}

const completeTask = async () => {
  // Stop the timer
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  
  isRunning.value = false
  isCompleted.value = true
  
  // Clear running state from localStorage
  clearRunningTaskState()
  
  // Save completion to localStorage
  saveDailyTaskCompletion()
  
  // Hit the webhook API
  await callDailyRunAPI()
  
  // Auto reset after 5 seconds if enabled
  if (props.autoReset) {
    setTimeout(() => {
      resetTask()
    }, 5000)
  }
}

const callDailyRunAPI = async () => {
  if (!user.value?.id) return
  
  try {
    loading.value = true
    const response = await DRFapi.post('/dailyrun/', {
      user_id: user.value.id,
      task_completed: true,
      reward_earned: props.reward,
      completion_time: new Date().toISOString()
    })
    
    console.log('Daily run API response:', response.data)
    
    // Emit success event
    emit('taskCompleted', {
      userId: user.value.id,
      reward: props.reward,
      response: response.data
    })
    
  } catch (err) {
    console.error('Error calling daily run API:', err)
    error.value = 'Failed to submit task completion'
    
    // Emit error event
    emit('taskError', {
      error: err.message || 'API call failed',
      userId: user.value.id
    })
  } finally {
    loading.value = false
  }
}

const resetTask = () => {
  isRunning.value = false
  isCompleted.value = false
  remainingTime.value = props.duration
  error.value = ''
  taskStartTime.value = null
  
  // Clear running state from localStorage
  clearRunningTaskState()
}

const stopTask = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  
  isRunning.value = false
  remainingTime.value = props.duration
  taskStartTime.value = null
  
  // Clear running state from localStorage
  clearRunningTaskState()
  
  console.log('Daily task stopped manually')
}

// Events
const emit = defineEmits(['taskCompleted', 'taskError', 'taskStarted'])

// Lifecycle
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    // Check if daily task was already completed today
    checkDailyTaskStatus()
  }
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
  // Don't clear running state on unmount - we want to preserve it for reload
  // Only clear if task is completed or not running
  if (!isRunning.value) {
    clearRunningTaskState()
  }
})

// Expose methods for parent components
defineExpose({
  startDailyRun,
  resetTask,
  completeTask,
  stopTask
})
</script>

<style scoped>
.daily-run-card {
  margin-bottom: 1rem;
}

.daily-run-container {
  background: linear-gradient(135deg, #1e40af, #3730a3);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.daily-run-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../assets/img/eb.png');
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  z-index: 0;
}

.daily-run-container > * {
  position: relative;
  z-index: 1;
}

.daily-run-title {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.daily-run-subtitle {
  color: #e0e7ff;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.timer-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.timer-circle {
  position: relative;
  width: 80px;
  height: 80px;
}

.timer-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.timer-progress {
  transition: stroke-dashoffset 0.5s ease;
}

.timer-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 0.9rem;
  color: #fbbf24;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.completion-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(34, 197, 94, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.completion-icon {
  font-size: 1.25rem;
}

.daily-run-btn {
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.daily-run-btn.btn-ready {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.daily-run-btn.btn-ready:hover:not(:disabled) {
  background: linear-gradient(135deg, #16a34a, #15803d);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
}

.daily-run-btn.btn-running {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  cursor: not-allowed;
}

.daily-run-btn.btn-completed {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  cursor: not-allowed;
}

.daily-run-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.btn-icon {
  font-size: 1.125rem;
  transition: transform 0.3s ease;
}

.spinning {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.btn-text {
  font-weight: 600;
  letter-spacing: 0.025em;
}

/* Mobile progress bar */
.mobile-progress {
  text-align: center;
}

.progress-bar-container {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.875rem;
  color: #e0e7ff;
  font-weight: 500;
}

/* Responsive design */
@media (max-width: 768px) {
  .daily-run-container {
    padding: 1rem !important;
    margin-bottom: 1rem !important;
  }
  
  .daily-run-title {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
    font-weight: 600;
  }
  
  .daily-run-subtitle {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  
  .timer-display {
    margin-top: 0.4rem;
    margin-bottom: 0.2rem;
  }
  
  .daily-run-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    min-width: 90px;
    height: auto;
  }
  
  .btn-text {
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .btn-icon {
    font-size: 0.9rem;
    margin-right: 0.25rem;
  }
  
  .timer-circle {
    width: 50px;
    height: 50px;
  }
  
  .timer-text {
    font-size: 0.7rem;
    font-weight: 600;
  }
  
  .completion-message {
    margin-top: 0.5rem;
    padding: 0.5rem;
    gap: 0.4rem;
  }
  
  .completion-message span {
    font-size: 0.85rem;
  }
  
  .completion-icon {
    font-size: 1rem;
  }
  
  .already-completed-message {
    margin-top: 0.5rem;
    padding: 0.6rem;
    gap: 0.3rem;
  }
  
  .already-completed-message span {
    font-size: 0.85rem;
  }
  
  .next-reset-info small {
    font-size: 0.7rem;
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .daily-run-container {
    padding: 0.75rem !important;
    margin-bottom: 0.75rem !important;
  }
  
  .row.align-items-center {
    gap: 0.5rem;
  }
  
  .daily-run-title {
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }
  
  .daily-run-subtitle {
    font-size: 0.75rem;
    margin-bottom: 0.4rem;
  }
  
  .daily-run-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
    min-width: 80px;
  }
  
  .btn-text {
    font-size: 0.7rem;
  }
  
  .btn-icon {
    font-size: 0.8rem;
    margin-right: 0.2rem;
  }
  
  .timer-circle {
    width: 45px;
    height: 45px;
  }
  
  .timer-text {
    font-size: 0.65rem;
  }
  
  .completion-message,
  .already-completed-message {
    margin-top: 0.4rem;
    padding: 0.5rem;
  }
  
  .completion-message span,
  .already-completed-message span {
    font-size: 0.8rem;
  }
  
  .mobile-progress {
    margin-top: 0.75rem;
  }
  
  .progress-text {
    font-size: 0.75rem;
  }
}

/* Mobile-specific row spacing */
@media (max-width: 768px) {
  .daily-run-row {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }
  
  .daily-run-row > [class*="col-"] {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}

/* Compact mobile layout */
@media (max-width: 576px) {
  .daily-run-card {
    margin-bottom: 0.75rem;
  }
  
  .daily-run-container {
    border-radius: 0.5rem !important;
  }
  
  .daily-run-row {
    align-items: flex-start !important;
  }
  
  .col-7.col-md-8 {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .col-5.col-md-4 {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding-top: 0.2rem;
  }
}

/* Animation for card entrance */
.daily-run-card {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse animation for ready state */
.btn-ready {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  }
  50% {
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.6);
  }
}

/* Already completed state */
.btn-already-completed {
  background: linear-gradient(135deg, #6b7280, #9ca3af) !important;
  border-color: #6b7280 !important;
  color: #f3f4f6 !important;
  cursor: not-allowed !important;
  opacity: 0.8 !important;
}

.btn-already-completed:hover {
  background: linear-gradient(135deg, #6b7280, #9ca3af) !important;
  transform: none !important;
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3) !important;
}

/* Already completed message */
.already-completed-message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: rgba(107, 114, 128, 0.2);
  border-radius: 0.5rem;
  border-left: 4px solid #6b7280;
}

.already-completed-message span {
  color: #d1d5db;
  font-weight: 500;
  font-size: 0.95rem;
}

.next-reset-info {
  margin-top: 0.25rem;
}

.next-reset-info small {
  color: #9ca3af;
  font-size: 0.8rem;
  font-style: italic;
}
</style>
