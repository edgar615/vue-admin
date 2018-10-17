import request from '@/utils/request'

const base = '/company'

export function page (params) {
  if (!params) {
    params = {}
  }
  return request.get(base + '/page', {params: params})
}

export function get (id) {
  return request.get(base + '/' + id)
}

export function save (model) {
  return request.post(base, model)
}

export function update (id, model) {
  return request.put(base + '/' + id, model)
}

export function lock (id) {
  return request.put(base + '/' + id + '/lock', {})
}

export function unLock (id) {
  return request.put(base + '/' + id + '/unlock', {})
}

export function systemPage (companyId) {
  return request.get(base + '/' + companyId + '/system', {})
}

export function applicationList (companyId) {
  return request.get(base + '/' + companyId + '/application', {})
}
