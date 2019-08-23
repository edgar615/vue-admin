<template>
  <div id="app" class="app-content">
    <router-view></router-view>
    <v-dialog/>
    <notifications group="notification" position="bottom center">
      <template slot="body" slot-scope="props">
        <div class="notification-custom-template">
          <div class="notification-custom-template-icon">
            <b-icon icon="checkbox-marked-circle-outline"></b-icon>
          </div>
          <div class="notification-custom-template-content">
            <div class="notification-custom-template-title">
              {{props.item.title}}
            </div>
            <div class="notification-custom-template-text"
                 v-html="props.item.text"></div>
          </div>
          <div class="notification-custom-template-close"
               @click="props.close">
            <b-icon icon="close"></b-icon>
          </div>
        </div>
      </template>
    </notifications>

    <notifications group="error-notification" position="bottom center">
      <template slot="body" slot-scope="props">
        <div class="notification-custom-template is-error">
          <div class="notification-custom-template-icon">
            <b-icon icon="alert-circle-outline"></b-icon>
          </div>
          <div class="notification-custom-template-content">
            <div class="notification-custom-template-title">
              {{props.item.title}}
            </div>
            <div class="notification-custom-template-text"
                 v-html="props.item.text"></div>
          </div>
          <div class="notification-custom-template-close"
               @click="props.close">
            <b-icon icon="close"></b-icon>
          </div>
        </div>
      </template>
    </notifications>
    <div class="pageloader is-primary" :class="{'is-active' : loading}"></div>
  </div>
</template>

<script>
  import dynamicRouter from '@/router/dynamicRouter'
  import loadDict from '@/utils/dict-util'
  import NotFound from '@/views/page/page-404.vue'
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
            Vue.prototype.$modal.show('dialog', {
              text: '您当前的会话已过期，请重新登录！',
              buttons: [
                {
                  title: '去登录',
                  efault: true,
                  handler: () => {
                    vm.$router.push('/login')
                    Vue.prototype.$modal.hide('dialog');
                  }
                }
              ]
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
