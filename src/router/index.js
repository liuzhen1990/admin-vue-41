import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import UserList from '@/components/userlist/userlist'
import RoleList from '@/components/rolelist/rolelist'
import RightsList from '@/components/rights-list/rights-list'
import {getUserInfo} from '@/assets/js/auth'
Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    name: 'home',
    path: '/',
    component: Home,
    // 配置子路由,找到/users,不会往根路径下跳转，而是往父元素/下跳转
    children: [
      {
        name: 'user-list',
        path: '/users',
        component: UserList
      },
      {
        name: 'role-list',
        path: '/roles',
        component: RoleList
      },
      {
        name: 'rights-list',
        path: '/rights',
        component: RightsList
      }
    ]
  }
  ]
})
// 添加路由拦截器
router.beforeEach((to, from, next) => {
  // 1
  // to 我要到哪里
  // from 我从哪里来
  // next 用来放行
  console.log(to)
  // 2.
  // 拿到当前请求的视图路径标识
  // 2.1 如果是登陆组件，则直接放行通过
  // 2.2 如果是非登陆组件，则检查 Token 令牌
  // 2.2.1 有令牌就过去
  // 2.2.2 无令牌，则让其登陆去
  if (to.name === 'login') {
    next()
  } else {
    // const token = window.localStorage.getItem('admin-token')
    if (!getUserInfo()) {
      next({
        path: '/login'
      })
    // if (!token) {
    //   next({
    //     path: '/login'
    //   })
    } else {
      next()
    }
  }
})
// 导出路由
export default router
