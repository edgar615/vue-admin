const dict_data = {
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
