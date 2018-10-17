import request from '@/utils/request'

const base = '/commodity/category'

export function cateTree (id) {
  return request.get(base + '/tree')
}

export function getCate (id) {
  return request.get(base + '/' + id)
}

export function addCate (model) {
  return request.post(base, model)
}

export function deleteCate (id) {
  return request.delete(base + '/' + id)
}

export function updateCate (id, model) {
  return request.put(base + '/' + id, model)
}

export function disable (id) {
  return request.put(base + '/' + id + '/disable')
}

export function enable (id) {
  return request.put(base + '/' + id + '/enable')
}
