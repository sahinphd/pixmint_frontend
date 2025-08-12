// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false }, // Disable for production
  modules: ['@nuxt/eslint', '@nuxt/image'],
  
  // Shared cPanel optimizations
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt'],
      crawlLinks: true // Enable automatic crawling
    },
    // Optimize for shared hosting
    minify: true,
    experimental: {
      wasm: false // Disable WASM for compatibility
    },
    // Suppress cache driver warning
    storage: {
      memory: { driver: 'memory' }
    }
  },
  
  // Configure for static hosting (shared cPanel)
  ssr: false, // Required for static hosting
  
  // Experimental features for better compatibility
  experimental: {
    payloadExtraction: false // Disable for shared hosting
  },
  
  // Build optimizations
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            utils: ['axios', 'crypto-js']
          }
        }
      }
    }
  },
  
  // Image optimization for shared hosting
  image: {
    // Disable remote image optimization for shared hosting
    provider: 'none',
    // Use local images only
    domains: []
  },
  
  // App configuration for shared cPanel
  app: {
    // Configure base URL - change if in subdirectory
    baseURL: '/',
    
    // Head configuration for better SEO on shared hosting
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    }
  },
  
  // CSS configuration for shared hosting
  css: [
    // Add global CSS if needed
  ],
  
  // Runtime config for shared hosting
  runtimeConfig: {
    public: {
      // Public runtime config accessible on client-side
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.pixmintai.com',
      paymentApi: process.env.NUXT_PUBLIC_PAYMENT_API || 'https://api.nowpayments.io'
    }
  }
})