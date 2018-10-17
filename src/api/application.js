import request from '@/utils/request'

const base = '/application'

export function page (params) {
  if (!params) {
    params = {}
  }
  return request.get(base + '/page', {params: params})
}

export function lock (id) {
  return request.put(base + '/' + id + '/lock', {})
}

export function unLock (id) {
  return request.put(base + '/' + id + '/unlock', {})
}

export function getApp (id) {
  return request.get(base + '/' + id)
}

export function saveApp (model) {
  return request.post(base, model)
}

export function update (id, model) {
  return request.put(base + '/' + id, model)
}
