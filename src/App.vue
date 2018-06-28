<template>
  <div id="app" class="app-content">
    <router-view></router-view>
    <div class="pageloader is-info" :class="{'is-active' : loading}"></div>
  </div>
</template>

<script>
  import dynamicRouter from '@/router/dynamicRouter'
  import NotFound from '@/components/error/page-404.vue'
export default {
  name: 'app',
  data () {
    return {
      loading: false
    }
  },
  created() {
      const vm = this
      if (this.$store.getters.token) {
        vm.loading = true;
        dynamicRouter(this.$store.getters.token, this.$router, this.$store).then(resp => {
          vm.loading = false;
        }).catch(err => {
          vm.loading = false;
          var nextPath = "/500";
          if (err.response) {
            var code = err.response.data.code;
            if (code == '1005' || code == '1021') {
              nextPath = "/401"
            }
          }
          this.$router.push(nextPath)
        })
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
