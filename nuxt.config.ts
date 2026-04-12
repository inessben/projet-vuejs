export default defineNuxtConfig({
  ssr: false,
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      omdbApiKey: ''
    }
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        }
      ]
    }
  },
  css: ['~/assets/theme.css']
})
