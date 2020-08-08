import { OPENSEA } from '~/assets/data/non_secret_keys.js'
import { TENDIES_BOX, TENDIES_CARD } from '~/assets/data/ethereum/contractsList.json'
import TendiesCard from '~/models/TendiesCard'
import TendiesBox from '~/models/TendiesBox'

const BASEURL = 'https://api.opensea.io/api/v1'
const RINKEBY_BASEURL = 'https://rinkeby-api.opensea.io/api/v1'

export default class OpenSeaService {
  constructor (axios, locale, _isDev) {
    this.axios = axios
    this.locale = locale
  }

  baseUrl (networkId) {
    if (networkId === 1) { return BASEURL }
    if (networkId === 4) { return RINKEBY_BASEURL }
    return BASEURL
  }

  async fetch (url) {
    let res = {}
    try {
      const { data } = await this.axios.get(url, { headers: { 'x-api-key': OPENSEA } })
      res = data
    } catch (e) {
      console.error(e)
    }
    if (res.error) { return console.error('Error in OpenSea fetch: ', res.error) }
    return res
  }

  getAssetDetails (contractAddress, assetId, networkId) {
    return this.fetch(`${this.baseUrl(networkId)}/asset/${contractAddress}/${assetId}`)
  }

  async getOwnedBoxes(networkId, ownerAddress) {
    const ownedBoxes = await this.fetch(`${this.baseUrl(networkId)}/assets?asset_contract_address=${TENDIES_BOX[networkId]}&owner=${ownerAddress}`)
    console.log(ownedBoxes)
    if (ownedBoxes) {
      return ownedBoxes.assets.map(cardInfo => new TendiesBox(cardInfo))
    } else {
      return {}
    }
  }

  async getOwnedCards(networkId, ownerAddress) {
    const ownedCards = await this.fetch(`${this.baseUrl(networkId)}/assets?asset_contract_address=${TENDIES_CARD[networkId]}&owner=${ownerAddress}&limit=1000`)
    if (ownedCards) {
      return ownedCards.assets.map(cardInfo => new TendiesCard(cardInfo))
    } else {
      return {}
    }
  }
}