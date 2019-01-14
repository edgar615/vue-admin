import request from '@/utils/request'

const base = '/sms/tpl'

export function page (params) {
  if (!params) {
    params = {}
  }
  return request.get(base + '/page', {params: params})
}

export function del (id) {
  return request.delete(base + '/' + id)
}

export function save (model) {
  return request.post(base, model)
}
