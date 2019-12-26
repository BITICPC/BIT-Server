import Vue from 'vue'
import VueEasymde from '@/components/common/easymde'
import 'easymde/dist/easymde.min.css'

Vue.component('vue-easymde', VueEasymde)

export default {
  configs: {
    spellChecker: false,
    uploadImage: true
  }
}
