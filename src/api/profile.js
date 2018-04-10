import request from '@/utils/request'

const base = "/om/auth";

export function changePwd(model) {
  return request.put(base +  '/changepwd', model);
}
