<template lang="pug">
.packsList
  .packsList__wrapper
    nuxt-link.packsList__pack(
      v-for="(box, index) in allBoxes" 
      :key="index"
      :to="'open'"
    )
      box(
        :boxInfo="box"
      )
      .packsList__buttons
        button Trade
        button Open
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import { ALL_BOXES } from '~/assets/data/db/mocked'
  import Box from '~/components/atoms/Box.vue'
@Component({
  components: {
    Box
  }
})
  export default class PacksList extends Vue {
    @Prop() propName!: string

    get allBoxes() {
      return ALL_BOXES
    }
  }
</script>

<style lang="scss" scoped>
.packsList {
  &__wrapper {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns:  repeat(auto-fill, minmax(10rem, 1fr));

    @include breakpoint(sm) {
      grid-gap: 2rem;
    } 
  }
  &__buttons {
    @extend %row;
    background-color: rgba($color-woodsmoke, 0.4);
    border-radius: 0 0 0.25rem 0.25rem;
    padding: 1rem 0.5rem;
    justify-content: space-around;
    button { 
      @extend %btn-primary--small;
      &:first-of-type {
        @extend %btn-secondary--small;
      }
    }
  }
}
</style>
