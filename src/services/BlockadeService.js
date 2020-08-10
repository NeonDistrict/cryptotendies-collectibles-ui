import { BLOCKADE_API } from '~/assets/data/constants.js'
import { TENDIES_BOX } from '~/assets/data/ethereum/contractsList.json'

export default class BlockadeService {
  constructor (axios, _isDev) {
    this.axios = axios
  }

  baseUrl (networkId) {
    return BLOCKADE_API(networkId)
  }

  async fetch (url) {
    let res = {}
    try {
      const { data } = await this.axios.get(url, {})
      res = data
    } catch (e) {
      console.error(e)
    }
    if (res.error) { return console.error('Error in Blockade fetch: ', res.error) }
    return res
  }

  async getAllTokensByContract (networkId, ownAddress, contractAddress) {
    return await this.fetch(`${this.baseUrl(networkId)}/address/getTokensForContract?address=${ownAddress}&contract=${contractAddress})`)
  }

  async getOwnedBoxes(networkId, ownAddress) {
    return await this.getAllTokensByContract(networkId, ownAddress, TENDIES_BOX[networkId])
  }

  async getCardInfo(uri, cardId) {
    return await this.axios.$get(`${uri}${cardId}`, {})
  }
}
