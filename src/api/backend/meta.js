import request from '@/utils/request'

const base = "/metadata";

export function page(params) {
  if (!params) {
    params = {};
  }
  return request.get(base + '/page', {params: params});
}

export function get(id ) {
  return request.get(base + '/' + id);
}
export function del(id ) {
  return request.delete(base + '/' + id);
}

export function save(model) {
  return request.post(base, model);
}

export function update(id, model) {
  return request.put(base + '/' + id, model);
}
