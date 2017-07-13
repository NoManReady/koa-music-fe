<template>
  <div class="playbar">
    <div class="play-box" v-if="audio">
      <div class="music-avatar">
        <img v-if="audio.al" v-lazy="audio.al.picUrl" alt="">
        <img v-else v-lazy="audio.album.picUrl" alt="">
      </div>
      <div class="music-info">
        <div class="music-name">{{audio.name}}</div>
        <div class="music-s" v-if="audio.ar">{{audio.ar[0].name}}</div>
        <div class="music-s" v-else>{{audio.artists[0].name}}</div>
      </div>
      <div class="music-play">
        <i class="icon-play-empty" v-if="playing" @click="_pause()"></i>
        <i class="icon-pause-empty" v-else @click="_play()"></i>
      </div>
      <div class="music-next" @click="_next()">
        <i class="icon-next"></i>
      </div>
      <div class="music-list" @click="showList()">
        <i class="icon-music-list"></i>
      </div>
    </div>
    <div class="progress-bar">
      <div class="play" :style="{width: (now / duration).toFixed(3)*100 + '%'}"></div>
    </div>
    <audio preload ref="audio" :src="audioUrl" @ended="_next()"></audio>
    <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
      <v-listen-list v-show="listenListStatus"></v-listen-list>
    </transition>
  </div>
</template>

<script>
import listenList from '@/components/listenList'

import { mapGetters, mapActions } from 'vuex'

import * as api from '@/api'

export default {
  components: {
    'v-listen-list': listenList
  },
  data() {
    return {
      now: '',
      duration: '200.045714',
    }
  },
  computed: {
    ...mapGetters([
      'listenLists',
      'audio',
      'audioUrl',
      'listenListStatus',
      'playing',
      'size'
    ]),
  },
  mounted() {
    let timer
    this.$refs.audio.addEventListener('play', () => {
      timer = setInterval(() => {
        this.duration = this.$refs.audio.duration
        this.now = this.$refs.audio.currentTime
      }, 1000)
    })
    this.$refs.audio.addEventListener('pause', () => {
      clearInterval(timer)
    })
    this.$refs.audio.addEventListener('error', () => {
      throw new Error('获取音乐出错...')
    })
  },
  methods: {
    ...mapActions(['setPlaying', 'setLoading', 'setNextAudio', 'setListenListStatus', 'getMusicLyric']),
    _play() {
      if (this.audioUrl) {
        this.setPlaying(true)
      }
    },
    _pause() {
      this.setPlaying(false)
    },
    _next() {
      this.setPlaying(false)
      this.setLoading(true)
      for (let i = 0; i < this.listenLists.length; i++) {
        if (this.listenLists[i].name === this.audio.name) {
          this.setNextAudio(i)
          break
        }
      }
    },
    showList() {
      this.setListenListStatus(true)
    },
    // showPlay() {
    //   this.$store.dispatch('setShowPlay', true)
    // },
  },
  watch: {
    playing() {
      this.playing ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    audio() {
      if (!audio) {
        return
      }
      this.getMusicLyric(this.audio.id)
      this.now = 0
    },
  }
}
</script>

<style lang="scss" scoped>
.playbar {
  background: #ea2448;
  transition: all .7s ease-in;
  .play-box {
    display: flex;
    align-items: center;
    height: 110px;
    color: #fff;
    cursor: pointer;
    .music-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 20px 0 30px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .music-info {
      flex: 4;
      .music-name {
        font-size: 30px;
        font-weight: bold;
      }
      .music-s {
        font-size: 22px;
        color: rgba(255, 255, 255, .7);
        margin-top: 5px;
      }
    }
    .music-play,
    .music-next,
    .music-list {
      flex: 1;
      height: 100%;
      line-height: 110px;
      cursor: pointer;
      .icon {
        font-size: 44px;
        display: block;
      }
    }
  }
  .progress-bar {
    height: 4px;
    background: linear-gradient(#902541, #902444);
    .play {
      height: 100%;
      background: #fe7498;
    }
  }
}
</style>