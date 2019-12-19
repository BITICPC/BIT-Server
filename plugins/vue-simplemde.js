import Vue from 'vue'
import VueSimplemde from '@/components/common/vue-simplemde'
import 'simplemde/dist/simplemde.min.css'

Vue.component('vue-simplemde', VueSimplemde)

export default {
  configs: {
    spellChecker: false
  }
}
