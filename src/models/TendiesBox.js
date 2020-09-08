import { TENDIES_BOX } from '~/assets/data/ethereum/contractsList'

export default class TendiesBox {
  constructor(data) {
    this.name = data.name,
    this.description = data.desc,
    this.size = Number(data.numCards),
    this.image = data.image,
    this.id = Number(data.id),
    this.setId = Number(data.setId),
    this.setName = data.setName,
    this.classes = data.classes
    this.guaranteedClasses = data.guaranteedClasses
    this.probabilities = data.probabilities,
    this.link = `https://opensea.io/assets/${TENDIES_BOX[1]}/${this.id}` // mainnet only
  }
}