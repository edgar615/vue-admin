import request from '@/utils/request'

const base = '/role'

export function roleList () {
  return request.get(base)
}

export function roleTree () {
  return request.get(base + '/tree')
}

export function page () {
  return request.get(base + '/page')
}

export function getRole (id) {
  return request.get(base + '/' + id)
}

export function addRole (model) {
  return request.post(base, model)
}

export function deleteRole (id) {
  return request.delete(base + '/' + id)
}

export function updateRole (id, model) {
  return request.put(base + '/' + id, model)
}

export function getSystem (id) {
  return request.get(base + '/' + id + '/available-permission')
}

export function getPermitted (id) {
  return request.get(base + '/' + id + '/permission')
}

export function permit (model) {
  return request.post(base + '/permit', model)
}
