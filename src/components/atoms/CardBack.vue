<template lang="pug">
.card-back
  img(:src="require('~/assets/images/tend.png')")
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
  export default class CardBack extends Vue {
  }
</script>

<style lang="scss" scoped>
.card-back {
  @extend %col;
  height: 8rem;
  width: 6rem;
  border-radius: 0.3rem;
  background-color: $color-shark-dark;
  box-sizing: border-box;
  transition: 0.1s ease-in-out;
  box-shadow: 0 0 8px rgba($color-woodsmoke, 0.5);

  @include breakpoint(sm) {
    height: 12rem;
    width: 8rem;
  } 

  &:hover {
    box-shadow: 0 0 10px rgba($color-woodsmoke, 1);
    transform: translate3d(2px, -4px, 0);
  }

  img { 
    width: 30%;
    height: auto;
  }
}
</style>