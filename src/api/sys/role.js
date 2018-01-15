import request from '@/utils/request'

const base = "/v1/role";

export function roleTree(id ) {
  return request.get(base + '/tree');
}

export function getRole(id) {
  return request.get('/v1/role/' + id);
}

export function addRole(model) {
  return request.post('/v1/role', model);
}

export function deleteRole(id) {
  return request.delete('/v1/role/' + id);
}

export function updateRole(id, model) {
  return request.put('/v1/role/' + id, model);
}
