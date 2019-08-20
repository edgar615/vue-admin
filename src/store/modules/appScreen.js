const appScreen = {
  state: {
    showFolderAside: true,
    screenWidth: document.body.clientWidth
  },
  mutations: {
    SET_SHOW_FOLDER_ASIDE: (state, [showFolderAside]) => {
      state.showFolderAside = showFolderAside
    },
    SET_SCREEN_WIDTH: (state, [width]) => {
      state.screenWidth = width
    }
  },
  actions: {
    changeShowFolderAside: ({ commit }, args) => {
      commit('SET_SHOW_FOLDER_ASIDE', [args.showFolderAside])
    },
    windowResize: ({ commit }, args) => {
      commit('SET_SCREEN_WIDTH', [args.width])
    }
  }
}

export default appScreen
