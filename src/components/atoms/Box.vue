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
  .box__owned {{ownedCopies}}x
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
  import { BoxInfo } from '~/types'
@Component({})
  export default class Box extends Vue {
    @Prop() boxInfo!: BoxInfo
    @Prop({default: false}) isLarge?: boolean
    @State ownTendiesBoxes

    get ownedCopies() {
      return this.ownTendiesBoxes[this.boxInfo.id]
    }
  }
</script>

<style lang="scss" scoped>
.box {
  @extend %col;
  position: relative;
  padding: 0.5rem 1.5rem;
  background-color: $color-woodsmoke;
  border-radius: 0.3rem;
  box-shadow: 0 0 0 rgba($color-brinkpink, 0);
  transition: 0.2s ease-in-out;
  border: 1px solid $color-koromiko;

  @include breakpoint(sm) {
    padding: 1rem 2rem;
  } 

  &:hover {
    box-shadow: 0px 0px 8px $color-koromiko;
  }

  &--large {
    padding: 1rem 2rem;
    box-shadow: 0px 0px 8px $color-koromiko;
    cursor: default;
    
    @include breakpoint(sm) {
      padding: 2rem 3rem;
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
    width: 2.25rem;
    height: auto;
    transition: 0.2s ease-in-out;

    &--large {
      width: 3rem;
    }
  }

  &__size {
    @extend %col;
    span {
      display: block;
      font-size: 1.6rem;
      font-weight: 500;
    }
    small { 
      font-size: 0.7rem;
      font-weight: 300;
    }

    &--large {
      span {
        font-size: 2rem;
      }

      small {
        font-size: 0.9rem;
      }
    }
  }

  &__owned {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 99;
    margin: 0 -0.5rem -0.5rem 0;
    background-color: $color-shark;
    border-radius: 0.5rem;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(white, 0.8);
  }

}
</style>
