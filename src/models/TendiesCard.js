import { getRarityFromCardId } from '~/assets/data/db/mocked'

export default class TendiesCard {
  constructor(data) {
    this.id = Number(data.tokenId)
    this.image = 2, // temp
    this.rarity = getRarityFromCardId(Number(data.tokenId))
    this.count = 1
  }
}