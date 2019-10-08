import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Join from '@/components/Join'
import Settings from '@/components/Settings'
import Ranklist from '@/components/Ranklist'

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
      path: '/ranklist',
      name: 'Ranklist',
      component: Ranklist,
      meta: { title: 'Ranklist' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: 'Login' }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: { title: 'Logout' }
    },
    {
      path: '/join',
      component: Join,
      name: 'Join',
      meta: { title: 'Join' }
    },
    {
      path: '/settings',
      component: Settings,
      name: 'Settings',
      meta: { title: 'Setting' }
    }
  ]
})
