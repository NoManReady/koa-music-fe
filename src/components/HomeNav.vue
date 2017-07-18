<template>
  <div class="home_nav">
    <div class="nav-item">
      <router-link to="popular">
        <i class="icon-popular"></i>
        <span>流行</span>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="classical">
        <i class="icon-classical"></i>
        <span>古典</span>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="light">
        <i class="icon-broadcast-circle"></i>
        <span>纯音乐</span>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="radio">
        <i class="icon-radio"></i>
        <span>电台</span>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="swing">
        <i class="icon-swing"></i>
        <span>音律</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variable.scss';
.home_nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 120px;
  text-align: center;
  background: darken($primary, 35%);
  color: $primary;
  .nav-item {
    flex: 1;
    font-size: 24px;
    cursor: pointer;
    a {
      display: block;
      color: $primary;
      transition: color .3s ease-in-out;
      &.active {
        color: #fff;
      }
    }
    i {
      font-size: 46px;
      color: $active;
    }
    span {
      display: block;
      margin-top: 12px;
    }
  }
}
</style>