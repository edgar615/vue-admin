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
  return request.post('/om/auth/login', {
    username : username,
    password: password
  });
}

export function getPermission() {
  return request.get('/om/auth/systems', {
    params:{type : 2}
  })
}

export function getInfo() {
  return request.get('/om/auth/info', {
    params:{type : 2}
  })
}

//export function logout() {
//  return request({
//    url: '/user/logout',
//    method: 'post'
//  })
//}
