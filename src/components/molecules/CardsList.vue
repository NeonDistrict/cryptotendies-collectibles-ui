<template lang="pug">
.cardsList
  .cardsList__empty(v-if="!hasCards") 🐔 No Cards Found 🐔
  .cardsList__wrapper(v-else)
    card(
      v-for="cardId in allMyCardIds" 
      :key="cardId"
      :cardId="Number(cardId)"
      :showOwned="true"
      :clickable="true"
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

    get allMyCardIds() {
      return Object.keys(this.ownTendiesCards) as Array<string>
    }

    get hasCards() {
      return this.allMyCardIds.length > 0
    }
  }
</script>

<style lang="scss" scoped>
.cardsList {
  &__empty {
    margin: 2rem auto;
    display: block;
    text-align: center;
    opacity: 0.8;
  }
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
