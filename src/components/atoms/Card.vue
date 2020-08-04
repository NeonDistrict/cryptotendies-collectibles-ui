<template lang="pug">
.card
  //- img(:src="require('~/assets/images/tend.png')")
  .card__wrapper
    .card__wrapper__cover(:style="`background-image: url(${require(`~/assets/images/cards/${imageId}.png`)})`")
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
  export default class Card extends Vue {
    @Prop() imageId!: number
  }
</script>

<style lang="scss" scoped>
.card {
  @extend %col;
  height: 8rem;
  width: 6rem;
  box-sizing: border-box;

  @include breakpoint(sm) {
    height: 12rem;
    width: 8rem;
  } 

  &__wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
    padding-bottom: 150%;
    perspective: 1000px;

    &__cover {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
      background-size: cover;
      perspective-origin: 50% 50%;
      transform-style: preserve-3d;
      transform-origin: top center;
      will-change: transform;
      transform: skewX(.001deg);
      background-color: $color-mako;
      border-radius: 0.25rem;
      box-shadow: 0 0 8px rgba($color-woodsmoke, 0.7);
      transition: 0.2s ease-in-out;
      cursor: pointer;
      
      // Gloss 
      
      &::after {
        display: block;
        content: '';
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 120%;
        background: linear-gradient(226deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,0.2) 42%, rgba(255,255,255,0) 60%);
        transform: translateY(-20%);
        will-change: transform;
        transition: transform .65s cubic-bezier(0.18, 0.9, 0.58, 1);
      }
      
    }
    
    &:hover &__cover {
      transform: rotateX(7deg) translateY(-6px);

      &::after {
        transform: translateY(0%);
      }
      
    }
    
    // Shadows
    
    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 5%;
      left: 5%;
      width: 90%;
      height: 90%;
      background: rgba(#000000, 0.5);
      box-shadow: 0 6px 12px 12px rgba(#000000, 0.4);
      will-change: opacity;
      transform-origin: top center;
      transform: skewX(.001deg);
      transition: transform .35s ease-in-out, opacity .5s ease-in-out;
    }
    
    &:hover::before {
      opacity: 0.6;
      transform: rotateX(7deg) translateY(-6px) scale(1.05);
    }
  }
}
</style>
