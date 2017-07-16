<template>
  <div class="fixed">
    <div class="listen-header">
      <v-touch tag="span" class="listen-back" @tap="_back">
        <i class="icon-back"></i>
      </v-touch>
      <span class="listen-count">总共{{listenLists.length}}首歌</span>
      <v-touch tag="span" class="listen-remove" @tap="_removeAllMusic">清除列表</v-touch>
    </div>
    <div class="listen-list">
      <v-touch class="list-item" v-for="(item, index) in listenLists" :key="item" @swipeleft="_swiperleft(index)" @swiperight="_swiperight(index)">
        <div class="avatar" @click="_play(item)">
          <img v-lazy="item.album.picUrl" alt="">
        </div>
        <div class="info" @click="_play(item)">
          <div class="music-name">{{item.name}}</div>
          <div class="music-s">{{item.artists[0].name}}</div>
        </div>
        <div class="operation" :style="opeIndex===index?opeStyle:{width:0}" @click="_removeMusic(index)">
          <i class="icon-garbage"></i>
        </div>
      </v-touch>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

import * as api from '@/api'
let _elementSize = Number.parseInt(window.getComputedStyle(document.documentElement, null).fontSize)
let _dpr = lib.flexible.dpr
export default {
  name: 'listenList',
  data() {
    return {
      opeIndex: -1,
      opeStyle: {
        width: 70 * _dpr / _elementSize + 'rem'
      }
    }
  },
  computed: {
    ...mapGetters([
      'listenLists',
      'audio',
      'audioUrl'
    ])
  },
  methods: {
    ...mapActions(['setPlaying', 'setPlaybar', 'setAudio', 'setAudioUrl', 'getMusicLyric', 'getMusicMp3', 'removeListenLists', 'removeAllListenLists', 'setListenListStatus']),
    _play(music) {
      // 暂停、切换音乐并启用全局loading
      this.setPlaying(false)
      if (this.audio && music.id === this.audio.id) {
        document.querySelector('audio').load(this.audioUrl)
      } else {
        this.setAudio(music)
        this.setPlaybar(true)
      }
    },
    _swiperleft(index) {
      this.opeIndex = index
    },
    _swiperight(index) {
      this.opeIndex = -1
    },
    _removeMusic(index) {
      this.opeIndex = -1
      this.removeListenLists(index)
    },
    _removeAllMusic() {
      this.removeAllListenLists()
    },
    _back() {
      this.setListenListStatus(false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variable.scss';
.fixed {
  position: fixed;
  background: rgba(0, 0, 0, .6);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.listen-header {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: $primary;
  color: #fff;
  font-size: 26px;
  text-align: center;
  .listen-back {
    flex: .3;
    font-size: 40px;
    cursor: pointer;
  }
  .listen-count {
    flex: 2;
  }
  .listen-remove {
    flex: .5;
    cursor: pointer;
  }
}

.listen-list {
  background: #28224e;
  position: absolute;
  bottom: 0;
  width: 100%;
  .list-item {
    position: relative;
    border-bottom: 1px solid #3c3662;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    color: #fff;
    &:last-child {
      border-bottom: none;
    }
    .avatar {
      width: 70px;
      height: 70px;
      flex: 0 0 70px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 15px 0 25px;
      img {
        width: 100%;
      }
    }
    .info {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .music-name {
        font-size: 26px;
        font-weight: bold;
      }
      .music-s {
        font-size: 24px;
        color: #777686;
        line-height: 40px;
      }
    }
    .operation {
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #fff;
      background-color: $active;
      transition: width .3s ease-in-out;
      font-size: 30px;
    }
  }
}
</style>