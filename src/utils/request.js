import axios from 'axios'
import store from '@/store'

// 拦截器弹出错误提示
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
  headers: {'X-Client-Name': process.env.VUE_APP_CLIENT_NAME}
})

// request拦截器
service.interceptors.request.use(config => {
  const token = store.getters.token
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  }, error => {
    if (error.config.params && error.config.params.ignoreError === true) {
      return Promise.reject(error)
    }
    let apiErr = {
      msg: '接口调用失败!',
      code: 998,
      statusCode: error.response.status
    }
    if (error.response) {
      if (error.response.data) {
        apiErr.code = error.response.data.code
        // 存储业务相关数据
        apiErr.data = error.response.data.data
      }
      if (apiErr.code === 1005) {
        // token过期
        store.dispatch('Logout')
        // Vue.prototype.$dialog.alert({
        //   message: '当前会话已过期，请重新登录',
        //   confirmText: '去登录',
        //   onConfirm: () => router.push('/login')
        // })
      } else if (apiErr.code === 1021) {
        // token无效
        store.dispatch('Logout')
      }
      apiErr.msg = store.getters.dictText('errorCode', apiErr.code)
      if (apiErr.msg === '') {
        apiErr.msg = store.getters.dictText('defaultErrorCode', apiErr.code)
      }
      if (apiErr.msg === '') {
        apiErr.msg = '接口调用失败, code:' + apiErr.code
      }
    } else {
      apiErr.code = -1
      apiErr.msg = '服务器开小差了!'
    }
    Vue.prototype.$swal({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      width: 300,
      type: 'error',
      title: apiErr.msg
    });
    return Promise.reject(apiErr)
  }
)

export default service
