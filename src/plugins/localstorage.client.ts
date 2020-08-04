const prefix = 'tendies:'


class LocalStorage {
  set(key, data) {
    if (process.client) {
      window.localStorage.setItem(`${prefix}${key}`, JSON.stringify(data))
    }
  }

  get(key) {
    if (process.client) { 
      return JSON.parse(window.localStorage.getItem(`${prefix}${key}`))
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $localStorage: LocalStorage

  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $localStorage: LocalStorage
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $localStorage: LocalStorage
  }
}

export default async (ctx, inject) => {
  if (process.server) return
  const ls = new LocalStorage()
  inject('localStorage', ls)
}
