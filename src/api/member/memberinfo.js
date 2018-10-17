import request from '@/utils/request'

export function addMember (params) {
  return request.post('/member',params)
}
export function getMemberLsit (params) {
  if (!params) {
    params = {}
  }
  return request.get('/member/page', {params: params})
}
export function getInfo (id) {
  return request.get('/member/'+id)
}


export function updateInfo (id ,params) {
  return request.put('/member/'+id,  params)
}
export function deleteMember (id ) {
  return request.delete('/member/'+id)
}

