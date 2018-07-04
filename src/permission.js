import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  if (store.getters.organizes.length === 0) {
    // next()
    store.dispatch('GetOrganize').then(v => {
      next({ ...to, replace: true })
    })
  } else {
    next()
  }
})
