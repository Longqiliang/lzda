import Vue from 'vue'
import Vuex from 'vuex'
import APP from './modules/app'
import question from './modules/question'
import report from './modules/report'
import supervise from './modules/supervise'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app: APP,
    question,
    report,
    supervise
  }
})

export default store
