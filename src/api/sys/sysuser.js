import request from '@/utils/request'

const base = "/sysuser";

export function page(params) {
  if (!params) {
    params = {};
  }
  return request.get(base + '/page', {params: params});
}

export function get(id ) {
  return request.get(base + '/' + id);
}
export function del(id ) {
  return request.delete(base + '/' + id);
}

export function save(model) {
  return request.post(base, model);
}

export function update(id, model) {
  return request.put(base + '/' + id, model);
}


export function lock(id ) {
  return request.put(base + '/' + id + '/lock', {});
}

export function unLock(id) {
  return request.put(base + '/' + id + '/unlock', {});
}

export function getAvailableRole() {
  return request.get('/role/tree');
}

export function getPermitted(id) {
  return request.get(base + "/" + id + "/roles");
}

export function addRole(userId, roleId) {
  return request.post(base + "/" + userId + "/add-role", {roleId: roleId});
}

export function deleteRole(userId, roleId) {
  return request.post(base + "/" + userId + "/delete-role", {roleId: roleId});
}
