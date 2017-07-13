import axios from 'axios'
import _ from 'lodash'

import store from '@/store'
import config from '@/config'

/**
 * 全局axios配置
 */

const requests = []
export default (Vue) => {
  Object.defineProperties(Vue.prototype, {
    $http: {
      value: axios
    }
  })
  //axios配置
  axios.defaults.baseURL = config[process.env.NODE_ENV].host
  // 添加拦截器
  axios.interceptors.request.use(function (config) {
    console.log(`${config.url}--begin`)
    requests.push(config)
    store.dispatch('setLoading', true)
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  axios.interceptors.response.use(function (response) {
    console.log(`${response.config.url}--end`)
    _.remove(requests, r => {
      return r === response.config
    })
    if (!requests.length) {
      setTimeout(() => {
        store.dispatch('setLoading', false)
      }, 300)
    }
    return response.data
  }, function (error) {
    store.dispatch('setLoading', false)
    return Promise.reject(error)
  })
}