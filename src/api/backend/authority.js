import request from '@/utils/request'

export function authorityPage (params) {
  if (!params) {
    params = {}
  }
  return request.get('/authority/page', {params: params})
}

export function getAuthority (id) {
  return request.get('/authority/' + id)
}

export function updateAuthority (id, model) {
  return request.put('/authority/' + id, model)
}

export function addAuthority (model) {
  return request.post('/authority', model)
}

export function deleteAuthority (id) {
  return request.delete('/authority/' + id)
}
