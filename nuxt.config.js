import colors from 'vuetify/es5/util/colors'
const env = require('dotenv').config()
let url_api = process.env.NODE_ENV == 'development' ? process.env.URL_API_DEV : process.env.URL_API;
let base_url = process.env.NODE_ENV == 'development' ? '/' : process.env.GITPAGES_NAME
let setAuthUrl = process.env.NODE_ENV == 'development' ? '/api/' : process.env.GITPAGES_NAME + '/api/'
export default {
  publicRuntimeConfig: {
    myApp: {
      version: "1.0.0"
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'My-App',
    title: 'My App',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' },
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/typed.js@2.0.12' },
    ]
  },
  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~plugins/vuetify.js', mode: 'client' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
    base: base_url,
    middleware: ['auth']
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],

  sweetalert: {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
  },

  moment: {
    defaultTimezone: 'Asia/Bangkok'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: base_url,
    proxy: true
  },

  proxy: {
    '/api': { target: url_api, changeOrigin: true, pathRewrite: { '^/api': '/' } },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Noto Sans Thai'
      }
    },
    theme: {
      options: {
        customProperties: true,
      },
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#FF4081'
        }
      }
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            // headers: { 'Content-Type': 'multipart/form-data' },
            url: url_api + '/auth/token',
            method: 'post',
            propertyName: 'payload.token'
          },
          user: {
            url: url_api + '/auth/user',
            method: 'get',
            propertyName: 'payload.user'
          },
          tokenRequired: true,
          tokenType: 'bearer',
          globalToken: true,
          autoFetchUser: true
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/logout',
      callback: '/login',
      home: '/'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: null,
    loaders: {
      vue: {
        prettify: false
      }
    },
  },

  server: {
    port: process.env.PORT || 5000
  }
}