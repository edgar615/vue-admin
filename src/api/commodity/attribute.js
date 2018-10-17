import request from '@/utils/request'

const base = '/commodity/attribute'

export function listAttr (params) {
  if (!params) {
    params = {}
  }
  return request.get(base, {params: params})
}

export function getAttr (id) {
  return request.get(base + '/' + id)
}

export function addAttr (model) {
  return request.post(base, model)
}

export function deleteAttr (id) {
  return request.delete(base + '/' + id)
}

export function updateAttr (id, model) {
  return request.put(base + '/' + id, model)
}
