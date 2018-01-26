const dict_data = {
  "permissionType" : [{
    text : "菜单+权限",
    value : 1
  }, {
    text : "权限",
    value : 2
  }],
  "bool" : [{
    text : "是",
    value : true
  }, {
    text : "否",
    value : false
  }],
  "internal" : [{
    text : "是",
    value : true
  }, {
    text : "否",
    value : false
  }],
  "systemType" : [{
    text : "API",
    value : 1
  },{
    text : "WEB",
    value : 2
  },{
    text : "后台服务",
    value : 3
  },{
    text : "微信公众号/小程序",
    value : 4
  }],
  "companyState" : [{
    text : "活动",
    value : 1
  },{
    text : "锁定",
    value : 2
  }],
  "userState" : [{
    text : "活动",
    value : 1
  },{
    text : "锁定",
    value : 2
  }],
  "metadataType" : [{
    text : "整数",
    value : 1
  },{
    text : "字符串",
    value : 2
  },{
    text : "布尔",
    value : 3
  }],
  "errorCode" : [{
    text : "未知错误",
    value : 999
  },{
    text : "空指针",
    value : 1000
  },{
    text : "未知用户",
    value : 1001
  },{
    text : "未登陆用户",
    value : 1002
  },{
    text : "用户名或密码错误",
    value : 1003
  },{
    text : "权限不足",
    value : 1004
  },{
    text : "Token过期，请重新登录",
    value : 1005
  },{
    text : "请求的资源不存在",
    value : 1006
  },{
    text : "请求的对象不存在",
    value : 1007
  },{
    text : "参数不全",
    value : 1008
  },{
    text : "参数非法",
    value : 1009
  },{
    text : "输入为空或字数不够",
    value : 1010
  },{
    text : "输入字数太多",
    value : 1011
  },{
    text : "文件为空",
    value : 1012
  },{
    text : "文件上传失败",
    value : 1013
  },{
    text : "请求的资源已存在",
    value : 1014
  },{
    text : "请求超时",
    value : 1015
  },{
    text : "服务不可用",
    value : 1016
  },{
    text : "参数类型错误",
    value : 1017
  },{
    text : "SQL错误",
    value : 1018
  },{
    text : "类型转换错误",
    value : 1019
  },{
    text : "服务异常",
    value : 1020
  },{
    text : "无效Token，请重新登录",
    value : 1021
  },{
    text : "非法请求",
    value : 1022
  },{
    text : "请求过期",
    value : 1023
  },{
    text : "JSON格式错误",
    value : 1024
  },{
    text : "并发冲突",
    value : 1025
  },{
    text : "服务到期",
    value : 1026
  },{
    text : "帐号被锁定",
    value : 1027
  },{
    text : "缺少必要头信息",
    value : 1028
  },{
    text : "过多的请求",
    value : 1029
  },{
    text : "请求断开",
    value : 1030
  },{
    text : "数据冲突",
    value : 1031
  }]
};

const dict = new Vuex.Store({
  state: {
    data: dict_data
  },
  mutations: {
  }
});

export default dict
