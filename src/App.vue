<template>
  <div id="app">
    <app-header v-show="header"></app-header>
    <div class="container">
      <transition enter-active-class="rotateInDownLeft" leave-active-class="rotateOutDownRight" mode="out-in">
        <router-view class="animated"></router-view>
      </transition>
    </div>
    <app-playbar v-show="playbar"></app-playbar>
    <app-loading v-show="loading"></app-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/Header'
import Playbar from '@/components/Playbar'
import Loading from '@/components/Loading'
export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['loading', 'playbar', 'header'])
  },
  components: {
    'app-header': Header,
    'app-playbar': Playbar,
    'app-loading': Loading
  }
}
</script>

<style lang="scss">
@import './scss/rippler';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  a {
    text-decoration: none;
    &:focus {
      text-decoration: none;
    }
  }
  .container {
    position: relative;
    flex: 1
  }
}
</style>
