// import Vue from 'vue'
// import Router from 'vue-router'

// 初始化加载的模块
import Home from '@/views/home/home.vue'
// import Notfound from '@/views/page/page-404.vue'
import ErrorPage from '@/views/page/page-500.vue'
import TokenPage from '@/views/page/page-401.vue'
import AuthPage from '@/views/page/page-403.vue'
import Layout from '@/components/layout/Layout.vue'
import Login from '@/views/login/login.vue'
import Landing from '@/views/page/landing.vue'
import store from "../store";

// 异步加载的模块
// var Notfound =  resolve => require(['@/components/notfound/page-404.vue'], resolve);

Vue.use(VueRouter)
var routes = [{
  path: '/',
  component: Layout,
  meta: {
    // 直接使用 name 作为菜单的名字, 如果有默认路由的时候会有警告
    // Named Route '首页' has a default child route.
    // When navigating to this named route (:to="{name: '首页'"),
    // the default child route will not be rendered.
    // Remove the name from this route and use the name of the default child route for named links instead.
    name: '首页',
    icon: 'home'
  },
  children: [{
    path: '', // 默认路由
    component: Home,
    meta: {
      hidden: true,
      icon: 'home',
      showBreadcrumb: false
    }
  }]
}, {
  path: '/login',
  component: Login,
  meta: {
    name: '登录'
  }
}, {
  path: '/landing',
  component: Landing,
  meta: {
    name: 'landing',
    hidden: true
  }
}, {
  path: '/500',
  component: ErrorPage,
  meta: {
    name: '系统错误'
  }
}, {
  path: '/401',
  component: TokenPage,
  meta: {
    name: '无效Token'
  }
}, {
  path: '/403',
  component: AuthPage,
  meta: {
    name: '权限不足'
  }
}]

// 在最后添加处理 404 路由，由于是动态加载，所以要改在动态加载之后添加
/*
routes.push({
  path: '*', // 匹配未找到路由的情况, 类似 404 页面
  component: Notfound,
  meta: {
    hidden: true
  }
});
*/
const router = new VueRouter({
  /* mode: 'history',*/
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (store.getters.token) {
      next('/')
    } else {
      next()
    }
  } else {
    if (store.getters.token) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  if (!to.meta) {
    return
  }
  if (to.meta.moduleId) {
    store.commit('ACTIVE_MODULE', [to.meta.subsystemId, to.meta.moduleId])
  } else if (to.meta) {
    store.commit('ACTIVE_MODULE', [to.meta.subsystemId, ''])
  } else {
    store.commit('ACTIVE_MODULE', ['', ''])
  }
  if (!to.meta.menuId) {
    store.commit('ACTIVE_LEVEL1_MENU', ['', ''])
    store.commit('ACTIVE_LEVEL2_MENU', ['', '', ''])
    return
  }
  if (to.meta.level === 1) {
    store.commit('ACTIVE_LEVEL1_MENU', [to.meta.subsystemId, to.meta.menuId])
    store.commit('ACTIVE_LEVEL2_MENU',
      [to.meta.subsystemId, to.meta.menuId, ''])
  } else if (to.meta.level === 2 && to.meta.moduleId) {
    // 应该是一级菜单
    store.commit('ACTIVE_LEVEL1_MENU', [to.meta.subsystemId, to.meta.menuId])
    store.commit('ACTIVE_LEVEL2_MENU',
      [to.meta.subsystemId, to.meta.menuId, ''])
  } else if (to.meta.level === 2) {
    if (!to.meta.hidden || store.getters.activeLevel1 !== to.meta.parentId) {
      store.commit('ACTIVE_LEVEL2_MENU',
        [to.meta.subsystemId, to.meta.parentId, to.meta.menuId])
    }
  } else if (to.meta.level === 3) {
    if (!to.meta.hidden || store.getters.activeLevel1 !== to.meta.parentId) {
      store.commit('ACTIVE_LEVEL2_MENU',
        [to.meta.subsystemId, to.meta.parentId, to.meta.menuId])
    }
  }
})

export default router
