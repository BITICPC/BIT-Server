import Vue from 'vue'
import VueAceEditor from 'vue2-ace-editor'

// Init
import 'brace/ext/language_tools'
import 'brace/mode/c_cpp'
import 'brace/mode/java'
import 'brace/mode/python'
import 'brace/mode/rust'
import 'brace/theme/chrome'
import 'brace/snippets/c_cpp'
import 'brace/snippets/java'
import 'brace/snippets/python'
import 'brace/snippets/rust'

Vue.component('ace-editor', VueAceEditor)
