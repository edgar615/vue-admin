import NotFound from '@/components/error/page-404.vue'
import lazyLoading from '@/router/lazyLoading'
function rFormat(menu, parent) {
  var comp = createComp(menu);
  if (parent) {
    comp = createComp(parent) + "/" + comp
  }
  var router = {
    path : menu.path,
    component: lazyLoading(comp, menu.parentId == -1),
    meta: {
      name : menu.name,
      hidden: menu.hidden
    }
  }
  if (menu.children) {
    var children = [];
    menu.children.forEach(function(item, index, input) {
      children.push(rFormat(item, menu));
      if (item.acquiescent) {
        children.push({
          path: '',
          redirect: item.path,
          meta: {
            hidden: true
          }
        })
      }
    })
    router.children = children;
  }
  return router;
}
function createComp(menu) {
  var comp = menu.component;
  if (comp.substring(0,1) == "/") {
    comp = comp.substring(1);
  }
  return comp
}

var dynamicRouter = function (token, router, store) {
  return new Promise((resolve, reject) => {
      store.dispatch('GetPermission').then(res => {
      var routes = [];
      res.data.forEach(function(item, index, input) {
        //从system中提取menu
        if (item.menus) {
          item.menus.forEach(function(menu, menuIndex, menuArray) {
            routes.push(rFormat(menu));
          })
        }
      })
      routes.push({
        path: '*', // 匹配未找到路由的情况, 类似 404 页面
        component:NotFound,
        meta: {
          hidden: true
        }
      });
      router.addRoutes(routes) // 动态添加可访问路由表
      return resolve(routes);
      //next(to.path); // hack方法 确保addRoutes已完成
    }).catch(err => {
      return reject(err)
    });
})


};

export default dynamicRouter;
