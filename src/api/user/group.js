import request from '@/utils/request'

const base = '/group'

export function page (params) {
  if (!params) {
    params = {}
  }
  return request.get(base + '/page', {params: params})
}

export function get (id) {
  return request.get(base + '/' + id)
}


export function lock (id) {
  return request.put(base + '/' + id + '/lock', {})
}

export function unLock (id) {
  return request.put(base + '/' + id + '/unlock', {})
}
