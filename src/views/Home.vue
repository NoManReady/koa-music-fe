<template>
  <div class="home">
    <s-banner :images="banners" v-if="banners.length"></s-banner>
    <s-home-nav></s-home-nav>
    <transition enter-active-class="lightSpeedIn" leave-active-class="lightSpeedOut" mode="out-in">
      <router-view class="home--container animated"></router-view>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Banner from '@/components/Banner'
import HomeNav from '@/components/HomeNav'
import * as api from '@/api'
export default {
  name: 'home',
  data() {
    return {
      banners: Object.freeze([])
    }
  },
  components: {
    's-banner': Banner,
    's-home-nav': HomeNav
  },
  async beforeRouteEnter(to, from, next) {
    const _banners = JSON.parse(localStorage.getItem('banners') || null)
    const _result = _banners || (await api.getBanner()).banners
    next(vm => {
      vm.banners = Object.freeze(_result)
      localStorage.setItem('banners', JSON.stringify(vm.banners))
    })
  },
  mounted() {
    console.log('home')
  },
  computed: {
    ...mapGetters(['loading'])
  },
  methods: {
    ...mapActions([])
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  position: relative;
  &--container {
    overflow: auto;
    overflow-x: hidden;
    height: calc(100% - 450px);
    position: relative;
  }
  .animated {
    animation-duration: .5s;
  }
}
</style>