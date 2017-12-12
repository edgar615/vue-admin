import request from '@/utils/request'

export function login(username, password) {
  /**
   * axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
   .then(function (response) {
    console.log(response);
  })
   .catch(function (error) {
    console.log(error);
  });
   */
  return request.post('/v1/auth/login', {
    username : username,
    password: password
  });
}

export function getPermission() {
  return request.get('/v1/auth/systems')
}

export function getInfo(token) {
  return request({
    url: '/v1/auth/user/info',
    method: 'get',
    params: { token }
  })
}

//export function logout() {
//  return request({
//    url: '/user/logout',
//    method: 'post'
//  })
//}
