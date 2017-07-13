import axios from 'axios'
import { remove } from 'lodash'
import config from '@/config'
import store from '@/store'
import router from '@/router'

let _env = process.env.NODE_ENV
let _envConfig = config[_env]
let _requests = []

// 开发环境打印信息
function log(msg) {
  if (_env === 'development') {
    console.log(msg)
  }
}

function pushRequest(config) {
  log(`${config.url}--begin`)
  _requests.push(config)
  store.dispatch('loading')
}

function popRequest(config) {
  log(`${config.url}--end`)
  remove(_requests, r => {
    return r === config
  })
  if (!_requests.length) {
    setTimeout(() => {
      store.dispatch('loading', false)
    }, 300)
  }
}

// 全局设置axios
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.defaults.baseURL = _envConfig.host
export default (data = {}, url, method = 'GET', isSilence) => {
  return new Promise((resolve, reject) => {
    const _instance = axios.create({
      timeout: 5000
    })
    let _random = { stamp: Date.now(), url: `${_envConfig.host + url}` }
    if (!isSilence) {
      pushRequest(_random)
    }
    _instance({ data, url, method })
      .then(res => {
        let responseData = res.data
        popRequest(_random)
        resolve(responseData)
      })
      .catch(err => {
        log(err)
        popRequest(_random)
        reject(err)
      })
  })
}
