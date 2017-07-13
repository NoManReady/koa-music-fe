import Vue from 'vue'
import Vuex from 'vuex'


import status from './modules/status'
import music from './modules/music'
import * as types from './constant'

Vue.use(Vuex)
const state = {

}

const actions = {

}

const mutations = {

}

const modules = {
  status,
  music
}

const getters = {

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
  getters
})