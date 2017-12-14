import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    token: getToken()
  },
//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
// Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
// 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
 //调用：store.commit('increment')
  mutations: {
    SET_TOKEN: (state, token) => {
       setToken(token);
      state.token = token
    }
  },

//Action 类似于 mutation，不同在于：
//Action 提交的是 mutation，而不是直接变更状态。
//Action 可以包含任意异步操作。mutations是同步
//通过dispatch分发store.dispatch('increment')
actions: {
    // 登出
    Logout({ commit }) {
      return new Promise(resolve => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
      })
    }
  }
}

export default user
