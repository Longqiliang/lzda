// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import VCharts from 'v-charts'
import VeBar from 'v-charts/lib/bar.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'
import VeRing from 'v-charts/lib/ring.common'
import 'v-charts/lib/style.css'

import '../static/iconfont/iconfont.css'

import './permission'
import * as filters from './filter'


Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(VCharts)
Vue.component(VeBar.name, VeBar)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VePie.name, VePie)
Vue.component(VeRing.name, VeRing)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
