import { randomColor } from '../utils'

/**
 * 图片加载策略
 */

// 自定义对象key值
const galleryContext = '@@gallery'

function loadImg(el, src) {
  let img = new Image()
  img.onload = e => {
    el.style.backgroundImage = `url(${e.target.src})`
    el.style.backgroundColor = 'rgba(0,0,0,.2)'
    el.style.opacity = '1'
    img = null
  }
  el[galleryContext] = {
    src
  }
  img.src = src
  el.style.backgroundColor = randomColor()
}
export default {
  name: 'gallery',
  bind(el, binding, vnode) {
    loadImg(el, binding.value)
  },
  update(el, binding, vnode) {
    loadImg(el, binding.value)
  }
}
