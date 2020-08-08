import { NEXT_AUTH_STEPS } from '~/assets/data/constants'

export const state = () => ({
  ownAddress: '',
  networkId: 1,
  isError: false,
  error: null,
  didStartInit: false,
  finishedInit: false,
  isFetchingAssetCount: false,
  inventoryLoaded: false,
  authStoppedAt: '',
  cardUri: '',
  ownTendiesBoxes: {
    1: {},
    2: {}
  },
  ownTendiesCards: {}
})

export const mutations = {
  SET_START_INIT (state, flag) {
    state.didStartInit = flag
  },
  FINISH_INIT (state, flag) {
    state.finishedInit = flag
  },
  SET_NEXT_AUTH_STEP (state, step) {
    state.authStoppedAt = step
  },
  SET_OWN_ADDRESS (state, address) {
    state.ownAddress = address
  },
  SET_NETWORK_ID (state, networkId) {
    state.networkId = networkId
  },
  SET_IS_ERROR(state, isError) {
    state.isError = isError
  },
  SET_ERROR_MESSAGE_FOR_DEV(state, error) {
    state.error = error
  },
  SET_OWN_TENDIES_BOXES(state, boxesMap) {
    state.ownTendiesBoxes = boxesMap
  },
  SET_OWN_TENDIES_CARDS(state, cardsMap) {
    state.ownTendiesCards = cardsMap
  },
  SET_IS_FETCHING_ASSET_COUNT(state, flag) {
    state.isFetchingAssetCount = flag
  },
  SET_INVENTORY_LOADED(state, flag) {
    state.inventoryLoaded = flag
  },
  SET_CARD_URI(state, flag) {
    state.cardUri = flag
  },
}


export const actions = {
  nuxtServerInit () {
  },

  async nuxtClientInit ({ state, dispatch, commit }, _context) {
    // prevent from double init
    if (state.didStartInit) return 
    // check for wallet
    if (!this.$ethereumService.hasWallet) {
      await commit('SET_NEXT_AUTH_STEP', NEXT_AUTH_STEPS[0])
      await commit('FINISH_INIT', true)
      return 
    }
    // getting web3
    await dispatch('setWeb3')
    if (!state.ownAddress) {
      await commit('SET_NEXT_AUTH_STEP', NEXT_AUTH_STEPS[1])
      await commit('FINISH_INIT', true)
      return
    } 
    // finishing startup
    await dispatch('startupFunctions')
    await commit('FINISH_INIT', true)
  },

  async startupFunctions ({ commit, dispatch }, _context) {
    await commit('SET_START_INIT', true)
    await commit('FINISH_INIT', false)
    try {
      await dispatch('setWeb3')
      await dispatch('getCardUri')
      await dispatch('getInventoryOfUser', { fetchBoxes: true, fetchCards: true })
    } catch (e) {
      await commit('SET_NEXT_AUTH_STEP', NEXT_AUTH_STEPS[3])
    } finally {
      await commit('FINISH_INIT', true)
    }
  },

  async setWeb3 ({ commit }, _context) {
    try {
      const address = await this.$ethereumService.getCurrentAccountAsync()
      const networkId = await this.$ethereumService.getNetworkIdAsync()
      await commit('SET_OWN_ADDRESS', address)
      await commit('SET_NETWORK_ID', networkId)
    } catch (e) {
      console.error(e)
    }
  },

  async getCardUri ({ commit, dispatch, state }, _ctx ) {
    const uri = await this.$ethereumService.getCardUri()
    await commit('SET_CARD_URI', uri)
  },

  async getInventoryOfUser ({ commit, dispatch, state }, { fetchBoxes = true, fetchCards = true }) {
    try {
      const { networkId, ownAddress, ownTendiesBoxes } = state
      const boxMap = this.$util.clone(ownTendiesBoxes)
      const cardsMap = {}
      // 1. Get list of owned cards and boxes from OpenSea
      // create mapping
      // set mappings to state (to show what is owned)
      if (fetchBoxes) {
        const ownedBoxes = await this.$openSeaService.getOwnedBoxes(networkId, ownAddress)
        if (ownedBoxes) {
          ownedBoxes.forEach(boxInfo => {
            boxMap[boxInfo.id] = boxInfo
          })
        }
        await commit('SET_OWN_TENDIES_BOXES', boxMap)
      }
      if (fetchCards) {
        const ownedCards = await this.$openSeaService.getOwnedCards(networkId, ownAddress)
        if (ownedCards) {
          console.log('cards: ', ownedCards)
          ownedCards.forEach(cardInfo => {
            cardsMap[cardInfo.id] = cardInfo
          })
        }
        await commit('SET_OWN_TENDIES_CARDS', cardsMap)
        await commit('SET_INVENTORY_LOADED', true)
      }
    } catch (e) {
      console.error(e)
    }
  },

  async getAssetCount ({ commit, state }, _payload) {
    if (state.isFetchingAssetCount) return
    await commit('SET_IS_FETCHING_ASSET_COUNT', true)
    const boxMap = this.$util.clone(state.ownTendiesBoxes)
    const cardsMap = this.$util.clone(state.ownTendiesCards)
    for (let key in boxMap) {
      const boxCount = await this.$ethereumService.getBalanceOfBox(state.ownAddress, String(key))
      boxMap[key].count = Number(boxCount)
    }
    for (let key in cardsMap) {
      console.log('key: ', key)
      const cardCount = await this.$ethereumService.getBalanceOfCard(state.ownAddress, String(key))
      console.log('count: ', cardCount)
      cardsMap[key].count = Number(cardCount)
    }
    await commit('SET_OWN_TENDIES_BOXES', boxMap)
    await commit('SET_OWN_TENDIES_CARDS', cardsMap)
    await commit('SET_IS_FETCHING_ASSET_COUNT', false)
  }
}
