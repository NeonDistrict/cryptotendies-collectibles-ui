<template lang="pug">
.topbar(:class="{'topbar--rinkeby': isRinkeby, 'topbar--unsupported': isUnsupportedNet }" )
  client-only
    .topbar__rinkebyLogo(v-if="isRinkeby") Rinkeby
  client-only
    .topbar__unsupported(v-if="isUnsupportedNet") Unsupported Network
  nuxt-link.topbar__link(:to="'/'")
    img.topbar__logo(src="~assets/images/tend.png")
    .topbar__title Tendies Collectibles
  .topbar__wallet
    //- button(
    //-   v-if="!hasWallet"
    //-   @click="sendToMetamask"
    //- ) No Wallet
    button(
      v-if="isWalletLocked"
      @click="unlockWallet"
    ) Connect Wallet
    span(v-else) {{ shortenedAddress }}
</template>

<script lang="ts">
  import { Component, Vue, State } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
  export default class TopBar extends Vue {
    @State ownAddress
    @State networkId
    @State finishedInit

    get hasWallet () {
      return this.$ethereumService.hasWallet
    }

    get isWalletLocked() {
      return !this.ownAddress.length
    }

    get isMainnet () {
      return this.networkId === 1
    }

    get isRinkeby () {
      return this.networkId === 4
    }

    get isUnsupportedNet () {
      return !(this.isMainnet || this.isRinkeby)
    }

    get shortenedAddress() {
      return `${this.ownAddress.substring(0, 5)}...${this.ownAddress.substring(this.ownAddress.length - 5, this.ownAddress.length)}`
    }

    async unlockWallet() {
      return await this.$ethereumService.unlockWallet()
    }

    sendToMetamask() {
      window.open('https://metamask.io/', '_blank')
    }
  }
</script>

<style lang="scss" scoped>
.topbar {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: darken($color-shark, 1);
  /* border-bottom: 1px solid $color-meadow; */
  z-index: 999;
  @include breakpoint(sm) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0.5rem 4rem;
    box-shadow: 0 2px 4px rgba($color-woodsmoke, 0.6);
  }

  &--rinkeby {
    border-bottom: 2px solid $color-kournikova;
  }

  &--unsupported {
    border-bottom: 2px solid $color-error;
  }

  // for the nuxt links
  a {
    display: flex;
  }

  &__rinkebyLogo {
    position: absolute;
    bottom: -1.5rem;
    left: 1rem;
    color: $color-shark;
    background-color: $color-kournikova;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    border-radius: 0 0 0.25rem 0.25rem;
  }

  &__unsupported {
    position: absolute;
    bottom: -1.5rem;
    left: 1rem;
    color: $color-shark;
    background-color: $color-error;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    border-radius: 0 0 0.25rem 0.25rem;
  }

  &__link {
    @extend %row;
  }

  &__logo {
    align-self: center;
    height: 1.65rem;
    width: auto;
    margin-right: 1rem;
    @include breakpoint(sm) {
      height: 2rem;
      margin-right: 1.5rem;
    }
  }

  &__title {
    font-weight: 300;
    text-transform: uppercase;
    font-size: 0.9rem;
    @include breakpoint(sm) {
      font-size: 1rem;
    }
  }

  &__wallet {
    margin-left: auto;
    button {
      @extend %btn-primary--small;
      @extend %btn-primary--gray;
    }

    span {
      color: rgba($color-swan, 0.9);
      font-size: 0.9rem;
    }
  }
}
</style>