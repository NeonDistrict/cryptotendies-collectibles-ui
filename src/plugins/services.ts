import { Plugin } from '@nuxt/types'
import OpenSeaService from '~/services/OpenSeaService'
import BlockadeService from '~/services/BlockadeService'

interface InterfaceTemplate {
  $openSeaService: OpenSeaService,
  $blockadeService: BlockadeService
}

declare module 'vue/types/vue' {
  interface Vue extends InterfaceTemplate {
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions extends InterfaceTemplate {
  }
}

declare module 'vuex/types/index' {
  interface Store<S> extends InterfaceTemplate {
  }
}

const services: Plugin = ({ app, $moment, store}, inject) => {
  const openSeaService = new OpenSeaService(
    app.$axios
  )
  const blockadeService = new BlockadeService(
    app.$axios
  )
  inject('openSeaService', openSeaService)
  inject('blockadeService', blockadeService)
}

export default services
