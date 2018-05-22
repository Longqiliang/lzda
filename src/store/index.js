import Vue from 'vue'
import Vuex from 'vuex'
import APP from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    APP
  }
})

export default store
