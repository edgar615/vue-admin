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

export function updateSystem(id, model) {
  return request.put('/v1/system/' + id, model);
}

export function addSystem(model) {
  return request.post('/v1/system', model);
}

export function deleteSystem(id) {
  return request.delete('/v1/system/' + id);
}

export function batchDeleteSystem(ids) {
  return request.delete('/v1/system', {data: {ids : ids}});
}

export function menuList(id) {
  return request.get('/v1/permission/tree', {params: {systemId: id}});
}

export function getMenu(id) {
  return request.get('/v1/permission/' + id);
}

export function addMenu(model) {
  return request.post('/v1/permission', model);
}

export function deleteMenu(id) {
  return request.delete('/v1/permission/' + id);
}

export function updateMenu(id, model) {
  return request.put('/v1/permission/' + id, model);
}

export function getMeta(subcate) {
  return request.get('/v1/metadata/application/' + subcate);
}
