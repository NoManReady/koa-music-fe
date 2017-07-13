// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'normalize.css'
import 'animate.css'
import './assets/fonts/style.css'

import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })
import VueLazyLoad from 'vue-lazyload'
//默认图片 
import lazy_img from './assets/loading.gif'
Vue.use(VueLazyLoad, {
  loading: lazy_img
})

import filters from './filters'
import directives from './directives'
import plugins from './plugins'
Vue.config.productionTip = false
Vue.use(plugins, {})
// 注册过滤器
for (let filter in filters) {
  Vue.filter(filter, filters[filter])
}
//注册指令
for (let directive of directives) {
  Vue.directive(directive.name, directive)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
