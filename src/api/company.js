import request from '@/utils/request'

const base = "/om/company";

export function lock(id ) {
  return request.put(base + '/' + id + '/lock', {});
}

export function unLock(id) {
  return request.put(base + '/' + id + '/unlock', {});
}

export function systemPage(companyId) {
  return request.get(base + '/' + companyId + '/system', {});
}

export function applicationList(companyId) {
  return request.get(base + '/' + companyId + '/application', {});
}
