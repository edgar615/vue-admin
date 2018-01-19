import request from '@/utils/request'

const base = "/v1/sysuser";

export function lock(id ) {
  return request.put(base + '/' + id + '/lock', {});
}

export function unLock(id) {
  return request.put(base + '/' + id + '/unlock', {});
}

export function getAvailableRole() {
  return request.get('/v1/role/tree');
}

export function getPermitted(id) {
  return request.get(base + "/" + id + "/roles");
}

export function permit(id, model) {
  return request.post(base + "/" + id + "/permit", model);
}

