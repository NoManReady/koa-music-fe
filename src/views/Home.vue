<template>
  <div class="home">
    <s-banner :images="banners"></s-banner>
    <router-view></router-view>
  </div>
</template>
<script>
import Banner from '@/components/Banner'
export default {
  name: 'home',
  data() {
    return {
      banners: Object.freeze([{
        src: 'https://ws1.sinaimg.cn/large/610dc034gy1fh9utulf4kj20u011itbo.jpg'
      }, {
        src: 'https://ws1.sinaimg.cn/large/610dc034ly1fh8ox6bmjlj20u00u0mz7.jpg'
      }, {
        src: 'https://ws1.sinaimg.cn/large/610dc034ly1fgdmpxi7erj20qy0qyjtr.jpg'
      }, {
        src: 'https://ws1.sinaimg.cn/large/610dc034ly1ffyp4g2vwxj20u00tu77b.jpg'
      }])
    }
  },
  components: {
    's-banner': Banner
  }
}
</script>
<style lang="scss" scoped>

</style>