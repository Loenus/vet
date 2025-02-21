// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '@fortawesome/fontawesome-free/css/all.css',
    "leaflet/dist/leaflet.css"
  ],
  build: {
    transpile: ['bootstrap', '@fortawesome/fontawesome-free']
  },
  modules: ['@nuxtjs/supabase'],
  supabase: {
    redirect: false // Disable automatic redirects
  },
  plugins: [
    { src: "~/plugins/leaflet.client.ts", mode: "client" }
  ],
})
