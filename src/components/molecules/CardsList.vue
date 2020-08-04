<template lang="pug">
.cardsList
  .cardsList__wrapper
    card(
      v-for="(card, index) in allCards" 
      :key="index"
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
  export default class CardsList extends Vue {

    get allCards() {
      return ALL_CARDS
    }
  }
</script>

<style lang="scss" scoped>
.cardsList {
  &__wrapper {
    display: grid;
    grid-gap: 2rem 1rem;
    grid-template-columns:  repeat(auto-fill, minmax(6rem, 1fr));

    @include breakpoint(sm) {
      grid-gap: 2rem;
      grid-template-columns:  repeat(auto-fill, minmax(8rem, 1fr));
    } 
  }
  
}
</style>
