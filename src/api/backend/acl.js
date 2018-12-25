import request from '@/utils/request'

export function aclPage (params) {
  if (!params) {
    params = {}
  }
  return request.get('/acl/page', {params: params})
}

export function getAcl (id) {
  return request.get('/acl/' + id)
}

export function addAcl (model) {
  return request.post('/acl', model)
}

export function deleteAcl (id) {
  return request.delete('/acl/' + id)
}
