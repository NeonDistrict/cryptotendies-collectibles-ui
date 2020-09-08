<template lang="pug">
.drop-rates
  .drop-rates__header Details
  .drop-rates__row
    .drop-rates__wrapper {{ dropInfo.cards }} Cards
  .drop-rates__header Drop Rates
  .drop-rates__wrapper
    .drop-rates__rate(v-for="drop in rarities")
      .drop-rates__rate__detail(:class="`drop-rates__rate--${drop}`") {{`${drop}: `}} {{dropRatePercentage(dropInfo.rates[drop]) }}
  .drop-rates__header Owner
  .drop-rates__row
    .drop-rates__wrapper Owned: {{ ownedCopies }}x
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
  import { RARITIES } from '~/assets/data/constants'
  import { DropInfo, BoxInfo } from '~/types'
@Component({})
  export default class DropRates extends Vue {
    @Prop() dropInfo!: DropInfo
    @Prop() boxInfo!: BoxInfo
    @State ownTendiesBoxes
    
    get rarities () {
      return RARITIES
    }

    get guaranteedStr () {
      let guaranteedStr = ''
      for (let key in this.dropInfo.guaranteed) {
        if (this.dropInfo.guaranteed[key] > 0) {
          guaranteedStr = key
        }
      }
      return guaranteedStr
    }

    get ownerShortened() {
      const owner = "0xfbA2C2bBF977eDA19Ad819Bb46787F4C91d1fFaD"
      return `${owner.substring(0, 5)}...${owner.substring(owner.length - 5, owner.length)}`
    }

    dropRatePercentage(dropRate) {
      return `${Math.round(dropRate * 1000) / 10}%`
    }

    get ownedCopies() {
      return (this.ownTendiesBoxes[this.boxInfo.id] || {}).count
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
    .drop-rates__rate + .drop-rates__rate {
      margin-left: 1rem;
    }
  } 

  &__header {
    font-size: 0.9rem;
    opacity: 0.7;
    font-weight: 400;
    padding: 0.5rem 0;
  }

  &__rate {
    &__detail {
      text-transform: capitalize;
    }
    &--common {
      color: $color-pictonblue;
    }
    &--uncommon {
      color: $color-mainDarkGreen;
    }
    &--rare {
      color: $color-kournikova;
    }
    &--epic {
      color: $color-sandyBrown;
    }
    &--legendary {
      color: $color-bittersweet;
    }
  }
  
}
</style>
