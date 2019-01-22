import request from '@/utils/request'

const base = '/payment/response'

export function paymentPage (params) {
  if (!params) {
    params = {}
  }
  return request.get(base + '/page', {params: params})
}

export function getPayment (id) {
  return request.get(base + '/' + id)
}
