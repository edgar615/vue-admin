const listHistory = {
  state: {
    data: {}
  },
  mutations: {
    SET_QUERY_HISTORY: (state, [path, query]) => {
      state.data[path] = query
    }
  },
  actions: {
    saveListQueryHistory: ({ commit },args) => {

      commit('SET_QUERY_HISTORY', [args.path, args.query])

    }
  }
}

export default listHistory
