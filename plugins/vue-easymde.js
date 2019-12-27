import Vue from 'vue'
import VueEasymde from '@/components/common/easymde'
import 'easymde/dist/easymde.min.css'
import common from '@/plugins/utils/common'

Vue.component('vue-easymde', VueEasymde)

export default {
  configs: {
    spellChecker: false,
    uploadImage: true,
    previewClass: 'editor-preview markdown-body',
    previewRender: (plainText, preview) => {
      setTimeout(() => {
        preview.innerHTML = common.md.render(plainText)
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, window.document.getElementsByClassName('editor-preview')])
      }, 100)
      return 'Loading...'
    }
  }
}
