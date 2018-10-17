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
export function cancelOrder (id) {
  return request.put('/purchaseOrder/' +id+ '/cancle')
}

export function deletePurChaseOrder (id) {
  return request.delete('/system/' + id)
}

export function batchDeletePurChaseOrder (ids) {
  return request.delete('/system', {data: {ids: ids}})
}


