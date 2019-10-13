import api from '@/components/api'
import types from '../types'

const state = () => ({
  profile: {},
  jwt: {}
})

const getters = {
  profile: state => state.profile,

  isLogin: (state, getters) => {
    return !!getters.profile.username
  }
}

const mutations = {
  [types.CHANGE_PROFILE] (state, {profile}) {
    state.profile = Object.assign({}, profile)
  },
  [types.CHANGE_JWT] (state, {jwt}) {
    state.jwt = Object.assign({}, jwt)
  }
}

const actions = {
  setJwt ({commit}, payload) {
    commit(types.CHANGE_JWT, {
      jwt: payload
    })
  },
  getProfile ({state, commit}, payload) {
    api.getUserInfo(payload, state.jwt).then(res => {
      commit(types.CHANGE_PROFILE, {
        profile: res.data || {}
      })
    })
  },
  setProfile ({state, commit}, payload) {
    return api.changeUserInfo(state.profile.username, payload, state.jwt).then(() => {
      let profile = Object.assign({}, state.profile)
      Object.keys(payload).forEach(element => {
        if (profile[element] !== payload[element]) {
          profile[element] = payload[element]
        }
      })
      commit(types.CHANGE_PROFILE, {profile})
    })
  },
  clearProfile ({commit}) {
    commit(types.CHANGE_PROFILE, {
      profile: {}
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
