import request from '@/utils/request'
const Mock = require('mockjs')// 获取mock对象
const Random = Mock.Random// 获取random对象，随机生成各种数据
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码
export function purChaseOrderPage (params) {
 if (!params) {
    params = {}
  }
  return request.get('/purchaseOrder/page', {params: params})

}
export function getpurChaseOrder (id) {
  return request.get('/purchaseOrder/' + id)
}

export function deletePurChaseOrder (id) {
  return request.delete('/system/' + id)
}

export function batchDeletePurChaseOrder (ids) {
  return request.delete('/system', {data: {ids: ids}})
}
const postData = req => { //列表页数据
  let pagination = {
    records: [],
    totalRecords: 100,
    pageSize: 10,
  }
  for (let i = 0; i < 100; i++) {
    let post = {
      id: Random.integer(),
      orderNo: Random.string(10),
      createdOn: Random.date('yyyy-MM-dd'),
      name: Random.cname(),
      amount: Random.float(60, 100),
      state: Random.integer(1, 5),
      trackingNumber: Random.integer()
    }
    pagination.records.push(post)
  }
  return {
    code,
    pagination
  }
}
// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/posts`, 'get', postData)


const viewData = req => { //订单详情据
  let pagination = {
    records: [],//商品列表
    orderNo: Random.string(10),
    buyerName: Random.csentence(10), //下单门店
    state: Random.integer(1, 5),
    payType:Random.integer(1, 3),
    fullSubAmoun:Random.float(60, 100)


  }
  for (let i = 0; i < 9; i++) {
    let post = {
      id: Random.integer(),
      name: Random.csentence(3 , 7),//商品名称
      price: Random.float(60, 100), //商品单价
      realquantity: Random.integer(1, 10),//商品发货数量
      amount: Random.float(60, 100), //商品总价
      orderNo: Random.string(10),
      trackingNumber: Random.integer(),
      state: Random.integer(1, 5)
    }
    pagination.records.push(post)
  }
  return {
    code,
    pagination
  }
}
Mock.mock(`${domain}/view`, 'get', viewData)

