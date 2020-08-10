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
  contractAddresses: {},
  boxMaster: {}, 
  cardMaster: {},
  ownTendiesBoxes: {},
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
  SET_CONTRACT_ADDRESSES(state, contractAddresses) {
    state.contractAddresses = contractAddresses
  },
  SET_CARD_MASTER(state, cardMaster) {
    state.cardMaster = cardMaster
  },
  SET_BOX_MASTER(state, boxMaster) {
    state.boxMaster = boxMaster
  }
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
      await dispatch('getContractAddresses')
      await dispatch('getCardUri')
      await dispatch('getMasterData')
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

  async getCardUri ({ commit }, _ctx ) {
    const uri = await this.$tendiesService.getCardUri()
    await commit('SET_CARD_URI', uri)
  },

  async getContractAddresses ({ commit }, _ctx ) {
    const contractAddresses = await this.$tendiesService.getContractAddresses()
    await commit('SET_CONTRACT_ADDRESSES', contractAddresses)
  },

  async getMasterData ({ commit }, _ctx) {
    const cardMasterArray = await this.$tendiesService.getCardMaster()
    const boxMasterArray = await this.$tendiesService.getBoxMaster()
    const cardMaster = {}
    cardMasterArray.forEach(card => {
      cardMaster[card.id] = card
    })
    const boxMaster = {}
    boxMasterArray.forEach(box => {
      boxMaster[box.id] = box
    })
    await commit('SET_CARD_MASTER', cardMaster)
    await commit('SET_BOX_MASTER', boxMaster)
  },

  async getInventoryOfUser ({ commit, state }, { fetchBoxes = true, fetchCards = true }) {
    try {
      const { networkId, ownAddress } = state
      const { boxes, cards } = await this.$tendiesService.getAllOwnedAssets(networkId, ownAddress)
      const boxesMap = {}
      const cardsMap = {}
      boxes.forEach(box => {
        boxesMap[box.id] = {
          id: Number(box.id),
          count: Number(box.amount)
        }
      })
      cards.forEach(card => {
        cardsMap[card.id] = {
          id: Number(card.id),
          count: Number(card.amount)
        }
      })
      await commit('SET_OWN_TENDIES_BOXES', boxesMap)
      await commit('SET_OWN_TENDIES_CARDS', cardsMap)
      await commit('SET_INVENTORY_LOADED', true)
    } catch (e) {
      console.error(e)
    }
  }
}
