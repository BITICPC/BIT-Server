import Vue from 'vue'
import user from './modules/user'
import snackbar from './modules/snakebar'
import highlight from '~/plugins/highlight'

Vue.use(highlight)

export default {
  modules: {
    user,
    snackbar
  }
}
