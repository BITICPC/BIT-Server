import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Join from '@/components/Join'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'Home' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: 'Login' }
    },
    {
      path: '/join',
      component: Join,
      name: 'Join',
      meta: { title: 'Join' }
    },
    {
      path: '/setting',
      component: Settings,
      name: 'Settings',
      meta: { title: 'Setting' }
    }
  ]
})
