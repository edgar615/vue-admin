const appScreen = {
  state: {
    screenWidth: document.body.clientWidth
  },
  mutations: {
    SET_SCREEN_WIDTH: (state, [width]) => {
      state.screenWidth = width
    }
  },
  actions: {
    windowResize: ({ commit }, args) => {
      commit('SET_SCREEN_WIDTH', [args.width])
    }
  }
}

export default appScreen
