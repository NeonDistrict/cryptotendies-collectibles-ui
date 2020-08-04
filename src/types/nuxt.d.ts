import { NuxtApp } from '@nuxt/types/app/index'
import { Howl } from '@types/howler'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface Context {
  $axios: NuxtAxiosInstance
}

// temp
export type Account = {
  $toast: any
}

export interface NuxtLoading extends NuxtApp {
  $loading: any
}

declare module 'web3'
