import request from '@/utils/request'

export function devicePage(params) {
  if (!params) {
    params = {};
  }
  return request({
    url: '/devices/page',
    method: 'get',
    params: params
  })
}

//export function login(username, password) {
//  return request({
//    url: '/user/login',
//    method: 'post',
//    data: {
//      username,
//      password
//    }
//  })
//}
//
//export function getInfo(token) {
//  return request({
//    url: '/user/info',
//    method: 'get',
//    params: { token }
//  })
//}
//
//export function logout() {
//  return request({
//    url: '/user/logout',
//    method: 'post'
//  })
//}
