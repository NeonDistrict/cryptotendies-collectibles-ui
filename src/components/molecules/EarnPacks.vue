<template lang="pug">
.earn 
  .earn__wrapper
    .earn__card
      .earn__emoji
        img.earn__emoji__nom(
          :src="require('~/assets/images/gifs/nom.gif')"
        )
      .earn__title OM NOM NOM NOM
      .earn__text Grill and get 5x Packs and 1% of TEND
      button.earn__button(
        @click="burn"
      ) Grill TEND
    .earn__card
      .earn__emoji
        img.earn__emoji__nom(
          :src="require('~/assets/images/gifs/bucket.gif')"
        )
      .earn__title CLAIM TENDIES BUCKET
      .earn__text Next Bucket claimable in 2days, 13hours, 2minutes
      button.earn__button(
        @click="burn"
      ) Claim Bucket
  
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
  export default class Earn extends Vue {
    @Prop() propName!: string

    burn() {
      window.alert('tbd')
    }
  }
</script>

<style lang="scss" scoped>
.earn {
  &__wrapper {
    @extend %row;
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
  }
  &__button {
    @extend %btn-primary;
    margin-top: 1rem;
  }
}
</style>
