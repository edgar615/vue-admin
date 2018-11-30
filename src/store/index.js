// import Vue from 'vue'
// import Vuex from 'vuex'
import dict from './modules/dict'
import region from './modules/region'
import user from './modules/user'
import permission from './modules/permission'
import listHistory from './modules/listHistory'
import appScreen from './modules/appScreen'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dict,
    region,
    user,
    appScreen,
    permission,
    listHistory
  },
  getters
})

export default store
