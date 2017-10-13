import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ActionManage from'@/components/ActionManage'
import Login from'@/components/Login'
import Label from '@/components/AddLabel'
import HomePage from '@/components/HomePage'
import LeftView from '@/components/LeftView'
import DrawerView from '@/components/DrawerView'
Vue.use(Router)

export default new Router({
  mode:  'history',
  routes: [
    {
      path: '/',
      redirect:'/login'
    },{
      path:'/home',
      name:'HomePage',
      component:HomePage,
      children: [
        {
          path: ':id',
          component: DrawerView
        }
      ]
    },{
      path:'/login',
      name:'Login',
      component:Login
    },{
      path:'/label',
      name:'Label',
      component:Label
    },{
      path:'/actionmanage',
      name:'actionmanage',
      component:ActionManage

    }
  ]
})
