<template lang="pug">
nuxt-link.card(
  :to="{ name: 'cards-cardId', params: { cardId: cardInfo.id } }"
  :class="{'card--large': isLarge}"
)
  //- img(:src="require('~/assets/images/tend.png')")
  //- .card__rarity(:class="`card__rarity--${rarityStr}`") {{ rarityLetter }}
  .card__wrapper(
    :class="`card__wrapper--${rarityStr}`"
  )
    .card__wrapper__blur(:style="`background-image: url(${require(`~/assets/images/memes/${cardInfo.image}.png`)})`")
    img.card__wrapper__img(:src="require(`~/assets/images/memes/${cardInfo.image}.png`)")
  .card__owned(v-if="showOwned") 
    fa-icon(v-if="isFetchingAssetCount" :icon="['fal', 'spinner']" spin)
    span(v-else) {{cardInfo.count || 0}}x
</template>

<script lang="ts">
  import { Component, Prop, Vue, State} from 'nuxt-property-decorator'
  import { CardInfo } from '~/types'
@Component({})
  export default class Card extends Vue {
    @Prop() cardInfo!: CardInfo
    @Prop({default: false}) isLarge!: boolean
    @Prop({default: false}) showOwned!: boolean
    @State isFetchingAssetCount

    get rarityStr() {
      switch(this.cardInfo.rarity) {
        case 1: return 'common'
        case 2: return 'uncommon'
        case 3: return 'rare'
        case 4: return 'epic'
        case 5: return 'legendary'
      }
    }

    get rarityLetter() {
      switch(this.cardInfo.rarity) {
        case 1: return 'C'
        case 2: return 'UC'
        case 3: return 'R'
        case 4: return 'E'
        case 5: return 'L'
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
    height: 18rem;
    width: 12rem;
  } 

  &--large {
    margin: 0 auto;
    height: 18rem;
    width: 12rem;

    @include breakpoint(sm) {
      height: 24rem;
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
    margin: -1rem 0 0 auto;
    background-color: $color-woodsmoke;
    border-radius: 0.5rem;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(white, 0.8);

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