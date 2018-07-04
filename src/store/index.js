import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import portrayal from './modules/portrayal'
import question from './modules/question'
import report from './modules/report'
import supervise from './modules/supervise'
import incorrupt from './modules/incorrupt'
import setting from './modules/setting'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    portrayal,
    question,
    report,
    supervise,
    incorrupt,
    setting
  }
})

export default store
