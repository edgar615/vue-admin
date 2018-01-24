const getters = {
  token: state => state.user.token,
  user: state => state.permission.user,
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
      if (item.permissions && item.permissions.length > 0) {
        systemArray.push(item);
      }
    });
   return systemArray;
  },
  currentSystem: (state) => () => {
    var currentSystem;
    state.permission.systems.forEach(function(item, index, input) {
      const systemIdentifer = state.permission.activeSystem
      if (item.sysIdentifier == systemIdentifer) {
        currentSystem = item;
      }
    });
    return currentSystem;
  },
  menuList: (state) => () => {
  var menus = [];
  state.permission.systems.forEach(function(item, index, input) {
    const systemIdentifer = state.permission.activeSystem
    if (item.sysIdentifier == systemIdentifer) {
      if (item.permissions) {
        menus = item.permissions;
      }
    }
  });
    return menus;
  }
}
export default getters
