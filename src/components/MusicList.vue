<template>
  <div class="music-list">
    <div class="list-item" v-for="(item, index) in musicLists" :key="item">
      <div class="avatar" @click="_play(item)">
        <img v-lazy="item.album.picUrl" alt="">
      </div>
      <div class="info" @click="_play(item)">
        <div class="music-name">{{item.name}}</div>
        <div class="music-s">{{item.artists[0].name}}</div>
      </div>
      <div class="operation" @click="_showOperation(index)">
        <i class="icon-more"></i>
      </div>
      <!-- <animation-menu :item="item" :index="index"></animation-menu> -->
    </div>
  </div>
</template>

<script>
// import animationMenu from '@/components/animationMenu'

import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

import * as api from '@/api'

export default {
  components: {
    // animationMenu,
  },
  props: {
    musicLists: Array
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'listenLists',
      'partLoading',
      'audio',
      'audioUrl'
    ])
  },
  methods: {
    ...mapActions(['setPlaying', 'setPlaybar', 'setAudio', 'addListenLists', 'setAudioUrl', 'getMusicLyric', 'getMusicMp3']),
    _play(music) {
      // 暂停、切换音乐并启用全局loading
      this.setPlaying(false)
      if (this.audio && music.id === this.audio.id) {
        document.querySelector('audio').load(this.audioUrl)
      } else {
        this.setAudio(music)
        this.setPlaybar(true)
        //查找试听列表中有没有点击中的歌（添加试听列表）
        let x = this.listenLists.findIndex((item) => {
          return item.name == music.name
        })
        if (x === -1) {
          this.addListenLists(music)
        }
      }
    },
    _showOperation(index) {
      for (let i = 0; i < this.musicLists.length; i++) {
        if (i !== index) {
          this.musicLists[i].menuShow = false
        }
      }
      this.musicLists[index].menuShow = !this.musicLists[index].menuShow
    },
  },
  watch: {
    musicLists() {
      for (let item of this.musicLists) {
        Vue.set(item, 'menuShow', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.music-list {
  background: #28224e;
  position: relative;
  .list-item {
    position: relative;
    padding: 16px 0;
    border-bottom: 1px solid #3c3662;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #fff;
    &:last-child {
      border-bottom: none;
    }
    .avatar {
      width: 90px;
      height: 90px;
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
        vertical-align: middle;
        .tag {
          font-size: 20px;
          color: #e53f6f;
          line-height: 20px;
          border: 1px solid #e53f6f;
          border-radius: 20px;
          padding: 0 8px;
          vertical-align: middle;
          margin-left: 6px;
        }
      }
      .music-s {
        font-size: 24px;
        color: #777686;
        line-height: 40px;
      }
      .music-hot {
        .icon {
          font-size: 25px;
          display: inline-block;
          margin-right: 5px;
          color: #e53f6f;
        }
      }
    }
    .operation {
      width: 100px;
      height: 100%; // line-height: 145px;
      text-align: center;
    }
  }
}
</style>