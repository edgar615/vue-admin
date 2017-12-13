<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import lazyLoading from '@/router/lazyLoading'
export default {
  name: 'app',
  created() {
      this.$store.dispatch('GetPermission').then(res => {
        var routes = [];
      res.data.forEach(function(item, index, input) {
        //从system中提取menu
        if (item.menus) {
          item.menus.forEach(function(menu, menuIndex, menuArray) {
            routes.push(rFormat(menu));
          })
        }
      })
      console.log(routes)
      routes.push({
          path: '*', // 匹配未找到路由的情况, 类似 404 页面
          component: resolve => require(['@/components/notfound/notfound.vue'], resolve),
        meta: {
        hidden: true
      }
    });
    this.$router.addRoutes(routes) // 动态添加可访问路由表
    //next(to.path); // hack方法 确保addRoutes已完成
  }).catch(err => {
    console.log(err);
  });

  }
}

/**
 * 后台传的路由值处理函数,格式化为vue-router addRoutes()可用的参数
 * @params:routers [Array] 必须为符合路由添加选项要求的数组
 * @return:fmRouters [Array]  格式化后的addRoutes()可用的参数
 **/
function rFormat(menu) {
  var comp = menu.path;
  if (comp.substring(0,1) == "/") {
    comp = comp.substring(1);
  }
  var router = {
    path : menu.path,
    component: lazyLoading(comp, menu.parentId == -1),
    meta: {
      name : menu.name
    }
  }
  return router;
}
</script>
