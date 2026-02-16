// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  content: {
    sources: {
      content: {
        driver: 'fs',
        base: './content'
      }
    }
  },
  routeRules: {
    '/.well-known/**': { cache: false, ssr: false }
  }
})




