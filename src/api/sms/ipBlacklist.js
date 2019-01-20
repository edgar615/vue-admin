import request from '@/utils/request'
import requestNoMessage from '@/utils/requestNoMessage'

const base = '/sms/ip-blacklist'

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
  return requestNoMessage.post(base, model)
}
