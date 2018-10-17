import request from '@/utils/request'
export function purChaseOrderPage (params) {
 if (!params) {
    params = {}
  }
  return request.get('/purchaseOrder/page', {params: params})

}
export function getpurChaseOrder (id) {
  return request.get('/purchaseOrder/' + id)
}
export function saveLogistic (model) {
  return request.post('/shipment/', model)

}


export function deletePurChaseOrder (id) {
  return request.delete('/system/' + id)
}

export function batchDeletePurChaseOrder (ids) {
  return request.delete('/system', {data: {ids: ids}})
}

