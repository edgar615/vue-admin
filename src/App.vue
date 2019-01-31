<template>
  <div id="app" class="app-content">
    <router-view></router-view>
    <div class="pageloader is-info" :class="{'is-active' : loading}"></div>
    <simplert></simplert>
  </div>
</template>

<script>
  import dynamicRouter from '@/router/dynamicRouter'
  import loadDict from '@/utils/dict-util'
  import NotFound from '@/components/error/page-404.vue'
  import {check} from '@/api/login'

  export default {
    name: 'app',
    data () {
      return {
        loading: false,
        checkIntervalId: undefined
      }
    },
    methods: {
      errorHandler (err) {
        console.log(err)
        this.loading = false
        var nextPath = '/500'
        if (err.statusCode) {
          var status = err.statusCode
          if (status === 400) {
            nextPath = '/400'
          }
          if (status === 401) {
            nextPath = '/401'
          }
        }
        this.$router.push(nextPath)
      },
      checkToken () {
        const vm = this
        check().then(response => {
        }).catch(error => {
          if (error.code === 1005) {
            vm.$swal.fire({
              type: 'error',
              title: '您当前的会话已过期，请重新登录！',
              confirmButtonText: '去登录',
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false
            }).then((result) => {
              if (result.value) {
                vm.$router.push('/login')
              }
            })
            clearInterval(vm.checkIntervalId)
          }
        })
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
        // 定时任务检查token
        // 十秒
        vm.checkIntervalId = setInterval(vm.checkToken, 10000)
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
    },
    beforeDestory () {
      // 清理定时任务
      if (this.checkIntervalId) {
        clearInterval(this.checkIntervalId)
      }
    }
  }
</script>
