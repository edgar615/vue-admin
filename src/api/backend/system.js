import request from '@/utils/request'

export function systemPage(params) {
  if (!params) {
    params = {};
  }
  return request.get('/om/system/page', {params: params});
}

export function getSystem(id) {
  return request.get('/om/system/' + id);
}

export function updateSystem(id, model) {
  return request.put('/om/system/' + id, model);
}

export function addSystem(model) {
  return request.post('/om/system', model);
}

export function deleteSystem(id) {
  return request.delete('/om/system/' + id);
}

export function batchDeleteSystem(ids) {
  return request.delete('/om/system', {data: {ids : ids}});
}

export function menuList(id) {
  return request.get('/om/permission/tree', {params: {systemId: id}});
}

export function getMenu(id) {
  return request.get('/om/permission/' + id);
}

export function addMenu(model) {
  return request.post('/om/permission', model);
}

export function deleteMenu(id) {
  return request.delete('/om/permission/' + id);
}

export function updateMenu(id, model) {
  return request.put('/om/permission/' + id, model);
}

export function getMeta(subcate) {
  return request.get('/om/metadata/application/' + subcate);
}
