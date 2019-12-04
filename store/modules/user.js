import types from '../types'
import api from '~/components/utils/api'

const state = () => ({
  profile: {},
  jwt: {}
})

const getters = {
  profile: state => state.profile,

  jwt: state => state.jwt,

  isLogin: (state, getters) => {
    return !!getters.profile.username
  },
  isAdmin: (state, getters) => {
    return getters.profile.isAdmin
  }
}

const mutations = {
  [types.CHANGE_PROFILE] (state, { profile }) {
    state.profile = profile
  },
  [types.CHANGE_JWT] (state, { jwt }) {
    state.jwt = jwt
  }
}

const actions = {
  setJwt ({ commit }, payload) {
    commit(types.CHANGE_JWT, {
      jwt: payload
    })
  },
  getProfile ({ state, commit }, payload) {
    return api.getUserInfo(payload, state.jwt).then((res) => {
      commit(types.CHANGE_PROFILE, {
        profile: res.data || {}
      })
    })
  },
  setProfile ({ state, commit }, payload) {
    return api.changeUserInfo(state.profile.username, payload, state.jwt).then(() => {
      const profile = Object.assign({}, state.profile)
      Object.keys(payload).forEach((element) => {
        if (profile[element] !== payload[element]) {
          profile[element] = payload[element]
        }
      })
      commit(types.CHANGE_PROFILE, { profile })
    })
  },
  changePassword ({ state }, payload) {
    return api.changeUserPassword(state.profile.username, payload, state.jwt)
  },
  clearProfile ({ commit }) {
    commit(types.CHANGE_PROFILE, {
      profile: {}
    })
  },
  clearJwt ({ commit }) {
    commit(types.CHANGE_JWT, {
      jwt: {}
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
