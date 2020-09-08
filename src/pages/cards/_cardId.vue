<template lang="pug">
.view-card
  .view-card__wrapper
    card(
      :isLarge="true"
      :cardId="cardId"
    )
    .view-card__content
      .view-card__content__headline {{ cardInfo.name }}
      .view-card__content__text {{ cardInfo.description }}
      card-meta-data(
        :cardInfo="cardInfo"
      )
  .view-card__main
    .view-card__main__btns
      button(
        @click="linkToOpenSea"
      ) Trade Card
      button(
        v-if="isOwned"
        @click="openSendModal"
      ) Send Card
      button(@click="linkToTwitter") Shill on Twitter
  
  send-asset-modal(
    v-if="showSendModal"
    :assetId="cardId"
    :isCard="true"
    @modal-close="closeSendModal"
  )
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
  import { ALL_CARDS } from '~/assets/data/db/mocked'
  import { CardInfo } from '~/types'
  import Card from '~/components/atoms/Card.vue'
  import CardMetaData from '~/components/molecules/CardMetaData.vue'
  import SendAssetModal from '~/components/molecules/SendAssetModal.vue'
@Component({
  components: {
    Card,
    CardMetaData,
    SendAssetModal
  }
})
  export default class ViewCard extends Vue {
    @State ownTendiesCards
    @State cardMaster
    private showSendModal = false

    get cardInfo() {
      return this.cardMaster[this.cardId]
    }

    get cardId() {
      return Number(this.$route.params.cardId)
    }

    get twitterText() {
      return 'Look, mommy gave me this fresh tendies meme:'
    }

    get hashTags() {
      return ['TEND,NFT']
    }

    get isOwned() {
      return !!this.ownTendiesCards[this.cardId]
    }

    linkToTwitter() {
      window.open(`https://twitter.com/share?text=${this.twitterText}&url=${this.cardInfo.link}&hashtags=${this.hashTags}`, '_blank')
    }

    linkToOpenSea() {
      window.open(this.cardInfo.link, '_blank')
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
.view-card {
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

  &__content {
    &__headline {
      font-weight: 500;
      font-size: 1.1rem;
      padding: 0.5rem 0;

      @include breakpoint(sm) {
        font-size: 1.4rem;
      }
    }

    &__text {
      padding: 0.5rem 0 1.5rem;
      font-weight: 300;
      line-height: 1.4;
    }
  }

  &__main {
    margin-top: 2rem;

    &__btns {
      margin: 2rem 0;
      @extend %col;
      @include breakpoint(sm) {
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
        @include breakpoint(sm) {
          width: 12rem;
        }
        &:last-of-type {
          @extend %btn-primary;
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
    }
  }
}
</style>
