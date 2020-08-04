<template lang="pug">
.flipping
  .flipping__wrapper
    .flipping__container(
      v-for="(card, index) in allCards" 
      @click="flipCard(index)"
    )
      .flipping__flipper(:class="{'flipping__flipper--flipped': isFlipped(index)}")
        .flipping__back
        card.flipping__front(
          :imageId="index + 1"
        )
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import { ALL_CARDS } from '~/assets/data/db/mocked'
  import Card from '~/components/atoms/Card.vue'
@Component({
  components: {
    Card
  }
})
  export default class FlippingCards extends Vue {
    private flippedCards = [2]

    get allCards() {
      return ALL_CARDS
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
    grid-template-columns:  repeat(auto-fill, minmax(6rem, 1fr));

    @include breakpoint(sm) {
      grid-gap: 2rem;
      grid-template-columns:  repeat(auto-fill, minmax(8rem, 1fr));
    } 
  }

  // &__container {
  //   position: relative;
  //   perspective: 1000px;
  // }

  // &__flipper {
  //   transition: 0.2s ease-in-out;
  //   transform-style: preserve-3d;
  //   &--flipped {
  //     transform: rotateY(180deg)
  //   }
  // }

  // &__back {
  //   background-color: black;
  //   transform: rotateY(0deg);
  // }
}

@keyframes cardUnFlip {
  0% {
    transform: rotateZ(0deg) rotateY(0deg);
  } 
  50% {
    transform: rotateZ(-10deg) rotateY(90deg);
  }
  100% {
    transform: rotateZ(0deg) rotateY(180deg);
  }
}

@keyframes cardFlip {
  0% {
    transform: rotateZ(0deg) rotateY(180deg);
  } 
  50% {
    transform: rotateZ(-10deg) rotateY(90deg);
  }
  100% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
}

</style>
