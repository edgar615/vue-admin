const getters = {
  region: state => state.region.data,
  token: state => state.user.token,
  user: state => state.permission.user,
  activeSystem: state => state.permission.activeSystem,
  activeModule: state => state.permission.activeModule,
  activeLevel1: state => state.permission.activeLevel1Menu,
  activeLevel2: state => state.permission.activeLevel2Menu,
  systems: state => state.permission.systems,
  dictList: (state) => (dictName, dictValue) => {
    if (state.dict.data[dictName] === undefined) {
      return []
    }
    return state.dict.data[dictName].items
  },
  dictText: (state) => (dictName, dictValue) => {
    if (state.dict.data[dictName] === undefined) {
      return ''
    }
    var items = state.dict.data[dictName].items
    var dictText = ''
    items.forEach(function (item, index, input) {
      if (item.dictValue === dictValue) {
        dictText = item.dictText
      }
    })
    return dictText
  },
  systemList: (state) => () => {
    const systemArray = []
    state.permission.systems.forEach(function (item, index, input) {
      if (item.permissions && item.permissions.length > 0) {
        systemArray.push(item)
      }
    })
    return systemArray
  },
  currentSystem: (state) => () => {
    var currentSystem
    state.permission.systems.forEach(function (item, index, input) {
      const subsystemId = state.permission.activeSystem
      if (item.subsystemId === subsystemId) {
        currentSystem = item
      }
    })
    return currentSystem
  },
  currentLevel1Menu: (state) => () => {
    var level1Menu
    var currentSystem
    const subsystemId = state.permission.activeSystem
    state.permission.systems.forEach(function (item, index, input) {
      if (item.subsystemId === subsystemId) {
        currentSystem = item
      }
    });
    if (currentSystem) {
      const level1Id = state.permission.activeLevel1Menu
      currentSystem.permissions.forEach(function (item) {
        if (level1Id === item.sysPermissionId && item.children) {
          level1Menu = item
        }
      })
    }
    return level1Menu
  },
  menuList: (state) => () => {
    var menus = []
    state.permission.systems.forEach(function (item, index, input) {
      const subsystemId = state.permission.activeSystem
      if (item.subsystemId === subsystemId) {
        if (item.permissions) {
          menus = item.permissions
        }
      }
    })
    return menus
  }
}
export default getters
