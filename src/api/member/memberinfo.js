import request from '@/utils/request'

export function addMember (params) {
  return request.post('/member',params)
}
//获取会员列表
export function getMemberLsit (params) {
  if (!params) {
    params = {}
  }
  return request.get('/member/page', {params: params})
}
//查看会员信息
export function getInfo (id) {
  return request.get('/member/'+id)
}

//编辑会员信息
export function updateInfo (id ,params) {
  return request.put('/member/'+id,  params)
}
//删除会员
export function deleteMember (id ) {
  return request.delete('/member/'+id)
}
//查询会员等级
export function getLevelAll ( ) {
  return request.get('/memberGradeConfig/queryAll')
}
//修改等级
export function levelUpdate (params) {
  return request.post('/memberGradeConfig',params)
}
//查询积分规则
export function getExplain ( ) {
  return request.get('/memberPointRuler/queryAll')
}
//修改积分规则
export function explainUpdate (params) {
  return request.post('/memberPointRuler',params)
}
