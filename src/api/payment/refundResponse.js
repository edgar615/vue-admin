import request from '@/utils/request'

const base = '/refund/response'

export function refundPage (params) {
  if (!params) {
    params = {}
  }
  return request.get(base + '/page', {params: params})
}

export function getRefund (id) {
  return request.get(base + '/' + id)
}

export function confirmRefund (id) {
  return request.post(base + '/' + id + '/confirm', {})
}
