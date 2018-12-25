const listHistory = {
  state: {
    data: {}
  },
  mutations: {
    SET_QUERY_HISTORY: (state, [path, query]) => {
      state.data[path] = query
    },
    CLEAR_QUERY_HISTORY: (state, [path, query]) => {
      delete state.data[path]
    }
  },
  actions: {
    saveListQueryHistory: ({ commit }, args) => {
      commit('SET_QUERY_HISTORY', [args.path, args.query])
    },
    clearListQueryHistory: ({ commit }, args) => {
      commit('CLEAR_QUERY_HISTORY', [args.path])
    }
  }
}

export default listHistory
