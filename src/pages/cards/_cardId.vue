<template lang="pug">
.view-card
  .view-card__wrapper
    card(
      :isLarge="true"
      :cardInfo="cardInfo"
    )
    .view-card__content
      .view-card__content__headline Tendies Wings of Desire
      //- drop-rates(
      //-   :dropInfo="dropInfo"
      //- )
      .view-card__content__text Tendies understands you. You have desires, Tendies has answers. Following the path of Tendies will fulfill your crispiest dreams. And if all else fails, Mommy is here for you.
      card-meta-data(
        :cardInfo="cardInfo"
      )
  .view-card__main
    .view-card__main__btns
      button Sell Card
      button Shill on Twitter
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
  import { ALL_CARDS } from '~/assets/data/db/mocked'
  import Card from '~/components/atoms/Card.vue'
  import CardMetaData from '~/components/molecules/CardMetaData.vue'
@Component({
  components: {
    Card,
    CardMetaData
  }
})
  export default class ViewCard extends Vue {
    @State ownTendiesCards
    get cardInfo() {
      return this.ownTendiesCards[Number(this.cardId)]
    }

    get cardId() {
      return this.$route.params.cardId
    }
  }
</script>

<style lang="scss" scoped>
.view-card {
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

    &__text {
      padding: 0.5rem 0 1.5rem;
      font-weight: 300;
      line-height: 1.4;
    }
  }

  &__main {
    margin-top: 2rem;

    &__btns {
      margin: 2rem 0;
      @extend %row;
      button + button {
        margin-left: 1.5rem;
        @include breakpoint(sm) {
          margin-left: 2rem;
        }
      }
      button { 
        @extend %btn-primary;
        width: 100%;
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
