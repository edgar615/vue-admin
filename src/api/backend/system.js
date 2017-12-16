import request from '@/utils/request'

export function systemPage(params) {
  if (!params) {
    params = {};
  }
  return request({
    url: '/v1/system/page',
    method: 'get',
    params: params
  })
}

export function deleteSystem(id) {
  return request({
    url: '/v1/system/' + id,
    method: 'delete'
  })
}
