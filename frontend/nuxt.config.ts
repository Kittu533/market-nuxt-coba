// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    public: {
      API_PRODUCTS: process.env.NUXT_PUBLIC_API_PRODUCTS,
      API_BASE_URL: "http://localhost:5000",
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@formkit/auto-animate',
    '@nuxtjs/color-mode',
    'nuxt-aos',
    '@pinia/nuxt',
  ]
})