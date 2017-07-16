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
@import '../scss/_variable.scss';
.header {
  flex: 0 0 100px;
  text-align: center;
  background: darken($primary, 30%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $primary;
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
        color: $primary;
        &.active {
          color: $active;
        }
      }
    }
  }
}
</style>