<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="pageloader is-info" :class="{'is-active' : loading}"><span class="title">页面加载中</span></div>
  </div>
</template>

<script>
  import dynamicRouter from '@/router/dynamicRouter'
  import NotFound from '@/components/error/page-404.vue'
export default {
  name: 'app',
  created() {
      const vm = this
      if (this.$store.getters.token) {
        vm.loading = true;
        dynamicRouter(this.$store.getters.token, this.$router, this.$store).then(resp => {
          vm.loading = false;
        }).catch(err => {
          vm.loading = false;
            this.$toast.open({
              duration: 1500,
              message: "获取系统数据失败",
              type: 'is-danger'
            })
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
