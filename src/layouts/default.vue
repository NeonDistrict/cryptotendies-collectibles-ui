<template lang="pug">
  .container
    client-only
      .content__wrap
        .loading(v-if="!finishedInit")
          loading-spinner
          span Loading...
        template(v-else)
          top-bar.top-bar
          nuxt.content
          //- connect-wallet(v-if="!ownAddress")
    app-footer.footer
</template>

<script lang="ts">
  import { Component, Vue, State } from 'nuxt-property-decorator'
  import { NEXT_AUTH_STEPS } from '~/assets/data/constants'
  import TopBar from '~/components/organisms/TopBar.vue'
  import AppFooter from '~/components/organisms/AppFooter.vue'
  import LoadingSpinner from '~/components/atoms/LoadingSpinner.vue'

@Component({
  components: {
    AppFooter,
    TopBar,
    LoadingSpinner
  }
})
  export default class extends Vue {
    @State ownAddress
    @State isLoggedIn
    @State finishedInit
    @State authStoppedAt
    @State inventoryLoaded
  }
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  height: 100%;
}
.top-bar {
  position: sticky;
  top: 0;
  left: 0;
}
.loading {
  @extend %col;
  height: 100vh;
  margin: auto;
  span {
    margin-top: 1.5rem;
    opacity: 0.7;
  }
}
.content {
  padding: 2rem 1rem 2rem;
  max-width: $screen-max-width;
  margin: 0 auto;

  &__wrap {
    padding-bottom: 4rem;  
  }
}

.footer {
  height: 6rem;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
