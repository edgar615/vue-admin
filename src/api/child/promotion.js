import request from '@/utils/request'

const base = "/v1/promotion";

export function publish(id ) {
  return request.put(base + '/' + id + '/publish', {});
}
