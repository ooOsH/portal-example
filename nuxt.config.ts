import dsv from '@rollup/plugin-dsv'

export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon/favicon.ico' }],
    },
  },

  runtimeConfig: {
    // Firebase
    FB_API_KEY: process.env.FB_API_KEY,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
    FB_PROJECT_ID: process.env.FB_PROJECT_ID,
    FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
    FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID,
    FB_APP_ID: process.env.FB_APP_ID,
    FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID,

    public: {
      // Environment
      ENVIRONMENT: process.env.ENVIRONMENT,

      // URLs
      BASE_URL: process.env.BASE_URL,

      // Phone List
      PHONE_LIST_URL: process.env.PHONE_LIST_URL,

      // Address
      PCA_WEBKEY: process.env.PCA_WEBKEY,
    },
  },

  imports: {
    dirs: ['store'],
  },

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/eslint-module',
    '@nuxt/ui',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-vuefire',
    'nuxt-vitest',
  ],

  colorMode: {
    preference: 'light',
  },

  vuefire: {
    config: {
      apiKey: process.env.FB_API_KEY,
      authDomain: process.env.FB_AUTH_DOMAIN,
      projectId: process.env.FB_PROJECT_ID,
      storageBucket: process.env.FB_STORAGE_BUCKET,
      messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
      appId: process.env.FB_APP_ID,
      measurementId: process.env.FB_MEASUREMENT_ID,
    },
  },

  vite: {
    plugins: [dsv()],
  },
})
