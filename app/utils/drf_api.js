// src/api/drf.js
import axios from 'axios'
import { useAuth } from '@/utils/stores'   // adjust path if needed

const DRFapi = axios.create({
  baseURL: 'https://api.pixmintai.com',
  headers: { 'Content-Type': 'application/json' }
})

// Attach token to every request
DRFapi.interceptors.request.use(config => {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle expired token automatically
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

DRFapi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return DRFapi(originalRequest)
          })
          .catch(err => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refresh = localStorage.getItem('refresh')

        if (!refresh) {
          // 🔔 Soft warning when no refresh token is found
          alert('⚠️ Your session has expired. Please login again.')
          window.location.href = '/login?reason=session_expired'
          isRefreshing = false
          return Promise.reject(error)
        }

        // ✅ Use baseURL with relative path instead of hardcoding
        const res = await DRFapi.post('/users/token/refresh/', { refresh })

        const newAccess = res.data.access
        localStorage.setItem('access', newAccess)

        processQueue(null, newAccess)
        isRefreshing = false

        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return DRFapi(originalRequest)
      } catch (err) {
        processQueue(err, null)
        isRefreshing = false

        // 🔔 Soft warning when refresh attempt also fails
        const { logout } = useAuth()
        logout()
        alert('⚠️ Session expired. Please login again.')
        window.location.href = '/login?reason=session_expired'
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default DRFapi
