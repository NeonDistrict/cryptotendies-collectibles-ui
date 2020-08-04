<template lang="pug">
.packsList
  .packsList__wrapper
    nuxt-link.packsList__pack(
      v-for="(pack, index) in allPacks" 
      :key="index"
      :to="'open'"
    )
      pack(
        :size="pack.size"
      )
      .packsList__buttons
        button Trade
        button Open
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import { ALL_PACKS } from '~/assets/data/db/mocked'
  import Pack from '~/components/atoms/Pack.vue'
@Component({
  components: {
    Pack
  }
})
  export default class PacksList extends Vue {
    @Prop() propName!: string

    get allPacks() {
      return ALL_PACKS
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
