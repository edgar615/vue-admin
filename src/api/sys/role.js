import request from '@/utils/request'

const base = "/om/role";

export function roleTree(id ) {
  return request.get(base + '/tree');
}

export function getRole(id) {
  return request.get('/om/role/' + id);
}

export function addRole(model) {
  return request.post('/om/role', model);
}

export function deleteRole(id) {
  return request.delete('/om/role/' + id);
}

export function updateRole(id, model) {
  return request.put('/om/role/' + id, model);
}

export function getSystem(id) {
  return request.get('/om/role/' + id + "/available-permission");
}

export function getPermitted(id) {
  return request.get('/om/role/' + id + "/permission");
}

export function permit(model) {
  return request.post('/om/role/permit', model)
}
