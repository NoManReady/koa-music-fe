import * as types from '../constant'
const state = {
  header: true,
  loading: true,
  playbar: true
}
const actions = {
  setLoading({ commit }, loading = false) {
    commit(types.APP_LOADING, loading)
  },
  setHeader({ commit }, header = false) {
    commit(types.APP_HEADER, header)
  },
  setPlaybar({ commit }, playbar = false) {
    commit(types.APP_PLAYBAR, playbar)
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
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}