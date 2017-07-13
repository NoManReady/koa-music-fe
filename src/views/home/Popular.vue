<template>
  <div class="popular">
    <v-music-list :musicLists='popularLists'></v-music-list>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MusicList from '@/components/MusicList'
export default {
  name: 'popular',
  data() {
    return {
    }
  },
  components: {
    'v-music-list': MusicList
  },
  computed: {
    ...mapGetters(['popularLists'])
  },
  methods: {
    ...mapActions(['getPopularLists'])
  },
  created() {
    if (!this.popularLists.length) {
      this.getPopularLists()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>