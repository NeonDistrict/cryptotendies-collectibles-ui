<template lang="pug">
.drop-rates
  .drop-rates__header Card Info
  .drop-rates__row
    .drop-rates__wrapper Rarity: 
      span.drop-rates__wrapper__rarity(:class="rarityStr") {{rarityStr}}
    .drop-rates__wrapper Supply: {{ cardInfo.supply }}
  .drop-rates__header Owner
  .drop-rates__row
    .drop-rates__wrapper {{ownerShortened}}
    .drop-rates__wrapper Owned: {{ cardInfo.copies }}x
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import { RARITIES } from '~/assets/data/constants'
  import { CardInfo } from '~/types'
@Component({})
  export default class CardMetadata extends Vue {
    @Prop() cardInfo!: CardInfo
    
    get rarities () {
      return RARITIES
    }

    get rarityStr() {
      switch(this.cardInfo.rarity) {
        case 1: return 'common'
        case 2: return 'uncommon'
        case 3: return 'rare'
        case 4: return 'epic'
        case 5: return 'legendary'
      }
    }

    get ownerShortened() {
      const owner = "0xfbA2C2bBF977eDA19Ad819Bb46787F4C91d1fFaD"
      return `${owner.substring(0, 5)}...${owner.substring(owner.length - 5, owner.length)}`
    }
  }
</script>

<style lang="scss" scoped>
.drop-rates {
  &__row {
    @extend %row;
    justify-content: flex-start;
    .drop-rates__wrapper + .drop-rates__wrapper {
      margin-left: 1rem;
    }
  }
  &__wrapper {
    @extend %row;
    justify-content: space-between;
    background-color: $color-woodsmoke;
    border-radius: 0.4rem;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    margin-bottom: 1rem;
    text-transform: capitalize;

    &__rarity {
      padding-left: 0.5rem;
    }
  } 

  &__header {
    font-size: 0.9rem;
    opacity: 0.7;
    font-weight: 400;
    padding: 0.5rem 0;
  }
  
  .common {
    color: $color-pictonblue;
  }
  .uncommon {
    color: $color-mainDarkGreen;
  }
  .rare {
    color: $color-kournikova;
  }
  .epic {
    color: $color-sandyBrown;
  }
  .legendary {
    color: $color-bittersweet;
  }
}
</style>
