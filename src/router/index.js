import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from'@/components/Home'
import Login from'@/components/Login'

Vue.use(Router)

export default new Router({
  mode:  'history',
  routes: [
    {
      path: '/',
      redirect:'/login'
    },{
      path:'/home',
      name:'Home',
      component:Home
    },{
      path:'/login',
      name:'Login',
      component:Login
    }
  ]
})
