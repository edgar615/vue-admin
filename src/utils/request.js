import axios from 'axios'
import store from '@/store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000,
  headers: {'X-Client-Name': 'Demo'}
})

// request拦截器
service.interceptors.request.use(config => {
  const token = store.getters.token
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, error => {
  // Do something with request error
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
  var msg = '接口调用失败!'
  if (error.response) {
    var code = error.response.data.code
    var errorMsg = store.getters.dictText('errorCode', code)
    if (errorMsg === '') {
      msg = '接口调用失败'
    }
  }
  Vue.prototype.$toast.open({
    duration: 1500,
    message: msg,
    type: 'is-danger'
  })
  return Promise.reject(error)
}
)

export default service
