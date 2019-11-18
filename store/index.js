import Vue from 'vue'
import katex from '@/plugins/katex'
import user from './modules/user'

Vue.use(katex)

export default {
  modules: {
    user
  }
}
