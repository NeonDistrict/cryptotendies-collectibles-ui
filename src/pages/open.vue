<template lang="pug">
.open
  .open__wrapper
    pack(
      :isLarge="true"
      :size="4"
    )
    .open__content
      .open__content__headline 4-Piece Tendie Box
      drop-rates(
        :dropInfo="dropInfo"
      )
      .open__content__text
  .open__main
    button(v-if="isClosed")
      span OPEN BOX
    flipping-cards.open__main__cards(v-else)
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import Pack from '~/components/atoms/Pack.vue'
  import DropRates from '~/components/molecules/DropRates.vue'
  import FlippingCards from '~/components/molecules/FlippingCards.vue'
@Component({
  components: {
    Pack,
    DropRates,
    FlippingCards
  }
})
  export default class Open extends Vue {

    get isClosed() {
      return false
    }
    
    get dropInfo () {
      return {
        cards: 4,
        guaranteed: {
          common: 0,
          uncommon: 1,
          rare: 0,
          epic: 0,
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
    button { 
      @extend %btn-primary;
    }
  }
}
</style>
