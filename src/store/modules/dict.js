import {allDict} from '@/api/backend/dict'

const defaultErrorCode = {
  items: [{
    dictText: '未知错误',
    dictValue: 999
  }, {
    dictText: '空指针',
    dictValue: 1000
  }, {
    dictText: '未知用户',
    dictValue: 1001
  }, {
    dictText: '未登陆用户',
    dictValue: 1002
  }, {
    dictText: '用户名或密码错误',
    dictValue: 1003
  }, {
    dictText: '权限不足',
    dictValue: 1004
  }, {
    dictText: 'Token过期，请重新登录',
    dictValue: 1005
  }, {
    dictText: '请求的资源不存在',
    dictValue: 1006
  }, {
    dictText: '请求的对象不存在',
    dictValue: 1007
  }, {
    dictText: '参数不全',
    dictValue: 1008
  }, {
    dictText: '参数非法',
    dictValue: 1009
  }, {
    dictText: '输入为空或字数不够',
    dictValue: 1010
  }, {
    dictText: '输入字数太多',
    dictValue: 1011
  }, {
    dictText: '文件为空',
    dictValue: 1012
  }, {
    dictText: '文件上传失败',
    dictValue: 1013
  }, {
    dictText: '请求的资源已存在',
    dictValue: 1014
  }, {
    dictText: '请求超时',
    dictValue: 1015
  }, {
    dictText: '服务不可用',
    dictValue: 1016
  }, {
    dictText: '参数类型错误',
    dictValue: 1017
  }, {
    dictText: 'SQL错误',
    dictValue: 1018
  }, {
    dictText: '类型转换错误',
    dictValue: 1019
  }, {
    dictText: '服务异常',
    dictValue: 1020
  }, {
    dictText: '无效Token，请重新登录',
    dictValue: 1021
  }, {
    dictText: '非法请求',
    dictValue: 1022
  }, {
    dictText: '请求过期',
    dictValue: 1023
  }, {
    dictText: 'JSON格式错误',
    dictValue: 1024
  }, {
    dictText: '并发冲突',
    dictValue: 1025
  }, {
    dictText: '服务到期',
    dictValue: 1026
  }, {
    dictText: '帐号被锁定',
    dictValue: 1027
  }, {
    dictText: '缺少必要头信息',
    dictValue: 1028
  }, {
    dictText: '过多的请求',
    dictValue: 1029
  }, {
    dictText: '请求断开',
    dictValue: 1030
  }, {
    dictText: '数据冲突',
    dictValue: 1031
  }]
}

const dictionary = {
  state: {
    data: {
      defaultErrorCode: defaultErrorCode
    }
  },
  mutations: {
    SET_DICT: (state, data) => {
      state.data = data
      state.data.defaultErrorCode = defaultErrorCode
    }
  },
  actions: {
    async LoadAllDict ({commit}) {
      return new Promise((resolve, reject) => {
        allDict().then(response => {
          const data = response.data
          commit('SET_DICT', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dictionary
