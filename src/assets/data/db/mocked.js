export const ALL_BOXES = [{
  id: 1,
  size: 4,
  dropInfo: {
    cards: 4,
    guaranteed: {
      common: 0,
      uncommon: 1,
      rare: 0,
      epic: 0,
      legendary: 0
    },
    rates: {
      common: 0.49,
      uncommon: 0.29,
      rare: 0.15,
      epic: 0.055,
      legendary: 0.015
    }
  }
}, 
{ 
  id: 2,
  size: 6, 
  dropInfo: {
    cards: 6,
    guaranteed: {
      common: 0,
      uncommon: 0,
      rare: 1,
      epic: 0,
      legendary: 0
    },
    rates: {
      common: 0.43,
      uncommon: 0.26,
      rare: 0.18,
      epic: 0.10,
      legendary: 0.03
    }
  }
}]
export const ALL_CARDS = [{
  id: 1,
  image: 1,
  rarity: 5,
  copies: 1,
  supply: 20
}, {
  id: 2,
  image: 2,
  rarity: 4,
  copies: 3,
  supply: 40
}, {
  id: 3,
  image: 3,
  rarity: 3,
  copies: 4,
  supply: 60
}, {
  id: 4,
  image: 4,
  rarity: 2,
  copies: 8,
  supply: 100
}, {
  id: 5,
  image: 5,
  rarity: 1,
  copies: 12,
  supply: 500
}, {
  id: 6,
  image: 6,
  rarity: 1,
  copies: 10,
  supply: 500
}]

// key = rarity
// value = lastId with that rarity
export const RARITY_MAPPING = {
  1: 60,
  2: 100,
  3: 125,
  4: 140,
  5: 150
}

export const getRarityFromCardId = (cardId) => {
  let rarity = 1
  for (let key in RARITY_MAPPING) {
    if (cardId > Number(RARITY_MAPPING[key])) {
      rarity = Number(key) + 1
    }
  }
  return rarity
}

export const getBoxInfoFromId = (boxId) => {
  const boxInfo = ALL_BOXES.find(boxInfo => boxInfo.id === boxId)
  return boxInfo || {}
}