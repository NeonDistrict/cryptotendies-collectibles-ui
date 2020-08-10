<template lang="pug">
.box(:class="{'box--large': isLarge}")
  .box__wrapper
    img.box__img(
      :src="require('~/assets/images/bucket.png')"
      :class="{'box__img--large': isLarge}"
    )
    .box__size(:class="{'box__size--large': isLarge}")
      span {{ boxInfo.size }}
      small Box
  .box__owned 
    fa-icon(v-if="isFetchingAssetCount" :icon="['fas', 'spinner']" spin)
    span(v-else) {{myBoxInfo.count || 0}}x
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
  import { BoxInfo } from '~/types'
@Component({})
  export default class Box extends Vue {
    @Prop() boxId!: number
    @Prop({default: false}) isLarge?: boolean
    @State ownTendiesBoxes
    @State isFetchingAssetCount
    @State boxMaster

    get boxInfo() {
      return this.boxMaster[this.boxId]
    }

    get myBoxInfo() {
      return this.ownTendiesBoxes[this.boxId] || {}
    }
  }
</script>

<style lang="scss" scoped>
.box {
  @extend %col;
  position: relative;
  padding: 1rem 2rem;
  background-color: $color-woodsmoke;
  border-radius: 0.3rem;
  box-shadow: 0 0 0 rgba($color-brinkpink, 0);
  transition: 0.2s ease-in-out;
  border: 1px solid $color-koromiko;

  @include breakpoint(sm) {
    padding: 1.5rem 3rem;
  } 

  &:hover {
    box-shadow: 0px 0px 8px $color-koromiko;
  }

  &--large {
    padding: 1.25rem 2rem;
    box-shadow: 0px 0px 8px $color-koromiko;
    cursor: default;
    
    @include breakpoint(sm) {
      padding: 2rem 4rem;
    } 
  }

  &__wrapper {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
  }

  &__img {
    width: 3rem;
    height: auto;
    transition: 0.2s ease-in-out;

    @include breakpoint(sm) {
      width: 4rem;
    } 

    &--large {
      width: 3rem;
      @include breakpoint(sm) {
        width: 4rem;
      } 
    }
  }

  &__size {
    @extend %col;
    span {
      display: block;
      font-size: 1.6rem;
      font-weight: 500;
      @include breakpoint(sm) {
        font-size: 2rem;
      } 
    }
    small { 
      font-size: 0.7rem;
      font-weight: 300;
      @include breakpoint(sm) {
        font-size: 0.9rem;
      } 
    }

    &--large {
      span {
        font-size: 2rem;
        @include breakpoint(sm) {
          font-size: 2.4rem;
        } 
      }

      small {
        font-size: 0.9rem;
        @include breakpoint(sm) {
          font-size: 1rem;
        } 
      }
    }
  }

  &__owned {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 99;
    margin: 0 -0.5rem -0.5rem 0;
    background-color: $color-koromiko;
    color: $color-shark-dark;
    border-radius: 0.35rem;
    padding: 0.35rem 0.75rem;
    font-size: 0.9rem;
    font-weight: 500;

    svg {
      font-size: 0.8rem;
    }
  }

}
</style>
