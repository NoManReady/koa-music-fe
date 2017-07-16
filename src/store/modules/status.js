import * as types from '../constant'
const state = {
  header: true,
  loading: false,
  playbar: false,
  listenListStatus: false,
  partLoading: false
}
const actions = {
  setLoading({ commit }, loading = false) {
    commit(types.APP_LOADING, loading)
  },
  setPartLoading({ commit }, loading = false) {
    commit(types.PART_LOADING, loading)
  },
  setHeader({ commit }, header = false) {
    commit(types.APP_HEADER, header)
  },
  setPlaybar({ commit }, playbar = false) {
    commit(types.APP_PLAYBAR, playbar)
  },
  setListenListStatus({ commit }, listenListStatus = false) {
    commit(types.LISTEN_LIST_STATUS, listenListStatus)
  }
}
const mutations = {
  [types.APP_LOADING](state, loading) {
    state.loading = loading
  },
  [types.APP_HEADER](state, header) {
    state.header = header
  },
  [types.APP_PLAYBAR](state, playbar) {
    state.playbar = playbar
  },
  [types.LISTEN_LIST_STATUS](state, status) {
    state.listenListStatus = status
  },
  [types.PART_LOADING](state, status) {
    state.partLoading = status
  }
}
const getters = {
  loading(state) {
    return state.loading
  },
  header(state) {
    return state.header
  },
  playbar(state) {
    return state.playbar
  },
  listenListStatus(state) {
    return state.listenListStatus
  },
  partLoading(state) {
    return state.partLoading
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}