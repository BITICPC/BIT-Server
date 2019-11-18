import Vue from 'vue'
import katex from '@/plugins/katex'
import user from './modules/user'

let MarkdownIt = require('markdown-it'),
    md = new MarkdownIt()

Vue.use(katex)

export default {
  modules: {
    user
  }
}
