export * from './nuxt'


declare global {
  interface Window {
    platform?: any;
  }
}

export interface DropInfo {
  cards: number,
  guaranteed: {
    common: number,
    uncommon: number,
    rare: number,
    epic: number,
    legendary: number
  },
  rates: {
    common: number,
    uncommon: number,
    rare: number,
    epic: number,
    legendary: number
  }
}

export interface OwnCardInfo {
  amount: number,
  count: number,
  id: number
}

export interface OwnBoxInfo {
  amount: number,
  count: number,
  id: number
}

export interface CardInfo {
  id: number,
  name: string,
  description: string
  image: number,
  rarity: number,
  link: string,
  crispiness: number,
  seasoning: number,
  tenderness: number,
  set: number,
  setId: number,
  setName: string
}

export interface BoxInfo {
  name: string,
  description: string
  size: number,
  image: number,
  id: number,
  classes: Array<string>,
  guaranteedClasses: Array<string>,
  probabilities: Array<number>,
  setId: number,
  setName: string,
  link: string,
}