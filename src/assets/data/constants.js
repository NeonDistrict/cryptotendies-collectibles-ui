export const NEXT_AUTH_STEPS = [
  'NO_WALLET',
  'WALLET_LOCKED',
  'NOT_LOGGED_IN'
  ]

export const RARITIES = ['common', 'uncommon', 'rare', 'epic', 'legendary']

export const BLOCKADE_API = (networkId) => {
  return `https://${networkId === 1 ? 'eth' : 'rinkeby'}.api.blockade.games/api`
}