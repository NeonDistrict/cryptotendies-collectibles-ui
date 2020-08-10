export default class TendiesCard {
  constructor(data) {
    this.id = Number(data.id)
    this.name = data.name || 'Placeholder Name'
    this.description = data.desc || 'Placeholder Description'
    this.image = data.image
    this.rarity = this.getRarityByClass(data.class)
    this.link = 'https://opensea.io/' // temp
    this.crispiness = Number(data.crispiness)
    this.seasoning = Number(data.seasoning)
    this.tenderness = Number(data.tenderness)
    this.set = data.set
    this.setId = Number(data.setId)
    this.setName = data.setName
  }

  getRarityByClass(classStr) {
    switch (classStr.toLowerCase()) {
      case 'common': return 1
      case 'uncommon': return 2
      case 'rare': return 3
      case 'epic': return 4
      case 'legendary': return 5
    }
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