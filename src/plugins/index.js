import intercepter from './intercepter'
export default {
  install(Vue, options) {
    intercepter(Vue, options)
  }
}
