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

export interface CardInfo {
  id: number,
  image: number,
  rarity: number,
  count: number
  traits: Array<any>,
  link: string,
  name: string,
  description: string
}

export interface BoxInfo {
  id: number,
  size: number,
  count: number
}