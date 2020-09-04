<template lang="pug">
.earn 
  .earn__wrapper
    .earn__card
      .earn__emoji
        img.earn__emoji__nom(
          :src="require('~/assets/images/gifs/nom.gif')"
        )
      .earn__title OM NOM NOM NOM
      .earn__text 
        span(v-if="didFetch") {{ grillAmount }} 
        fa-icon(v-else :icon="['fas', 'spinner']" spin)
        span TEND on the Grill
      .earn__text Grill to get 5 Packs and 1% of TEND
      button.earn__button(
        @click="grill"
      ) Grill TEND
  
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
@Component({})
  export default class Earn extends Vue {
    @Prop() propName!: string
    @State ownAddress
    @State networkId

    private grillAmount = 0
    private didFetch = false
    private intervalId

    async mounted() {
      this.intervalId = setInterval(async () => this.getGrillAmount(), 30000)
    }

    beforeDestroy() {
      clearInterval(this.intervalId)
    }

    async getGrillAmount() {
      const grillValue = (await this.$ethereumService.getGrillAmount()) / 1e18
      console.log(grillValue)
      this.grillAmount = Math.floor(grillValue * 100) / 100
      this.didFetch = true
    }

    grill() {
      this.$ethereumService.grillPool(this.ownAddress, this.networkId)
    }
  }
</script>

<style lang="scss" scoped>
.earn {
  &__wrapper {
    @extend %row;
    margin-top: 2rem;
  }
  &__card + &__card {
    margin-left: 2rem;
  }
  &__card {
    @extend %col;
    padding: 2rem 1rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid $color-woodsmoke;
    min-width: 20rem;
    background-color: $color-shark;
  }
  &__emoji {
    @extend %col;
    padding: 1.5rem;
    border-radius: 50%;
    box-shadow: inset 4px 4px 8px $color-woodsmoke, inset -6px -6px 12px $color-mako;
    margin-bottom: auto;
  }
  &__title {
    padding-top: 0.5rem;
    text-align: center;
    line-height: 1.5;
    font-size: 1.2rem;
    font-weight: bold;
  }
  &__text {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    opacity: 0.8;
    text-align: center; 

    svg { 
      margin-right: 0.5rem;
    }
  }
  &__button {
    @extend %btn-primary;
    margin-top: 1rem;
  }
}
</style>
