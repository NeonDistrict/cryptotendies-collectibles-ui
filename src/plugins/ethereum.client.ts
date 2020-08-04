import { Plugin } from '@nuxt/types'
import EthereumService from '~/services/EthereumService'
import Web3 from 'web3';

declare module 'vue/types/vue' {
  interface Vue {
    $ethereumService: EthereumService
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $ethereumService: EthereumService
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $ethereumService: EthereumService
  }
}

const ethereumPlugin: Plugin = async ({ isDev, store, app }, inject) => {
  let provider = null
  if (process.server) return 
  if (window.ethereum) {
    // Use MetaMask provider
    provider = window.ethereum
  }
  if (window.web3) { 
    provider = window.web3.currentProvider
  }
  inject('ethereumService', new EthereumService(provider, new Web3(provider), store, { dev: isDev }, app))
}

export default ethereumPlugin
