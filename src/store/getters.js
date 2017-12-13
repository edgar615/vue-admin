const getters = {
  token: state => state.user.token,
  activeSystem: state => state.permission.activeSystem,
  systems: state => state.permission.systems,
  dictList: (state) => (dictName, dictValue) => {
  if (state.dict.data[dictName] == undefined) {
    return [];
  }
  return state.dict.data[dictName];
},
  dictText: (state) => (dictName, dictValue) => {
    if (state.dict.data[dictName] == undefined) {
      return "";
    }
    var items = state.dict.data[dictName];
    var dictText = "";
    items.forEach(function(item, index, input) {
      if (item.value == dictValue) {
          dictText = item.text;
      }
    });
    return dictText;
  },
  systemList: (state) => () => {
    const systemArray = [];
    state.permission.systems.forEach(function(item, index, input) {
      if (item.menus && item.menus.length > 0) {
        systemArray.push(item);
      }
    });
   return systemArray;
  },
  menuList: (state) => () => {
  var menus = [];
  state.permission.systems.forEach(function(item, index, input) {
    const systemIdentifer = state.permission.activeSystem
    if (item.sysIdentifier == systemIdentifer) {
      if (item.menus) {
        menus = item.menus;
      }
    }
  });
    return menus;
  }
}
export default getters
