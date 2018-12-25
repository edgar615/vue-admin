import request from '@/utils/request'
export function shippingMethodPage (params) {
  if (!params) {
    params = {}
  }
  return request.get('/shipping-method/page', {params: params})
}

export function addShippingMethod (model) {
  return request.post('/shipping-method', model)
}

export function editShippingMethod (id, model) {
  return request.put('/shipping-method/' + id, model)
}
export function getShippingMethod (id) {
  return request.get('/shipping-method/' + id)
}
export function deleteShippingMethod (id) {
  return request.delete('/shipping-method/' + id)
}
