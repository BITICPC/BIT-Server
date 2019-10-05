import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const rootActions = {
  changeDomTitle ({commit, state}, payload) {
    console.log('IN')
  }
}

export default new Vuex.Store({
  modules: {
    user
  },
  actions: rootActions
})
