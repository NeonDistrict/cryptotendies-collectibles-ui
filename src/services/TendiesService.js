import Box from '~/models/TendiesBox'
import Card from '~/models/TendiesCard'

const BASE_URL = 'https://cryptotendies-metadata-api.herokuapp.com/api/'

export default class TendiesService {
  constructor (axios, store, _isDev) {
    this.axios = axios
    this.store = store
  }

  get baseUrl() {
    return BASE_URL
  }

  async fetch (url) {
    let res = {}
    try {
      res = await this.axios.$get(url, {})
    } catch (e) {
      console.error(e)
    }
    if (res.error) { return console.error('Error in Tendies Metadata API fetch: ', res.error) }
    return res
  }

  getTendiesCardContract() {
    return this.store.$ethereumService.getTendiesCardContract()
  }

  async getContractAddresses() {
    const contracts = await this.fetch(`${this.baseUrl}contracts`)
    return contracts
  }

  async getCardUri() {
    const contract = await this.getTendiesCardContract()
    const uri = await contract.methods.uri(1).call()
    return uri.replace('{id}', '')
  }

  async getCardMaster() {
    const cards = await this.fetch(`${this.baseUrl}cards`)
    return cards.map(card => new Card(card))
  }

  async getBoxMaster() {
    const boxes = await this.fetch(`${this.baseUrl}boxes`)
    return boxes.map(box => new Box(box))
  }

  async getAllOwnedAssets(networkId, ownerAddress) {
    return await this.fetch(`${this.baseUrl}address/${ownerAddress}/${networkId}`)
  }
}