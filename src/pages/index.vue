<template lang="pug">
.landing
  .landing__img
    span Welcome to TENDIES!
    img(:src="require('~/assets/images/tendHouse.png')")
  .landing__menu
    .landing__headline(
      v-for="item in menu" 
      :key="item"
      :class="{'landing__headline--selected': item === currentSelection}"
      @click="currentSelection = item"
    ) {{ item }}
  .landing__packs(v-if="currentSelection === menu[0]")
    cards-list
  .landing__packs(v-if="currentSelection === menu[1]")
    packs-list
</template>

<script lang="ts">
  import { Component, Vue, State } from 'nuxt-property-decorator'
  import PacksList from '~/components/molecules/PacksList.vue'
  import CardsList from '~/components/molecules/CardsList.vue'

@Component({
  components: {
    PacksList,
    CardsList
  }
})
  export default class extends Vue {
    private currentSelection = ''

    beforeMount() {
      this.currentSelection = this.menu[0]
    }

    get menu () {
      return ['Your Collection', 'Your Boxes']
    }

    scrollToTop () {
      return true
    }

  }
</script>

<style lang="scss" scoped>
.landing {
  &__img {
    @extend %col;
    margin: 2rem 0 1rem;
    img { 
      width: auto;
      height: 30vh;
      @include breakpoint(sm) {
        width: auto;
        height: 40vh;
      }
    }
    span { 
      display: block;
      font-weight: 500;
      padding: 1rem 0 1rem;
      @include breakpoint(sm) {
        font-size: 1.2rem;
        padding: 1rem 0 2rem;
      }
    }
  }
  &__headline {
    font-size: 1.1rem;
    padding: 2rem 0 1rem 0;
    font-weight: 500rem;
    opacity: 0.7;
    cursor: pointer;
    border-bottom: 2px solid rgba($color-koromiko, 0);
    &--selected {
      opacity: 1;
      border-bottom: 2px solid $color-koromiko;
    }
  }
  &__packs {
    margin: 1rem 0 2rem;
    @include breakpoint(sm) {
      margin: 1rem 0 3rem;
    }
  }
  &__menu {
    @extend %row;
    justify-content: flex-start;
    padding-bottom: 1rem;
    .landing__headline + .landing__headline {
      margin-left: 2rem;
    }
  }
}
</style>