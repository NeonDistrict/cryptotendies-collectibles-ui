<template lang="pug">
.cardsList
  .cardsList__wrapper
    card(
      v-for="(card, index) in allMyCards" 
      :key="index"
      :cardInfo="card"
      :showOwned="true"
    )
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
  import { ALL_CARDS } from '~/assets/data/db/mocked'
  import Card from '~/components/atoms/Card.vue'
@Component({
  components: {
    Card
  }
})
  export default class CardsList extends Vue {
    @State ownTendiesCards

    get allMyCards() {
      return this.ownTendiesCards
    }
  }
</script>

<style lang="scss" scoped>
.cardsList {
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
  
}
</style>
