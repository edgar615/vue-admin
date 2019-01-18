import request from '@/utils/request'

const base = '/sms/history'

export function page (params) {
  if (!params) {
    params = {}
  }
  return request.get(base + '/page', {params: params})
}
