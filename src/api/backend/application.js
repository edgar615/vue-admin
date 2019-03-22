import request from '@/utils/request'

const base = '/application'

export function applicationPage (params) {
  if (!params) {
    params = {}
  }
  return request.get(base + '/page', {params: params})
}

export function getApplication (id) {
  return request.get(base + '/' + id)
}

export function updateApplication (id, model) {
  return request.put(base + '/' + id, model)
}

export function addApplication (model) {
  return request.post(base, model)
}

export function deleteApplication (id) {
  return request.delete(base + '/' + id)
}

export function getAvailableRole () {
  return request.get('/role')
}

export function getWhitlist (id) {
  return request.get(base + '/' + id + '/roles')
}

export function addRole (applicationId, roleId) {
  return request.post(base + '/' + applicationId + '/add-role', {roleId: roleId})
}

export function deleteRole (applicationId, roleId) {
  return request.post(base + '/' + applicationId + '/delete-role', {roleId: roleId})
}
