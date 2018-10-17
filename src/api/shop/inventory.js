import request from '@/utils/request'


export function addRecruitment (model) {
  return request.post('/recruitment/add', model)
}

export function inventoryPage (params) {
  if (!params) {
    params = {
      page: 1,
      pageSize: 10
    }
  }
  return request.get('/stockInventory/page', params)
}


export function deleteRecruitment (recruitmentId) {
  return request.delete('/recruitment/delete?recruitmentId=' +recruitmentId)
}

export function updateRecruitmentState (recruitmentId) {
  return request.put('/recruitment/unpublish?recruitmentId=' +recruitmentId)
}

export function publishRecruitmentState (recruitmentId) {
  return request.put('/recruitment/publish?recruitmentId=' +recruitmentId)
}

export function getRecruitment (recruitmentId) {
  return request.get('/recruitment/query?recruitmentId=' +recruitmentId)
}

export function editRecruitment (id,model) {
  return request.put('/recruitment/edit/'+id,model)
}
