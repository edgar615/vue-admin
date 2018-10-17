import request from '@/utils/request'


export function getFundrecord (params) {
  if (!params) {
    params = {
      page: 1,
      pageSize: 10,
      accountId:null,
      endTime:null,
      startTime:null,
      operator:''
    }
  }
  return request.get('/supplierAccount/accountTransaction', {params: params})
}

