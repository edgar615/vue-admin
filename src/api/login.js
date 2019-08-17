import request from '@/utils/request'
import requestNoMessage from '@/utils/requestNoMessage'

export function login (username, password) {
  return requestNoMessage.post('/auth/password/login', {
    username: username,
    password: password
  })
}

export function getPermission () {
  return request.get('/auth/systems', {
    params: {type: 2}
  })
}

export function getInfo () {
  return request.get('/auth/info', {
    params: {type: 2}
  })
}

export function check () {
  return requestNoMessage.get('/auth/check')
}

//export function logout() {
//  return request({
//    url: '/user/logout',
//    method: 'post'
//  })
//}
