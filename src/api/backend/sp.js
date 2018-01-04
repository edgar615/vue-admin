import request from '@/utils/request'

const base = "/v1/sp";

export function spPage(params) {
  if (!params) {
    params = {};
  }
  return request.get(base + '/page', {params: params});
}

export function getSp(id) {
  return request.get(base + '/' + id);
}

export function updateSp(id, system) {
  return request.put(base + '/' + id, system);
}

export function addSp(sp) {
  return request.post(base, system);
}

export function deleteSp(id) {
  return request.delete(base + '/' + id);
}

export function batchDeleteSp(ids) {
  return request.delete(base, {data: {ids : ids}});
}
