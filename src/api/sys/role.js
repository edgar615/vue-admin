import request from '@/utils/request'

const base = "/role";

export function roleTree(id ) {
  return request.get(base + '/tree');
}

export function getRole(id) {
  return request.get('/role/' + id);
}

export function addRole(model) {
  return request.post('/role', model);
}

export function deleteRole(id) {
  return request.delete('/role/' + id);
}

export function updateRole(id, model) {
  return request.put('/role/' + id, model);
}

export function getSystem(id) {
  return request.get('/role/' + id + "/available-permission");
}

export function getPermitted(id) {
  return request.get('/role/' + id + "/permission");
}

export function permit(model) {
  return request.post('/role/permit', model)
}
