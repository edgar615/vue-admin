import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000                  // 请求超时时间
  , headers: {'X-Client-Name': 'Demo'}
})

// request拦截器
service.interceptors.request.use(config => {
  const token = store.getters.token;
  if (token) {
    config.headers['Authorization'] = "Bearer " + token;
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
  },  error => {
    var msg = "登录失败!";
    if (error.response) {
      var code = error.response.data.code;
      if (code == 1003) {
        msg = '用户名或密码错误';
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
