<template lang="pug">
.boxList
  //- .boxList__empty(v-if="!hasBoxes") 🍗 No Boxes Found 🍗
  .boxList__wrapper
    .boxList__pack(
      v-for="(boxId, index) in allBoxesArray" 
      :key="index"
      :class="{inactive: !ownedCopies(boxId)}"
    )
      box(
        :boxId="Number(boxId)"
      )
      .boxList__buttons
        button(@click="sendToOpen(boxId)" :disable="!ownedCopies(boxId)") Details
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
    @State boxMaster

    get allBoxesArray() {
      return Object.keys(this.boxMaster).map(boxId => Number(boxId))
    }

    getBoxInfo(boxId) {
      return this.ownTendiesBoxes[boxId]
    }

    ownedCopies(boxId) {
      const boxInfo = this.getBoxInfo(boxId) || {}
      return boxInfo.count || 0
    }

    sendToOpen(boxId) {
      const boxInfo = this.getBoxInfo(boxId) || {}
      if (!this.ownedCopies(boxId)) return
      this.$router.push({ path: 'open', query: {id: boxInfo.id}})
    }
  }
</script>

<style lang="scss" scoped>
.boxList {
  &__empty {
    margin: 2rem auto;
    display: block;
    text-align: center;
    opacity: 0.8;
  }
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
      width: 100%;
      margin: 0 1rem;
    }
  }
}

.inactive {
  opacity: 0.3;
}
</style>
