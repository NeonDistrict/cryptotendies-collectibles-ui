// import { getRarityFromCardId } from '~/assets/data/db/mocked'

export default class TendiesCard {
  constructor(data) {
    console.log(data)
    this.id = Number(data.tokenId)
    this.name = data.name
    this.image = data.imageOriginalUrl
    this.description = data.description
    this.rarity = this.getRarityIdByTrait(data.traits)
    this.count = 1
    this.traits = data.traits
    this.link = data.permalink
  }

  getRarityIdByTrait(traits) {
    const rarity = traits.find(trait => trait.traitType === 'Rarity')
    if (!rarity) return 1
    switch (rarity.value.toLowerCase()) {
      case 'common': return 1
      case 'uncommon': return 2
      case 'rare': return 3
      case 'epic': return 4
      case 'legendary': return 5
    }
  }
}