import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

// Vuex 内置日志插件用于一般调试
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// webpack调用编译
// npm run dev 时 NODE_DEV === 'dev'
// npm run build 时 NODE_DEV === 'production'
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
