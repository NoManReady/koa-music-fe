<template>
  <div class="app-loading">
    <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app-loading',
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.app-loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80px;
  height: 80px;
  margin: auto;
}

.sk-cube-grid {
  width: 100%;
  height: 100%;
}

.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: rgba(225, 20, 98, 0.75);
  float: left;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}

.sk-cube-grid .sk-cube1 {
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube2 {
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube3 {
  animation-delay: 0.4s;
}

.sk-cube-grid .sk-cube4 {
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube5 {
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube6 {
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube7 {
  animation-delay: 0s;
}

.sk-cube-grid .sk-cube8 {
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube9 {
  animation-delay: 0.2s;
}

@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    transform: scale3D(1, 1, 1);
  }
  35% {
    transform: scale3D(0, 0, 1);
  }
}
</style>