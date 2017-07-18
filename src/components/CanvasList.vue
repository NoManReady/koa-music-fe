<template>
  <div class="fixed">
    <div class="listen-header">
      <v-touch tag="span" class="listen-back" @tap="_back">
        <i class="icon-back"></i>
      </v-touch>
      <span class="listen-count">总共{{listenLists.length}}首歌</span>
    </div>
    <div class="listen-list">
      <v-touch class="list-item" :class="{active:activeId===item.id}" v-for="(item, index) in listenLists" :key="item" @tap="_play(item)">
        <div class="music-name">{{item.name}}</div>
      </v-touch>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'

export default {
  name: 'canvasList',
  props: ['status', 'listenLists'],
  data() {
    return {
      activeId: ''
    }
  },
  methods: {
    _play(music) {
      this.activeId = music.id
      this.$emit('play', music.id)
    },
    _back() {
      this.$emit('update:status', false)
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
  z-index: 1;
  overflow: hidden;
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
  height: calc(100% - 100px);
  overflow: hidden;
  overflow-y: auto;
  bottom: 0;
  width: 100%;
  .list-item {
    position: relative;
    border-bottom: 1px solid #3c3662;
    cursor: pointer;
    padding: 40px 20px;
    color: #fff;
    &.active {
      color: lighten($active,8%);
    }
    &:last-child {
      border-bottom: none;
    }
    .music-name {
      font-size: 30px;
      font-weight: bold;
    }
  }
}
</style>