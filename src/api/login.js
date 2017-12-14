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
  return request.get('/v1/auth/systems', {
    params:{type : 2}
  })
}

export function getInfo() {
  return request.get('/v1/auth/info', {
    params:{type : 2}
  })
}

//export function logout() {
//  return request({
//    url: '/user/logout',
//    method: 'post'
//  })
//}
