import { getPermission, getInfo } from '@/api/login'

const permission = {
  state: {
    activeSystem: '',
    systems: [],
    user : {}
  },
  mutations: {
    SET_PERMISSION: (state, systems) => {
      state.systems = systems
    },
    ACTIVE_SYSTEM: (state, systemIdentifer) => {
      state.activeSystem = systemIdentifer
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },

actions: {
    // 获取权限
    async GetPermission({ dispatch, commit, state }) {
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
    async GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
          getInfo().then(response => {
            const data = response.data
            commit('SET_USER', data)
            resolve(response)
          }).catch(error => {
        reject(error)
      })
    })
    },
  }
}

export default permission
