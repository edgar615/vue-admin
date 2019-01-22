import request from '@/utils/request'

const base = '/refund'

export function refundPage (params) {
  if (!params) {
    params = {}
  }
  return request.get('/online-refund/page', {params: params})
}

export function addRefund (model) {
  return request.post('/refund', model)
}
