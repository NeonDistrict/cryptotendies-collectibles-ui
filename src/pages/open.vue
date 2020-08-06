<template lang="pug">
.open
  .open__wrapper
    box(
      :isLarge="true"
      :boxInfo="boxInfo"
    )
    .open__content
      .open__content__headline 6-Piece Tendie Box
      drop-rates(
        :boxInfo="boxInfo"
        :dropInfo="dropInfo"
      )
      .open__content__text
  .open__main
    .open__main__btns(v-if="isClosed")
      button Sell Box
      button(@click="openBox") Open Box
    .open__main__open(v-else)
      span Mommy knows you are a Good Boy
      flipping-cards.open__main__cards
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import { ALL_BOXES } from '~/assets/data/db/mocked'
  import Box from '~/components/atoms/Box.vue'
  import DropRates from '~/components/molecules/DropRates.vue'
  import FlippingCards from '~/components/molecules/FlippingCards.vue'
@Component({
  components: {
    Box,
    DropRates,
    FlippingCards
  }
})
  export default class Open extends Vue {
    private isClosed = true

    get boxInfo() {
      return ALL_BOXES[1]
    }

    get dropInfo () {
      return {
        cards: 6,
        guaranteed: {
          common: 0,
          uncommon: 0,
          rare: 0,
          epic: 1,
          legendary: 0
        },
        rates: {
          common: 0.47,
          uncommon: 0.28,
          rare: 0.15,
          epic: 0.08,
          legendary: 0.02
        }
      }
    }

    openBox() {
      this.isClosed = false
    }
  }
</script>

<style lang="scss" scoped>
.open {
  margin-top: 1rem;
  @include breakpoint(sm) {
    margin-top: 2rem;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    align-items: center;
    @include breakpoint(sm) {
      grid-template-columns: 0.5fr 1.5fr;
      grid-gap: 3rem;
    }
  }

  &__content {
    &__headline {
      font-weight: 500;
      font-size: 1.1rem;
      padding: 0.5rem 0;

      @include breakpoint(sm) {
        font-size: 1.4rem;
      }
    }
  }

  &__main {
    margin-top: 2rem;

    &__btns {
      margin: 2rem 0;
      @extend %row;
      button + button {
        margin-left: 2rem;
      }
      button { 
        width: 100%;
        @extend %btn-primary;
        @include breakpoint(sm) {
          width: 12rem;
        }
        &:first-of-type {
          @extend %btn-secondary;
        }
      }
    }

    &__open {
      span { 
        text-align: center;
        display: block;
        margin: 0 auto 2rem;
        font-size: 1.1rem;
        font-weight: 400;
      }
    }
  }
}
</style>
