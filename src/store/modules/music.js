import * as api from '@/api'
import * as types from '../constant'
const state = {
  popularLists: [],//流行音乐列表
  classicalLists: [],//古典音乐列表
  lightLists: [],//轻音乐列表
  radioLists: [],//电台音乐列表
  listenLists: localStorage.musiclists ? JSON.parse(localStorage.musiclists) : [],//歌曲列表
  audio: localStorage.musiclists ? JSON.parse(localStorage.musiclists)[0] : null,//当前播放音乐
  audioUrl: '',//当前歌曲封面
  lyric: '',//当前歌词
  size: '',//当前歌曲大小
  playing: false, // 是否正在播放
}

const actions = {
  //添加到试听列表
  addListenLists({ commit }, music) {
    commit(types.ADD_LISTEN_LISTS, music)
  },
  // 全部添加至试听列表
  addAllToListenLists({ commit }, musiclists) {
    commit(types.ADD_ALL_TO_LISTEN_LISTS, musiclists)
  },
  //清除试听列表
  removeListenLists({ commit }, index) {
    commit(types.REMOVE_LISTEN_LISTS, index)
  },
  //清除全部试听列表
  removeAllListenLists({ commit }) {
    commit(types.REMOVE_ALL_LISTEN_LISTS)
  },
  //获取热门流行歌曲
  getPopularLists({ commit }) {
    commit(types.PART_LOADING, true)
    if (localStorage.popularList !== '[]' && localStorage.popularList) {
      setTimeout(() => {
        commit(types.PART_LOADING, false)
        commit(types.GET_POPULAR_LISTS, JSON.parse(localStorage.popularList))
      }, 500)
      return;
    }
    api.getMusics(3778678)
      .then(res => {
        const _tracks = res.result.tracks
        commit(types.PART_LOADING, false)
        commit(types.GET_POPULAR_LISTS, _tracks)
        localStorage.popularList = JSON.stringify(_tracks.slice(0, 30))
      })
  },
  //获取古典歌曲
  getClassicalLists({ commit }) {
    commit(types.PART_LOADING, true)
    if (localStorage.classicalmusics !== '[]' && localStorage.classicalmusics) {
      setTimeout(() => {
        commit(types.PART_LOADING, false)
        commit(types.GET_CLASSICAL_LISTS, JSON.parse(localStorage.classicalmusics))
      }, 500)
      return;
    }
    api.getMusics(71384707)
      .then(res => {
        const _tracks = res.result.tracks
        commit(types.PART_LOADING, false)
        commit(types.GET_CLASSICAL_LISTS, _tracks)
        localStorage.classicalmusics = JSON.stringify(_tracks.slice(0, 30))
      })
  },
  //获取轻音乐歌曲
  getLightLists({ commit }) {
    commit(types.PART_LOADING, true)
    if (localStorage.lightmusics !== '[]' && localStorage.lightmusics) {
      setTimeout(() => {
        commit(types.PART_LOADING, false)
        commit(types.GET_LIGHT_LISTS, JSON.parse(localStorage.lightmusics))
      }, 500)
      return;
    }
    api.getMusics(26467411)
      .then(res => {
        const _tracks = res.result.tracks
        commit(types.PART_LOADING, false)
        commit(types.GET_LIGHT_LISTS, _tracks)
        localStorage.lightmusics = JSON.stringify(_tracks.slice(0, 30))
      })
  },
  //获取电台歌曲
  getRadioLists({ commit }) {
    commit(types.PART_LOADING, true)
    if (localStorage.radiomusics !== '[]' && localStorage.radiomusics) {
      setTimeout(() => {
        commit(types.PART_LOADING, false)
        commit(types.GET_RADIO_LISTS, JSON.parse(localStorage.radiomusics))
      }, 500)
      return;
    }
    api.getMusics(897089)
      .then(res => {
        const _tracks = res.result.tracks
        commit(types.PART_LOADING, false)
        commit(types.GET_RADIO_LISTS, res.playlist.tracks)
        localStorage.radiomusics = JSON.stringify(_tracks.slice(0, 30))
      })
  },
  //设置此时播放的音乐
  setAudio({ commit }, music) {
    commit(types.SET_AUDIO, music)
  },
  //设置播放的音乐url
  setAudioUrl({ commit }, url) {
    commit(types.SET_AUDIO_URL, url)
  },
  //上一曲
  setNextAudio({ commit }, index) {
    commit(types.SET_PRE_AUDIO, index)
  },
  //下一曲
  setPreAudio({ commit }, index) {
    commit(types.SET_NEXT_AUDIO, index)
  },
  //播放、暂停
  setPlaying({ commit }, status) {
    commit(types.TOGGLE_PLAYING, status)
  },
  //获取歌词
  getMusicLyric({ commit }, id) {
    api.getLyric({ id })
      .then((res) => {
        res.lrc ? commit(types.GET_MUSIC_LYRIC, res.lrc.lyric) : commit(types.GET_MUSIC_LYRIC, '')
      })
  },
  //设置歌曲总时间
  setMusicTime({ commit }, size) {
    commit(types.SET_MUSIC_TIME, size)
  }
}

const getters = {
  listenLists: state => state.listenLists,
  popularLists: state => state.popularLists.slice(0, 30),
  radioLists: state => state.radioLists.slice(0, 30),
  lightLists: state => state.lightLists.slice(0, 30),
  classicalLists: state => state.classicalLists.slice(0, 30),
  audio: state => state.audio,
  audioUrl: state => state.audioUrl,
  playing: state => state.playing,
  lyric: state => state.lyric,
  size: state => state.size
}

const mutations = {
  [types.ADD_LISTEN_LISTS](state, music) {
    state.listenLists.push(music)
    localStorage.musiclists = JSON.stringify(state.listenLists)
  },
  [types.ADD_ALL_TO_LISTEN_LISTS](state, musiclists) {
    state.listenLists = [...state.listenLists, ...musiclists]
    localStorage.musiclists = JSON.stringify(state.listenLists)
  },
  [types.REMOVE_LISTEN_LISTS](state, index) {
    state.listenLists.splice(index, 1)
  },
  [types.REMOVE_ALL_LISTEN_LISTS](state) {
    state.listenLists = []
    localStorage.musiclists = JSON.stringify([])
  },
  [types.GET_POPULAR_LISTS](state, list) {
    state.popularLists = list
  },
  [types.GET_CLASSICAL_LISTS](state, list) {
    state.classicalLists = list
  },
  [types.GET_LIGHT_LISTS](state, list) {
    state.lightLists = list
  },
  [types.GET_RADIO_LISTS](state, list) {
    state.radioLists = list
  },
  [types.SET_AUDIO](state, music) {
    state.audio = music
  },
  [types.SET_AUDIO_URL](state, url) {
    state.audioUrl = url
  },
  [types.SET_PRE_AUDIO](state, index) {
    let i = index === 0 ? state.listenLists.length - 1 : (--index)
    state.audio = state.listenLists[i]
  },
  [types.SET_NEXT_AUDIO](state, index) {
    let i = index === state.listenLists.length - 1 ? 0 : (++index)
    state.audio = state.listenLists[i]
  },
  [types.TOGGLE_PLAYING](state, status) {
    state.playing = status
  },
  [types.GET_MUSIC_LYRIC](state, lyric) {
    state.lyric = lyric
  },
  [types.SET_MUSIC_TIME](state, lyric) {
    state.size = lyric
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}