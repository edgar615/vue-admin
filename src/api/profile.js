import request from '@/utils/request'

const base = "/v1/auth";

export function changePwd(model) {
  return request.put(base +  '/changepwd', model);
}
