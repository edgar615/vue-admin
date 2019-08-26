import request from '@/utils/request'

export function allDict () {
  return request.get('/dict')
}

export function dictList (params) {
  if (!params) {
    params = {}
  }
  return request.get('/dict/list', {params: params})
}

export function dictPage (params) {
  if (!params) {
    params = {}
  }
  return request.get('/dict/page', {params: params})
}
export function getDict (id) {
  return request.get('/dict/' + id)
}

export function updateDict (id, model) {
  return request.put('/dict/' + id, model)
}

export function addDict (model) {
  return request.post('/dict', model)
}

export function deleteDict (id) {
  return request.delete('/dict/' + id)
}

export function itemPage (params) {
  return request.get('/dict-item/page', {params: params})
}

export function addItem (model) {
  return request.post('/dict-item', model)
}

export function deleteItem (id) {
  return request.delete('/dict-item/' + id)
}
