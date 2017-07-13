<template>
  <div class="home">
    <s-banner :images="banners" v-if="banners.length"></s-banner>
    <s-home-nav></s-home-nav>
    <router-view></router-view>
    <s-loading :loading="partLoading"></s-loading>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Banner from '@/components/Banner'
import HomeNav from '@/components/HomeNav'
import Loading from '@/components/Loading'
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
    's-home-nav': HomeNav,
    's-loading': Loading
  },
  async beforeRouteEnter(to, from, next) {
    const _result = await api.getBanner()
    next(vm => {
      vm.banners = Object.freeze(_result.banners)
    })
  },
  mounted() {
    let audioDOM = document.querySelector('audio')
    audioDOM.addEventListener('loadedmetadata', () => {
      this.setPlaying(true)
      this.setMusicTime(audioDOM.duration)
    })
  },
  computed: {
    ...mapGetters(['partLoading'])
  },
  methods: {
    ...mapActions(['setPlaying', 'setMusicTime'])
  }
}
</script>
<style lang="scss" scoped>

</style>