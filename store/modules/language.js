import types from '../types'

const state = () => ({
  language: []
})

const getters = {
  language: state => state.language || null
}

const mutations = {
  [types.CHANGE_LANGUAGE] (state, payload) {
    state.language = payload
  }
}

const actions = {
  setLanguage ({ commit }, payload) {
    commit(types.CHANGE_LANGUAGE, payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
