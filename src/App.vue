<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    console.log("created");
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
    //this.$router.push({ path: '/' })
    /*
    let isLogin = isLogin() ;
    if (isLogin) {
      if (this.$route.path != '/login') {
        this.setAdminMenus();
      }
    } else {
      this.$router.replace('/login');
    }*/
  }
}

/**
 * 后台传的路由值处理函数,格式化为vue-router addRoutes()可用的参数
 * @params:routers [Array] 必须为符合路由添加选项要求的数组
 * @return:fmRouters [Array]  格式化后的addRoutes()可用的参数
 **/
function rFormat(menu) {
  var router = {
    path : "/" + menu.sysMenuId,
    component : resolve => require(['@/components/layout/Layout.vue'], resolve),
    meta: {
      name : menu.name
    },
  children: [{
    path: '', // 默认路由
    component: resolve => require(['@/components/home/home.vue'], resolve)
  }]
  }
  return router;
}
</script>
