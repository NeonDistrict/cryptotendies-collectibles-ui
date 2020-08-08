<template lang="pug">
.boxList
  .boxList__wrapper
    .boxList__pack(
      v-for="(box, index) in allBoxes" 
      :key="index"
      :class="{inactive: !ownedCopies(box)}"
    )
      box(
        :boxInfo="box"
      )
      .boxList__buttons
        button(@click="sendToOpenSea(box)" :disable="!ownedCopies(box)") Trade
        button(@click="sendToOpen(box)" :disable="!ownedCopies(box)") Open
</template>

<script lang="ts">
  import { Component, Prop, Vue, State} from 'nuxt-property-decorator'
  import { ALL_BOXES } from '~/assets/data/db/mocked'
  import Box from '~/components/atoms/Box.vue'
@Component({
  components: {
    Box
  }
})
  export default class BoxList extends Vue {
    @State ownTendiesBoxes

    get allBoxes() {
      return ALL_BOXES
    }

    ownedCopies(boxInfo) {
      return this.ownTendiesBoxes[boxInfo.id].count
    }

    sendToOpen(boxInfo) {
      if (!this.ownedCopies(boxInfo)) return
      this.$router.push({ path: 'open', query: {id: boxInfo.id}})
    }

    sendToOpenSea(boxInfo) {
      if (!this.ownedCopies(boxInfo)) return
      window.open('https://opensea.io/', '_blank')
    }
  }
</script>

<style lang="scss" scoped>
.boxList {
  &__wrapper {
    display: grid;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
    grid-template-columns:  repeat(auto-fill, minmax(12rem, 1fr));

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

.inactive {
  opacity: 0.3;
}
</style>
