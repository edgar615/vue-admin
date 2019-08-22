import { getPermission, getInfo } from '@/api/login'

const permission = {
  state: {
    activeSystem: '',
    activeLevel1Menu: '',
    activeLevel2Menu: '',
    systems: [],
    pageTitle: '',
    user: {}
  },
  mutations: {
    SET_PERMISSION: (state, systems) => {
      state.systems = systems
    },
    ACTIVE_SYSTEM: (state, subsystemId) => {
      state.activeSystem = subsystemId
    },
    ACTIVE_LEVEL1_MENU: (state, [subsystemId, menuId]) => {
      state.activeSystem = subsystemId
      state.activeLevel1Menu = menuId
    },
    ACTIVE_LEVEL2_MENU: (state, [subsystemId, level1Id, level2Id]) => {
      state.activeSystem = subsystemId
      state.activeLevel1Menu = level1Id
      state.activeLevel2Menu = level2Id
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    PAGE_TITLE: (state, title) => {
      state.pageTitle = title
    }
  },

  actions: {
    // 获取权限
    async GetPermission ({ dispatch, commit, state }) {
      await dispatch('GetInfo')
      return new Promise((resolve, reject) => {
        getPermission().then(response => {
          const data = response.data
          commit('SET_PERMISSION', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    async GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_USER', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
