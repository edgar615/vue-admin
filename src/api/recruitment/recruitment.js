import request from '@/utils/request'


export function addRecruitment (model) {
  return request.post('/recruitment', model)
}

export function recruitmentPage (params) {
  if (!params) {
    params = {
      page: 1,
      pageSize: 10
    }
  }
  return request.get('/recruitment/page', {params: params})
}


export function deleteRecruitment (id) {
  return request.delete('/recruitment/' +id)
}

export function updateRecruitmentState (id) {
  return request.put('/recruitment/' +id+"/unpublish")
}

export function publishRecruitmentState (id) {
  return request.put('/recruitment/' +id+"/publish")
}

export function getRecruitment (id) {
  return request.get('/recruitment/' +id)
}

export function editRecruitment (id,model) {
  return request.put('/recruitment/'+id,model)
}
