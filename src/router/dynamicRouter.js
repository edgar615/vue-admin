import NotFound from '@/components/error/page-404.vue'
import ChangePwd from '@/views/profile/password.vue'
import lazyLoading from '@/router/lazyLoading'
import Layout from '@/components/layout/Layout.vue'

function rFormat (menu, parent) {
  var comp = createComp(menu)
  if (parent) {
    comp = createComp(parent) + '/' + comp
  }
  var index = false
  if (menu.children && menu.children.length > 0) {
    index = true
  }
  var moduleId
  if (menu.level === 3 && parent.moduleId) {
    moduleId = parent.moduleId
  } else {
    moduleId = menu.moduleId
  }
  var router = {
    path: menu.path,
    component: lazyLoading(comp, index),
    meta: {
      name: menu.name,
      icon: menu.icon,
      hidden: menu.hidden,
      subsystemId: menu.subsystemId,
      menuId: menu.sysPermissionId,
      parentId: menu.parentId,
      level: menu.level,
      moduleId: moduleId
    }
  }

  if (menu.children) {
    var children = []
    menu.children.forEach(function (item, index, input) {
      children.push(rFormat(item, menu))
      if (item.acquiescent) {
        children.push({
          path: '',
          redirect: item.path,
          meta: {
            hidden: true,
            moduleId: moduleId
          }
        })
      }
    })
    router.children = children
  }
  return router
}

function createComp (menu) {
  var comp = menu.component
  if (comp.substring(0, 1) === '/') {
    comp = comp.substring(1)
  }
  return comp
}

var dynamicRouter = function (token, router, store) {
  return new Promise((resolve, reject) => {
    store.dispatch('GetPermission').then(res => {
      var routes = []
      res.data.forEach(function (item, index, input) {
        // 从system中提取menu
        if (item.permissions) {
          item.permissions.forEach(function (menu, menuIndex, menuArray) {
            if (menu.type === 3) {
              if (menu.children) {
                menu.children.forEach(function (child, childIndex, childArray) {
                  child.moduleId = menu.id
                  routes.push(rFormat(child))
                })
              }
            } else {
              routes.push(rFormat(menu))
            }
          })
        }
      })
      routes.push({
        path: '/profile',
        component: Layout,
        meta: {
          name: '个人资料',
          icon: 'account',
          hidden: true
        },
        children: [{
          path: 'changepwd',
          component: ChangePwd,
          meta: {
            name: '修改密码',
            icon: 'lock-reset',
            hidden: true
          }
        }]
      })
      routes.push({
        path: '*', // 匹配未找到路由的情况, 类似 404 页面
        component: NotFound,
        meta: {
          hidden: true
        }
      })
      router.addRoutes(routes) // 动态添加可访问路由表
      return resolve(routes)
      // next(to.path) // hack方法 确保addRoutes已完成
    }).catch(err => {
      return reject(err)
    })
  })
}

export default dynamicRouter
