import request from '@/utils/request'

export function systemPage(params) {
  if (!params) {
    params = {};
  }
  return request.get('/system/page', {params: params});
}

export function getSystem(id) {
  return request.get('/system/' + id);
}

export function updateSystem(id, model) {
  return request.put('/system/' + id, model);
}

export function addSystem(model) {
  return request.post('/system', model);
}

export function deleteSystem(id) {
  return request.delete('/system/' + id);
}

export function batchDeleteSystem(ids) {
  return request.delete('/system', {data: {ids : ids}});
}

export function menuList(id) {
  return request.get('/permission/tree', {params: {systemId: id}});
}

export function getMenu(id) {
  return request.get('/permission/' + id);
}

export function addMenu(model) {
  return request.post('/permission', model);
}

export function deleteMenu(id) {
  return request.delete('/permission/' + id);
}

export function updateMenu(id, model) {
  return request.put('/permission/' + id, model);
}

export function getMeta(subcate) {
  return request.get('/metadata/application/' + subcate);
}
