import request from '@/utils/request'

const base = '/sms/notify'

export function downPage (params) {
  if (!params) {
    params = {}
  }
  return request.get(base + '/down/page', {params: params})
}

export function upPage (params) {
  if (!params) {
    params = {}
  }
  return request.get(base + '/up/page', {params: params})
}
