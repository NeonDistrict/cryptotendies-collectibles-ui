<template lang="pug">
.card(
  :class="{'card--large': isLarge}"
  @click="openCardDetails"
)
  .card__wrapper(
    :class="`card__wrapper--${rarityStr}`"
  )
    .card__wrapper__blur(:style="`background-image: url(${cardInfo.image})`")
    img.card__wrapper__img(:src="cardInfo.image")
  .card__owned(v-if="showOwned") 
    fa-icon(v-if="isFetchingAssetCount" :icon="['fas', 'spinner']" spin)
    span(v-else) {{ownCardInfo.count ? `${ownCardInfo.count}x` : 'not owned'}}
</template>

<script lang="ts">
  import { Component, Prop, Vue, State} from 'nuxt-property-decorator'
  import { CardInfo, OwnCardInfo } from '~/types'
@Component({})
  export default class Card extends Vue {
    @Prop() cardId!: number
    @Prop({default: false}) isLarge!: boolean
    @Prop({default: false}) clickable!: boolean
    @Prop({default: false}) showOwned!: boolean
    @State isFetchingAssetCount
    @State cardMaster
    @State ownTendiesCards

    get cardInfo() {
      return this.cardMaster[this.cardId] as CardInfo
    }

    get ownCardInfo() {
      return this.ownTendiesCards[this.cardId] as OwnCardInfo || {}
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

    openCardDetails() {
      if (this.clickable) { 
        return this.$router.push({ name: 'cards-cardId', params: { cardId: String(this.cardId) } })
      }
    }
  }
</script>

<style lang="scss" scoped>
.card {
  @extend %col;
  height: 12rem;
  width: 8rem;
  box-sizing: border-box;

  @include breakpoint(sm) {
    height: 17rem;
    width: 12rem;
  } 

  &--large {
    margin: 0 auto;
    height: 17rem;
    width: 12rem;

    @include breakpoint(sm) {
      height: 22.5rem;
      width: 16rem;
    } 

    .card__wrapper {
      cursor: default;
      &:hover {
        box-shadow: 0 0 0 rgba($color-woodsmoke, 0);
        transform: translate3d(0, 0, 0);
      }
    }
  }

  &__wrapper {
    @extend %col;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 0.3rem;
    box-shadow: 0 0 8px rgba($color-woodsmoke, 0.5);
    transition: 0.1s ease-in-out;
    border: solid 2px rgba($color-woodsmoke, 0);
    overflow: hidden;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px rgba($color-woodsmoke, 1);
      transform: translate3d(2px, -4px, 0);
    }

    &--common {
      border-color: rgba($color-pictonblue, 0.7);
    }
    &--uncommon {
      border-color: rgba($color-mainDarkGreen, 0.7);
    }
    &--rare {
      border-color: rgba($color-kournikova, 0.7);
    }
    &--epic {
      border-color: rgba($color-sandyBrown, 0.7);
    }
    &--legendary {
      border-color: rgba($color-bittersweet, 0.7);
    }

    &__blur {
      height: 100%;
      width: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      filter: blur(1rem) brightness(50%);
    }

    &__img {
      position: absolute;
      width: 100%;
      height: auto;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
    }
  }

  &__owned {
    z-index: 99;
    margin: -1rem -0.5rem 0 auto;
    background-color: $color-koromiko;
    color: $color-shark-dark;
    border-radius: 0.35rem;
    padding: 0.35rem 0.75rem;
    font-size: 0.9rem;
    font-weight: 500;

    svg {
      font-size: 0.8rem;
    }
  }
  &__rarity {
    position: absolute;
    top: 0;
    left: 0;
    @extend %col;
    z-index: 99;
    color: $color-woodsmoke;
    border-radius: 50%;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0.25rem 0 0 0.25rem;
    border: solid 2px $color-woodsmoke;
  }
}
</style>