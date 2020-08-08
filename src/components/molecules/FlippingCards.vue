<template lang="pug">
.flipping
  .flipping__wrapper
    .flipping__scene(
      v-for="(card, index) in cardInfos" 
      @click="flipCard(index)"
    )
      .flipping__card(:class="{'flipping__card--flipped': isFlipped(index)}")
        card-back.flipping__card__face.flipping__card__face--front(
          :class="`flipping__card--${rarityStr(card)}`"
        )
        card.flipping__card__face.flipping__card__face--back(
          :cardInfo="card"
        )
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
  import { ALL_CARDS } from '~/assets/data/db/mocked'
  import Card from '~/components/atoms/Card.vue'
  import CardBack from '~/components/atoms/CardBack.vue'
@Component({
  components: {
    Card,
    CardBack
  }
})
  export default class FlippingCards extends Vue {
    @Prop() cardIds!: Array<Number>
    @State ownTendiesCards
    private flippedCards = []

    get cardInfos() {
      // mocked with index until we have a real card mapping
      // todo: Add master spreadsheet with master data
      return this.cardIds.map((cardId, index) => ALL_CARDS[index])
    }

    rarityStr(cardInfo) {
      switch(cardInfo.rarity) {
        case 1: return 'common'
        case 2: return 'uncommon'
        case 3: return 'rare'
        case 4: return 'epic'
        case 5: return 'legendary'
      }
    }

    isFlipped(cardIndex) {
      return this.flippedCards.includes(cardIndex)
    }

    flipCard(cardIndex) {
      this.flippedCards.push(cardIndex)
    }
  }
</script>

<style lang="scss" scoped>
.flipping {
  &__wrapper {
    display: grid;
    grid-gap: 2rem 1rem;
    justify-items: center;
    align-items: center;
    grid-template-columns:  repeat(auto-fill, minmax(8rem, 1fr));

    @include breakpoint(sm) {
      grid-gap: 2rem;
      grid-template-columns:  repeat(auto-fill, minmax(12rem, 1fr));
    } 
  }

  &__scene {
    height: 12rem;
    width: 8rem;
    box-sizing: border-box;
    perspective: 600px;

    @include breakpoint(sm) {
      height: 18rem;
      width: 12rem;
    } 
  }

  &__card {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 0.5s;
    transform-style: preserve-3d;

    &--flipped {
      animation: cardFlip 1.2s forwards ease-in-out;
    }

    &__face {
      position: absolute;
      height: 100%;
      width: 100%;
      backface-visibility: hidden;

      &--front {
        transition: 0.3s ease-in-out;
        cursor: pointer;
      }

      &--back {
        transform: rotateY( 180deg );
      }
    }

    &--common {
      &:hover {
        box-shadow: 0 0 16px rgba($color-pictonblue, 0.4);
      }
    }
    &--uncommon {
      &:hover {
        box-shadow: 0 0 16px rgba($color-mainDarkGreen, 0.4);
      }
    }
    &--rare {
      &:hover {
        box-shadow: 0 0 16px rgba($color-kournikova, 0.4);
      }
    }
    &--epic {
      &:hover {
        box-shadow: 0 0 16px rgba($color-sandyBrown, 0.4);
      }
    }
    &--legendary {
      &:hover {
        box-shadow: 0 0 16px rgba($color-bittersweet, 0.4);
      }
    }
  }
}

@keyframes cardFlip {
  0% {
    transform: rotateZ(0deg) rotateY(0deg);
  } 
  50% {
    transform: rotateZ(-5deg) rotateY(90deg);
  }
  100% {
    transform: rotateZ(0deg) rotateY(180deg);
  }
}
</style>
