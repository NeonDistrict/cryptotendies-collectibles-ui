<template lang="pug">
.open
  .open__wrapper
    .open__boxes
      .open__boxes__box(
        v-for="boxId in allBoxesArray"
        :key="boxId"
        :class="{isSelected: boxId === selectedId, selectable: hasBox(boxId)}"
        @click="() => selectBox(boxId)"
      )
        box(
          :isLarge="true"
          :boxId="boxId"
        )
    .open__content
      .open__content__headline {{boxInfo.dropInfo.cards}}-Piece Tendie Box
      drop-rates(
        :boxInfo="boxInfo"
        :dropInfo="dropInfo"
      )
      .open__content__text
  .open__main(v-if="ownsTendiesBox || !isClosed")
    .open__main__load(v-if="isConfirming")
      loading-spinner
      span Getting your serving ready. 
      span This could take a while, please don't close this tab.
    .open__main__btns(v-else-if="isClosed")
      button(@click="sendToOpenSea") Sell Box
      button(@click="openSendModal") Send Box
      button(@click="openBox" :disabled="isOpening") 
        fa-icon(v-if="isOpening" :icon="['fas', 'spinner']" spin)
        span Open Box
    .open__main__open(v-else)
      span Mommy knows you are a Good Boy
      flipping-cards.open__main__cards(
        :cardIds="cardIds"
        @open-card-modal="openCardModal"
      )
      button(@click="openNext") Open Next Box
  .open__main(v-else) 
    .open__main--empty 🐔 No owned Tendies Boxes found. 🐔

  card-modal(
    v-if="cardDetailsId"
    :cardId="cardDetailsId"
    @modal-close="closeCardModal"
  )

  send-asset-modal(
    v-if="showSendModal"
    :assetId="selectedId"
    :isBox="true"
    @modal-close="closeSendModal"
  )
</template>

<script lang="ts">
  import { Component, Prop, Vue, State, Action } from 'nuxt-property-decorator'
  import { ALL_BOXES } from '~/assets/data/db/mocked'
  import { TENDIES_CARD } from '~/assets/data/ethereum/contractsList.json'
  import Box from '~/components/atoms/Box.vue'
  import LoadingSpinner from '~/components/atoms/LoadingSpinner.vue'
  import DropRates from '~/components/molecules/DropRates.vue'
  import FlippingCards from '~/components/molecules/FlippingCards.vue'
  import CardModal from '~/components/molecules/CardModal.vue'
  import SendAssetModal from '~/components/molecules/SendAssetModal.vue'
@Component({
  components: {
    Box,
    DropRates,
    FlippingCards,
    LoadingSpinner,
    CardModal,
    SendAssetModal
  }
})
  export default class Open extends Vue {
    private isClosed = true
    private isOpening = false
    private isConfirming = false
    private cardIds = []
    private cardDetailsId = null
    private showSendModal = false

    @State chainId
    @State ownTendiesBoxes
    @State boxMaster
    @Action getInventoryOfUser

    get selectedId () {
      return Number(this.$route.query.id)
    }

    get allBoxesArray() {
      return Object.keys(this.boxMaster).map(boxId => Number(boxId))
    }

    get boxInfo() {
      return ALL_BOXES.find(boxInfo => boxInfo.id === this.selectedId)
    }

    get dropInfo () {
      return this.boxInfo.dropInfo
    }

    get ownsTendiesBox() {
      return !!this.ownTendiesBoxes[this.selectedId]
    }

    hasBox(boxId) {
      const box = this.ownTendiesBoxes[boxId] || {}
      return !!box.count || 0
    }

    sendToOpenSea() {
      window.open(this.boxMaster[this.selectedId].link, '_blank')
    }

    openNext() {
      this.isClosed = true
      this.isOpening = false
      this.isConfirming = false
      this.cardIds = []
    }

    async openBox() {
      this.isOpening = true
      try { 
        await this.$ethereumService.openTendiesBox(this.selectedId, 1, () => this.isConfirming = true, this.displayOpenedCardsAndUpdateState)
      } catch(e) {
        console.error(e)
        this.isOpening = false
      }
    }

    selectBox(boxId) {
      if ((this.ownTendiesBoxes[boxId] || {}).count) {
        this.$router.push({ path: 'open', query: {id: boxId}})
      }
    }

    displayOpenedCardsAndUpdateState(receipt) {
      this.isConfirming = false
      this.isClosed = false
      this.cardIds = receipt.events.TransferBatch.returnValues.ids
      setTimeout(async () => {
        await this.getInventoryOfUser({ fetchBoxes: true, fetchCards: true })
      }, 2000) 
    }

    openCardModal(cardId) {
      this.cardDetailsId = cardId
    }

    closeCardModal() {
      this.cardDetailsId = null
    }

    openSendModal() {
      this.showSendModal = true
    }

    closeSendModal() {
      this.showSendModal = false
    }
  }
</script>

<style lang="scss" scoped>
.open {
  margin-top: 1rem;
  @include breakpoint(sm) {
    margin-top: 2rem;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    align-items: center;
    @include breakpoint(sm) {
      grid-template-columns: 0.5fr 1.5fr;
      grid-gap: 3rem;
    }
  }

  &__boxes {
    &__box + &__box {
      margin-top: 1rem;
    }
    &__box {
      opacity: 0.4;
    }
  }

  &__content {
    &__headline {
      font-weight: 500;
      font-size: 1.1rem;
      padding: 0.5rem 0;

      @include breakpoint(sm) {
        font-size: 1.4rem;
      }
    }
  }

  &__main {
    margin-top: 2rem;

    &--empty {
      margin: 2rem 0;
      text-align: center;
      @include breakpoint(sm) {
        margin: 4rem 0;
      }
    }

    &__load {
      margin: 4rem 0;
      @extend %col;
      span { 
        display: block;
        padding-top: 1rem;

        &:last-of-type {
          font-size: 0.8rem;
          opacity: 0.8;
        }
      }
    }

    &__btns {
      margin: 2rem 0;
      @extend %col;
      @include breakpoint(sm) {
        margin: 4rem 0 2rem;
        flex-direction: row;
      }
      button + button {
        margin-top: 1rem;
        @include breakpoint(sm) {
          margin-top: 0;
          margin-left: 2rem;
        }
      }
      button { 
        @extend %btn-secondary;
        width: 100%;
        &:last-of-type {
          @extend %btn-primary;
        }
        svg { 
          margin-right: 0.5rem;
        }
        @include breakpoint(sm) {
          width: 12rem;
        }
      }
    }

    &__open {
      span { 
        text-align: center;
        display: block;
        margin: 0 auto 2rem;
        font-size: 1.1rem;
        font-weight: 400;
      }
      button { 
        @extend %btn-primary;
        margin: 2rem auto;
      }
    }
  }
}


.selectable {
  cursor: pointer;  
  opacity: 0.5;
}

.isSelected {
  opacity: 1;
}
</style>
