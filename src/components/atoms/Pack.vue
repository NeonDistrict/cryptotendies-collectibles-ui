<template lang="pug">
.pack(:class="{'pack--large': isLarge}")
  .pack__wrapper
    img.pack__img(
      :src="require('~/assets/images/bucket.png')"
      :class="{'pack__img--large': isLarge}"
    )
    .pack__size(:class="{'pack__size--large': isLarge}")
      span {{ size }}
      small Box
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
  export default class Pack extends Vue {
    @Prop() size!: number
    @Prop({default: false}) isLarge?: boolean
  }
</script>

<style lang="scss" scoped>
.pack {
  @extend %col;
  padding: 0.5rem 1.5rem;
  background-color: $color-woodsmoke;
  border-radius: 0.3rem;
  box-shadow: 0 0 0 rgba($color-brinkpink, 0);
  transition: 0.2s ease-in-out;
  border: 1px solid $color-koromiko;
  cursor: pointer;

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

}
</style>
