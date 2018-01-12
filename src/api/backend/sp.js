import request from '@/utils/request'

const base = "/v1/sp";

export function lock(id ) {
  return request.put(base + '/' + id + '/lock', {});
}

export function unLock(id) {
  return request.put(base + '/' + id + '/unlock', {});
}

export function applicationList(companyCode) {
  return request.put(base + '/' + companyCode + '/application', {});
}
