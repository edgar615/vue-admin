import request from '@/utils/request'

export function resourcePage (params) {
  if (!params) {
    params = {}
  }
  return request.get('/resource/page', {params: params})
}

export function getResource (id) {
  return request.get('/resource/' + id)
}

export function updateResource (id, model) {
  return request.put('/resource/' + id, model)
}
