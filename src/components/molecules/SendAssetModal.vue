<template lang="pug">
modal.sendAsset(
  @modal-close="$emit('modal-close')"
  type="bottom"
  :appendToBody="true"
)
  template(slot="header") Send {{headline}}
  .sendAsset__body
    .sendAsset__details(v-if="isCard")
      card.sendAsset__img(
        :cardId="assetId"
      )
    .sendAsset__details(v-else-if="isBox")
      box.sendAsset__img(
        :boxId="assetId"
      )
    .sendAsset__headline
      span Recieving Address
      .sendAsset__input__validation(
        v-if="showValidator"
        :class="{'sendAsset__input__validation--error': !isValidInput}"
      ) {{ renderValidator }}
    .sendAsset__input
      input(
        type="text"
        :placeholder="'0xfbA2C2bBF977eDA19Ad819Bb46787...'"
        v-model="receiverAddress"
      )
    .sendAsset__headline
      span Amount (max: {{copiesOwned}})
      .sendAsset__input__validation(
        :class="{'sendAsset__input__validation--error': !isValidAmount}"
      ) {{ renderAmountValidator }}
    .sendAsset__input
      input(
        type="number"
        min="1"
        max="10"
        step="1"
        v-model="amount"
      )
    .sendAsset__error(v-if="cancelled") Transaction Declined
  template(slot="footer")
    button(@click="$emit('modal-close')") Cancel
    button.sendAsset__send(@click="sendAsset" :disabled="!canSend") Send
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
  import web3 from 'web3'
  import Card from '~/components/atoms/Card.vue'
  import Box from '~/components/atoms/Box.vue'
  import Modal from '~/components/atoms/Modal.vue'
@Component({
  components: {
    Modal,
    Card,
    Box
  }
})
  export default class SendAsset extends Vue {
    @Prop() assetId!: number
    @Prop() isCard?: boolean
    @Prop() isBox?: boolean
    @State ownAddress
    @State networkId
    @State ownTendiesCards
    @State ownTendiesBoxes

    private receiverAddress = ''
    private amount = 1
    private cancelled = false

    get showValidator () {
      return this.receiverAddress.length > 3
    }

    get isValidAmount () {
      if (Number(this.amount) > 10) return false
      if (Number(this.amount) % 1 !== 0) return false
      if (Number(this.amount) < 0) return false
      if (Number(this.amount) > this.copiesOwned) return false
      return true
    }

    get isValidInput () {
      return web3.utils.isAddress(this.receiverAddress)
    }

    get canSend() {
      return this.isValidInput && this.isValidAmount
    }

    get renderValidator () {
      if (this.isValidInput) {
        return 'Valid Address'
      } else {
        return 'Invalid Address'
      }
    }

    get renderAmountValidator () {
      if (Number(this.amount) > 10) return 'Cannot send more than 10.'
      if (Number(this.amount) % 1 !== 0) return 'Invalid input.'
      if (Number(this.amount) < 0) return 'Input needs to be positive.'
      if (Number(this.amount) > this.copiesOwned) return "You don't own enough."
      return 'Valid Input'
    }

    get headline() {
      if (this.isCard) return 'Card'
      if (this.isBox) return 'Box'
      window.alert('invalid asset type')
    }

    get copiesOwned() {
      if (this.isCard) return this.ownTendiesCards[this.assetId].count
      if (this.isBox) return this.ownTendiesBoxes[this.assetId].count
      return 0
    }

    async sendAsset() {
      if (this.isCard) return this.sendCard()
      if (this.isBox) return this.sendBox()
      window.alert('invalid asset type')
    }
  
    async sendCard() {
      // change UI to show "in-flight" transaction
      this.cancelled = false
      try {
        await this.$ethereumService.sendCard(
          this.ownAddress,
          this.receiverAddress,
          this.assetId,
          this.amount,
          this.networkId,
          () => this.$emit('modal-close')
        )
      } catch (e) {
        this.cancelled = true
        console.error(e)
      }
    }

    async sendBox() {
      // change UI to show "in-flight" transaction
      this.cancelled = false
      try {
        await this.$ethereumService.sendBox(
          this.ownAddress,
          this.receiverAddress,
          this.assetId,
          this.amount,
          this.networkId,
          () => this.$emit('modal-close')
        )
      } catch (e) {
        this.cancelled = true
        console.error(e)
      }

    }
  }
</script>

<style lang="scss" scoped>
.sendAsset{

  &__details {
    @extend %row;
  }

  &__img {
    flex: 0 0 auto;
    margin-right: 1rem;
  }

  &__name {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: $color-swan;
    font-weight: 400;
  }

  &__headline {
    margin: 2.5rem 0 0.5rem;
    @extend %row;
    padding: 0.5rem 0.2rem;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba($color-swan, 0.6);
  }

  &__input {
    width: 100%;
    margin: 0 auto 2rem;
    input {
      width: 100%;
      box-sizing: border-box;
      padding: 0.75rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      border-radius: 0.2rem;
      background-color: $color-woodsmoke;
      color: $color-swan;
      border: 1px solid rgba($color-swan, 0);
      overflow: hidden;
      transition: 0.2s ease-in-out;

      @include breakpoint(sm) {
        padding: 1rem 1.2rem;
      }

      &:focus {
        outline: none;
        border: 1px solid rgba($color-swan, 0.2);
      }

      &::placeholder {
        opacity: 0.3;
        color: $color-swan;
        font-weight: 500;
      }
    }

    &__validation {

      font-weight: 500;
      font-size: 0.8rem;
      color: $color-gossip;
      &--error {
        color: $color-bittersweet !important;
      }
    }
  }

  // &__send {
  //   background-color: $color-gossip !important;
  //   &:disabled {
  //     background-color: rgba($color-swan, 0.7) !important;
  //     &:hover {
  //       background-color: rgba($color-swan, 0.7) !important;
  //       cursor: default;
  //     }
  //   }
  // }

  &__error {
    color: $color-error;
    font-size: 1rem;
    text-align: center;
    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
