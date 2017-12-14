<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import dynamicRouter from '@/router/dynamicRouter'
  import NotFound from '@/components/notfound/notfound.vue'
export default {
  name: 'app',
  created() {
      if (this.$store.getters.token) {
        dynamicRouter(this.$store.getters.token, this.$router, this.$store)
      } else {
        var routes = [];
        routes.push({
            path: '*', // 匹配未找到路由的情况, 类似 404 页面
            component: NotFound,
          meta: {
          hidden: true
        }
      });
      this.$router.addRoutes(routes) // 动态添加可访问路由表
  }


  }
}

</script>
