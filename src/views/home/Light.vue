<template>
  <div class="light">
    <v-music-list :musicLists='lightLists'></v-music-list>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MusicList from '@/components/MusicList'
export default {
  name: 'light',
  data() {
    return {
    }
  },
  components: {
    'v-music-list': MusicList
  },
  computed: {
    ...mapGetters(['lightLists'])
  },
  methods: {
    ...mapActions(['getLightLists'])
  },
  created() {
    if (!this.lightLists.length) {
      this.getLightLists()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>