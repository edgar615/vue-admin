import request from '@/utils/request'

const base = "/om/application";

export function lock(id ) {
  return request.put(base + '/' + id + '/lock', {});
}

export function unLock(id) {
  return request.put(base + '/' + id + '/unlock', {});
}

export function getApp(id ) {
  return request.get(base + '/' + id);
}

export function saveApp(model) {
  return request.post(base, model);
}
