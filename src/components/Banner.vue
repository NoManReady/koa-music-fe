<template>
  <div class="banner">
    <ul class="banner-slide">
      <li v-for="(item,index) in images" :class="[move[index]]" :key="item">
        <v-touch @swipeleft="nextPic" @swiperight="prePic" @tap="onTap(item.url)">
          <img v-lazy="item.pic" @click="target(index)">
        </v-touch>
      </li>
    </ul>
    <div class="banner-button">
      <em v-for="(item,index) in images" @click="target(index)" :class="[move[index]]" :key="item"></em>
    </div>
  </div>
</template>
<script>
export default {
  name: 'banner-slide',
  props: {
    images: {
      require: true,
      type: Array,
      validator: function (value) {
        return value.length >= 3
      }
    },
    interval: {
      default: 5000
    },
    autoRoll: {
      default: false
    },
    direction: {
      default: 'left'
    }
  },
  data() {
    return {
      move: ['left', 'center', 'right']
    }
  },
  created() {
    for (let i = 3; i < this.images.length; i++) {
      this.move[i] = 'wait'
    }
    if (this.autoRoll) {
      if (this.direction === 'left') {
        setInterval(this.nextPic, this.interval)
      }
      else {
        setInterval(this.prePic, this.interval)
      }
    }
  },
  methods: {
    // center右移
    nextPic(event) {
      let temp = this.move.pop()
      this.move.unshift(temp)
    },
    // center左移
    prePic(event) {
      let temp = this.move.shift()
      this.move.push(temp)
    },
    // center定位移动
    target(pos) {
      const num = this.images.length
      for (let i = 0; i < num; i++) {
        this.move[i] = 'wait'
      }
      this.move[pos] = 'center'
      this.move[pos + 1 < num ? pos + 1 : 0] = 'right'
      this.move[pos - 1 === -1 ? num - 1 : pos - 1] = 'left'
      this.move = this.move.concat()
    },
    onTap(url) {
      if (url) {
        window.open('_blank', url)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.banner {
  background: rgba(8, 5, 58, .9);
}

.banner-slide {
  perspective: 1000px;
  perspective-origin: 10% 10%;
  position: relative;
  height: 300px;
  img {
    height: 300px;
    width: 100%;
  }
}

li {
  list-style-type: none;
  position: absolute;
  top: 0px;
  width: 70%;
  transition: transform 0.5s, left 1s, right 1s, opacity .5s;
  text-align: center;
  &.left,
  &.right {
    transform: scale(0.8, 0.8);
    z-index: 10;
    opacity: .8;
  }

  &.left {
    left: 0;
  }

  &.center {
    left: 15%;
    z-index: 100;
  }

  &.right {
    left: 30%;
  }

  &.wait {
    transform: scale(0, 0);
  }
}

.banner-button {
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  em {
    display: inline-block;
    width: 40px;
    height: 10px;
    background-color: rgb(225, 225, 226);
    border-radius: 20px;
    &:not(:first-child) {
      margin-left: 6px;
    }
    cursor: pointer;
    &.center {
      background-color: rgb(198, 47, 47);
    }
  }
}
</style>