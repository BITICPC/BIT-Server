import Vue from 'vue'
import user from './modules/user'
import snackbar from './modules/snakebar'
import katex from '@/plugins/katex'

Vue.use(katex)

export default {
  modules: {
    user,
    snackbar
  }
}
