import types from '../types'

const state = () => ({
  text: '操作成功',
  display: false,
  color: 'success',
  icon: 'mdi-check-circle'
})

const mutations = {
  [types.NEW_TOAST] (state, { text, color, icon }) {
    state.text = text
    state.display = true
    state.color = color
    state.icon = icon
  },
  [types.CLOSE_TOAST] (state) {
    state.display = false
  }
}

const actions = {
  newToast ({ commit }, payload) {
    commit(types.NEW_TOAST, payload)
  },
  closeToast ({ commit }) {
    commit(types.CLOSE_TOAST)
  }
}

export default {
  state,
  mutations,
  actions
}
