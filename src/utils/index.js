/**
 * 工具函数
 */

//获取给定进制随机值（取整）
export const unixColor = (hex = 16) => {
  return (~~(Math.random() * hex)).toString(hex)
}

//获取颜色随机值
export const randomColor = () => {
  let _color = Array.from({ length: 5 }).reduce((a, b) => { return unixColor() + a }, unixColor())
  return `#${_color}`
}

// 去中心化配置
export const deCentralization = (r, exinclude = /index/) => {
  const paths = r.keys().filter(p => {
    return !exinclude.test(p)
  })
  const maps = paths.map(k => {
    return r(k).default
  })
  return maps
}
