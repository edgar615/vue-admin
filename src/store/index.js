//import Vue from 'vue'
//import Vuex from 'vuex'
import dict from './modules/dict'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dict,
    user,
    permission
  },
  getters
})

export default store
