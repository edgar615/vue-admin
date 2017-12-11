import Vue from 'vue'
import Vuex from 'vuex'
import dict from './modules/dict'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dict
  },
  getters
})

export default store
