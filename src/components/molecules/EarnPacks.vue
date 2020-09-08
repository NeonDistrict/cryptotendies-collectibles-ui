<template lang="pug">
.earn 
  .earn__wrapper
    .earn__loading(v-if="txPending")
      loading-spinner
      span Getting your serving ready. 
      span This could take a while, please don't close this tab.
    .earn__card(v-else)
      .earn__emoji
        img.earn__emoji__nom(
          :src="require('~/assets/images/gifs/nom.gif')"
        )
      .earn__title OM NOM NOM NOM
      .earn__text__tend
        span(v-if="didFetch") 
          span {{ grillAmount }} 
        fa-icon(v-else :icon="['fas', 'spinner']" spin)
      .earn__text 
        span TEND on the Grill 
        span (${{tendiesValue}})
      .earn__grill Grill to get 5 Packs and 1% of TEND
      button.earn__button(
        @click="grill"
      ) Grill TEND
  
</template>

<script lang="ts">
  import { Component, Prop, Vue, State, Action } from 'nuxt-property-decorator'
  import LoadingSpinner from '~/components/atoms/LoadingSpinner.vue'
@Component({
  components: {
    LoadingSpinner
  }
})
  export default class Earn extends Vue {
    @Prop() propName!: string
    @State ownAddress
    @State networkId
    @Action getInventoryOfUser

    private grillAmount = 0
    private didFetch = false
    private intervalId
    private tendPrice = 0
    private txPending = false

    async mounted() {
      this.intervalId = setInterval(async () => this.getGrillAmount(), 30000)
    }

    beforeDestroy() {
      clearInterval(this.intervalId)
    }

    get tendiesValue() {
      return Math.round(this.tendPrice * this.grillAmount * 100) / 100
    }

    async getGrillAmount() {
      try {
       const res =  await this.$axios.$get('https://api.coingecko.com/api/v3/simple/price?ids=tendies&vs_currencies=USD')
       if (res.tendies) {
         this.tendPrice = res.tendies.usd
       }
      } catch (e) {
        console.error(e)
      }
      const grillValue = (await this.$ethereumService.getGrillAmount()) / 1e18
      this.grillAmount = Math.floor(grillValue * 100) / 100
      this.didFetch = true
    }

    grill() {
      this.$ethereumService.grillPool(this.ownAddress, this.networkId, () => this.txPending = true, this.finishTxAndLoadNewInventory)
    }

    async finishTxAndLoadNewInventory() {
      this.txPending = false
      await this.getInventoryOfUser({ fetchBoxes: true, fetchCards: true })
      await this.getGrillAmount()
    }
  }
</script>

<style lang="scss" scoped>
.earn {
  &__wrapper {
    @extend %row;
    margin-top: 2rem;
  }
  &__loading {
    margin: 4rem 0;
    @extend %col;
    span { 
      display: block;
      padding-top: 1rem;

      &:last-of-type {
        font-size: 0.8rem;
        opacity: 0.8;
      }
    }
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
    font-size: 0.9rem;
    opacity: 0.8;
    text-align: center; 

    span {
      &:last-of-type {
        margin-left: 0.5rem;
      } 
    }

    &__tend {
      margin: 1.25rem 0 0.5rem;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  &__grill {
    color: $color-koromiko;
    margin: 1rem 0 0.5rem;
  }
  &__button {
    @extend %btn-primary;
    width: 80%;
    margin: 1rem 0 0.5rem;
  }
}
</style>
