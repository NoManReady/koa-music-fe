<template>
  <div class="header">
    <div class="header--icon" @click="showSidebar">
      <i class="icon-menu"></i>
    </div>
    <div class="header--menu">
      <div class="header--menu--item">
        <router-link to="/home">推荐</router-link>
      </div>
      <div class="header--menu--item">
        <router-link to="/collection">排行榜</router-link>
      </div>
      <div class="header--menu--item">
        <router-link to="/user">我的</router-link>
      </div>
    </div>
    <div class="header--icon">
      <router-link to="/search">
        <i class="icon-seach"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    showSidebar() {
      this.$store.dispatch('setShowSidebar', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: #28224e;
  display: flex;
  justify-content: space-between;
  color: #746ca8;
  font-size: 30px;
  &--icon {
    flex: 0.5;
    font-size: 50px;
    cursor: pointer;
  }
  &--menu {
    flex: 2;
    margin: 5px 50px 0;
    display: flex;
    &--item {
      flex: 1;
      font-weight: 700;
      cursor: pointer;
      a {
        display: block;
        color: #746ca8;
        &.active {
          color: #eb234a;
        }
      }
    }
  }
}
</style>