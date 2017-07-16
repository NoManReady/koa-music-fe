// import fetch from '@/utils/fetch'
import axios from 'axios'
// 获取歌单列表（popular:3778678,classical:71384707,light:26467411,radio:897089）
export const getMusics = (id) => {
  return axios.get(`/playlist?id=${id}`)
}
// 获取歌词
export const getLyric = (mid) => {
  return axios.get(`/lyric?id=${mid}`)
}
// 获取音乐
export const getMusic = (mid) => {
  return axios.get(`/music?id=${mid}`)
}
// 搜索歌曲
export const getSearch = (keywords) => {
  return axios.get(`/search?keywords=${keywords}`)
}
// 获取排行版
export const getRank = (type) => {
  return axios.get(`/rank?type=${type}`)
}

//获取banner
export const getBanner = () => {
  return axios.get('/banner')
}