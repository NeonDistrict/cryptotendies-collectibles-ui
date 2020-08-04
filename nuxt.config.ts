const env = require('dotenv').config()

const SITE_INFO = {
  title: 'Crypto Tendies',
  googleFonts: [
    'Barlow:400,300,400,500,700',
    'Source+Code+Pro:200,300,400',
    'Oswald:200,300,400,500,600,700&amp;subset=cyrillic,latin-ext,vietnamese'
  ]
}

export default {
  env: env.parsed,
  dev: (process.env.NODE_ENV !== 'production'),
  head: (() => {
    const head = {
      title: 'Crypto Tendies',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Crypto Tendies'
        },
        {
          hid: 'og:image',
          property: 'og:image'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Montserrat:600|Roboto|Roboto+Mono&display=swap'
        }
      ]
    }
    head.link = head.link.concat({
      rel: 'stylesheet',
      href: `https://fonts.googleapis.com/css?family=${SITE_INFO.googleFonts.join(
        '|'
      )}&display=swap`
    })
    return head
  })(),
  loading: { color: '#101113' },
  loadingIndicator: {
    name: 'chasing-dots',
    color: '#21CE99',
    background: '#272C32'
  },
  css: [
    'animate.css/animate.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/styles/main.scss'
    ],
  plugins: [
    { src: '@/plugins/axios' },
    { src: '@/plugins/ethereum.client', ssr: false },
    { src: '@/plugins/localstorage.client', ssr: false },
    { src: '@/plugins/error-handler' },
    { src: '@/plugins/services' },
    { src: '@/plugins/util' },
    { src: '@/plugins/nuxt-client-init.client', ssr: false },
    { src: '@/plugins/fontawesome' },
    { src: '@/plugins/moment' },
    { src: '@/plugins/vue-lazyload.client', ssr: false },
    { src: '@/plugins/v-tooltip.client', ssr: false }
  ],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/device',
    '@nuxtjs/toast',
    '@nuxtjs/google-analytics',
    'vue-scrollto/nuxt',
    ['@nuxtjs/moment', ['ja', 'zh-cn']],
    'cookie-universal-nuxt'
  ],
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    // }
    transpile: ['vue-nl2br'],
    loaders: {
      vue: {
        transformAssetUrls: {
          img: ['src', 'srcset'],
          source: 'srcset',
          'lazy-image': 'src'
        }
      }
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-transform-modules-commonjs']
      ]
    }
  },
  buildModules: [
      '@nuxtjs/moment',
      ['@nuxt/typescript-build', {
        typeCheck: {
          memoryLimit: 4096,
          workers: 2
        }
      }]
  ],
  srcDir: 'src/',
  // server: {
  //   host: process.env.HOST || '0.0.0.0',
  //   port: process.env.PORT || 3000
  // },
  styleResources: {
    scss: ['~/assets/styles/_variables.scss']
  },
  router: {
    linkActiveClass: 'active-link'
  },
  toast: {
    position: 'top-center',
    duration: 2000,
    fullWidth: true,
    className: 'cdToast__inner',
    containerClass: 'cdToast',
    iconPack: 'fontawesome',
    singleton: true
  },
}
