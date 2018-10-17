import request from '@/utils/request'

export function franchiserList (params) {
  if (!params) {
    params = {

    }
  }
  return request.get('/recruitment/page', {params: params})
}
