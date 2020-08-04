<template lang="pug">
.drop-rates
  .drop-rates__header Details
  .drop-rates__row
    .drop-rates__wrapper 4 Cards
    .drop-rates__wrapper min. 1 Uncommon
  .drop-rates__header Drop Rates
  .drop-rates__wrapper
    .drop-rates__rate(v-for="drop in rarities")
      .drop-rates__rate__detail(:class="`drop-rates__rate--${drop}`") {{`${drop}: `}} {{dropRatePercentage(dropInfo.rates[drop]) }}
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import { RARITIES } from '~/assets/data/constants'
  import { DropInfo } from '~/types'
@Component({})
  export default class MyComponent extends Vue {
    @Prop() dropInfo!: DropInfo
    
    get rarities () {
      return RARITIES
    }

    dropRatePercentage(dropRate) {
      return `${Math.round(dropRate * 1000) / 10}%`
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
