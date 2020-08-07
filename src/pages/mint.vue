<template lang="pug">
.mint
  .mint__headline Mint Packs to Addresses
  .mint__container
    .mint__headline__sub Receiver Address
    .mint__input
      input(
        v-model="receiver"
        placeholder="0xfba...1ffad"
      )
    .mint__headline__sub Amount of Boxes
    .mint__input
      input.mint__headline(
        v-model="amount"
        type="number"
        min="1"
        max="5"
        placeholder="1"
      )
    .mint__headline__sub Box Size
    .mint__radio
      input(type="radio" name='packId' id='1' value='1' v-model="packId")
      label(for='1')
        span
        template 4 Card Box
      input(type="radio" name='packId' id='2' value='2' v-model="packId")
      label(for='2')
        span
        template 6 Card Box
  button.mint__btn(
    @click="mintBoxes"
    :disabled="isMinting"
  )
    fa-icon(v-if="isMinting" :icon="['fal', 'spinner']" spin)
    span Mint
</template>

<script lang="ts">
  import { Component, Prop, Vue, State } from 'nuxt-property-decorator'
@Component({})
  export default class Mint extends Vue {
    @State ownAddress
    private receiver = ''
    private amount = '1'
    private packId = '1'
    private isMinting = false

    mintBoxes() {
      this.$ethereumService.mintTendiesBox(this.receiver, this.amount, this.packId)
    }
  }
</script>

<style lang="scss" scoped>
.mint {
  @extend %col;
  &__headline {
    font-size: 1.2rem;
    padding: 3rem 0 1rem;

    &__sub {
      font-weight: 400;
      opacity: 0.8;
      padding: 1rem 0 0.5rem;
    }
  }

  &__container {
    padding: 1rem 2rem;
    border-radius: 0.25rem;
    border: 1px solid $color-koromiko;
  }
  &__input {
    @extend %row;
    input + input {
      margin-left: 1rem;
    }
    input { 
      padding: 0.5rem 0.75rem;
      font-size: 1rem;
      border-radius: 0.2rem;
      background-color: $color-shark-dark;
      color: $color-swan;
      font-weight: 300;
      overflow: hidden;
      border: none;
      transition: 0.2s ease-in-out;
      resize: none;
      width: 8rem;
  
      &:focus {
        outline: none;
        border-color: white;
      }
  
      &::placeholder {
        opacity: 0.5;
        color: white;
        font-weight: 500;
      }
    }
  }
  &__radio {
    label {
      user-select: none;
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      @media (min-width: $breakpoint) {
        font-size: 1rem;
      }
    }

    input[type='radio'] {
      display: none;
    }

    input[type='radio'] + label {
      color: rgba(white, 0.8);
      font-weight: 300;
      font-size: 0.9rem;
      transition: 0.2s ease-in-out;
      cursor: pointer;

      @media (min-width: $breakpoint) {
        font-size: 1rem;
      }
    }

    input[type='radio']:disabled + label {
      opacity: 0.4;
      cursor: default;
    }

    input[type='radio']:checked + label {
      transition: 0.2s ease-in-out;
      color: white;
    }

    input[type='radio'] + label span {
      display: inline-block;
      min-width: 12px;
      min-height: 12px;
      margin: 0 0.5rem 0.15rem 0;
      border-radius: 50%;
      vertical-align: middle;
      background-color: rgba($color-swan, 0.2);
      transition: 0.2s ease-in-out;
    }

    input[type='radio']:checked + label span {
      background-color: $color-koromiko;
      transition: 0.2s ease-in-out;
    }
  }
  &__btn {
    @extend %btn-primary;
    margin-top: 2rem;
    svg { 
      margin-right: 1rem;
    }
  }
}
</style>
