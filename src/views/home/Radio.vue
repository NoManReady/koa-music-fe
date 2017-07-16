<template>
  <div class="radio">
    <v-music-list :musicLists='radioLists'></v-music-list>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MusicList from '@/components/MusicList'
export default {
  name: 'radio',
  data() {
    return {
    }
  },
  components: {
    'v-music-list': MusicList
  },
  computed: {
    ...mapGetters(['radioLists'])
  },
  methods: {
    ...mapActions(['getRadioLists'])
  },
  created() {
    if (!this.radioLists.length) {
      this.getRadioLists()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>