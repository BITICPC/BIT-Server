// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import $ from 'jquery'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import '../static/css/style.css'
import '../static/css/all.css' // for fontawesome

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
