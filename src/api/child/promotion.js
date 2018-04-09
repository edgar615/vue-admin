import request from '@/utils/request'

const base = "/cs/promotion";

export function publishPromotion(id ) {
  return request.put(base + '/' + id + '/publish', {});
}
