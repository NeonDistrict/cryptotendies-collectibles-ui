import { getBoxInfoFromId } from '~/assets/data/db/mocked'

export default class TendiesBox {
  constructor(data) {
    this.id = Number(data.tokenId)
    this.size = getBoxInfoFromId(Number(data.tokenId)).size
    this.count = 1
  }
}