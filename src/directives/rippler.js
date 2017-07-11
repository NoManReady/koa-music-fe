/**
 * 波浪按钮
 */

// 自定义对象key值
const rippleContext = '@@ripplerEffect'

export default {
  name: 'rippler',
  inserted(el) {
    // 初始化值
    // 波浪圆半径
    let width = el.offsetWidth,
      height = el.offsetHeight
    let ripplerSize = Math.sqrt(width * width + height * height),
      minSize = Math.min(width, height),
      maxSize = Math.max(width, height)
    // 圆的直径(即外包正方形的边长)
    let circle = ripplerSize * 2
    // 极限值时正方形顶点坐标
    let minLeft = -(ripplerSize - width),
      minTop = -(ripplerSize - height)
    el[rippleContext].opts = {
      width,
      height,
      ripplerSize,
      minSize,
      maxSize,
      circle,
      minLeft,
      minTop
    }
  },
  bind(el, binding, vnode, oldvnode) {
    let pos = window.getComputedStyle(el, null).getPropertyValue('position')
    if (!pos || pos !== 'absolute' || pos !== 'relative') {
      el.style.position = 'relative'
    }
    // ripple事件执行
    const ripplerHandler = (e) => {
      e.stopPropagation()
      // 鼠标左键事件
      if (e.button !== 0) {
        return
      }
      const opts = el[rippleContext].opts

      // 获取ripple定位值
      let left = opts.minLeft - (opts.width - e.offsetX),
        top = opts.minTop - (opts.height - e.offsetY)
      // 添加动画效果
      const effectDiv = document.createElement('div')
      effectDiv.style.width = `${opts.circle}px`
      effectDiv.style.height = `${opts.circle}px`
      effectDiv.style.left = `${left}px`
      effectDiv.style.top = `${top}px`
      effectDiv.style.transform = `scale(${opts.minSize / (opts.maxSize + opts.minSize)})`
      // 设置颜色值
      effectDiv.style.color = el[rippleContext].rippleColor || 'currentColor'
      effectDiv.classList.add('rippler--effect')
      el.appendChild(effectDiv)
      // 延迟设置属性可触发transition动画
      setTimeout(() => {
        effectDiv.style.opacity = 0
        effectDiv.style.transform = 'scale(1.5)'
      }, 0)
      effectDiv.addEventListener('transitionend', ripplerEnd)
    }
    // ripple动画结束事件
    const ripplerEnd = (e) => {
      if (e.target.parentNode === el) {
        e.target.removeEventListener('transitionend', ripplerEnd)
        el.removeChild(e.target)
      }
    }
    // 目标元素处理
    el.classList.add('rippler')
    el.addEventListener('mousedown', ripplerHandler)
    // 自定义缓存对象
    const rippleColor = binding.value
    el[rippleContext] = {
      ripplerHandler,
      rippleColor,
      expression: binding.expression,
      binding: binding
    }
  },
  update(el, binding, vnode) {
    // 更新回调
    el[rippleContext].expression = binding.expression
    el[rippleContext].rippleColor = vnode.context[binding.expression]
  },
  componentUpdated() { },
  unbind(el) {
    // 解除事件
    el.removeEventListener('mousedown', el[rippleContext].ripplerHandler)
  }
}
