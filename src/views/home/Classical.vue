<template>
  <div class="classical">
    <v-music-list :musicLists='classicalLists'></v-music-list>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MusicList from '@/components/MusicList'
export default {
  name: 'classical',
  data() {
    return {
    }
  },
  components: {
    'v-music-list': MusicList
  },
  computed: {
    ...mapGetters(['classicalLists'])
  },
  methods: {
    ...mapActions(['getClassicalLists'])
  },
  created() {
    if (!this.classicalLists.length) {
      this.getClassicalLists()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>