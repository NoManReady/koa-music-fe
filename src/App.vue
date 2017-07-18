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
import { mapGetters, mapActions } from 'vuex'
import Header from '@/components/Header'
import Playbar from '@/components/Playbar'
import Loading from '@/components/Loading'
export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['loading', 'playbar', 'header', 'audio'])
  },
  components: {
    'app-header': Header,
    'app-playbar': Playbar,
    'app-loading': Loading
  },
  mounted() {
    console.log('app')
    this.setCount()
    // 初始化有音乐则播放
    if (this.audio) {
      this.setPlaybar(true)
      this.$nextTick(() => {
        this.getMusicMp3(this.audio.id)
      })
    }
  },
  methods: {
    ...mapActions(['setPlaybar', 'getMusicMp3', 'setCount'])
  }
}
</script>

<style lang="scss">
@import './scss/rippler';
html,
body,
#app {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  background: rgba(8, 5, 58, .9);
  a {
    text-decoration: none;
    &:focus {
      text-decoration: none;
    }
  }
  .container {
    position: relative;
    flex: 1;
    overflow: hidden;
  }
}
</style>
