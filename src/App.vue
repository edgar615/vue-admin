<template>
  <div id="app" class="app-content">
    <router-view></router-view>
    <div class="pageloader is-info" :class="{'is-active' : loading}"></div>
  </div>
</template>

<script>
  import dynamicRouter from '@/router/dynamicRouter'
  import loadDict from '@/utils/dict-util'
  import NotFound from '@/components/error/page-404.vue'

  export default {
    name: 'app',
    data () {
      return {
        loading: false
      }
    },
    methods: {
      errorHandler (err) {
        console.log(err)
        this.loading = false
        var nextPath = '/500'
        if (err.response) {
          var code = err.response.data.code
          if (code === '1005' || code === '1021') {
            nextPath = '/401'
          }
        }
        this.$router.push(nextPath)
      }
    },
    mounted () {
      const vm = this
      window.onresize = () => {
        return (() => {
          vm.$store.dispatch('windowResize', {width: document.body.clientWidth})
        })()
      }
    },
    created () {
      const vm = this
      const store = vm.$store
      if (store.getters.token) {
        vm.loading = true
        // 这里没有all，而且做了嵌套回调
        dynamicRouter(store.getters.token, this.$router, store).then(resp => {
          loadDict(store).then(resp2 => {
            vm.loading = false
          }).catch(err => vm.errorHandler(err))
        }).catch(err => vm.errorHandler(err))
      } else {
        var routes = []
        routes.push({
          path: '*', // 匹配未找到路由的情况, 类似 404 页面
          component: NotFound,
          meta: {
            hidden: true
          }
        })
        vm.$router.addRoutes(routes)  // 动态添加可访问路由表
      }
    }
  }
</script>
