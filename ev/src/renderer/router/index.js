import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: require('@/components/Login')
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/main',
      name: 'main-page',
      component: require('@/components/Main')
    },
    {
      path: '/file',
      name: 'file-page',
      component: require('@/components/FileSelector')
    },
    {
      path: '/table',
      name: 'table-page',
      component: require('@/components/TableReview')
    },
    {
      path: '/modifyPw',
      name: 'passwd-page',
      component: require('@/components/ModifyPassword')
    },
    {
      path: '/result',
      name: 'result-page',
      component: require('@/components/TableResult')
    },
    {
      path: '/history',
      component: require('@/components/ShowHistory')
    }
  ]
})
