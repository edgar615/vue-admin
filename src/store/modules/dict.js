import {allDict} from '@/api/backend/dict'

const dictionary = {
  state: {
    data: {}
  },
  mutations: {
    SET_DICT: (state, data) => {
      state.data = data
    }
  },
  actions: {
    async LoadAllDict ({ commit }) {
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
