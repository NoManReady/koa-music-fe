<template>
  <div class="swing canves-container">
    <canvas id="canvas"></canvas>
    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
      <s-canvas-list v-show="canvasListStatus" :status.sync="canvasListStatus" @play="playAudio" class="animated" :listen-lists="listenLists"></s-canvas-list>
    </transition>
    <div class="tool-bar">
      <i class="icon-music-list-empty" @click="canvasListStatus=!canvasListStatus"></i>
      <template v-if="begin">
        <i class="icon-play-empty" @click="onPlay" v-if="isPlay"></i>
        <i class="icon-pause-empty" @click="onPause" v-else></i>
      </template>
    </div>
  </div>
</template>
<script>
import Audio from '@/utils/audio'
import CanvasList from '@/components/CanvasList'
import { mapGetters, mapActions } from 'vuex'
import * as api from '@/api'
export default {
  name: 'swing',
  data() {
    return {
      audio: null,
      canvasListStatus: false,
      listenLists: [],
      begin: false,
      isPlay: false
    }
  },
  components: {
    's-canvas-list': CanvasList
  },
  created() {
    api.getCanvasList().then(d => {
      this.listenLists.push(...d.list)
    })
  },
  mounted() {
    this.audio = new Audio(this.listenLists)
  },
  computed: {
    ...mapGetters(['playing'])
  },
  watch: {
    playing(v) {
      if (!this.audio.begin) {
        return
      }
      if (v) {
        this.isPlay = false
        this.audio._stop()
      }
    }
  },
  methods: {
    ...mapActions(['setPlaying', 'setPlaybar']),
    playAudio(url) {
      this.setPlaying(false)
      this.setPlaybar(false)
      this.audio._loadMusicByUrl(url)
      this.begin = true
    },
    onPlay() {
      this.isPlay = false
      this.audio._resume()
    },
    onPause() {
      this.isPlay = true
      this.audio._stop()
    }
  }
}
</script>
<style lang="scss" scoped>
.animated {
  animation-duration: .3s;
}

.swing {
  position: relative;
  overflow: hidden;
}

.tool-bar {
  position: absolute;
  left: 20px;
  top: 20px;
  color: orange;
  font-size: 36px;
  i+i {
    margin-left: 10px;
  }
}
</style>