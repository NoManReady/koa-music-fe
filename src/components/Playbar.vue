<template>
  <div class="playbar">
    <div class="play-box" v-if="audio">
      <div class="music-avatar">
        <img v-if="audio.al" v-lazy="audio.al.picUrl" alt="">
        <img v-else v-lazy="audio.album.picUrl" alt="">
      </div>
      <div class="music-info">
        <div class="music-name">{{audio.name}}</div>
        <div class="music-s">{{audio.artists[0].name}}</div>
      </div>
      <div class="music-prev" @click="_pre()">
        <i class="icon-prev"></i>
      </div>
      <div class="music-play">
        <i class="icon-pause-empty" v-if="playing" @click="_pause()"></i>
        <i class="icon-play-empty" v-else @click="_play()"></i>
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
    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
      <s-listen-list v-show="listenListStatus" class="animated"></s-listen-list>
    </transition>
  </div>
</template>

<script>
import listenList from '@/components/listenList'

import { mapGetters, mapActions } from 'vuex'

import * as api from '@/api'

export default {
  components: {
    's-listen-list': listenList
  },
  data() {
    return {
      now: 0
    }
  },
  computed: {
    ...mapGetters([
      'listenLists',
      'audio',
      'audioUrl',
      'listenListStatus',
      'playing',
      'duration'
    ]),
  },
  mounted() {
    let timer
    // audio播放，记录当前播放时间，启动计时器
    this.$refs.audio.addEventListener('play', () => {
      this.now = this.$refs.audio.currentTime
      timer = setInterval(() => {
        this.now = this.$refs.audio.currentTime
      }, 500)
    })
    // audio暂停，清除计时器
    this.$refs.audio.addEventListener('pause', () => {
      clearInterval(timer)
    })
    // audio错误，
    this.$refs.audio.addEventListener('error', () => {
      throw new Error('获取音乐出错...')
    })
    this.$refs.audio.addEventListener('loadedmetadata', (e) => {
      this.setPlaying(true)
      this.setMusicTime(this.$refs.audio.duration)
    })
  },
  methods: {
    ...mapActions(['setMusicTime', 'setPlaying', 'setNextAudio', 'setListenListStatus', 'getMusicMp3', 'setPlaybar']),
    _play() {
      if (this.audioUrl) {
        this.setPlaying(true)
      }
    },
    _pause() {
      this.setPlaying(false)
    },
    _next() {
      this._turn(1)
    },
    _pre() {
      this._turn(-1)
    },
    _turn(type) {
      this.setPlaying(false)
      // 只有一首则单曲循环
      if (this.listenLists.length === 1) {
        this.$refs.audio.load(this.audioUrl)
      } else if (this.listenLists.length === 0) {
        this.setPlaybar(false)
      } else {
        for (let i = 0; i < this.listenLists.length; i++) {
          if (this.listenLists[i].name === this.audio.name) {
            if (type === -1) {
              this.setPreAudio(i)
            } else {
              this.setNextAudio(i)
            }
            break
          }
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
      if (!this.audio) {
        return
      }
      this.getMusicMp3(this.audio.id)
    },
  }
}
</script>

<style lang="scss" scoped>
.playbar {
  .animated {
    animation-duration: .3s;
  }
  flex: 0 0 100px;
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
    .music-prev,
    .music-list {
      flex: 1;
      height: 100%;
      line-height: 110px;
      cursor: pointer;
      i {
        font-size: 40px;
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