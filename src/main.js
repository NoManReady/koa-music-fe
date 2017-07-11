// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import filters from './filters'
import directives from './directives'
import plugins from './plugins'
Vue.config.productionTip = false

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
