import api from '@/api'
import types from '../types'
import storage from '@/utils/storage'

const state = {
  profile: {}
}

const getters = {
  profile: state => state.profile,

  isLogin: (state, getters) => {
    return !!getters.profile.username
  }
}

const mutations = {
  [types.CHANGE_PROFILE] (state, {profile}) {
    state.profile = profile
  }
}

const actions = {
  getProfile ({commit}, payload) {
    api.getUserInfo(payload.username).then(res => {
      commit(types.CHANGE_PROFILE, {
        profile: res.data || {}
      })
    })
  },
  clearProfile ({commit}) {
    commit(types.CHANGE_PROFILE, {
      profile: {}
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
