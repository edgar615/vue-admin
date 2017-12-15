const dict_data = {
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
  }],
  "isOnline" : [{
    text : "在线",
    value : true
  }, {
    text : "离线",
    value : false
  }],
  "deviceType" : [{
    text : "T1",
    value : 1
  },{
    text : "猫眼",
    value : 2
  },{
    text : "F1",
    value : 3
  },{
    text : "201",
    value : 4
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
