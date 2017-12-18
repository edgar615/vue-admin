import request from '@/utils/request'

export function systemPage(params) {
  if (!params) {
    params = {};
  }
  return request.get('/v1/system/page', {params: params});
}

export function getSystem(id) {
  return request.get('/v1/system/' + id);
}

export function updateSystem(id, system) {
  return request.put('/v1/system/' + id, system);
}

export function addSystem(system) {
  return request.post('/v1/system/', system);
}

export function deleteSystem(id) {
  return request.delete('/v1/system/' + id);
}

export function batchDeleteSystem(ids) {
  return request.delete('/v1/system', {data: {ids : ids}});
}
