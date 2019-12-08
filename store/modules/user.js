import types from '../types'
import storage from '@/plugins/utils/storage'
import { STORAGE_KEY } from '@/plugins/utils/constants'

const state = () => ({
  profile: {
    username: storage.get(STORAGE_KEY.USER_NAME) || null,
    role: storage.get(STORAGE_KEY.ROLE) || null,
    jwt: storage.get(STORAGE_KEY.JWT) || null
  }
})

const getters = {
  profile: state => state.profile,

  isLogin: state => !!state.profile.jwt,

  isAdmin: state => state.profile.role
}

const mutations = {
  [types.CHANGE_PROFILE] (state, payload) {
    state.profile = payload
    storage.set(STORAGE_KEY.USER_NAME, payload.username)
    storage.set(STORAGE_KEY.ROLE, payload.role)
    storage.set(STORAGE_KEY.JWT, payload.jwt)
  }
}

const actions = {
  setProfile ({ commit }, { username, role, jwt }) {
    commit(types.CHANGE_PROFILE, { username, role, jwt })
  },
  clearProfile ({ commit }) {
    commit(types.CHANGE_PROFILE, {
      username: null,
      role: null,
      jwt: null
    })
    storage.clear()
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
