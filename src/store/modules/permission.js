import { getPermission } from '@/api/login'

const user = {
  state: {
    activeSystem: '',
    systems: []
  },
  mutations: {
    SET_PERMISSION: (state, systems) => {
      state.systems = systems
    },
    ACTIVE_SYSTEM: (state, systemIdentifer) => {
      state.activeSystem = systemIdentifer
    }
  },

actions: {
    // 登录
    GetPermission({ commit, state }) {
      return new Promise((resolve, reject) => {
          getPermission().then(response => {
          const data = response.data
          commit('SET_PERMISSION', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
