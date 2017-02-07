<template>
  <div>
    <img src="./LandingPageView/assets/logo.png" alt="electron-vue">
    <h1>Welcome.</h1>
    <p>
    You've performed: {{counter}} actions so far.
    </p>
    <current-page></current-page>
    <versions></versions>
    <links></links>
  </div>
</template>

<script>
  import CurrentPage from './LandingPageView/CurrentPage'
  import Links from './LandingPageView/Links'
  import Versions from './LandingPageView/Versions'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      CurrentPage,
      Links,
      Versions
    },
    computed: {
      ...mapGetters({
        // map this.counter to store.getters.mainCounter
        counter: 'mainCounter'
      })
    },
    name: 'landing-page'
  }
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>
