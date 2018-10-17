import request from '@/utils/request'
export function getStaffData (params){
  if (!params){

         params = {}
    }
  return request.get('/Staff/page', params)
}
export function salerOrderPage (params){
  if (!params) {
    params = {}
  }
  return request.get('/saleOrder/page', params)
}

