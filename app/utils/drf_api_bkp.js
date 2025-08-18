// src/api/drf.js
import axios from 'axios'

const DRFapi = axios.create({
  // baseURL: 'http://127.0.0.1:7000', // Replace with your actual DRF backend URL
  baseURL: 'https://api.pixmintai.com', // Replace with your actual DRF backend URL
  headers: {
    'Content-Type': 'application/json'
  }
})

// Optional: Add token automatically to requests
DRFapi.interceptors.request.use(config => {
  // const token = localStorage.getItem('access_token')
  // const token = localStorage.getItem('access_token')
  const token = localStorage.getItem('access')

  if (token) {
    // config.headers.Authorization = `Token ${token}`
      config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default DRFapi
