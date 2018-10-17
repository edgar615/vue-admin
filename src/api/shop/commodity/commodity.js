import request from '@/utils/request'

export function commodityPage (params) {
  if (!params) {
    params = {
      page: 1,
      pageSize: 10
    }
  }
  return request.get('/commodityStockLog/page', {params:params})
}

export function unWarning (id) {
  return request.put('/commodityStockLog/' +id+'/unWarning')
}

export function enable (id) {
  return request.put('/commodityStockLog/' +id+'/enable')
}

export function count (commodity) {
  return request.put('/commodityStockLog/batch-count',{commodity:commodity})
}

export function batchEnableStatus (commodity) {
  return request.put('/commodityStockLog/batch-enable',{updateWarningStateListReqs:commodity})
}

export function batchUnWarningStatus (commodity) {
  return request.put('/commodityStockLog/batch-unWarning',{updateWarningStateListReqs:commodity})
}
