import request from '@/utils/request'

export function returnOrderPage (params) {
  if (!params) {
    params = {}
  }
  return request.get('/returnOrder/page', {params: params})
}
export function getpurReturnOrder (id) {
  return request.get('/returnOrder/' + id)
}
export function addReturnOrder ( model) {
  return request.put('/returnOrder/addReturnOrderVo/', model)
}

