<template lang="pug">
modal.card-modal(@modal-close="$emit('modal-close')")
  template(slot="header") Card Details
  .card-modal__view-card
    .card-modal__view-card__wrapper
      card(
        :isLarge="true"
        :cardId="cardId"
      )
      .card-modal__view-card__content
        .card-modal__view-card__content__headline {{ cardInfo.name }}
        .card-modal__view-card__content__text {{ cardInfo.description }}
        card-meta-data(
          :cardInfo="cardInfo"
        )
  template(slot="footer")
    button(@click="$emit('modal-close')")
      span Close
    button(@click="openTwitter")
      span Shill
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
  import Modal from '~/components/atoms/Modal.vue'
  import Card from '~/components/atoms/Card.vue'
  import CardMetaData from '~/components/molecules/CardMetaData.vue'
@Component({
  components: {
    Modal,
    Card,
    CardMetaData
  }
})
  export default class CardModal extends Vue {
    @Prop() cardId!: number
    @State ownTendiesCards
    @State cardMaster

    get cardInfo() {
      return this.cardMaster[this.cardId]
    }

    openTwitter() {
      window.alert('Todo: Implement Twitter Shill')
    }
  }
</script>

<style lang="scss" scoped>
.card-modal{
  &__view-card {
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
  }
}
</style>